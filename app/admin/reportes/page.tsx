'use client';

import { BarChart3, Download, Calendar } from 'lucide-react';

export default function ReportesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Reportes y Analytics</h1>
                <p className="text-gray-600 mt-1">
                    Business Intelligence para decisiones estratégicas
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <BarChart3 className="w-6 h-6 text-[#175641]" />
                        <h3 className="text-lg font-bold text-gray-900">
                            Volumen por Producto
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Análisis de recepciones por tipo de grano
                    </p>
                    <button className="w-full px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Generar Reporte
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-[#175641]" />
                        <h3 className="text-lg font-bold text-gray-900">
                            Desempeño de Productores
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Ranking y estadísticas por agricultor
                    </p>
                    <button className="w-full px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Generar Reporte
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <BarChart3 className="w-6 h-6 text-[#175641]" />
                        <h3 className="text-lg font-bold text-gray-900">
                            Calidad de Grano
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Análisis de calidad y mermas
                    </p>
                    <button className="w-full px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Generar Reporte
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-[#175641]" />
                        <h3 className="text-lg font-bold text-gray-900">
                            Proyección de Pagos
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Forecast de liquidaciones futuras
                    </p>
                    <button className="w-full px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Generar Reporte
                    </button>
                </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>🚧 Prototipo:</strong> La versión completa incluirá constructor de
                    reportes personalizados, dashboards interactivos, y export a Excel/PDF.
                </p>
            </div>
        </div>
    );
}
