import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { productor, cultivo, hectareas, historial, riesgo_climatico, riesgo_mercado } = await request.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `Actúa como un **Analista Senior de Riesgo Crediticio Agrícola**. Evalúa la siguiente solicitud de crédito para un productor agrícola en México.

        **Datos del Productor:**
        - Nombre: ${productor}
        - Cultivo Proyectado: ${cultivo}
        - Superficie: ${hectareas} hectáreas
        - Historial Crediticio Interno: ${historial} (Basado en entregas pasadas y puntualidad)
        
        **Factores Externos:**
        - Riesgo Climático Actual (Zona/Cultivo): ${riesgo_climatico}
        - Riesgo de Mercado (Precios): ${riesgo_mercado}

        **TAREA:**
        Genera un análisis de riesgo detallado y una recomendación de crédito.

        Responde ESTRICTAMENTE en formato JSON con la siguiente estructura:
        {
            "score_crediticio": (número entre 300 y 850),
            "nivel_riesgo": "A (Mínimo)", "B (Bajo)", "C (Medio)", "D (Alto)" o "E (Crítico)",
            "capacidad_pago_estimada": (número estimado en MXN considerando rendimiento promedio de la zona por hectárea),
            "linea_credito_sugerida": (número en MXN, debe ser conservador, aprox 60-70% de la capacidad de pago),
            "recomendacion": "APROBAR", "RECHAZAR" o "CONDICIONAR",
            "analisis_detallado": "Breve párrafo explicando las razones principales (máx 50 palabras).",
            "factores_clave": ["factor positivo 1", "factor negativo 1", "factor riesgo 1"]
        }
        
        REGLAS DE NEGOCIO:
        1. Si el historial es 'Malo', el score debe ser menor a 550 y la recomendación RECHAZAR.
        2. Si el riesgo climático es 'Alto', penaliza el score en 50-100 puntos y reduce la línea de crédito.
        3. Considera rendimientos promedio de la zona (ej: Trigo 6-7 ton/ha, Maíz 10-12 ton/ha).
        4. Sé conservador en la estimación financiera.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanJson = responseText.replace(/```json|```/g, '').trim();
        const data = JSON.parse(cleanJson);

        return NextResponse.json({ success: true, analysis: data });

    } catch (error: any) {
        console.error('Error en AI Scoring:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
