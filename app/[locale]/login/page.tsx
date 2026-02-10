'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Lock, ChevronRight, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { authHelpers } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Verificar si ya hay sesión activa al cargar
    useEffect(() => {
        checkExistingSession();
    }, []);

    const checkExistingSession = async () => {
        const { user } = await authHelpers.getCurrentUser();
        if (user) {
            router.push('/portal/dashboard');
        } else {
            setCheckingSession(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const { data, error: signInError } = await authHelpers.signIn(email, password);

            if (signInError) {
                setError(signInError.message === 'Invalid login credentials'
                    ? 'Credenciales inválidas. Por favor verifica tu correo y contraseña.'
                    : signInError.message);
                setIsLoading(false);
                return;
            }

            if (data.user) {
                // Guardar preferencia de "recordarme" en localStorage
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.setItem('rememberMe', 'false');
                }

                setSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
                setTimeout(() => {
                    router.push('/portal/dashboard');
                }, 1500);
            }
        } catch (err) {
            setError('Ocurrió un error inesperado. Por favor intenta de nuevo.');
            setIsLoading(false);
        }
    };

    const handleWhatsAppRecovery = () => {
        const whatsappNumber = '5212281234567'; // TODO: Replace with actual number
        const message = encodeURIComponent('Hola, necesito recuperar mi contraseña del Portal Productor');
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center p-4">
            {checkingSession ? (
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#175641] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Verificando sesión...</p>
                </div>
            ) : (
                <div className="w-full max-w-md">
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

                    {/* Login Card */}
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
                                Bienvenido al Portal
                            </h1>
                            <p className="text-gray-600">
                                Inicia sesión para continuar
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

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#175641] focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-[#175641] bg-gray-100 border-gray-300 rounded focus:ring-[#175641] focus:ring-2 cursor-pointer"
                                />
                                <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    Mantener sesión iniciada
                                </label>
                            </div>

                            {/* Login Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#175641] hover:bg-[#1a6b4f] text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 group"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Iniciando sesión...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>INICIAR SESIÓN</span>
                                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>

                            {/* WhatsApp Recovery */}
                            <button
                                type="button"
                                onClick={handleWhatsAppRecovery}
                                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#25D366] transition-colors duration-200 py-3 group"
                                disabled={isLoading}
                            >
                                <MessageCircle className="h-5 w-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium">
                                    Recuperar contraseña vía WhatsApp
                                </span>
                            </button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-gray-600 text-sm">
                                ¿No tienes una cuenta?{' '}
                                <Link
                                    href="/register"
                                    className="text-[#175641] font-semibold hover:text-[#1a6b4f] transition-colors"
                                >
                                    Regístrate aquí
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
            )}
        </div>
    );
}
