'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Truck,
    DollarSign,
    Package,
    AlertCircle,
    CheckCircle,
    Clock,
    BarChart3,
    FileText
} from 'lucide-react';

// Sample data for prototype
const mockData = {
    kpis: {
        entregasHoy: 12,
        entregasHoyChange: 8.2,
        tonelajasHoy: 156.5,
        tonelajasChange: -3.1,
        liquidacionesPendientes: 8,
        liquidacionesAmount: 1245600,
        productoresActivos: 247,
        productoresChange: 2.4,
    },
    recentDeliveries: [
        {
            id: 1,
            productor: 'José García López',
            producto: 'Maíz Blanco',
            cantidad: 45000,
            folio: 'BSC-2026-0234',
            calidad: 'Primera',
            estatus: 'pendiente',
            fecha: '2026-02-09T08:30:00',
        },
        {
            id: 2,
            productor: 'María Hernández R.',
            producto: 'Maíz Amarillo',
            cantidad: 38500,
            folio: 'BSC-2026-0235',
            calidad: 'Primera',
            estatus: 'validado',
            fecha: '2026-02-09T09:15:00',
        },
        {
            id: 3,
            productor: 'Carlos Ramírez S.',
            producto: 'Sorgo Forrajero',
            cantidad: 52000,
            folio: 'BSC-2026-0236',
            calidad: 'Segunda',
            estatus: 'pendiente',
            fecha: '2026-02-09T10:00:00',
        },
    ],
    topProductores: [
        { nombre: 'José García López', volumen: 342500, entregas: 8 },
        { nombre: 'María Hernández R.', volumen: 298000, entregas: 7 },
        { nombre: 'Carlos Ramírez S.', volumen: 276500, entregas: 6 },
        { nombre: 'Ana Martínez G.', volumen: 245000, entregas: 5 },
        { nombre: 'Luis Rodríguez P.', volumen: 198000, entregas: 4 },
    ],
    alertas: [
        {
            id: 1,
            tipo: 'warning',
            titulo: 'Entregas pendientes de validación',
            mensaje: '5 entregas llevan más de 24 horas sin validar',
            tiempo: 'hace 2 horas',
        },
        {
            id: 2,
            tipo: 'error',
            titulo: 'Liquidación vencida',
            mensaje: 'Liquidación #1234 para José García L. venció ayer',
            tiempo: 'hace 1 día',
        },
        {
            id: 3,
            tipo: 'info',
            titulo: 'Actualización de precios',
            mensaje: 'Nuevos precios de maíz aplicarán desde mañana',
            tiempo: 'hace 3 horas',
        },
    ],
    chartData: [
        { mes: 'Ago', toneladas: 1800 },
        { mes: 'Sept', toneladas: 4200 }, // Inicio cosecha
        { mes: 'Oct', toneladas: 8500 },  // Pico alto
        { mes: 'Nov', toneladas: 6100 },
        { mes: 'Dic', toneladas: 7400 },  // Otro pico
        { mes: 'Ene', toneladas: 3200 },
        { mes: 'Feb', toneladas: 1500 },  // Baja
    ],
};

export default function AdminDashboard() {
    const maxToneladas = Math.max(...mockData.chartData.map((d) => d.toneladas));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Panel Administrativo
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Vista general de operaciones - Ciclo Otoño-Invierno 2025-2026
                    </p>
                </div>
                <div className="text-sm text-gray-500">
                    Última actualización: {new Date().toLocaleTimeString('es-MX')}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Entregas Hoy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Truck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div
                            className={`flex items-center gap-1 text-sm font-semibold ${mockData.kpis.entregasHoyChange > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                                }`}
                        >
                            {mockData.kpis.entregasHoyChange > 0 ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            {Math.abs(mockData.kpis.entregasHoyChange)}%
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Entregas Hoy</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {mockData.kpis.entregasHoy}
                    </p>
                </motion.div>

                {/* Toneladas Recibidas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div
                            className={`flex items-center gap-1 text-sm font-semibold ${mockData.kpis.tonelajasChange > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                                }`}
                        >
                            {mockData.kpis.tonelajasChange > 0 ? (
                                <TrendingUp className="w-4 h-4" />
                            ) : (
                                <TrendingDown className="w-4 h-4" />
                            )}
                            {Math.abs(mockData.kpis.tonelajasChange)}%
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Toneladas Hoy</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {mockData.kpis.tonelajasHoy.toLocaleString()}
                    </p>
                </motion.div>

                {/* Liquidaciones Pendientes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="text-sm font-semibold text-amber-600">
                            {mockData.kpis.liquidacionesPendientes} pendientes
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Por Liquidar</p>
                    <p className="text-3xl font-bold text-gray-900">
                        ${(mockData.kpis.liquidacionesAmount / 1000).toFixed(0)}K
                    </p>
                </motion.div>

                {/* Productores Activos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                            <TrendingUp className="w-4 h-4" />
                            {mockData.kpis.productoresChange}%
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Productores Activos</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {mockData.kpis.productoresActivos}
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart - Entregas Mensuales */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Recepciones Mensuales
                            </h2>
                            <p className="text-sm text-gray-600">Toneladas recibidas por mes</p>
                        </div>
                        <BarChart3 className="w-6 h-6 text-gray-400" />
                    </div>

                    {/* Bar Chart */}
                    <div className="h-64 flex items-end justify-around gap-3">
                        {mockData.chartData.map((data, index) => {
                            const heightPercentage = (data.toneladas / maxToneladas) * 100;
                            const minHeight = data.toneladas > 0 ? Math.max(heightPercentage, 5) : 0;

                            return (
                                <div
                                    key={data.mes}
                                    className="h-full flex-1 flex flex-col items-center justify-end gap-2 group"
                                >
                                    {/* Bar Container */}
                                    <div className="w-full flex-1 flex items-end justify-center relative">
                                        {/* Tooltip */}
                                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10 pointer-events-none">
                                            {data.toneladas.toLocaleString()} ton
                                        </div>

                                        {/* The Bar */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${minHeight}%` }}
                                            transition={{ delay: index * 0.1, duration: 0.8, type: 'spring' }}
                                            className="w-full max-w-[40px] bg-gradient-to-t from-[#175641] to-[#2ecc71] rounded-t-md group-hover:from-[#1a6b4f] group-hover:to-[#27ae60] cursor-pointer shadow-md opacity-90 hover:opacity-100"
                                        />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        {data.mes}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Productores */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Top Productores</h2>
                        <p className="text-sm text-gray-600">Por volumen este mes</p>
                    </div>

                    <div className="space-y-4">
                        {mockData.topProductores.map((productor, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#175641] to-[#1a6b4f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {productor.nombre}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(productor.volumen / 1000).toFixed(1)} ton • {productor.entregas}{' '}
                                        entregas
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Deliveries */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">
                            Entregas Recientes
                        </h2>
                        <p className="text-sm text-gray-600">Últimas recepciones del día</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {mockData.recentDeliveries.map((delivery) => (
                            <div key={delivery.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {delivery.productor}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {delivery.producto} • {delivery.folio}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${delivery.estatus === 'validado'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {delivery.estatus === 'validado' ? 'Validado' : 'Pendiente'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>{(delivery.cantidad / 1000).toFixed(1)} ton</span>
                                    <span>•</span>
                                    <span>{delivery.calidad}</span>
                                    <span>•</span>
                                    <span>
                                        {new Date(delivery.fecha).toLocaleTimeString('es-MX', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Alertas del Sistema</h2>
                        <p className="text-sm text-gray-600">Requieren atención</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {mockData.alertas.map((alerta) => (
                            <div key={alerta.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`mt-1 ${alerta.tipo === 'error'
                                            ? 'text-red-500'
                                            : alerta.tipo === 'warning'
                                                ? 'text-amber-500'
                                                : 'text-blue-500'
                                            }`}
                                    >
                                        {alerta.tipo === 'error' ? (
                                            <AlertCircle className="w-5 h-5" />
                                        ) : alerta.tipo === 'warning' ? (
                                            <Clock className="w-5 h-5" />
                                        ) : (
                                            <FileText className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            {alerta.titulo}
                                        </p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {alerta.mensaje}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">{alerta.tiempo}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
