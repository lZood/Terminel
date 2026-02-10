-- Habilitar eliminación para usuarios autenticados
CREATE POLICY "Admins can delete" ON auditoria_boletas
    FOR DELETE
    USING (auth.role() = 'authenticated');
