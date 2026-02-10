'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    FileText,
    Shield,
    Receipt,
    FileSignature,
    ArrowLeft,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { authHelpers } from '@/lib/supabase';
import DocumentUploader from '@/components/documentos/DocumentUploader';
import DocumentList from '@/components/documentos/DocumentList';
import { DocumentType } from '@/lib/types';

export default function DocumentosPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'expediente' | 'permisos' | 'facturas' | 'contratos'>('expediente');
    const [refreshKey, setRefreshKey] = useState(0);

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

    const handleUploadComplete = () => {
        // Trigger refresh of document list
        setRefreshKey(prev => prev + 1);
    };

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

    const tabs = [
        {
            id: 'expediente' as const,
            label: 'Expediente Legal',
            icon: Shield,
            description: 'INE, CURP, RFC, Comprobante de Domicilio',
            types: ['ine', 'curp', 'rfc', 'comprobante_domicilio'] as DocumentType[],
        },
        {
            id: 'permisos' as const,
            label: 'Permisos de Siembra',
            icon: FileSignature,
            description: 'Permiso Único de Siembra',
            types: ['permiso_siembra'] as DocumentType[],
        },
        {
            id: 'facturas' as const,
            label: 'Facturas',
            icon: Receipt,
            description: 'Facturas de Venta y Compra',
            types: ['factura_venta', 'factura_compra'] as DocumentType[],
        },
        {
            id: 'contratos' as const,
            label: 'Contratos',
            icon: FileText,
            description: 'Contratos de Habilitación',
            types: ['contrato_habilitacion'] as DocumentType[],
        },
    ];

    const activeTabData = tabs.find(tab => tab.id === activeTab)!;

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
                                <span className="text-xs text-gray-600">Documentos</span>
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
                    className="max-w-7xl mx-auto"
                >
                    {/* Back Button & Page Header */}
                    <div className="mb-8">
                        <Link
                            href="/portal/dashboard"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#175641] transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Volver al Dashboard</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-[#175641] mb-2">
                            Mis Documentos
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Gestiona y sube tus documentos legales y administrativos
                        </p>
                    </div>

                    {/* Info Alert */}
                    <div className="mb-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-blue-900 mb-1">
                                Importante: Expediente Completo
                            </p>
                            <p className="text-sm text-blue-800">
                                Para agilizar tus pagos y cumplir con SEGALMEX, asegúrate de subir todos los documentos de tu expediente legal.
                                Los documentos serán validados automáticamente por nuestro sistema.
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${isActive
                                        ? 'border-[#175641] bg-green-50'
                                        : 'border-gray-200 hover:border-[#175641] bg-white'
                                        }`}
                                >
                                    <Icon
                                        className={`w-8 h-8 mb-2 ${isActive ? 'text-[#175641]' : 'text-gray-400'
                                            }`}
                                    />
                                    <h3
                                        className={`font-semibold mb-1 ${isActive ? 'text-[#175641]' : 'text-gray-900'
                                            }`}
                                    >
                                        {tab.label}
                                    </h3>
                                    <p className="text-xs text-gray-600">{tab.description}</p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Upload Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                                {activeTabData.types.map((docType) => (
                                    <div key={docType} className="mb-6 last:mb-0">
                                        <DocumentUploader
                                            userId={user.id}
                                            documentType={docType}
                                            onUploadComplete={handleUploadComplete}
                                            maxSizeMB={10}
                                        />
                                    </div>
                                ))}

                                {/* Requirements Checklist */}
                                {activeTab === 'expediente' && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3">
                                            Documentos Requeridos:
                                        </h4>
                                        <ul className="space-y-2">
                                            {[
                                                'INE vigente (ambos lados)',
                                                'CURP actualizada',
                                                'Constancia de RFC',
                                                'Comprobante de domicilio (máx. 3 meses)',
                                            ].map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Document List Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    {activeTabData.label}
                                </h2>
                                <DocumentList key={refreshKey} userId={user.id} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
