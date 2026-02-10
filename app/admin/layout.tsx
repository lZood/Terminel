'use client';

import '../globals.css';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Truck,
    DollarSign,
    FileText,
    BarChart3,
    Settings,
    Bot,
    Menu,
    X,
    Bell,
    LogOut,
    ChevronDown,
    Search
} from 'lucide-react';
import { authHelpers } from '@/lib/supabase';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Productores', href: '/admin/productores', icon: Users },
    { name: 'Entregas', href: '/admin/entregas', icon: Truck },
    { name: 'Liquidaciones', href: '/admin/liquidaciones', icon: DollarSign },
    { name: 'Documentos', href: '/admin/documentos', icon: FileText },
    { name: 'Reportes', href: '/admin/reportes', icon: BarChart3 },
    { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
    { name: 'IA Hub', href: '/admin/ia-hub', icon: Bot, badge: '🔥 Nuevo' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        checkAdminAccess();
    }, []);

    const checkAdminAccess = async () => {
        const { user: currentUser, error } = await authHelpers.getCurrentUser();

        if (error || !currentUser) {
            router.push('/login');
            return;
        }

        // TODO: Check user role from database
        // For prototype, we assume logged-in user has admin access
        setUser(currentUser);
        setIsLoading(false);
    };

    const handleLogout = async () => {
        await authHelpers.signOut();
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#175641] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Verificando acceso...</p>
                </div>
            </div>
        );
    }

    return (
        <html lang="es">
            <body>
                <div className="min-h-screen bg-gray-100">
                    {/* Mobile sidebar backdrop */}
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSidebarOpen(false)}
                                className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
                            />
                        )}
                    </AnimatePresence>

                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:flex lg:flex-col fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200">
                        {/* Logo */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src="/images/logoTerminel.PNG"
                                        alt="Terminel Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div>
                                    <h1 className="font-heading font-black text-sm leading-none text-[#175641]">
                                        TERMINEL
                                    </h1>
                                    <p className="text-xs text-gray-500">AdminOS</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-[#175641] text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-semibold">{item.name}</span>
                                        </div>
                                        {item.badge && (
                                            <span className={`text-xs px-2 py-1 rounded-full ${item.badge.includes('🔥')
                                                ? 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200 font-bold'
                                                : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User section */}
                        <div className="p-4 border-t border-gray-200 flex-shrink-0">
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#175641] to-[#1a6b4f] rounded-full flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white">
                                        {user?.email?.[0].toUpperCase() || 'A'}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-semibold text-gray-900">
                                            Administrador
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email || 'admin@terminel.com'}
                                        </p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>

                                {/* User dropdown */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm font-semibold">
                                                    Cerrar Sesión
                                                </span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </aside>

                    {/* Sidebar - Mobile */}
                    <motion.aside
                        initial={false}
                        animate={{
                            x: sidebarOpen ? 0 : '-100%',
                        }}
                        className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300"
                    >
                        {/* Logo */}
                        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src="/images/logoTerminel.PNG"
                                        alt="Terminel Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div>
                                    <h1 className="font-heading font-black text-sm leading-none text-[#175641]">
                                        TERMINEL
                                    </h1>
                                    <p className="text-xs text-gray-500">AdminOS</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-[#175641] text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-semibold">{item.name}</span>
                                        </div>
                                        {item.badge && (
                                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User section */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#175641] to-[#1a6b4f] rounded-full flex items-center justify-center text-white font-bold">
                                        {user?.email?.[0].toUpperCase() || 'A'}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-semibold text-gray-900">
                                            Administrador
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user?.email || 'admin@terminel.com'}
                                        </p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>

                                {/* User dropdown */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm font-semibold">
                                                    Cerrar Sesión
                                                </span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main content */}
                    <div className="lg:pl-72">
                        {/* Top header */}
                        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>

                                {/* Search bar */}
                                <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 w-96">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Buscar productor, folio, documento..."
                                        className="bg-transparent border-none outline-none text-sm w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Notifications */}
                                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* Prototype badge */}
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-semibold text-amber-800">
                                        Modo Prototipo
                                    </span>
                                </div>
                            </div>
                        </header>

                        {/* Page content */}
                        <main className="p-6">
                            <div className="max-w-7xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
