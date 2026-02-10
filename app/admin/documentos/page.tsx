'use client';

import { FileText, Upload, CheckCircle, XCircle } from 'lucide-react';

export default function DocumentosPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Documentos</h1>
                <p className="text-gray-600 mt-1">
                    Revisa y valida documentos de productores
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-yellow-600" />
                        </div>
                        <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">Aprobados</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">156</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-sm text-gray-600">Rechazados</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
                <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Módulo de Documentos
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    Aquí se mostrará la cola de validación de documentos subidos por productores,
                    con vista previa integrada y flujo de aprobación/rechazo.
                </p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>🚧 Prototipo:</strong> La versión completa incluirá vista previa de
                    documentos, firma digital, tracking de expedientes completos y alertas de
                    vencimiento.
                </p>
            </div>
        </div>
    );
}
