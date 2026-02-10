-- ============================================
-- CONFIGURACIÓN DE STORAGE BUCKETS EN SUPABASE
-- ============================================
-- Ejecuta este script en el SQL Editor de Supabase
-- o configura los buckets manualmente en el Dashboard
-- ============================================

-- NOTA: Los buckets se crean desde el Dashboard de Supabase
-- en Storage > Create Bucket, pero aquí hay las políticas

-- ============================================
-- Bucket: documents-bucket
-- Para: INE, CURP, RFC, Comprobantes de Domicilio
-- ============================================

-- Política para subir documentos
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

-- Política para ver documentos propios
CREATE POLICY "Users can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

-- Política para actualizar documentos propios
CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

-- Política para eliminar documentos propios
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

-- ============================================
-- Bucket: invoices-bucket
-- Para: Facturas XML/PDF (ventas y compras)
-- ============================================

CREATE POLICY "Users can upload own invoices"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'invoices-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

CREATE POLICY "Users can view own invoices"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'invoices-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

CREATE POLICY "Users can delete own invoices"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'invoices-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

-- ============================================
-- Bucket: contracts-bucket
-- Para: Contratos de Habilitación
-- ============================================

CREATE POLICY "Users can view own contracts"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'contracts-bucket' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

-- ============================================
-- Bucket: chat-attachments
-- Para: Archivos adjuntos en el chat de soporte
-- ============================================

CREATE POLICY "Users can upload chat attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'chat-attachments' AND
  (storage.foldername(name))[1] = auth.uid()::TEXT
);

CREATE POLICY "Users can view chat attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'chat-attachments'
);

-- ============================================
-- Bucket: technical-sheets
-- Para: Fichas técnicas de insumos (público)
-- ============================================

CREATE POLICY "Anyone can view technical sheets"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'technical-sheets'
);

-- ============================================
-- INSTRUCCIONES PARA CREAR LOS BUCKETS
-- ============================================

/*
Ve a Storage en tu Dashboard de Supabase y crea los siguientes buckets:

1. documents-bucket
   - Public: NO
   - Mime types permitidos: application/pdf, image/jpeg, image/png
   - Max file size: 10 MB

2. invoices-bucket
   - Public: NO
   - Mime types permitidos: application/pdf, application/xml, text/xml
   - Max file size: 5 MB

3. contracts-bucket
   - Public: NO
   - Mime types permitidos: application/pdf
   - Max file size: 10 MB

4. chat-attachments
   - Public: NO
   - Mime types permitidos: application/pdf, image/jpeg, image/png, application/zip
   - Max file size: 20 MB

5. technical-sheets
   - Public: SI (para que puedan descargarse sin autenticación)
   - Mime types permitidos: application/pdf
   - Max file size: 5 MB

Después de crear cada bucket, copia y pega las políticas correspondientes
en el SQL Editor.
*/
