'use client';

import { motion } from 'framer-motion';
import { Users, Search, Filter, Plus, Mail, Phone, MapPin, TrendingUp } from 'lucide-react';

const mockProductores = [
    {
        id: 1,
        nombre: 'José García López',
        rfc: 'GALJ850315AB1',
        municipio: 'Ahome',
        hectareas: 28.5,
        entregas: 8,
        volumenTotal: 342500,
        calidadPromedio: 'Primera',
        estatus: 'activo',
        telefono: '668-123-4567',
        email: 'jose.garcia@example.com',
    },
    {
        id: 2,
        nombre: 'María Hernández Rodríguez',
        rfc: 'HERM900522CD2',
        municipio: 'Guasave',
        hectareas: 35.0,
        entregas: 7,
        volumenTotal: 298000,
        calidadPromedio: 'Primera',
        estatus: 'activo',
        telefono: '687-234-5678',
        email: 'maria.hernandez@example.com',
    },
    {
        id: 3,
        nombre: 'Carlos Ramírez Sánchez',
        rfc: 'RASC750610EF3',
        municipio: 'El Fuerte',
        hectareas: 42.0,
        entregas: 6,
        volumenTotal: 276500,
        calidadPromedio: 'Primera',
        estatus: 'activo',
        telefono: '698-345-6789',
        email: 'carlos.ramirez@example.com',
    },
    {
        id: 4,
        nombre: 'Ana Martínez García',
        rfc: 'MAGA881120GH4',
        municipio: 'Ahome',
        hectareas: 22.5,
        entregas: 5,
        volumenTotal: 245000,
        calidadPromedio: 'Segunda',
        estatus: 'activo',
        telefono: '668-456-7890',
        email: 'ana.martinez@example.com',
    },
    {
        id: 5,
        nombre: 'Luis Rodríguez Pérez',
        rfc: 'ROPL920815IJ5',
        municipio: 'Guasave',
        hectareas: 18.0,
        entregas: 4,
        volumenTotal: 198000,
        calidadPromedio: 'Primera',
        estatus: 'inactivo',
        telefono: '687-567-8901',
        email: 'luis.rodriguez@example.com',
    },
];

export default function ProductoresPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Productores</h1>
                    <p className="text-gray-600 mt-1">
                        Administra la información y desempeño de tus agricultores
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-[#175641] hover:bg-[#1a6b4f] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-colors">
                    <Plus className="w-5 h-5" />
                    Nuevo Productor
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Activos</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">247</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">Hectáreas Total</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">6,842</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-600">Promedio Entregas</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">6.2</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-sm text-gray-600">Nuevos (este mes)</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, RFC, municipio..."
                            className="bg-transparent border-none outline-none w-full"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                        <Filter className="w-5 h-5" />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Productor
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Municipio
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Hectáreas
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Entregas
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Volumen Total
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Calidad
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Estatus
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockProductores.map((productor) => (
                                <motion.tr
                                    key={productor.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {productor.nombre}
                                            </p>
                                            <p className="text-sm text-gray-500">{productor.rfc}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {productor.municipio}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {productor.hectareas} ha
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {productor.entregas}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {(productor.volumenTotal / 1000).toFixed(1)} ton
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${productor.calidadPromedio === 'Primera'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {productor.calidadPromedio}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${productor.estatus === 'activo'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {productor.estatus === 'activo' ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-[#175641] hover:text-[#1a6b4f] font-semibold text-sm">
                                            Ver Detalle
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Prototype Notice */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>🚧 Prototipo:</strong> Esta vista muestra datos de ejemplo. En producción, aquí
                    podrás crear, editar y gestionar productores, ver su historial completo, contratos
                    vigentes, y credit scoring.
                </p>
            </div>
        </div>
    );
}
