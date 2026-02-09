'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Warehouse } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-terminel-green via-terminel-green-600 to-terminel-green-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container-custom relative z-10 py-20 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white space-y-8"
                    >
                        {/* Anniversary Badge - DESTACADO */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="inline-block"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [0.5, 0.7, 0.5],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-harvest-gold blur-xl rounded-2xl"
                                />
                                <div className="relative bg-gradient-to-r from-harvest-gold to-harvest-gold-600 text-terminel-green px-6 py-3 rounded-xl shadow-2xl border-2 border-white/30 inline-flex items-center space-x-3">
                                    <div>
                                        <div className="font-heading font-black text-3xl leading-none">55 AÑOS</div>
                                        <div className="font-semibold text-xs">1970 - 2025</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Headline */}
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight"
                            >
                                Cultivando el{' '}
                                <span className="text-harvest-gold">Futuro</span>
                                <br />del Campo Sinaloense
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-2xl font-heading font-bold text-harvest-gold mb-3"
                            >
                                Cosechamos Confianza
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="text-lg text-gray-200 leading-relaxed"
                            >
                                Líder agroindustrial en acopio, procesamiento y comercialización de granos.
                                Exportando calidad sinaloense a más de 15 países con certificación ISO 22000:2018.
                            </motion.p>
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {[
                                { icon: TrendingUp, value: "110K", label: "Toneladas" },
                                { icon: Users, value: "400+", label: "Productores" },
                                { icon: Warehouse, value: "15+", label: "Países" },
                            ].map((stat, index) => (
                                <div key={stat.label} className="text-center">
                                    <div className="inline-flex p-2 rounded-lg bg-white/10 backdrop-blur-sm mb-2">
                                        <stat.icon size={20} className="text-harvest-gold" />
                                    </div>
                                    <div className="font-heading font-bold text-2xl text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-300 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                href="/servicios"
                                className="group inline-flex items-center justify-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
                            >
                                <span>Nuestros Servicios</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/nosotros"
                                className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 active:scale-95"
                            >
                                <span>Nuestra Historia</span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative lg:h-[600px] h-[400px]"
                    >
                        {/* Main Image Container */}
                        <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/Camposinaloense.jpg"
                                alt="Campo Sinaloense - Grupo Terminel"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Great Place to Work Badge - Esquina superior derecha */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 }}
                                className="absolute top-6 right-6 z-10"
                            >
                                <div className="bg-white rounded-xl shadow-2xl p-3 hover:scale-105 transition-transform">
                                    <Image
                                        src="/images/greatPlaceToWork.png"
                                        alt="Great Place to Work Certified 2024"
                                        width={120}
                                        height={120}
                                        className="w-28 h-auto"
                                    />
                                </div>
                            </motion.div>

                            {/* ISO Certification Badge - Esquina inferior izquierda */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="absolute bottom-6 left-6 z-10"
                            >
                                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-2 hover:scale-105 transition-transform">
                                    <Image
                                        src="/images/iso.png"
                                        alt="ISO 22000:2018 Certified"
                                        width={100}
                                        height={100}
                                        className="w-24 h-auto"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-harvest-gold/20 rounded-full blur-3xl" />
                        <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator - Solo desktop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
            >
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm text-white/80 font-medium">Descubre más</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
                    >
                        <div className="w-1.5 h-2 bg-white rounded-full mx-auto" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
