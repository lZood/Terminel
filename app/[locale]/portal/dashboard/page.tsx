'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogOut, User, FileText, BarChart3, Package } from 'lucide-react';
import { authHelpers, UserProfile } from '@/lib/supabase';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        }

        setIsLoading(false);
    };

    const handleSignOut = async () => {
        await authHelpers.signOut();
        router.push('/portal');
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

    const quickActions = [
        {
            title: 'Mi Perfil',
            description: 'Ver y editar información',
            icon: User,
            href: '/portal/profile',
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Documentos',
            description: 'Mis documentos y archivos',
            icon: FileText,
            href: '/portal/documentos',
            color: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Ventas',
            description: 'Historial de entregas',
            icon: Package,
            href: '/portal/products',
            color: 'from-orange-500 to-orange-600',
        },
        {
            title: 'Reportes',
            description: 'Estadísticas y análisis',
            icon: BarChart3,
            href: '/portal/reports',
            color: 'from-green-500 to-green-600',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
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
                                <span className="text-xs text-gray-600">Portal Productor</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container-custom py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Welcome Section */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-[#175641] mb-2">
                            ¡Bienvenido, {profile?.nombre || 'Usuario'}!
                        </h1>
                        <p className="text-gray-600 text-lg">
                            RFC: {profile?.rfc || 'N/A'} {profile?.empresa && `· ${profile.empresa}`}
                        </p>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <motion.div
                                    key={action.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={action.href}
                                        className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#175641]"
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#175641] transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{action.description}</p>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Logout Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex justify-center mt-8"
                    >
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </motion.div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="container-custom py-8 mt-16">
                <div className="text-center text-gray-600">
                    <p className="text-sm">
                        Grupo Terminel © 2026 - Excelencia Agrícola desde 1970
                    </p>
                </div>
            </footer>
        </div>
    );
}
