-- ============================================
-- SCRIPT OPCIONAL: Actualizar file_url de documentos antiguos
-- ============================================
-- Este script convierte las URLs completas a paths
-- Solo ejecutar si tienes documentos subidos ANTES del fix de signed URLs
-- ============================================

-- Ver documentos que tienen URLs completas (no paths)
SELECT id, file_name, file_url, uploaded_at
FROM documents
WHERE file_url LIKE 'http%'
ORDER BY uploaded_at DESC;

-- ============================================
-- OPCIÓN 1: Actualizar URLs de tipo "public"
-- ============================================
UPDATE documents
SET file_url = SUBSTRING(
    file_url 
    FROM '\/documents-bucket\/(.+?)(?:\?|$)'
)
WHERE file_url LIKE '%/storage/v1/object/public/documents-bucket/%';

-- ============================================
-- OPCIÓN 2: Actualizar URLs de tipo "sign" o "signed"
-- ============================================
UPDATE documents
SET file_url = SUBSTRING(
    file_url 
    FROM '\/documents-bucket\/(.+?)(?:\?|$)'
)
WHERE file_url LIKE '%/storage/v1/object/sign%/documents-bucket/%';

-- ============================================
-- OPCIÓN 3: Actualizar TODOS los documentos con URLs completas
-- (Ejecutar solo si estás seguro)
-- ============================================
UPDATE documents
SET file_url = SUBSTRING(
    file_url 
    FROM '\/documents-bucket\/(.+?)(?:\?|$)'
)
WHERE file_url LIKE 'http%';

-- ============================================
-- Verificar que se actualizaron correctamente
-- ============================================
SELECT id, file_name, file_url, uploaded_at
FROM documents
ORDER BY uploaded_at DESC
LIMIT 10;

-- ============================================
-- NOTA IMPORTANTE
-- ============================================
-- NO ES NECESARIO ejecutar este script porque el código
-- ya maneja ambos formatos (URL completa y path).
-- 
-- Solo ejecuta este script si:
-- 1. Quieres limpiar la base de datos
-- 2. Estás seguro de que todos los archivos están bien subidos
-- 3. Has hecho un backup de la tabla documents
-- ============================================
