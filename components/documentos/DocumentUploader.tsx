'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { DocumentType, ValidationStatus } from '@/lib/types';
import { supabase } from '@/lib/supabase';

interface DocumentUploaderProps {
    userId: string;
    documentType: DocumentType;
    onUploadComplete?: () => void;
    maxSizeMB?: number;
    acceptedFormats?: string[];
}

export default function DocumentUploader({
    userId,
    documentType,
    onUploadComplete,
    maxSizeMB = 10,
    acceptedFormats = ['application/pdf', 'image/jpeg', 'image/png'],
}: DocumentUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setError('');
        setSuccess(false);

        if (acceptedFiles.length === 0) {
            setError('Formato de archivo no válido');
            return;
        }

        const selectedFile = acceptedFiles[0];

        if (selectedFile.size > maxSizeBytes) {
            setError(`El archivo no debe exceder ${maxSizeMB}MB`);
            return;
        }

        setFile(selectedFile);
    }, [maxSizeBytes, maxSizeMB]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFormats.reduce((acc, format) => {
            acc[format] = [];
            return acc;
        }, {} as Record<string, string[]>),
        maxFiles: 1,
        multiple: false,
    });

    const uploadDocument = async () => {
        if (!file) return;

        setUploading(true);
        setError('');
        setProgress(0);

        try {
            // 1. Subir archivo a Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}/${documentType}/${Date.now()}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('documents-bucket')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) {
                throw uploadError;
            }

            setProgress(50);

            // 2. Guardar solo el path (no URL pública, porque el bucket es privado)
            setProgress(75);

            // 3. Crear registro en la tabla documents
            const { error: dbError } = await supabase
                .from('documents')
                .insert({
                    user_id: userId,
                    document_type: documentType,
                    file_name: file.name,
                    file_url: fileName, // Guardamos el path, no la URL
                    file_size: file.size,
                    mime_type: file.type,
                    status: 'pending' as ValidationStatus,
                });

            if (dbError) {
                throw dbError;
            }

            setProgress(100);
            setSuccess(true);
            setFile(null);

            // Callback
            if (onUploadComplete) {
                onUploadComplete();
            }

            // Reset después de 3 segundos
            setTimeout(() => {
                setSuccess(false);
                setProgress(0);
            }, 3000);

        } catch (err: any) {
            setError(err.message || 'Error al subir el archivo');
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setError('');
        setSuccess(false);
    };

    const getDocumentLabel = (type: DocumentType): string => {
        const labels: Record<DocumentType, string> = {
            ine: 'INE',
            curp: 'CURP',
            rfc: 'RFC',
            comprobante_domicilio: 'Comprobante de Domicilio',
            permiso_siembra: 'Permiso de Siembra',
            factura_venta: 'Factura de Venta',
            factura_compra: 'Factura de Compra',
            contrato_habilitacion: 'Contrato de Habilitación',
        };
        return labels[type];
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Subir {getDocumentLabel(documentType)}
            </h3>

            {/* Dropzone */}
            {!file && !success && (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${isDragActive
                        ? 'border-[#175641] bg-green-50'
                        : 'border-gray-300 hover:border-[#175641] hover:bg-gray-50'
                        }`}
                >
                    <input {...getInputProps()} />
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragActive ? 'text-[#175641]' : 'text-gray-400'}`} />
                    <p className="text-gray-700 font-medium mb-2">
                        {isDragActive
                            ? 'Suelta el archivo aquí'
                            : 'Arrastra un archivo o haz clic para seleccionar'}
                    </p>
                    <p className="text-sm text-gray-500">
                        PDF, JPG o PNG • Máx. {maxSizeMB}MB
                    </p>
                </div>
            )}

            {/* File Preview */}
            {file && !success && (
                <div className="border-2 border-gray-200 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#175641] bg-opacity-10 p-3 rounded-xl">
                                <File className="w-6 h-6 text-[#175641]" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{file.name}</p>
                                <p className="text-sm text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        {!uploading && (
                            <button
                                onClick={removeFile}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {uploading && (
                        <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-[#175641] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600 mt-2 text-center">
                                Subiendo... {progress}%
                            </p>
                        </div>
                    )}

                    {/* Upload Button */}
                    {!uploading && (
                        <button
                            onClick={uploadDocument}
                            className="w-full bg-[#175641] hover:bg-[#1a6b4f] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <Upload className="w-5 h-5" />
                            Subir Documento
                        </button>
                    )}

                    {uploading && (
                        <button
                            disabled
                            className="w-full bg-gray-400 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Subiendo...
                        </button>
                    )}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="border-2 border-green-200 bg-green-50 rounded-2xl p-6 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-green-900">¡Documento subido exitosamente!</p>
                        <p className="text-sm text-green-700">
                            El documento está pendiente de validación
                        </p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="border-2 border-red-200 bg-red-50 rounded-2xl p-4 flex items-start gap-3 mt-4">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-red-900">Error</p>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
