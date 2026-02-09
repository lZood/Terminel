'use client'

import { motion } from 'framer-motion'
import { Newspaper, TrendingUp } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 text-white overflow-visible">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 bg-harvest-gold text-terminel-green px-6 py-2 rounded-full font-semibold text-sm mb-6">
                            <Newspaper size={18} />
                            <span>Blog Oficial</span>
                        </div>

                        {/* Headline */}
                        <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
                            Voz del Campo
                        </h1>

                        <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
                            Noticias, actualizaciones y tendencias de Grupo Terminel.
                            Mantente informado sobre la agroindustria en Sinaloa.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-heading font-bold text-harvest-gold mb-1">
                                    55+ años
                                </div>
                                <div className="text-sm text-white/80">De experiencia</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-heading font-bold text-harvest-gold mb-1">
                                    400+
                                </div>
                                <div className="text-sm text-white/80">Productores aliados</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-heading font-bold text-harvest-gold mb-1">
                                    <TrendingUp className="inline-block" size={28} />
                                </div>
                                <div className="text-sm text-white/80">Crecimiento continuo</div>
                            </div>
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
