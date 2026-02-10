'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Wheat, Sprout, Search, Filter, TrendingUp, Calendar, Weight } from 'lucide-react';
import { authHelpers } from '@/lib/supabase';

export default function ProductsPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<'all' | 'maiz' | 'trigo' | 'sorgo'>('all');

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

    // Sample sales/deliveries data - Realistic for Sinaloa farmers
    // Average farmer with 25 hectares producing 13.5 ton/ha = ~337.5 tons per cycle
    const products = [
        {
            id: 1,
            name: 'Maíz Blanco',
            type: 'maiz',
            purchaseDate: '2026-02-08',
            quantity: 45000, // 45 toneladas
            unit: 'kg',
            quality: 'Primera',
            pricePerKg: 5.80,
            total: 261000, // 45,000 kg * $5.80
            status: 'Entregado',
        },
        {
            id: 2,
            name: 'Maíz Amarillo',
            type: 'maiz',
            purchaseDate: '2026-01-28',
            quantity: 38000, // 38 toneladas
            unit: 'kg',
            quality: 'Primera',
            pricePerKg: 5.50,
            total: 209000, // 38,000 kg * $5.50
            status: 'Entregado',
        },
        {
            id: 3,
            name: 'Trigo Cristalino',
            type: 'trigo',
            purchaseDate: '2026-01-15',
            quantity: 28500, // 28.5 toneladas
            unit: 'kg',
            quality: 'Primera',
            pricePerKg: 6.20,
            total: 176700, // 28,500 kg * $6.20
            status: 'En revisión',
        },
        {
            id: 4,
            name: 'Sorgo Forrajero',
            type: 'sorgo',
            purchaseDate: '2026-01-10',
            quantity: 52000, // 52 toneladas
            unit: 'kg',
            quality: 'Segunda',
            pricePerKg: 4.80,
            total: 249600, // 52,000 kg * $4.80
            status: 'Entregado',
        },
        {
            id: 5,
            name: 'Maíz Blanco',
            type: 'maiz',
            purchaseDate: '2025-12-20',
            quantity: 62000, // 62 toneladas
            unit: 'kg',
            quality: 'Primera',
            pricePerKg: 5.75,
            total: 356500, // 62,000 kg * $5.75
            status: 'Entregado',
        },
    ];


    const filteredProducts = products.filter(product => {
        const matchesType = selectedType === 'all' || product.type === selectedType;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

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
                                <span className="text-xs text-gray-600">Ventas</span>
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
                        <h1 className="text-4xl font-bold text-[#175641] mb-2">Mis Ventas</h1>
                        <p className="text-gray-600 text-lg">Historial de entregas realizadas a Terminel</p>
                    </div>

                    {/* Draft Badge */}
                    <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <p className="text-sm font-semibold text-amber-800">
                            🚧 Borrador - Este módulo está en desarrollo. Los datos mostrados son de ejemplo.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Package className="w-5 h-5 text-orange-600" />
                                <p className="text-sm text-gray-600">Total Entregas</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Weight className="w-5 h-5 text-orange-600" />
                                <p className="text-sm text-gray-600">Total Vendido</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {(products.reduce((acc, p) => acc + p.quantity, 0) / 1000).toFixed(1)}t
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <p className="text-sm text-gray-600">Ingresos Totales</p>
                            </div>
                            <p className="text-2xl font-bold text-green-600">
                                ${(products.reduce((acc, p) => acc + p.total, 0) / 1000).toFixed(0)}K
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <p className="text-sm text-gray-600">En Revisión</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {products.filter(p => p.status === 'En revisión').length}
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="flex gap-2">
                                {[
                                    { value: 'all', label: 'Todos', icon: Filter },
                                    { value: 'maiz', label: 'Maíz', icon: Wheat },
                                    { value: 'trigo', label: 'Trigo', icon: Wheat },
                                    { value: 'sorgo', label: 'Sorgo', icon: Sprout },
                                ].map((filter) => {
                                    const Icon = filter.icon;
                                    return (
                                        <button
                                            key={filter.value}
                                            onClick={() => setSelectedType(filter.value as any)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${selectedType === filter.value
                                                ? 'bg-[#175641] text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{filter.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                            <Package className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-600">{product.quality}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'Entregado'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Fecha de Venta:</span>
                                        <span className="font-semibold text-gray-900">
                                            {new Date(product.purchaseDate).toLocaleDateString('es-MX')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Cantidad:</span>
                                        <span className="font-semibold text-gray-900">
                                            {product.quantity.toLocaleString()} {product.unit}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Calidad:</span>
                                        <span className="font-semibold text-gray-900">{product.quality}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">Precio/kg:</span>
                                        <span className="font-semibold text-gray-900">
                                            ${product.pricePerKg.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 bg-green-50 rounded-lg px-3 mt-3">
                                        <span className="text-sm font-semibold text-gray-700">Total:</span>
                                        <span className="text-xl font-bold text-green-600">
                                            ${product.total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">No se encontraron productos</p>
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}

