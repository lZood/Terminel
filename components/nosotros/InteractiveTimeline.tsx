'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface TimelineEvent {
    year: string
    title: string
    description: string
    icon: string
}

const events: TimelineEvent[] = [
    {
        year: '1970',
        title: 'Nace Grupo Terminel',
        description: 'Don Enrique Terminel Fonseca inicia el negocio de compra-venta de granos en el Valle de Guasave, atraído por la importancia agrícola de la región.',
        icon: '🌱',
    },
    {
        year: '1987',
        title: 'Molino Hernando de Villafañe',
        description: 'Fundación del molino de harinas de trigo, ampliando la capacidad de procesamiento industrial y creando marcas regionales reconocidas.',
        icon: '🏭',
    },
    {
        year: '2000',
        title: 'Expansión de Servicios',
        description: 'Se consolida como distribuidor de insumos agrícolas de primera línea (Asgrow, Yara) y se amplían centros de acopio en toda la región.',
        icon: '📦',
    },
    {
        year: '2016',
        title: 'Modernización Tecnológica',
        description: 'Incorporación de tecnología de precisión agrícola y actualización de infraestructura de molienda con equipos de última generación.',
        icon: '⚙️',
    },
    {
        year: '2024',
        title: 'Great Place to Work',
        description: 'Primera empresa de Guasave certificada como excelente lugar para trabajar, reflejando el compromiso con el bienestar del equipo.',
        icon: '🏆',
    },
    {
        year: '2025',
        title: 'ISO 22000:2018 y ESR',
        description: 'Certificación en gestión de inocuidad alimentaria y Distintivo de Empresa Socialmente Responsable, reafirmando estándares de calidad.',
        icon: '✅',
    },
    {
        year: '2026',
        title: 'Planta Los Valles',
        description: 'Inauguración de nueva planta envasadora con capacidad de 8 toneladas/hora, cumpliendo el sueño del fun de agregar valor más allá del acopio tradicional.',
        icon: '🎯',
    },
]

export default function InteractiveTimeline() {
    const [selectedYear, setSelectedYear] = useState<string | null>(null)

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
                        Línea de Tiempo
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Más de 55 años de innovación, crecimiento y compromiso con el campo mexicano
                    </p>
                </motion.div>

                {/* Timeline - Desktop */}
                <div className="hidden lg:block relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-terminel-green via-harvest-gold to-terminel-green transform -translate-x-1/2" />

                    <div className="space-y-16">
                        {events.map((event, index) => {
                            const isLeft = index % 2 === 0

                            return (
                                <motion.div
                                    key={event.year}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative grid grid-cols-2 gap-8 items-center ${isLeft ? '' : 'direction-rtl'
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`${isLeft ? 'text-right pr-12' : 'col-start-2 pl-12'}`}>
                                        <div
                                            className="card-glass p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                                            onClick={() =>
                                                setSelectedYear(selectedYear === event.year ? null : event.year)
                                            }
                                        >
                                            <div className="text-6xl mb-3">{event.icon}</div>
                                            <div className="text-3xl font-heading font-bold text-terminel-green mb-2">
                                                {event.year}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">{event.description}</p>
                                        </div>
                                    </div>

                                    {/* Year Marker on Line */}
                                    <div
                                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-harvest-gold to-harvest-gold-600 border-4 border-white shadow-lg z-10`}
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Timeline - Mobile */}
                <div className="lg:hidden relative pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-terminel-green via-harvest-gold to-terminel-green" />

                    <div className="space-y-8">
                        {events.map((event, index) => (
                            <motion.div
                                key={event.year}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Dot */}
                                <div className="absolute -left-[18px] top-4 w-6 h-6 rounded-full bg-gradient-to-br from-harvest-gold to-harvest-gold-600 border-4 border-white shadow-lg" />

                                {/* Content */}
                                <div className="card-glass p-5">
                                    <div className="text-5xl mb-3">{event.icon}</div>
                                    <div className="text-2xl font-heading font-bold text-terminel-green mb-2">
                                        {event.year}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
