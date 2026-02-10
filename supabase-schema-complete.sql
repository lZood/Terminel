-- ============================================
-- PORTAL PRODUCTOR - GRUPO TERMINEL
-- Schema Completo de Base de Datos
-- ============================================

-- ============================================
-- 1. EXTENSIONES Y CONFIGURACIÓN
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- Para georreferenciación

-- ============================================
-- 2. TIPOS ENUMERADOS (ENUMS)
-- ============================================

-- Tipos de documentos
CREATE TYPE document_type AS ENUM (
  'ine',
  'curp',
  'rfc',
  'comprobante_domicilio',
  'permiso_siembra',
  'factura_venta',
  'factura_compra',
  'contrato_habilitacion'
);

-- Estados de validación
CREATE TYPE validation_status AS ENUM (
  'pending',
  'validating',
  'approved',
  'rejected'
);

-- Estados de liquidación
CREATE TYPE settlement_status AS ENUM (
  'pending',
  'partial',
  'completed',
  'cancelled'
);

-- Tipos de notificación
CREATE TYPE notification_type AS ENUM (
  'new_ticket',
  'payment_released',
  'document_validated',
  'quality_alert',
  'inventory_update',
  'system_message'
);

-- Estados de ticket de soporte
CREATE TYPE support_status AS ENUM (
  'open',
  'in_progress',
  'waiting_user',
  'resolved',
  'closed'
);

-- Prioridad de tickets
CREATE TYPE priority_level AS ENUM (
  'low',
  'medium',
  'high',
  'urgent'
);

-- ============================================
-- 3. TABLA: documents (Documentos)
-- ============================================

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type document_type NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER, -- En bytes
  mime_type VARCHAR(100),
  status validation_status DEFAULT 'pending',
  validation_details JSONB, -- Detalles de validación de IA
  validated_by UUID REFERENCES auth.users(id),
  validated_at TIMESTAMP WITH TIME ZONE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at DATE, -- Para permisos con vencimiento
  metadata JSONB, -- Información adicional flexible
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para documents
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_expires_at ON documents(expires_at);

-- ============================================
-- 4. TABLA: scale_tickets (Boletas de Báscula)
-- ============================================

CREATE TABLE IF NOT EXISTS scale_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  folio VARCHAR(50) UNIQUE NOT NULL,
  product_type VARCHAR(100) NOT NULL, -- maíz blanco, garbanzo, etc.
  gross_weight DECIMAL(10, 2) NOT NULL, -- Peso bruto en kg
  tare_weight DECIMAL(10, 2) NOT NULL, -- Tara en kg
  net_weight DECIMAL(10, 2) NOT NULL, -- Peso neto en kg
  entry_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  truck_plates VARCHAR(20),
  driver_name VARCHAR(255),
  location VARCHAR(100), -- Estación Pinitos, Planta Los Valles
  quality_analyzed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para scale_tickets
CREATE INDEX idx_scale_tickets_user_id ON scale_tickets(user_id);
CREATE INDEX idx_scale_tickets_folio ON scale_tickets(folio);
CREATE INDEX idx_scale_tickets_entry_date ON scale_tickets(entry_datetime);
CREATE INDEX idx_scale_tickets_product ON scale_tickets(product_type);

-- ============================================
-- 5. TABLA: quality_analysis (Análisis de Calidad)
-- ============================================

CREATE TABLE IF NOT EXISTS quality_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES scale_tickets(id) ON DELETE CASCADE NOT NULL,
  humidity_level DECIMAL(5, 2) NOT NULL, -- Porcentaje
  impurities_level DECIMAL(5, 2) NOT NULL, -- Porcentaje
  broken_grains DECIMAL(5, 2), -- Porcentaje de granos quebrados
  foreign_matter DECIMAL(5, 2), -- Materia extraña
  test_weight DECIMAL(6, 2), -- Peso específico
  temperature DECIMAL(4, 1), -- Temperatura del grano
  test_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  lab_technician VARCHAR(255),
  passed_standards BOOLEAN,
  deduction_applied DECIMAL(10, 2), -- Deducción por calidad
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para quality_analysis
CREATE INDEX idx_quality_ticket_id ON quality_analysis(ticket_id);
CREATE INDEX idx_quality_test_date ON quality_analysis(test_date);

-- ============================================
-- 6. TABLA: grain_inventory (Inventario de Granos)
-- ============================================

CREATE TABLE IF NOT EXISTS grain_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  silo_id VARCHAR(50) NOT NULL,
  grain_type VARCHAR(100) NOT NULL,
  quantity_tons DECIMAL(10, 2) NOT NULL,
  storage_date DATE NOT NULL,
  estimated_exit_date DATE,
  actual_exit_date DATE,
  location VARCHAR(100), -- Ubicación del silo
  status VARCHAR(50) DEFAULT 'stored', -- stored, partial_withdrawal, withdrawn
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para grain_inventory
CREATE INDEX idx_grain_inventory_user_id ON grain_inventory(user_id);
CREATE INDEX idx_grain_inventory_silo ON grain_inventory(silo_id);
CREATE INDEX idx_grain_inventory_status ON grain_inventory(status);

-- ============================================
-- 7. TABLA: settlements (Liquidaciones)
-- ============================================

CREATE TABLE IF NOT EXISTS settlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  settlement_number VARCHAR(50) UNIQUE NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  paid_amount DECIMAL(12, 2) DEFAULT 0,
  withheld_amount DECIMAL(12, 2) DEFAULT 0,
  withheld_reason TEXT, -- Razón de retención (créditos, etc.)
  status settlement_status DEFAULT 'pending',
  payment_date DATE,
  payment_reference VARCHAR(100),
  clabe_account VARCHAR(18), -- CLABE de pago
  breakdown JSONB, -- Desglose detallado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para settlements
CREATE INDEX idx_settlements_user_id ON settlements(user_id);
CREATE INDEX idx_settlements_status ON settlements(status);
CREATE INDEX idx_settlements_period ON settlements(period_start, period_end);

-- ============================================
-- 8. TABLA: land_plots (Predios)
-- ============================================

CREATE TABLE IF NOT EXISTS land_plots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plot_name VARCHAR(255) NOT NULL,
  plot_number VARCHAR(50),
  coordinates GEOMETRY(Polygon, 4326), -- Polígono en WGS84
  hectares DECIMAL(10, 4) NOT NULL,
  municipality VARCHAR(100),
  state VARCHAR(100) DEFAULT 'Sinaloa',
  permit_id UUID REFERENCES documents(id), -- Referencia al permiso de siembra
  crop_type VARCHAR(100), -- Tipo de cultivo actual
  season VARCHAR(50), -- Ciclo agrícola
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para land_plots
CREATE INDEX idx_land_plots_user_id ON land_plots(user_id);
CREATE INDEX idx_land_plots_active ON land_plots(active);
CREATE INDEX idx_land_plots_coordinates ON land_plots USING GIST(coordinates);

-- ============================================
-- 9. TABLA: bank_accounts (Cuentas Bancarias)
-- ============================================

CREATE TABLE IF NOT EXISTS bank_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  clabe VARCHAR(18) UNIQUE NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  account_holder VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP WITH TIME ZONE,
  verification_method VARCHAR(50), -- 'manual', 'micro_deposit', etc.
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para bank_accounts
CREATE INDEX idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX idx_bank_accounts_clabe ON bank_accounts(clabe);
CREATE INDEX idx_bank_accounts_primary ON bank_accounts(user_id, is_primary) WHERE is_primary = TRUE;

-- ============================================
-- 10. TABLA: notifications (Notificaciones)
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  sent_via TEXT[], -- ['telegram', 'whatsapp', 'email', 'in_app']
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  related_id UUID, -- ID relacionado (ticket, documento, etc.)
  related_type VARCHAR(50), -- Tipo de entidad relacionada
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- 11. TABLA: notification_settings (Configuración de Notificaciones)
-- ============================================

CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  telegram_enabled BOOLEAN DEFAULT FALSE,
  telegram_chat_id VARCHAR(100),
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  whatsapp_number VARCHAR(20),
  email_enabled BOOLEAN DEFAULT TRUE,
  in_app_enabled BOOLEAN DEFAULT TRUE,
  new_ticket_alert BOOLEAN DEFAULT TRUE,
  payment_alert BOOLEAN DEFAULT TRUE,
  document_alert BOOLEAN DEFAULT TRUE,
  quality_alert BOOLEAN DEFAULT TRUE,
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para notification_settings
CREATE INDEX idx_notification_settings_user_id ON notification_settings(user_id);

-- ============================================
-- 12. TABLA: support_tickets (Tickets de Soporte)
-- ============================================

CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100), -- 'pagos', 'documentos', 'calidad', 'tecnico'
  status support_status DEFAULT 'open',
  priority priority_level DEFAULT 'medium',
  assigned_to VARCHAR(255), -- Nombre del representante de Terminel
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para support_tickets
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_number ON support_tickets(ticket_number);

-- ============================================
-- 13. TABLA: chat_messages (Mensajes de Chat)
-- ============================================

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  sender_type VARCHAR(20) NOT NULL, -- 'user' o 'staff'
  message TEXT NOT NULL,
  attachments JSONB, -- URLs de archivos adjuntos
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para chat_messages
CREATE INDEX idx_chat_messages_ticket_id ON chat_messages(ticket_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);

-- ============================================
-- 14. TABLA: insumos (Catálogo de Insumos)
-- ============================================

CREATE TABLE IF NOT EXISTS insumos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'semilla', 'fertilizante', 'protector'
  brand VARCHAR(100), -- 'Asgrow', 'Yara', 'Quimia'
  description TEXT,
  technical_sheet_url TEXT,
  application_guide_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  price DECIMAL(10, 2),
  unit VARCHAR(50), -- 'kg', 'litro', 'bolsa'
  stock_available INTEGER,
  image_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para insumos
CREATE INDEX idx_insumos_category ON insumos(category);
CREATE INDEX idx_insumos_brand ON insumos(brand);
CREATE INDEX idx_insumos_active ON insumos(active);

-- ============================================
-- 15. TABLA: market_prices (Precios de Mercado)
-- ============================================

CREATE TABLE IF NOT EXISTS market_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  commodity VARCHAR(100) NOT NULL, -- 'maíz blanco', 'garbanzo'
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  exchange VARCHAR(100), -- 'Chicago Board of Trade'
  guaranteed_price DECIMAL(10, 2), -- Precio de garantía
  price_date DATE NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para market_prices
CREATE INDEX idx_market_prices_commodity ON market_prices(commodity);
CREATE INDEX idx_market_prices_date ON market_prices(price_date DESC);

-- ============================================
-- 16. TABLA: government_support (Apoyos Gubernamentales)
-- ============================================

CREATE TABLE IF NOT EXISTS government_support (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  program_name VARCHAR(255) NOT NULL, -- 'SIGAP', 'Procampo', etc.
  application_number VARCHAR(100),
  status VARCHAR(50) NOT NULL, -- 'solicitado', 'en_revision', 'aprobado', 'pagado'
  requested_amount DECIMAL(12, 2),
  approved_amount DECIMAL(12, 2),
  paid_amount DECIMAL(12, 2),
  application_date DATE,
  approval_date DATE,
  payment_date DATE,
  required_documents TEXT[],
  missing_documents TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para government_support
CREATE INDEX idx_government_support_user_id ON government_support(user_id);
CREATE INDEX idx_government_support_status ON government_support(status);

-- ============================================
-- 17. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE scale_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE grain_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_support ENABLE ROW LEVEL SECURITY;

-- Políticas para documents
CREATE POLICY "Users can view own documents" 
  ON documents FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" 
  ON documents FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" 
  ON documents FOR UPDATE 
  USING (auth.uid() = user_id);

-- Políticas para scale_tickets
CREATE POLICY "Users can view own tickets" 
  ON scale_tickets FOR SELECT 
  USING (auth.uid() = user_id);

-- Políticas para quality_analysis (vista a través de scale_tickets)
CREATE POLICY "Users can view quality analysis" 
  ON quality_analysis FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM scale_tickets 
      WHERE scale_tickets.id = quality_analysis.ticket_id 
      AND scale_tickets.user_id = auth.uid()
    )
  );

-- Políticas para grain_inventory
CREATE POLICY "Users can view own inventory" 
  ON grain_inventory FOR SELECT 
  USING (auth.uid() = user_id);

-- Políticas para settlements
CREATE POLICY "Users can view own settlements" 
  ON settlements FOR SELECT 
  USING (auth.uid() = user_id);

-- Políticas para land_plots
CREATE POLICY "Users can view own plots" 
  ON land_plots FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own plots" 
  ON land_plots FOR ALL 
  USING (auth.uid() = user_id);

-- Políticas para bank_accounts
CREATE POLICY "Users can view own accounts" 
  ON bank_accounts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own accounts" 
  ON bank_accounts FOR ALL 
  USING (auth.uid() = user_id);

-- Políticas para notifications
CREATE POLICY "Users can view own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

-- Políticas para notification_settings
CREATE POLICY "Users can view own settings" 
  ON notification_settings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own settings" 
  ON notification_settings FOR ALL 
  USING (auth.uid() = user_id);

-- Políticas para support_tickets
CREATE POLICY "Users can view own tickets" 
  ON support_tickets FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets" 
  ON support_tickets FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Políticas para chat_messages
CREATE POLICY "Users can view ticket messages" 
  ON chat_messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM support_tickets 
      WHERE support_tickets.id = chat_messages.ticket_id 
      AND support_tickets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages" 
  ON chat_messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

-- Políticas para government_support
CREATE POLICY "Users can view own support" 
  ON government_support FOR SELECT 
  USING (auth.uid() = user_id);

-- Políticas para insumos (público, solo lectura)
CREATE POLICY "Anyone can view insumos" 
  ON insumos FOR SELECT 
  TO authenticated
  USING (active = TRUE);

-- Políticas para market_prices (público, solo lectura)
CREATE POLICY "Anyone can view market prices" 
  ON market_prices FOR SELECT 
  TO authenticated
  USING (TRUE);

-- ============================================
-- 18. TRIGGERS Y FUNCIONES
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas relevantes
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scale_tickets_updated_at BEFORE UPDATE ON scale_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quality_analysis_updated_at BEFORE UPDATE ON quality_analysis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grain_inventory_updated_at BEFORE UPDATE ON grain_inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settlements_updated_at BEFORE UPDATE ON settlements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_land_plots_updated_at BEFORE UPDATE ON land_plots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_settings_updated_at BEFORE UPDATE ON notification_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insumos_updated_at BEFORE UPDATE ON insumos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_government_support_updated_at BEFORE UPDATE ON government_support
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para crear configuración de notificaciones al crear usuario
CREATE OR REPLACE FUNCTION create_notification_settings_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notification_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear configuración de notificaciones
DROP TRIGGER IF EXISTS on_user_created_notification_settings ON auth.users;
CREATE TRIGGER on_user_created_notification_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_notification_settings_for_user();

-- Función para generar número de ticket automático
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ticket_number = 'TKT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('ticket_number_seq')::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Secuencia para números de ticket
CREATE SEQUENCE IF NOT EXISTS ticket_number_seq START 1;

-- Trigger para generar número de ticket
CREATE TRIGGER generate_support_ticket_number BEFORE INSERT ON support_tickets
  FOR EACH ROW EXECUTE FUNCTION generate_ticket_number();

-- ============================================
-- 19. STORAGE BUCKETS
-- ============================================

-- Nota: Estos buckets deben crearse manualmente en el dashboard de Supabase
-- o mediante la API de administración:

-- documents-bucket: Para documentos del productor (INE, CURP, etc.)
-- invoices-bucket: Para facturas XML/PDF
-- contracts-bucket: Para contratos de habilitación
-- chat-attachments: Para archivos adjuntos en el chat
-- technical-sheets: Para fichas técnicas de insumos

-- ============================================
-- 20. FUNCIONES AUXILIARES
-- ============================================

-- Función para calcular área de polígono
CREATE OR REPLACE FUNCTION calculate_plot_area(geom GEOMETRY)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ST_Area(ST_Transform(geom, 3857)) / 10000; -- Convertir a hectáreas
END;
$$ LANGUAGE plpgsql;

-- Función para obtener estadísticas de usuario
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_tickets', (SELECT COUNT(*) FROM scale_tickets WHERE user_id = user_uuid),
    'total_inventory_tons', (SELECT COALESCE(SUM(quantity_tons), 0) FROM grain_inventory WHERE user_id = user_uuid AND status = 'stored'),
    'pending_settlements', (SELECT COUNT(*) FROM settlements WHERE user_id = user_uuid AND status = 'pending'),
    'total_plots', (SELECT COUNT(*) FROM land_plots WHERE user_id = user_uuid AND active = TRUE),
    'unread_notifications', (SELECT COUNT(*) FROM notifications WHERE user_id = user_uuid AND read = FALSE)
  ) INTO stats;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ============================================

COMMENT ON TABLE documents IS 'Almacena todos los documentos legales y administrativos del productor';
COMMENT ON TABLE scale_tickets IS 'Registro de boletas de báscula para entrada de grano';
COMMENT ON TABLE quality_analysis IS 'Análisis de calidad del laboratorio para cada boleta';
COMMENT ON TABLE grain_inventory IS 'Inventario de granos almacenados en silos de Terminel';
COMMENT ON TABLE settlements IS 'Liquidaciones y pagos a productores';
COMMENT ON TABLE land_plots IS 'Predios georeferenciados del productor';
COMMENT ON TABLE bank_accounts IS 'Cuentas bancarias CLABE para recibir pagos';
COMMENT ON TABLE notifications IS 'Sistema de notificaciones para el productor';
COMMENT ON TABLE notification_settings IS 'Configuración de preferencias de notificaciones';
COMMENT ON TABLE support_tickets IS 'Tickets de soporte y atención al productor';
COMMENT ON TABLE chat_messages IS 'Mensajes del chat de soporte en tiempo real';
COMMENT ON TABLE insumos IS 'Catálogo de semillas, fertilizantes y protectores';
COMMENT ON TABLE market_prices IS 'Precios de mercado y precios de garantía';
COMMENT ON TABLE government_support IS 'Seguimiento de trámites de apoyos gubernamentales';

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
