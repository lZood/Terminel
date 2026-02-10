'use client';

import { useState, useEffect } from 'react';
import BoletaOCRUploader from '@/components/admin/BoletaOCRUploader';
import { ArrowLeft, History, Scale, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { ocrHelpers } from '@/lib/ocrHelpers';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestOCRPage() {
    const [recentAudits, setRecentAudits] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [pesoEsperado, setPesoEsperado] = useState<number>(45000); // Default 45 tons
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const supabase = createClientComponentClient();

    useEffect(() => {
        loadHistory();
    }, []);

    // Auto-dismiss toast
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const loadHistory = async () => {
        try {
            const data = await ocrHelpers.getAuditorias({ limit: 10 });
            setRecentAudits(data || []);
        } catch (error) {
            console.error('Error cargando historial:', error);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleDataExtracted = async (data: any) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            console.log('Guardando en auditoría...', data);
            await ocrHelpers.saveOCRResult(data, user?.id);
            await loadHistory();
            setToast({ message: 'Boleta procesada y guardada correctamente', type: 'success' });
        } catch (error) {
            console.error('Error al guardar auditoría:', error);
            setToast({ message: 'Error al guardar el registro', type: 'error' });
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();

        // Usamos confirm nativo por seguridad, pero mostramos éxito con toast
        if (!window.confirm('¿Estás seguro de que deseas eliminar este registro permanentemente?')) return;

        try {
            await ocrHelpers.deleteAuditoria(id);
            setToast({ message: 'Registro eliminado correctamente', type: 'success' });
            await loadHistory();
        } catch (error) {
            console.error('Error deleting:', error);
            setToast({ message: 'No se pudo eliminar el registro. Verifica tus permisos.', type: 'error' });
        }
    };

    // Helper formatter
    const formatKg = (val: number) => {
        return new Intl.NumberFormat('en-US').format(val);
    };

    return (
        <div className="space-y-10 max-w-5xl mx-auto pb-12 relative">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: 50 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20, x: 20 }}
                        className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl shadow-lg border flex items-center gap-3 ${toast.type === 'success'
                                ? 'bg-white border-green-100 text-green-800'
                                : 'bg-white border-red-100 text-red-800'
                            }`}
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                        <p className="font-medium">{toast.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/entregas"
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Prueba de OCR - Boletas de Báscula
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Sube una boleta para extraer datos, validar pesos y guardar en auditoría.
                    </p>
                </div>
            </div>

            {/* SECCIÓN PRINCIPAL: Configuración y Upload */}
            <div className="space-y-6">

                {/* Input de Peso Esperado */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex items-center gap-3 text-blue-800">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Scale className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Peso Esperado (kg)</h3>
                            <p className="text-sm text-gray-500">Simula el contrato o aviso de envío</p>
                        </div>
                    </div>

                    <div className="flex-1">
                        <input
                            type="number"
                            value={pesoEsperado}
                            onChange={(e) => setPesoEsperado(Number(e.target.value))}
                            className="w-full text-2xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2 py-1 bg-transparent transition-colors"
                            placeholder="0"
                        />
                    </div>
                </div>

                {/* Componente OCR (Protagonista) */}
                <BoletaOCRUploader
                    onDataExtracted={handleDataExtracted}
                    pesoEsperado={pesoEsperado}
                />
            </div>

            {/* SECCIÓN INFERIOR: Historial */}
            <div className="border-t border-gray-200 pt-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <History className="w-5 h-5 text-gray-500" />
                            Historial de Registros
                        </h2>
                        <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                            Últimos 10 procesados
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Folio</th>
                                    <th className="px-6 py-4">Producto / Proveedor</th>
                                    <th className="px-6 py-4 text-right">Peso Neto</th>
                                    <th className="px-6 py-4 text-center">Validación</th>
                                    <th className="px-6 py-4 text-right">Procesado</th>
                                    <th className="w-10"></th> {/* Actions column */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loadingHistory ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                            Cargando registros...
                                        </td>
                                    </tr>
                                ) : recentAudits.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                            Sin registros aun. Sube una boleta arriba para comenzar.
                                        </td>
                                    </tr>
                                ) : (
                                    recentAudits.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.folio || 'S/N'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-900 font-medium">{item.producto}</div>
                                                <div className="text-gray-500 text-xs truncate max-w-[200px]">{item.proveedor}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="font-mono font-medium text-[#175641]">
                                                    {formatKg(item.peso_neto_kg)} kg
                                                </div>
                                                <div className="text-[10px] text-gray-400">
                                                    {(item.peso_neto_kg / 1000).toFixed(3)} TON
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {item.discrepancia_detectada ? (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                                                        ⚠️ Discrepancia
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                                        ✓ Correcto
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-500">
                                                <div className="text-xs font-medium">
                                                    {new Date(item.procesado_en).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="text-[10px] opacity-60">
                                                    {new Date(item.procesado_en).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <button
                                                    onClick={(e) => handleDelete(item.id, e)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                    title="Eliminar registro"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
