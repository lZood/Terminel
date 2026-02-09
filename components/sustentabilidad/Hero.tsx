'use client'

import { motion } from 'framer-motion'
import { Sprout, Heart, Award } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32" />
            </div>

            <div className="container-custom relative z-10 py-20 lg:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
                    >
                        <Sprout size={20} className="text-harvest-gold" />
                        <span className="font-semibold">Nuestro Compromiso con el Futuro</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-black text-4xl lg:text-6xl mb-6 leading-tight"
                    >
                        Cosechamos Confianza,
                        <br />
                        <span className="text-harvest-gold">Sembramos Sustentabilidad</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                    >
                        Desde 1970, hemos construido un legado de responsabilidad social y ambiental.
                        Descubre cómo medimos nuestro impacto y trabajamos por un futuro más sostenible.
                    </motion.p>

                    {/* Key Pillars */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                    >
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Heart size={32} className="text-harvest-gold mb-3 mx-auto" />
                            <h3 className="font-bold text-lg mb-2">Social</h3>
                            <p className="text-sm text-white/80">400+ productores beneficiados</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Sprout size={32} className="text-harvest-gold mb-3 mx-auto" />
                            <h3 className="font-bold text-lg mb-2">Ambiental</h3>
                            <p className="text-sm text-white/80">Procesos eco-eficientes</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Award size={32} className="text-harvest-gold mb-3 mx-auto" />
                            <h3 className="font-bold text-lg mb-2">Gobernanza</h3>
                            <p className="text-sm text-white/80">Certificaciones internacionales</p>
                        </div>
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
