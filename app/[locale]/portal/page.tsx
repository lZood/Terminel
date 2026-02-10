'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, FileText, Settings, HelpCircle } from 'lucide-react';

export default function PortalPage() {
    const quickLinks = [
        {
            title: 'Iniciar Sesión',
            description: 'Accede a tu cuenta de productor',
            icon: LogIn,
            href: '/login',
            color: 'from-[#175641] to-[#1a6b4f]',
        },
        {
            title: 'Registro Nuevo',
            description: 'Crea una cuenta nueva',
            icon: UserPlus,
            href: '/register',
            color: 'from-[#D4AF37] to-[#B8941F]',
        },
        {
            title: 'Documentación',
            description: 'Guías y recursos',
            icon: FileText,
            href: '/portal/docs',
            color: 'from-gray-600 to-gray-700',
        },
        {
            title: 'Ayuda',
            description: 'Centro de soporte',
            icon: HelpCircle,
            href: '/portal/ayuda',
            color: 'from-blue-600 to-blue-700',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Header */}
            <header className="container-custom py-6">
                <Link href="/" className="flex items-center space-x-3 group w-fit">
                    <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                        <Image
                            src="/images/logoTerminel.PNG"
                            alt="Grupo Terminel Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading font-black text-xl leading-none tracking-tighter text-[#175641]">
                            TERMINEL
                        </span>
                        <span className="text-xs text-gray-600">Portal Productor</span>
                    </div>
                </Link>
            </header>

            {/* Main Content */}
            <main className="container-custom py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="mb-8"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <Image
                                    src="/images/logoTerminel.PNG"
                                    alt="Grupo Terminel Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl md:text-6xl font-bold text-[#175641] mb-4"
                        >
                            Portal Productor
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                        >
                            Bienvenido al portal de Grupo Terminel. Gestiona tus operaciones,
                            consulta información y mantente conectado con nosotros.
                        </motion.p>
                    </div>

                    {/* Quick Links Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {quickLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <motion.div
                                    key={link.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="group block bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#175641]"
                                    >
                                        <div className="flex items-start gap-6">
                                            <div
                                                className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#175641] transition-colors">
                                                    {link.title}
                                                </h3>
                                                <p className="text-gray-600">{link.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-16 bg-gradient-to-br from-[#175641] to-[#1a6b4f] rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            ¿Necesitas ayuda?
                        </h2>
                        <p className="text-lg mb-6 opacity-90">
                            Nuestro equipo está disponible para asistirte
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+5212281234567"
                                className="btn-secondary inline-flex items-center justify-center gap-2"
                            >
                                <span>📞</span>
                                <span>Llamar Ahora</span>
                            </a>
                            <a
                                href="https://wa.me/5212281234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 inline-flex items-center justify-center gap-2"
                            >
                                <span>💬</span>
                                <span>WhatsApp</span>
                            </a>
                        </div>
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
