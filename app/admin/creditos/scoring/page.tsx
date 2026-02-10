'use client';

import { useState } from 'react';
import { ArrowLeft, Scale, CloudRain, Briefcase, Zap, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function CreditScoringPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [formData, setFormData] = useState({
        productor: 'Agricola San Miguel S.P.R',
        cultivo: 'Trigo Cristalino',
        hectareas: 120,
        historial: 'Bueno', // Excelente, Bueno, Regular, Malo
        riesgo_climatico: 'Medio', // Bajo, Medio, Alto
        riesgo_mercado: 'Bajo', // Bajo, Medio, Alto
    });

    const handleEvaluate = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch('/api/ai/credit-scoring', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.analysis);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/entregas" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        Scoring Crediticio IA
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Evaluación de riesgo en tiempo real potenciada por Gemini 2.0
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulario de Solicitud */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            Datos del Productor
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Productor</label>
                                <input
                                    type="text"
                                    value={formData.productor}
                                    onChange={(e) => setFormData({ ...formData, productor: e.target.value })}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cultivo</label>
                                    <input
                                        type="text"
                                        value={formData.cultivo}
                                        onChange={(e) => setFormData({ ...formData, cultivo: e.target.value })}
                                        className="w-full border-gray-300 rounded-lg shadow-sm p-2 text-sm border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hectáreas</label>
                                    <input
                                        type="number"
                                        value={formData.hectareas}
                                        onChange={(e) => setFormData({ ...formData, hectareas: Number(e.target.value) })}
                                        className="w-full border-gray-300 rounded-lg shadow-sm p-2 text-sm border"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Historial Interno</label>
                                <select
                                    className="w-full border-gray-300 rounded-lg shadow-sm p-2 text-sm border"
                                    value={formData.historial}
                                    onChange={(e) => setFormData({ ...formData, historial: e.target.value })}
                                >
                                    <option value="Excelente">Excelente (Pago Puntual)</option>
                                    <option value="Bueno">Bueno (Pagos regulares)</option>
                                    <option value="Regular">Regular (Atrasos menores)</option>
                                    <option value="Malo">Malo (Incumplimientos)</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <CloudRain className="w-4 h-4 text-gray-500" /> Factores de Riesgo
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500 block mb-1">Riesgo Climático</label>
                                        <select
                                            className="w-full text-sm border-gray-300 rounded-lg p-1.5 border"
                                            value={formData.riesgo_climatico}
                                            onChange={(e) => setFormData({ ...formData, riesgo_climatico: e.target.value })}
                                        >
                                            <option value="Bajo">Bajo</option>
                                            <option value="Medio">Medio</option>
                                            <option value="Alto">Alto</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 block mb-1">Riesgo Mercado</label>
                                        <select
                                            className="w-full text-sm border-gray-300 rounded-lg p-1.5 border"
                                            value={formData.riesgo_mercado}
                                            onChange={(e) => setFormData({ ...formData, riesgo_mercado: e.target.value })}
                                        >
                                            <option value="Bajo">Bajo</option>
                                            <option value="Medio">Medio</option>
                                            <option value="Alto">Alto</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleEvaluate}
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? 'Analizando con IA...' : 'Generar Evaluación de Riesgo'}
                                {!loading && <Zap className="w-4 h-4 fill-white" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Resultados del Scoring */}
                <div className="lg:col-span-2">
                    {result ? (
                        <div className="space-y-6">
                            {/* Score Card Principal */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-gray-900 px-8 py-6 text-white flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold">Score Crediticio</h2>
                                        <p className="opacity-80 text-sm">Basado en análisis multifactorial Gemini 2.0</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-5xl font-black tracking-tight">{result.score_crediticio}</div>
                                        <div className="text-xs uppercase tracking-wider font-semibold opacity-70">Puntos (300-850)</div>
                                    </div>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 font-medium">Recomendación</p>
                                        <div className={`text-xl font-bold px-3 py-1 rounded-lg inline-block ${result.recomendacion === 'APROBAR' ? 'bg-green-100 text-green-700' :
                                                result.recomendacion === 'RECHAZAR' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {result.recomendacion}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 font-medium">Línea Sugerida</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(result.linea_credito_sugerida)}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500 font-medium">Nivel de Riesgo</p>
                                        <p className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                            {result.nivel_riesgo}
                                            <span className={`w-3 h-3 rounded-full ${result.nivel_riesgo.includes('A') || result.nivel_riesgo.includes('B') ? 'bg-green-500' :
                                                    result.nivel_riesgo.includes('C') ? 'bg-amber-500' : 'bg-red-500'
                                                }`} />
                                        </p>
                                    </div>
                                </div>

                                <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                                    <h3 className="font-semibold text-gray-900 mb-2">Análisis Detallado</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {result.analisis_detallado}
                                    </p>
                                </div>
                            </div>

                            {/* Factores Clave */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-[#175641]" />
                                        Factores Clave
                                    </h3>
                                    <ul className="space-y-3">
                                        {result.factores_clave?.map((factor: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#175641] mt-2 flex-shrink-0" />
                                                {factor}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-blue-600" />
                                        Capacidad Estimada
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Ingresos Brutos Estimados</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(result.capacidad_pago_estimada)}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Basado en rendimiento zonal promedio</p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600">
                                            <p>⚠️ Esta estimación es preliminar y se basa en datos históricos y proyecciones de mercado. Se recomienda validar con garantías físicas.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 min-h-[400px]">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                <Scale className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Esperando Datos</h3>
                            <p className="text-gray-500 max-w-sm mt-2">
                                Completa el formulario de la izquierda para generar un perfil de riesgo crediticio potenciado por IA.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
