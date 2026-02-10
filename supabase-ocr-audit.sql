-- Eliminar tabla existente si hay conflictos
DROP TABLE IF EXISTS auditoria_boletas CASCADE;

-- Tabla para auditoría de boletas OCR
CREATE TABLE auditoria_boletas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    folio TEXT NOT NULL,
    peso_bruto_kg NUMERIC(10, 2),
    peso_tara_kg NUMERIC(10, 2),
    peso_neto_kg NUMERIC(10, 2) NOT NULL,
    producto TEXT,
    proveedor TEXT,
    fecha DATE,
    hora TIME,
    humedad NUMERIC(5, 2),
    impurezas NUMERIC(5, 2),
    
    -- Validación
    discrepancia_detectada BOOLEAN DEFAULT false,
    diferencia_kg NUMERIC(10, 2),
    porcentaje_diferencia NUMERIC(5, 2),
    peso_esperado_kg NUMERIC(10, 2),
    
    -- Metadata
    imagen_url TEXT,
    procesado_por UUID REFERENCES auth.users(id),
    modelo_ia TEXT DEFAULT 'gemini-2.0-flash-exp',
    procesado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Relación con entregas (opcional)
    entrega_id UUID,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para búsquedas rápidas
CREATE INDEX idx_auditoria_boletas_folio ON auditoria_boletas(folio);
CREATE INDEX idx_auditoria_boletas_procesado_en ON auditoria_boletas(procesado_en);
CREATE INDEX idx_auditoria_boletas_discrepancia ON auditoria_boletas(discrepancia_detectada);
CREATE INDEX idx_auditoria_boletas_created_at ON auditoria_boletas(created_at);

-- RLS Policies
ALTER TABLE auditoria_boletas ENABLE ROW LEVEL SECURITY;

-- Policy: Admins pueden ver todas las auditorías
CREATE POLICY "Admins can view all" ON auditoria_boletas
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy: Admins pueden insertar auditorías
CREATE POLICY "Admins can insert" ON auditoria_boletas
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Admins pueden actualizar
CREATE POLICY "Admins can update" ON auditoria_boletas
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Policy: Admins pueden eliminar
CREATE POLICY "Admins can delete" ON auditoria_boletas
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Function para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
CREATE TRIGGER update_auditoria_boletas_updated_at
    BEFORE UPDATE ON auditoria_boletas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios
COMMENT ON TABLE auditoria_boletas IS 'Registro de boletas procesadas con OCR y detección de discrepancias';
COMMENT ON COLUMN auditoria_boletas.folio IS 'Folio de la boleta de báscula';
COMMENT ON COLUMN auditoria_boletas.discrepancia_detectada IS 'Indica si se detectó una diferencia mayor al 1% respecto al peso esperado';
COMMENT ON COLUMN auditoria_boletas.modelo_ia IS 'Modelo de IA utilizado para el OCR';
COMMENT ON COLUMN auditoria_boletas.procesado_en IS 'Timestamp de cuando se procesó la boleta con IA';
