'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Phone, ChevronRight, ArrowLeft, Building, AlertCircle, CheckCircle } from 'lucide-react';
import { authHelpers } from '@/lib/supabase';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        rfc: '',
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rfc' ? value.toUpperCase() : value,
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        if (formData.rfc.length !== 13) {
            setError('El RFC debe tener exactamente 13 caracteres');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: signUpError } = await authHelpers.signUp(
                formData.email,
                formData.password,
                {
                    rfc: formData.rfc,
                    nombre: formData.nombre,
                    telefono: formData.telefono,
                    empresa: formData.empresa,
                }
            );

            if (signUpError) {
                if (signUpError.message.includes('already registered')) {
                    setError('Este correo electrónico ya está registrado. Por favor inicia sesión.');
                } else {
                    setError(signUpError.message);
                }
                setIsLoading(false);
                return;
            }

            if (data.user) {
                setSuccess('¡Cuenta creada exitosamente! Revisa tu correo para confirmar tu cuenta.');
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            }
        } catch (err) {
            setError('Ocurrió un error inesperado. Por favor intenta de nuevo.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 py-12 px-4">
            <div className="w-full max-w-2xl mx-auto">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <Link
                        href="/portal"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#175641] transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Volver al Portal</span>
                    </Link>
                </motion.div>

                {/* Register Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
                >
                    {/* Logo */}
                    <Link href="/portal" className="flex flex-col items-center mb-8 group">
                        <div className="relative w-20 h-20 mb-3 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/images/logoTerminel.PNG"
                                alt="Grupo Terminel Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="font-heading font-black text-2xl leading-none tracking-tighter text-[#175641] transition-transform duration-300 group-hover:scale-105">
                            TERMINEL
                        </span>
                    </Link>

                    {/* Welcome Message */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[#175641] mb-2">
                            Crear Cuenta Nueva
                        </h1>
                        <p className="text-gray-600">
                            Únete al Portal Productor de Grupo Terminel
                        </p>
                    </div>

                    {/* Error/Success Messages */}
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800">{error}</p>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                            >
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-green-800">{success}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* RFC Input */}
                            <div>
                                <label htmlFor="rfc" className="block text-sm font-semibold text-gray-700 mb-2">
                                    RFC *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="rfc"
                                        name="rfc"
                                        type="text"
                                        value={formData.rfc}
                                        onChange={handleChange}
                                        placeholder="XXXX000000XXX"
                                        maxLength={13}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Nombre Input */}
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nombre Completo *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Juan Pérez García"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Correo Electrónico *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="correo@ejemplo.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Teléfono Input */}
                            <div>
                                <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Teléfono *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder="(228) 123-4567"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Empresa Input */}
                        <div>
                            <label htmlFor="empresa" className="block text-sm font-semibold text-gray-700 mb-2">
                                Empresa / Organización
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Building className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="empresa"
                                    name="empresa"
                                    type="text"
                                    value={formData.empresa}
                                    onChange={handleChange}
                                    placeholder="Nombre de tu empresa (opcional)"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contraseña *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirmar Contraseña *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Register Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#175641] hover:bg-[#1a6b4f] text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 group"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Creando cuenta...</span>
                                </div>
                            ) : (
                                <>
                                    <span>CREAR CUENTA</span>
                                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600 text-sm">
                            ¿Ya tienes una cuenta?{' '}
                            <Link
                                href="/login"
                                className="text-[#175641] font-semibold hover:text-[#1a6b4f] transition-colors"
                            >
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <p className="text-sm text-gray-600">
                        Grupo Terminel © 2026
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Excelencia Agrícola desde 1970
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
