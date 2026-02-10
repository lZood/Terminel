'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Search, Filter, CheckCircle, Clock, AlertTriangle, Upload, Eye } from 'lucide-react';

const mockEntregas = [
    {
        id: 1,
        folio: 'BSC-2026-0234',
        productor: 'José García López',
        producto: 'Maíz Blanco',
        pesoNeto: 45000,
        humedad: 14.2,
        impurezas: 1.8,
        calidad: 'Primera',
        precioKg: 5.80,
        total: 261000,
        estatus: 'pendiente',
        fecha: '2026-02-09T08:30:00',
        urlBoleta: null,
    },
    {
        id: 2,
        folio: 'BSC-2026-0235',
        productor: 'María Hernández R.',
        producto: 'Maíz Amarillo',
        pesoNeto: 38500,
        humedad: 13.8,
        impurezas: 1.5,
        calidad: 'Primera',
        precioKg: 5.50,
        total: 211750,
        estatus: 'validado',
        fecha: '2026-02-09T09:15:00',
        urlBoleta: '/docs/sample.pdf',
    },
    {
        id: 3,
        folio: 'BSC-2026-0236',
        productor: 'Carlos Ramírez S.',
        producto: 'Sorgo Forrajero',
        pesoNeto: 52000,
        humedad: 15.1,
        impurezas: 2.3,
        calidad: 'Segunda',
        precioKg: 4.50,
        total: 234000,
        estatus: 'pendiente',
        fecha: '2026-02-09T10:00:00',
        urlBoleta: null,
    },
    {
        id: 4,
        folio: 'BSC-2026-0237',
        productor: 'Ana Martínez G.',
        producto: 'Trigo Cristalino',
        pesoNeto: 28500,
        humedad: 12.5,
        impurezas: 1.2,
        calidad: 'Primera',
        precioKg: 6.20,
        total: 176700,
        estatus: 'validado',
        fecha: '2026-02-09T11:20:00',
        urlBoleta: '/docs/sample.pdf',
    },
];

export default function EntregasPage() {
    const [filtro, setFiltro] = useState('todos');

    const entrehasFiltradas =
        filtro === 'todos'
            ? mockEntregas
            : mockEntregas.filter((e) => e.estatus === filtro);

    const pendientes = mockEntregas.filter((e) => e.estatus === 'pendiente').length;
    const validadas = mockEntregas.filter((e) => e.estatus === 'validado').length;
    const totalDia = mockEntregas.reduce((acc, e) => acc + e.pesoNeto, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Validación de Entregas</h1>
                <p className="text-gray-600 mt-1">
                    Revisa y valida las recepciones de grano de la báscula
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{pendientes}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Validadas Hoy</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{validadas}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">Total Recibido</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        {(totalDia / 1000).toFixed(1)} ton
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-sm text-gray-600">Anomalías</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por folio, productor, producto..."
                            className="bg-transparent border-none outline-none w-full"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setFiltro('todos')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${filtro === 'todos'
                                    ? 'bg-[#175641] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFiltro('pendiente')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${filtro === 'pendiente'
                                    ? 'bg-[#175641] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Pendientes
                        </button>
                        <button
                            onClick={() => setFiltro('validado')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${filtro === 'validado'
                                    ? 'bg-[#175641] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Validadas
                        </button>
                    </div>
                </div>
            </div>

            {/* Deliveries Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {entrehasFiltradas.map((entrega) => (
                    <motion.div
                        key={entrega.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {entrega.folio}
                                    </h3>
                                    {entrega.estatus === 'pendiente' && (
                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                            Pendiente
                                        </span>
                                    )}
                                    {entrega.estatus === 'validado' && (
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                            Validado
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">{entrega.productor}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-green-600">
                                    ${entrega.total.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(entrega.fecha).toLocaleTimeString('es-MX', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Producto:</span>
                                <span className="font-semibold text-gray-900">
                                    {entrega.producto}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Peso Neto:</span>
                                <span className="font-semibold text-gray-900">
                                    {entrega.pesoNeto.toLocaleString()} kg
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Humedad:</span>
                                <span className="font-semibold text-gray-900">
                                    {entrega.humedad}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-sm text-gray-600">Calidad:</span>
                                <span
                                    className={`font-semibold ${entrega.calidad === 'Primera'
                                            ? 'text-green-600'
                                            : 'text-blue-600'
                                        }`}
                                >
                                    {entrega.calidad}
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600">Precio/kg:</span>
                                <span className="font-semibold text-gray-900">
                                    ${entrega.precioKg.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            {entrega.urlBoleta && (
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Ver Boleta</span>
                                </button>
                            )}
                            {!entrega.urlBoleta && (
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors">
                                    <Upload className="w-4 h-4" />
                                    <span className="text-sm font-semibold">Subir Boleta</span>
                                </button>
                            )}
                            {entrega.estatus === 'pendiente' && (
                                <button className="flex-1 px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-xl font-semibold transition-colors">
                                    Validar
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Prototype Notice */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>🚧 Prototipo:</strong> Esta vista muestra el flujo de validación. En
                    producción incluirá: OCR automático de boletas, validación contra contratos,
                    detección de anomalías por IA, y flujo completo de aprobación/rechazo.
                </p>
            </div>
        </div>
    );
}
