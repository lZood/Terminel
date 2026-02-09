'use client'

import { motion } from 'framer-motion'
import { Globe, Award, TrendingUp, MapPin } from 'lucide-react'
import Link from 'next/link'

const stats = [
    { value: '55+', label: 'Years of Experience' },
    { value: '110,000', label: 'Tons Storage Capacity' },
    { value: '15+', label: 'Export Countries' },
    { value: 'ISO 22000', label: 'Certified Quality' },
]

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 text-white overflow-hidden pt-24 lg:pt-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32" />
            </div>

            <div className="container-custom relative z-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
                        >
                            <Globe size={20} className="text-harvest-gold" />
                            <span className="font-semibold">International Division</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-heading font-black text-4xl lg:text-6xl mb-6 leading-tight"
                        >
                            Leading Agricultural
                            <br />
                            <span className="text-harvest-gold">Excellence in Mexico</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-white/90 mb-8 leading-relaxed"
                        >
                            Since 1970, Grupo Terminel has been a trusted partner for agricultural
                            buyers worldwide. We specialize in premium white corn, chickpeas, beans,
                            and wheat, backed by ISO 22000:2018 certification.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-4 mb-8"
                        >
                            <a
                                href="#catalog"
                                className="inline-flex items-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
                            >
                                <span>View Export Catalog</span>
                                <TrendingUp size={18} />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-lg border border-white/20 transition-all duration-300"
                            >
                                <span>Contact Us</span>
                            </a>
                        </motion.div>

                        {/* Language Switcher */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center space-x-2 text-sm text-white/80 hover:text-white transition-colors"
                            >
                                <Globe size={16} />
                                <span>Ver en Español</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Stats */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:scale-105 transition-transform"
                                >
                                    <div className="text-4xl font-heading font-bold text-harvest-gold mb-2">
                                        {stat.value}
                                    </div>
                                    <p className="text-sm text-white/90">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 flex flex-wrap items-center justify-center gap-4"
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 flex items-center space-x-2">
                                <Award size={20} className="text-harvest-gold" />
                                <span className="text-sm font-semibold">ISO 22000:2018</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 flex items-center space-x-2">
                                <MapPin size={20} className="text-harvest-gold" />
                                <span className="text-sm font-semibold">Sinaloa, Mexico</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                </svg>
            </div>
        </section>
    )
}
