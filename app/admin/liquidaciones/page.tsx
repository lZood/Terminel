'use client';

import { DollarSign, Search, Calendar, CheckCircle, Clock } from 'lucide-react';

const mockLiquidaciones = [
    {
        id: 1,
        folio: 'LIQ-2026-0012',
        productor: 'José García López',
        periodo: '01-Feb a 08-Feb 2026',
        entregas: 3,
        totalKilos: 135000,
        totalPagar: 783000,
        estatus: 'pendiente',
        fechaCreacion: '2026-02-09',
    },
    {
        id: 2,
        folio: 'LIQ-2026-0011',
        productor: 'María Hernández R.',
        periodo: '28-Ene a 05-Feb 2026',
        entregas: 2,
        totalKilos: 77000,
        totalPagar: 423500,
        estatus: 'aprobado',
        fechaCreacion: '2026-02-06',
        fechaPago: '2026-02-08',
    },
];

export default function LiquidacionesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Liquidaciones</h1>
                <p className="text-gray-600 mt-1">
                    Gestiona los pagos a productores
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                    <p className="text-sm text-gray-600 mt-1">$1,245,600 MXN</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Pagadas (este mes)</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                    <p className="text-sm text-gray-600 mt-1">$4,567,800 MXN</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">Total Ciclo</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">$18.2M</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 space-y-4">
                {mockLiquidaciones.map((liq) => (
                    <div
                        key={liq.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{liq.folio}</h3>
                                <p className="text-sm text-gray-600">{liq.productor}</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${liq.estatus === 'aprobado'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {liq.estatus === 'aprobado' ? 'Aprobado' : 'Pendiente'}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-gray-500">Período</p>
                                <p className="text-sm font-semibold text-gray-900">{liq.periodo}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Entregas</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {liq.entregas}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total Kilos</p>
                                <p className="text-sm font-semibold text-gray-900">
                                    {liq.totalKilos.toLocaleString()} kg
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Total a Pagar</p>
                                <p className="text-lg font-bold text-green-600">
                                    ${liq.totalPagar.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-colors">
                                Ver Detalles
                            </button>
                            {liq.estatus === 'pendiente' && (
                                <button className="px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg text-sm font-semibold transition-colors">
                                    Aprobar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>🚧 Prototipo:</strong> Aquí se gestionarán liquidaciones automáticas,
                    cruce con contratos, generación de órdenes de pago y tracking completo.
                </p>
            </div>
        </div>
    );
}
