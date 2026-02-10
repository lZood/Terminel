-- Tabla para Evaluaciones de Crédito Agrícola
CREATE TABLE credit_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Datos del Productor / Solicitud
    productor_nombre TEXT NOT NULL,
    cultivo TEXT NOT NULL,
    hectareas NUMERIC(10, 2) NOT NULL,
    historial_pagos TEXT, -- 'Excelente', 'Bueno', 'Regular', 'Malo'
    
    -- Factores de Riesgo (Inputs)
    riesgo_climatico TEXT, -- 'Bajo', 'Medio', 'Alto'
    riesgo_mercado TEXT, -- 'Bajo', 'Medio', 'Alto'
    
    -- Resultado de la IA
    score_crediticio INTEGER, -- 0 a 1000
    nivel_riesgo TEXT, -- 'A (Mínimo)', 'B (Bajo)', 'C (Medio)', 'D (Alto)'
    capacidad_pago_estimada NUMERIC(12, 2),
    linea_credito_sugerida NUMERIC(12, 2),
    recomendacion_ia TEXT, -- 'APROBAR', 'RECHAZAR', 'CONDICIONAR'
    analisis_detallado TEXT,
    
    -- Metadata
    procesado_por UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indices
CREATE INDEX idx_credit_evaluations_productor ON credit_evaluations(productor_nombre);
CREATE INDEX idx_credit_evaluations_score ON credit_evaluations(score_crediticio);

-- RLS
ALTER TABLE credit_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can all credit" ON credit_evaluations
    FOR ALL
    USING (auth.role() = 'authenticated');
