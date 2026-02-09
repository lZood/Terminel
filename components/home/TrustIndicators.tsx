'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Heart, Leaf } from 'lucide-react'
import Image from 'next/image'

const certifications = [
    {
        icon: Award,
        title: 'Great Place to Work',
        description: 'Primera empresa de Guasave certificada como excelente lugar para trabajar',
        year: '2024',
        color: 'from-yellow-500 to-yellow-600',
    },
    {
        icon: Shield,
        title: 'ISO 22000:2018',
        description: 'Certificación en gestión de inocuidad alimentaria y estándares internacionales',
        year: 'Vigente',
        color: 'from-terminel-green to-terminel-green-700',
    },
    {
        icon: Heart,
        title: 'Empresa Socialmente Responsable',
        description: 'Distintivo ESR en reconocimiento a nuestro compromiso social y ambiental',
        year: '2025',
        color: 'from-red-500 to-red-600',
    },
    {
        icon: Leaf,
        title: 'Sostenibilidad',
        description: 'Prácticas agrícolas sustentables y responsables con el medio ambiente',
        year: 'Continuo',
        color: 'from-green-500 to-green-600',
    },
]

export default function TrustIndicators() {
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
                        Confianza que Trasciende
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Nuestro compromiso con la calidad, la responsabilidad social y el desarrollo sustentable
                        está respaldado por certificaciones internacionales
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="card-glass p-6 h-full hover:scale-105 transition-transform duration-300">
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} mb-4`}>
                                    <cert.icon size={28} className="text-white" />
                                </div>
                                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                                    {cert.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                    {cert.description}
                                </p>
                                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                                    {cert.year}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial / Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-terminel-green to-terminel-green-700 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
                        {/* Quote Mark */}
                        <div className="absolute top-4 right-4 text-9xl font-serif text-white/10 leading-none">
                            "
                        </div>

                        <div className="relative z-10">
                            <p className="text-xl lg:text-2xl font-light mb-6 leading-relaxed italic">
                                "Construir la Planta Los Volles cumplió el sueño de mi padre de agregar valor
                                más allá del acopio tradicional. Seguimos comprometidos con el fortalecimiento
                                del campo sinaloense."
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full bg-harvest-gold flex items-center justify-center font-heading font-bold text-2xl text-terminel-green">
                                    AT
                                </div>
                                <div>
                                    <div className="font-heading font-semibold text-lg">
                                        Alejandro Terminel Rojo
                                    </div>
                                    <div className="text-sm text-gray-200">
                                        Director General, Grupo Terminel
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
