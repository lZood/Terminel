'use client';

import { useEffect, useState } from 'react';
import { FileText, Download, Eye, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Document, ValidationStatus } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';

interface DocumentListProps {
    userId: string;
}

export default function DocumentList({ userId }: DocumentListProps) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<ValidationStatus | 'all'>('all');

    useEffect(() => {
        fetchDocuments();
    }, [userId]);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('documents')
                .select('*')
                .eq('user_id', userId)
                .order('uploaded_at', { ascending: false });

            const { data, error } = await query;

            if (error) throw error;
            setDocuments(data || []);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: ValidationStatus) => {
        const config = {
            pending: {
                label: 'Pendiente',
                icon: Clock,
                bgColor: 'bg-yellow-100',
                textColor: 'text-yellow-800',
                iconColor: 'text-yellow-600',
            },
            validating: {
                label: 'Validando',
                icon: AlertCircle,
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800',
                iconColor: 'text-blue-600',
            },
            approved: {
                label: 'Aprobado',
                icon: CheckCircle,
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                iconColor: 'text-green-600',
            },
            rejected: {
                label: 'Rechazado',
                icon: XCircle,
                bgColor: 'bg-red-100',
                textColor: 'text-red-800',
                iconColor: 'text-red-600',
            },
        };

        const { label, icon: Icon, bgColor, textColor, iconColor } = config[status];

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
                {label}
            </span>
        );
    };

    const getDocumentTypeLabel = (type: string): string => {
        const labels: Record<string, string> = {
            ine: 'INE',
            curp: 'CURP',
            rfc: 'RFC',
            comprobante_domicilio: 'Comprobante de Domicilio',
            permiso_siembra: 'Permiso de Siembra',
            factura_venta: 'Factura de Venta',
            factura_compra: 'Factura de Compra',
            contrato_habilitacion: 'Contrato de Habilitación',
        };
        return labels[type] || type;
    };

    // Generar signed URL para acceso temporal a buckets privados
    const getSignedUrl = async (fileUrlOrPath: string): Promise<string | null> => {
        try {
            // Si es una URL completa (documentos viejos), extraer el path
            let filePath = fileUrlOrPath;

            if (fileUrlOrPath.includes('http')) {
                // Extraer el path de diferentes formatos de URL:
                // - https://xxx.supabase.co/storage/v1/object/public/documents-bucket/PATH
                // - https://xxx.supabase.co/storage/v1/object/sign/documents-bucket/PATH?token=...
                const urlPatterns = [
                    '/storage/v1/object/public/documents-bucket/',
                    '/storage/v1/object/sign/documents-bucket/',
                    '/storage/v1/object/signed/documents-bucket/',
                ];

                let extracted = false;
                for (const pattern of urlPatterns) {
                    if (fileUrlOrPath.includes(pattern)) {
                        const parts = fileUrlOrPath.split(pattern);
                        if (parts.length > 1) {
                            // Remover query params y decode URL
                            filePath = decodeURIComponent(parts[1].split('?')[0]);
                            extracted = true;
                            console.log('Extracted path from URL:', filePath);
                            break;
                        }
                    }
                }

                if (!extracted) {
                    console.error('No se pudo extraer el path de la URL:', fileUrlOrPath);
                    return null;
                }
            }

            const { data, error } = await supabase.storage
                .from('documents-bucket')
                .createSignedUrl(filePath, 3600); // Válida por 1 hora

            if (error) {
                console.error('Error creating signed URL:', error);
                console.error('File path:', filePath);
                return null;
            }

            return data.signedUrl;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const viewDocument = async (filePath: string) => {
        const signedUrl = await getSignedUrl(filePath);
        if (signedUrl) {
            window.open(signedUrl, '_blank');
        } else {
            alert('Error al generar URL de visualización');
        }
    };

    const downloadDocument = async (filePath: string, fileName: string) => {
        const signedUrl = await getSignedUrl(filePath);
        if (signedUrl) {
            const link = document.createElement('a');
            link.href = signedUrl;
            link.download = fileName;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Error al generar URL de descarga');
        }
    };

    const filteredDocuments = filter === 'all'
        ? documents
        : documents.filter(doc => doc.status === filter);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#175641]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${filter === 'all'
                        ? 'bg-[#175641] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Todos ({documents.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${filter === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Pendientes ({documents.filter(d => d.status === 'pending').length})
                </button>
                <button
                    onClick={() => setFilter('approved')}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${filter === 'approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Aprobados ({documents.filter(d => d.status === 'approved').length})
                </button>
                <button
                    onClick={() => setFilter('rejected')}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${filter === 'rejected'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Rechazados ({documents.filter(d => d.status === 'rejected').length})
                </button>
            </div>

            {/* Document List */}
            {filteredDocuments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No hay documentos</p>
                    <p className="text-sm text-gray-500 mt-1">
                        {filter === 'all'
                            ? 'Sube tu primer documento para comenzar'
                            : `No hay documentos con estado "${filter}"`}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="bg-[#175641] bg-opacity-10 p-3 rounded-xl">
                                        <FileText className="w-6 h-6 text-[#175641]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            {getDocumentTypeLabel(doc.document_type)}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-2">{doc.file_name}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Subido: {formatDate(doc.uploaded_at)}</span>
                                            <span>•</span>
                                            <span>{(doc.file_size! / 1024 / 1024).toFixed(2)} MB</span>
                                        </div>
                                    </div>
                                </div>
                                <div>{getStatusBadge(doc.status)}</div>
                            </div>

                            {/* Validation Details */}
                            {doc.validation_details && (
                                <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Detalles de Validación:
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {JSON.stringify(doc.validation_details, null, 2)}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => viewDocument(doc.file_url)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    Ver
                                </button>
                                <button
                                    onClick={() => downloadDocument(doc.file_url, doc.file_name)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#175641] hover:bg-[#1a6b4f] text-white font-medium rounded-xl transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Descargar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
