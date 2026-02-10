'use client';

import { Settings, DollarSign, Users, FileText } from 'lucide-react';

export default function ConfiguracionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
                <p className="text-gray-600 mt-1">
                    Administra precios, usuarios y parámetros del sistema
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Gestión de Precios</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Configura precios Por producto y calidad
                    </p>
                    <button className="px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors">
                        Configurar
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Usuarios Administrativos</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Gestiona roles y permisos del equipo
                    </p>
                    <button className="px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors">
                        Gestionar
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Plantillas de Contratos</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Administra términos y condiciones
                    </p>
                    <button className="px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors">
                        Editar
                    </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Settings className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Parámetros del Sistema</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Tolerancias, umbrales y alertas
                    </p>
                    <button className="px-4 py-2 bg-[#175641] hover:bg-[#1a6b4f] text-white rounded-lg font-semibold transition-colors">
                        Ajustar
                    </button>
                </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>🚧 Prototipo:</strong> La configuración completa incluirá gestión de
                    precios históricos, roles granulares, integraciones externas y más.
                </p>
            </div>
        </div>
    );
}
