'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, DollarSign, Calendar, Download, FileText, Package } from 'lucide-react';
import { authHelpers } from '@/lib/supabase';

export default function ReportsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { user: currentUser, error } = await authHelpers.getCurrentUser();

        if (error || !currentUser) {
            router.push('/login');
            return;
        }

        setUser(currentUser);
        setIsLoading(false);
    };

    // Sample payment history data - Matching realistic Sinaloa production
    // Quantities aligned with products/sales page
    const paymentHistory = [
        {
            id: 1,
            date: '2026-02-08',
            product: 'Maíz Blanco',
            quantity: 45000, // 45 toneladas
            pricePerKg: 5.80,
            total: 261000,
            status: 'Pagado',
        },
        {
            id: 2,
            date: '2026-01-28',
            product: 'Maíz Amarillo',
            quantity: 38000, // 38 toneladas
            pricePerKg: 5.50,
            total: 209000,
            status: 'Pagado',
        },
        {
            id: 3,
            date: '2026-01-15',
            product: 'Trigo Cristalino',
            quantity: 28500, // 28.5 toneladas
            pricePerKg: 6.20,
            total: 176700,
            status: 'Pendiente',
        },
        {
            id: 4,
            date: '2026-01-10',
            product: 'Sorgo Forrajero',
            quantity: 52000, // 52 toneladas
            pricePerKg: 4.80,
            total: 249600,
            status: 'Pagado',
        },
        {
            id: 5,
            date: '2025-12-20',
            product: 'Maíz Blanco',
            quantity: 62000, // 62 toneladas
            pricePerKg: 5.75,
            total: 356500,
            status: 'Pagado',
        },
    ];


    const totalPaid = paymentHistory
        .filter(p => p.status === 'Pagado')
        .reduce((acc, p) => acc + p.total, 0);

    const totalPending = paymentHistory
        .filter(p => p.status === 'Pendiente')
        .reduce((acc, p) => acc + p.total, 0);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#175641] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/images/logoTerminel.PNG"
                                    alt="Grupo Terminel Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-lg leading-none tracking-tighter text-[#175641]">
                                    TERMINEL
                                </span>
                                <span className="text-xs text-gray-600">Reportes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-custom py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Back Button & Header */}
                    <div className="mb-8">
                        <Link
                            href="/portal/dashboard"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#175641] transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Volver al Dashboard</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-[#175641] mb-2">Reportes y Análisis</h1>
                        <p className="text-gray-600 text-lg">Estadísticas y análisis de tu actividad agrícola</p>
                    </div>

                    {/* Draft Badge */}
                    <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-semibold text-amber-800">
                            🚧 Borrador - Este módulo está en desarrollo. Los datos mostrados son de ejemplo.
                        </p>
                    </div>

                    {/* Period Filter */}
                    <div className="flex gap-2 mb-8">
                        {[
                            { value: 'month', label: 'Este Mes' },
                            { value: 'quarter', label: 'Trimestre' },
                            { value: 'year', label: 'Año' },
                        ].map((period) => (
                            <button
                                key={period.value}
                                onClick={() => setSelectedPeriod(period.value as any)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${selectedPeriod === period.value
                                    ? 'bg-[#175641] text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                            >
                                {period.label}
                            </button>
                        ))}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Pagado</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${totalPaid.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Pendiente</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${totalPending.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total Entregas</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {paymentHistory.reduce((acc, p) => acc + p.quantity, 0).toLocaleString()} kg
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Transacciones</p>
                                    <p className="text-2xl font-bold text-gray-900">{paymentHistory.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart with Real Data */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Liquidaciones por Mes</h2>
                                <p className="text-gray-600">Historial de pagos recibidos</p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-semibold">Exportar</span>
                            </button>
                        </div>

                        {/* Bar chart with actual payment data */}
                        <div className="h-80 flex items-end justify-around gap-4 px-4">
                            {(() => {
                                // Group payments by month
                                const monthlyData = [
                                    { month: 'Dic', total: 356500, label: 'Dic 2025' },
                                    { month: 'Ene', total: 426300, label: 'Ene 2026' }, // Trigo + Sorgo
                                    { month: 'Feb', total: 470000, label: 'Feb 2026' }, // Maíz blanco + amarillo
                                ];

                                const maxTotal = Math.max(...monthlyData.map(d => d.total));

                                return monthlyData.map((data) => {
                                    const heightPercentage = (data.total / maxTotal) * 100;
                                    return (
                                        <div key={data.month} className="flex-1 flex flex-col items-center gap-3 group">
                                            <div className="w-full flex flex-col items-center gap-1">
                                                {/* Amount label on hover */}
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-2">
                                                    <span className="text-sm font-bold text-green-600">
                                                        ${(data.total / 1000).toFixed(0)}K
                                                    </span>
                                                </div>
                                                {/* Bar */}
                                                <div
                                                    className="w-full bg-gradient-to-t from-[#175641] to-[#1a6b4f] rounded-t-lg transition-all duration-500 hover:opacity-90 cursor-pointer relative"
                                                    style={{ height: `${heightPercentage}%`, minHeight: '40px' }}
                                                >
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                                        <div className="text-xs font-semibold">{data.label}</div>
                                                        <div className="text-sm">${data.total.toLocaleString()}</div>
                                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 font-medium">{data.month}</p>
                                        </div>
                                    );
                                });
                            })()}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gradient-to-t from-[#175641] to-[#1a6b4f] rounded"></div>
                                <span className="text-sm text-gray-600">Pagos realizados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Hover para ver detalles</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment History Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Historial de Liquidaciones</h2>
                                    <p className="text-gray-600">Ultimas transacciones registradas</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-xl transition-colors">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Ver Detalle</span>
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Fecha
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Producto
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Cantidad
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Precio/kg
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paymentHistory.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(payment.date).toLocaleDateString('es-MX', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-semibold text-gray-900">{payment.product}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {payment.quantity.toLocaleString()} kg
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${payment.pricePerKg.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-bold text-green-600">
                                                    ${payment.total.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status === 'Pagado'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                        }`}
                                                >
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

