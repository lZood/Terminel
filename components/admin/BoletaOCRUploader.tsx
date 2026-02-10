'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';

interface OCRResult {
    folio: string;
    peso_bruto_kg: number;
    peso_tara_kg: number;
    peso_neto_kg: number;
    producto: string;
    fecha: string;
    hora: string;
    proveedor: string;
    humedad: number | null;
    impurezas: number | null;
    validacion: {
        discrepancia: boolean;
        diferencia_kg: number;
        porcentaje_diferencia: number;
        peso_esperado: number | null;
    };
}

interface BoletaOCRUploaderProps {
    onDataExtracted?: (data: OCRResult) => void;
    pesoEsperado?: number;
}

export default function BoletaOCRUploader({ onDataExtracted, pesoEsperado }: BoletaOCRUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<OCRResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                setError('Por favor selecciona una imagen válida');
                return;
            }

            setFile(selectedFile);
            setError(null);
            setResult(null);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (pesoEsperado) {
                formData.append('pesoEsperado', pesoEsperado.toString());
            }

            const response = await fetch('/api/ocr/boletas', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar la imagen');
            }

            setResult(data.data);
            if (onDataExtracted) {
                onDataExtracted(data.data);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    // Helper functions for formatting
    const formatKg = (val: number) => {
        // En-US uses commas for thousands: 1,234
        return new Intl.NumberFormat('en-US').format(val);
    };

    const formatTons = (kg: number) => {
        // Convert to tons and fix to 3 decimals
        return (kg / 1000).toFixed(3);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            {!preview && (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#175641] transition-colors">
                    <input
                        type="file"
                        id="boleta-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="boleta-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-900">
                                Subir boleta de báscula
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Arrastra una imagen o haz clic para seleccionar
                            </p>
                        </div>
                        <p className="text-xs text-gray-400">PNG, JPG, JPEG hasta 10MB</p>
                    </label>
                </div>
            )}

            {/* Preview and Results */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Boleta Cargada</h3>
                            <button
                                onClick={handleReset}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Image Preview */}
                            <div className="space-y-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-auto rounded-xl border border-gray-200"
                                />
                                {!result && !isProcessing && (
                                    <button
                                        onClick={handleUpload}
                                        className="w-full px-6 py-3 bg-[#175641] text-white rounded-xl font-semibold hover:bg-[#1a6b4f] transition-colors flex items-center justify-center gap-2"
                                    >
                                        <FileText className="w-5 h-5" />
                                        Procesar con IA
                                    </button>
                                )}
                            </div>

                            {/* Results */}
                            <div>
                                {isProcessing && (
                                    <div className="flex flex-col items-center justify-center h-full gap-4">
                                        <Loader2 className="w-12 h-12 text-[#175641] animate-spin" />
                                        <p className="text-gray-600 font-medium">
                                            Analizando boleta con IA...
                                        </p>
                                    </div>
                                )}

                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-red-900">Error</p>
                                            <p className="text-sm text-red-700 mt-1">{error}</p>
                                        </div>
                                    </div>
                                )}

                                {result && (
                                    <div className="space-y-4">
                                        {/* Status Badge */}
                                        <div
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl ${result.validacion.discrepancia
                                                ? 'bg-amber-50 border border-amber-200'
                                                : 'bg-green-50 border border-green-200'
                                                }`}
                                        >
                                            {result.validacion.discrepancia ? (
                                                <>
                                                    <AlertCircle className="w-5 h-5 text-amber-600" />
                                                    <span className="font-semibold text-amber-900">
                                                        ⚠️ Discrepancia Detectada
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                    <span className="font-semibold text-green-900">
                                                        ✓ Peso Correcto
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Extracted Data */}
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900">Datos Extraídos:</h4>

                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Folio</p>
                                                    <p className="font-semibold text-gray-900">{result.folio}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Producto</p>
                                                    <p className="font-semibold text-gray-900">{result.producto}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Proveedor</p>
                                                    <p className="font-semibold text-gray-900 truncate" title={result.proveedor}>{result.proveedor}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Fecha/Hora</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {result.fecha} {result.hora}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 pt-3">
                                                <div className="grid grid-cols-3 gap-3 text-sm">
                                                    <div>
                                                        <p className="text-gray-500">Peso Bruto</p>
                                                        <p className="font-bold text-gray-900">
                                                            {formatKg(result.peso_bruto_kg)} kg
                                                            <span className="block text-xs font-normal text-gray-500 mt-0.5">
                                                                {formatTons(result.peso_bruto_kg)} TON
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Tara</p>
                                                        <p className="font-bold text-gray-900">
                                                            {formatKg(result.peso_tara_kg)} kg
                                                            <span className="block text-xs font-normal text-gray-500 mt-0.5">
                                                                {formatTons(result.peso_tara_kg)} TON
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Peso Neto</p>
                                                        <p className="font-bold text-[#175641]">
                                                            {formatKg(result.peso_neto_kg)} kg
                                                            <span className="block text-xs font-normal text-[#175641]/70 mt-0.5">
                                                                {formatTons(result.peso_neto_kg)} TON
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {(result.humedad || result.impurezas) && (
                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    {result.humedad && (
                                                        <div>
                                                            <p className="text-gray-500">Humedad</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {result.humedad}%
                                                            </p>
                                                        </div>
                                                    )}
                                                    {result.impurezas && (
                                                        <div>
                                                            <p className="text-gray-500">Impurezas</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {result.impurezas}%
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Validation Info */}
                                            {result.validacion.peso_esperado && (
                                                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                                                    <p className="text-xs font-semibold text-gray-600 uppercase">
                                                        Validación
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                                        <div>
                                                            <p className="text-gray-500">Peso Esperado</p>
                                                            <p className="font-semibold text-gray-900">
                                                                {formatKg(result.validacion.peso_esperado)} kg
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Diferencia</p>
                                                            <p
                                                                className={`font-semibold ${result.validacion.discrepancia
                                                                        ? 'text-amber-600'
                                                                        : 'text-green-600'
                                                                    }`}
                                                            >
                                                                {result.validacion.diferencia_kg > 0 ? '+' : ''}
                                                                {formatKg(result.validacion.diferencia_kg)} kg
                                                                <span className="text-xs ml-1 font-normal opacity-80">
                                                                    ({result.validacion.porcentaje_diferencia}%)
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
