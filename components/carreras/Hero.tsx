'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react'

const stats = [
    { icon: Users, value: '200+', label: 'Colaboradores' },
    { icon: TrendingUp, value: '55 años', label: 'De experiencia' },
    { icon: Award, value: 'GPTW 2024', label: 'Certificados' },
    { icon: Briefcase, value: '15+', label: 'Áreas activas' },
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
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
                    >
                        <Award size={20} className="text-harvest-gold" />
                        <span className="font-semibold">Great Place to Work 2024</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-black text-4xl lg:text-6xl mb-6 leading-tight"
                    >
                        Únete a Nuestro Equipo
                        <br />
                        <span className="text-harvest-gold">Crece con Nosotros</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                    >
                        En Grupo Terminel no solo cosechamos granos, cultivamos talento.
                        Forma parte de una empresa líder en Sinaloa con 55 años de historia.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                            >
                                <stat.icon size={32} className="text-harvest-gold mb-3 mx-auto" />
                                <div className="text-3xl font-heading font-bold mb-1">{stat.value}</div>
                                <p className="text-sm text-white/80">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
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
