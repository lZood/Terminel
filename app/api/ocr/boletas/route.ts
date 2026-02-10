import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const pesoEsperado = formData.get('pesoEsperado') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'No se proporcionó ningún archivo' },
                { status: 400 }
            );
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');

        // Get file mime type
        const mimeType = file.type;

        // Initialize Gemini model - Using stable 1.5 Flash model
        // gemini-2.0-flash-exp is not yet fully available in this region/API version
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Prompt for OCR extraction
        // Removing the confusing markdown instructions that caused syntax errors
        const prompt = `Analiza esta imagen de una boleta de báscula agrícola y extrae los siguientes datos estrictamente en formato JSON:

{
  "folio": "CÓDIGO DE LA BOLETA (ej: BSC-2026-0234)",
  "peso_bruto_kg": número en kilogramos,
  "peso_tara_kg": número en kilogramos,
  "peso_neto_kg": número en kilogramos,
  "producto": "nombre del producto/grano",
  "fecha": "fecha en formato YYYY-MM-DD",
  "hora": "hora en formato HH:MM",
  "proveedor": "nombre del productor/proveedor",
  "humedad": número (porcentaje, puede ser null),
  "impurezas": número (porcentaje, puede ser null)
}

REGLAS IMPORTANTES:
1. Si el peso está en toneladas (t), multiplica por 1000 para convertir a kg.
2. Si no encuentras un campo, usa null.
3. Responde ÚNICAMENTE con el objeto JSON válido.
4. NO uses bloques de código markdown.
5. Todos los pesos deben ser números puros sin unidades.`;

        // Generate content
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType,
                    data: base64,
                },
            },
            prompt,
        ]);

        const response = result.response;
        const text = response.text();

        // Clean markdown if present (just in case model ignores instruction)
        const cleanJson = text.replace(/```json|```/g, '').trim();

        // Parse JSON
        let extractedData;
        try {
            extractedData = JSON.parse(cleanJson);
        } catch (parseError) {
            console.error('Error parsing Gemini response:', text);
            return NextResponse.json(
                { error: 'Error al parsear la respuesta de Gemini', rawResponse: text },
                { status: 500 }
            );
        }

        // Validate extracted data
        if (!extractedData.peso_neto_kg) {
            return NextResponse.json(
                { error: 'No se pudo extraer el peso neto de la boleta' },
                { status: 400 }
            );
        }

        // Detect discrepancies if expected weight is provided
        let discrepancia = false;
        let diferencia_kg = 0;
        let porcentaje_diferencia = 0;

        if (pesoEsperado) {
            const pesoSistema = parseFloat(pesoEsperado);
            const pesoIA = extractedData.peso_neto_kg;

            diferencia_kg = pesoIA - pesoSistema;
            porcentaje_diferencia = (Math.abs(diferencia_kg) / pesoSistema) * 100;

            // 1% tolerance threshold
            const umbral_tolerancia = pesoSistema * 0.01;
            discrepancia = Math.abs(diferencia_kg) > umbral_tolerancia;
        }

        // Return processed data
        return NextResponse.json({
            success: true,
            data: {
                ...extractedData,
                validacion: {
                    discrepancia,
                    diferencia_kg: Math.round(diferencia_kg * 100) / 100,
                    porcentaje_diferencia: Math.round(porcentaje_diferencia * 100) / 100,
                    peso_esperado: pesoEsperado ? parseFloat(pesoEsperado) : null,
                },
                metadata: {
                    procesado_en: new Date().toISOString(),
                    modelo: 'gemini-2.0-flash-exp',
                },
            },
        });
    } catch (error: any) {
        console.error('Error en OCR:', error);
        return NextResponse.json(
            { error: 'Error al procesar la imagen', details: error.message },
            { status: 500 }
        );
    }
}
