'use client'

import { motion } from 'framer-motion'
import { Calendar, Leaf, Award, Users, Factory, TrendingUp } from 'lucide-react'

const milestones = [
    {
        year: '1970',
        icon: Users,
        title: 'Fundación de Grupo Terminel',
        description: 'Don Enrique Terminel Fonseca inicia operaciones de acopio en Sinaloa',
        category: 'Empresa',
        color: 'from-blue-500 to-blue-600',
    },
    {
        year: '1987',
        icon: Factory,
        title: 'Molino Hernando de Villafañe',
        description: 'Apertura del molino de trigo, diversificando operaciones',
        category: 'Expansión',
        color: 'from-purple-500 to-indigo-600',
    },
    {
        year: '2016',
        icon: TrendingUp,
        title: 'Modernización Tecnológica',
        description: 'Actualización de equipos de molienda con tecnología de precisión',
        category: 'Innovación',
        color: 'from-orange-500 to-red-600',
    },
    {
        year: '2018',
        icon: Award,
        title: 'Certificación ISO 22000:2018',
        description: 'Obtención de certificación internacional de inocuidad alimentaria',
        category: 'Calidad',
        color: 'from-red-500 to-rose-600',
    },
    {
        year: '2020',
        icon: Leaf,
        title: 'Programa de Sustentabilidad',
        description: 'Inicio de medición y reducción de huella ambiental',
        category: 'Ambiental',
        color: 'from-green-500 to-emerald-600',
    },
    {
        year: '2024',
        icon: Award,
        title: 'Great Place to Work',
        description: 'Reconocimiento como uno de los mejores lugares para trabajar',
        category: 'Social',
        color: 'from-cyan-500 to-blue-600',
    },
    {
        year: '2026',
        icon: Factory,
        title: 'Planta Envasadora Los Valles',
        description: 'Inauguración de planta de empaquetado moderno (8 ton/hora)',
        category: 'Expansión',
        color: 'from-yellow-500 to-orange-600',
    },
    {
        year: '2030',
        icon: Leaf,
        title: 'Neutralidad de Carbono',
        description: 'Meta: Operaciones 100% neutras en emisiones de carbono',
        category: 'Meta Futura',
        color: 'from-teal-500 to-green-600',
    },
]

export default function ImpactTimeline() {
    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-6 py-3 rounded-full mb-6">
                        <Calendar size={20} />
                        <span className="font-semibold">Nuestra Trayectoria</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Línea de Tiempo de Impacto
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        55 años de evolución continua, siempre comprometidos con nuestros productores,
                        colaboradores y el medio ambiente
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-terminel-green via-harvest-gold to-terminel-green hidden lg:block" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => {
                            const isEven = index % 2 === 0

                            return (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 w-full">
                                        <div className={`card-glass p-6 lg:p-8 hover:scale-105 transition-transform duration-300 ${isEven ? 'lg:text-right' : 'lg:text-left'
                                            }`}>
                                            <div className={`inline-flex items-center space-x-2 bg-${milestone.category === 'Meta Futura' ? 'purple' : 'gray'}-100 px-3 py-1 rounded-full mb-3`}>
                                                <span className="text-xs font-semibold text-gray-700">
                                                    {milestone.category}
                                                </span>
                                            </div>
                                            <h3 className="font-heading font-bold text-xl lg:text-2xl text-gray-900 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-3">
                                                {milestone.description}
                                            </p>
                                            <div className="text-terminel-green font-bold text-lg">
                                                {milestone.year}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Icon Circle */}
                                    <div className="relative flex-shrink-0">
                                        <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-2xl border-4 border-white z-10 relative`}>
                                            <milestone.icon size={28} className="text-white" />
                                        </div>
                                        {/* Year Badge - Mobile */}
                                        <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-terminel-green text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                                            {milestone.year}
                                        </div>
                                    </div>

                                    {/* Spacer for even layout */}
                                    <div className="flex-1 hidden lg:block" />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
