'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Building2, FileText, Calendar, Edit2, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import { authHelpers, UserProfile } from '@/lib/supabase';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form states
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        empresa: '',
        rfc: '',
    });

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

        // Get user profile
        const { data: profileData } = await authHelpers.getUserProfile(currentUser.id);
        if (profileData) {
            setProfile(profileData);
            setFormData({
                nombre: profileData.nombre || '',
                telefono: profileData.telefono || '',
                empresa: profileData.empresa || '',
                rfc: profileData.rfc || '',
            });
        }

        setIsLoading(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSuccess('');
        // Reset form to original values
        if (profile) {
            setFormData({
                nombre: profile.nombre || '',
                telefono: profile.telefono || '',
                empresa: profile.empresa || '',
                rfc: profile.rfc || '',
            });
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        setSuccess('');

        try {
            if (!user) return;

            const { error: updateError } = await authHelpers.updateUserProfile(user.id, formData);

            if (updateError) {
                setError('Error al actualizar el perfil. Intenta de nuevo.');
                setIsSaving(false);
                return;
            }

            // Refresh profile data
            const { data: updatedProfile } = await authHelpers.getUserProfile(user.id);
            if (updatedProfile) {
                setProfile(updatedProfile);
            }

            setSuccess('¡Perfil actualizado exitosamente!');
            setIsEditing(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Ocurrió un error inesperado.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#175641] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando perfil...</p>
                </div>
            </div>
        );
    }

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
                                <span className="text-xs text-gray-600">Perfil</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-custom py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Back Button & Header */}
                    <div className="mb-8">
                        <Link
                            href="/portal/dashboard"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#175641] transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Volver al Dashboard</span>
                        </Link>
                        <h1 className="text-4xl font-bold text-[#175641] mb-2">Mi Perfil</h1>
                        <p className="text-gray-600">Visualiza y edita tu información personal</p>
                    </div>

                    {/* Success/Error Messages */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                        >
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-green-800">{success}</p>
                        </motion.div>
                    )}

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gradient-to-br from-[#175641] to-[#1a6b4f] p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{profile?.nombre || 'Usuario'}</h2>
                                        <p className="text-sm opacity-90">RFC: {profile?.rfc || 'N/A'}</p>
                                    </div>
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">Editar</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <User className="w-4 h-4" />
                                        Nombre Completo
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] transition-colors"
                                            placeholder="Tu nombre completo"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                                            {profile?.nombre || 'No especificado'}
                                        </p>
                                    )}
                                </div>

                                {/* RFC */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <FileText className="w-4 h-4" />
                                        RFC
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.rfc}
                                            onChange={(e) => setFormData({ ...formData, rfc: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] transition-colors uppercase"
                                            placeholder="Tu RFC"
                                            maxLength={13}
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                                            {profile?.rfc || 'No especificado'}
                                        </p>
                                    )}
                                </div>

                                {/* Email - No editable */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Mail className="w-4 h-4" />
                                        Correo Electrónico
                                    </label>
                                    <p className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">
                                        {user?.email || 'No especificado'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">* No se puede modificar el correo</p>
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Phone className="w-4 h-4" />
                                        Teléfono
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] transition-colors"
                                            placeholder="Tu teléfono"
                                            maxLength={10}
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                                            {profile?.telefono || 'No especificado'}
                                        </p>
                                    )}
                                </div>

                                {/* Empresa */}
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Building2 className="w-4 h-4" />
                                        Empresa
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={formData.empresa}
                                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#175641] transition-colors"
                                            placeholder="Nombre de tu empresa"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                                            {profile?.empresa || 'No especificado'}
                                        </p>
                                    )}
                                </div>

                                {/* Fecha de creación - No editable */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4" />
                                        Cuenta Creada
                                    </label>
                                    <p className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">
                                        {profile?.created_at
                                            ? new Date(profile.created_at).toLocaleDateString('es-MX', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : 'No disponible'}
                                    </p>
                                </div>

                                {/* Estado - No editable */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Estado de la Cuenta
                                    </label>
                                    <p className="px-4 py-3 bg-green-50 rounded-xl text-green-700 font-semibold">
                                        ✓ Cuenta Activa
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#175641] hover:bg-[#1a6b4f] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Guardando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                <span>Guardar Cambios</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <X className="w-5 h-5" />
                                        <span>Cancelar</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
