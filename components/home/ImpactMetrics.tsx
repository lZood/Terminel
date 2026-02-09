'use client'

import { motion } from 'framer-motion'
import { Users, Globe, Package, Trophy } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

const metrics = [
    {
        icon: Users,
        value: '400+',
        label: 'Productores Beneficiados',
        description: 'Aliados del campo sinaloense',
        color: 'from-green-500 to-terminel-green',
    },
    {
        icon: Globe,
        value: '15+',
        label: 'Países de Exportación',
        description: 'Garbanzo sinaloense al mundo',
        color: 'from-harvest-gold-400 to-harvest-gold-600',
    },
    {
        icon: Package,
        value: '1M',
        label: 'Toneladas de Capacidad',
        description: 'Almacenamiento y procesamiento',
        color: 'from-blue-500 to-blue-600',
    },
    {
        icon: Trophy,
        value: '55',
        label: 'Años de Experiencia',
        description: 'Liderazgo agroindustrial',
        color: 'from-purple-500 to-purple-600',
    },
]

export default function ImpactMetrics() {
    return (
        <section className="section-spacing bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Impacto en Números
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Más de cinco décadas fortaleciendo el campo mexicano con resultados tangibles
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:border-terminel-green transition-all duration-300 hover:shadow-lg h-full">
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${metric.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <metric.icon size={32} className="text-white" />
                                </div>

                                {/* Value */}
                                <div className="font-heading font-bold text-5xl lg:text-6xl text-terminel-green mb-2">
                                    {metric.value}
                                </div>

                                {/* Label */}
                                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                                    {metric.label}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-sm">
                                    {metric.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 mb-4">
                        Descubre cómo podemos impulsar tu producción agrícola
                    </p>
                    <a
                        href="/servicios"
                        className="inline-flex items-center space-x-2 text-terminel-green font-semibold hover:text-terminel-green-600 transition-colors group"
                    >
                        <span>Conoce nuestros servicios</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
