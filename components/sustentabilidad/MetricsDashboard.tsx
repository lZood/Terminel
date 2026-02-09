'use client'

import { motion } from 'framer-motion'
import {
    Users,
    Droplet,
    Leaf,
    Award,
    TrendingUp,
    Heart,
    Shield,
    Zap,
    CheckCircle
} from 'lucide-react'

const socialMetrics = [
    {
        icon: Award,
        title: 'Great Place to Work',
        value: 'Certificados 2024',
        description: 'Reconocidos como uno de los mejores lugares para trabajar en Sinaloa',
        color: 'from-blue-500 to-blue-600',
        trend: '+15%',
    },
    {
        icon: Users,
        title: 'Productores Beneficiados',
        value: '400+',
        description: 'Familias productoras que confían en nuestros servicios',
        color: 'from-green-500 to-emerald-600',
        trend: '+8%',
    },
    {
        icon: Heart,
        title: 'Satisfacción Laboral',
        value: '92%',
        description: 'Índice de satisfacción de nuestros colaboradores',
        color: 'from-pink-500 to-rose-600',
        trend: '+5%',
    },
    {
        icon: TrendingUp,
        title: 'Capacitación',
        value: '2,400 hrs',
        description: 'Horas de formación profesional impartidas anualmente',
        color: 'from-purple-500 to-indigo-600',
        trend: '+20%',
    },
]

const environmentalMetrics = [
    {
        icon: Droplet,
        title: 'Ahorro de Agua',
        value: '35%',
        description: 'Reducción en consumo de agua desde 2020',
        color: 'from-cyan-500 to-blue-600',
        trend: '+12%',
    },
    {
        icon: Zap,
        title: 'Eficiencia Energética',
        value: '28%',
        description: 'Mejora en eficiencia energética vs 2019',
        color: 'from-yellow-500 to-orange-600',
        trend: '+8%',
    },
    {
        icon: Leaf,
        title: 'Reducción de Residuos',
        value: '42%',
        description: 'Menos residuos enviados a rellenos sanitarios',
        color: 'from-green-500 to-teal-600',
        trend: '+15%',
    },
    {
        icon: Leaf,
        title: 'Huella de Carbono',
        value: '-18%',
        description: 'Reducción en emisiones de CO₂ desde 2018',
        color: 'from-emerald-500 to-green-700',
        trend: 'Mejora',
    },
]

const governanceMetrics = [
    {
        icon: Shield,
        title: 'ISO 22000:2018',
        value: 'Certificado',
        description: 'Sistema de gestión de inocuidad alimentaria',
        color: 'from-red-500 to-rose-600',
    },
    {
        icon: CheckCircle,
        title: 'Tasa de Incidentes',
        value: '0.02%',
        description: 'Índice de seguridad ocupacional',
        color: 'from-orange-500 to-red-600',
    },
]

export default function MetricsDashboard() {
    return (
        <section className="section-spacing bg-white">
            <div className="container-custom">
                {/* Social Impact */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                            Impacto Social
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Nuestro compromiso con las personas que hacen posible nuestra operación
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {socialMetrics.map((metric, index) => (
                            <motion.div
                                key={metric.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-glass p-6 hover:scale-105 transition-transform duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <metric.icon size={28} className="text-white" />
                                </div>
                                <div className="text-3xl font-heading font-bold text-gray-900 mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-semibold text-terminel-green mb-2 flex items-center gap-2">
                                    {metric.title}
                                    {metric.trend && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            {metric.trend}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {metric.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Environmental Impact */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                            Impacto Ambiental
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Procesos eco-eficientes que protegen nuestros recursos naturales
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {environmentalMetrics.map((metric, index) => (
                            <motion.div
                                key={metric.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-glass p-6 hover:scale-105 transition-transform duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <metric.icon size={28} className="text-white" />
                                </div>
                                <div className="text-3xl font-heading font-bold text-gray-900 mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-semibold text-terminel-green mb-2 flex items-center gap-2">
                                    {metric.title}
                                    {metric.trend && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            {metric.trend}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {metric.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Governance */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                            Gobernanza y Cumplimiento
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Estándares internacionales que garantizan nuestras operaciones
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {governanceMetrics.map((metric, index) => (
                            <motion.div
                                key={metric.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-glass p-8 hover:scale-105 transition-transform duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <metric.icon size={32} className="text-white" />
                                </div>
                                <div className="text-3xl font-heading font-bold text-gray-900 mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-semibold text-terminel-green mb-2">
                                    {metric.title}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {metric.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
