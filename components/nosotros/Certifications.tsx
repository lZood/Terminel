'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Heart, CheckCircle } from 'lucide-react'

const certifications = [
    {
        icon: Award,
        badge: 'GPTW',
        title: 'Great Place to Work',
        year: '2024',
        description: 'Primera empresa de Guasave certificada como excelente lugar para trabajar. Este reconocimiento valida nuestro compromiso con el bienestar,el desarrollo profesional y la inclusión de nuestro equipo.',
        color: 'from-yellow-500 to-yellow-600',
        achievements: [
            'Ambiente laboral inclusivo',
            'Desarrollo profesional continuo',
            'Cultura de reconocimiento',
            'Balance vida-trabajo',
        ],
    },
    {
        icon: Shield,
        badge: 'ISO',
        title: 'ISO 22000:2018',
        year: 'Vigente',
        description: 'Certificación internacional en gestión de inocuidad alimentaria, garantizando la seguridad de nuestros productos desde el acopio hasta la entrega final al consumidor.',
        color: 'from-terminel-green to-terminel-green-700',
        achievements: [
            'Trazabilidad completa',
            'Controles de calidad rigurosos',
            'Cumplimiento normativo internacional',
            'Mejora continua documentada',
        ],
    },
    {
        icon: Heart,
        badge: 'ESR',
        title: 'Empresa Socialmente Responsable',
        year: '2025',
        description: 'Distintivo otorgado por nuestro compromiso con la responsabilidad social, el cuidado del medio ambiente y la ética empresarial en todas nuestras operaciones.',
        color: 'from-red-500 to-red-600',
        achievements: [
            'Prácticas sustentables',
            'Apoyo a la comunidad local',
            'Ética en los negocios',
            'Compromiso ambiental',
        ],
    },
]

export default function Certifications() {
    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Certificaciones y Reconocimientos
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Nuestro compromiso con la excelencia está respaldado por certificaciones internacionales
                        y reconocimientos que validan nuestra calidad y responsabilidad
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="card-glass overflow-hidden"
                        >
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Left: Icon & Badge */}
                                <div className={`bg-gradient-to-br ${cert.color} p-8 lg:p-12 flex flex-col items-center justify-center text-white text-center`}>
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border-4 border-white/50">
                                        <cert.icon size={48} />
                                    </div>
                                    <div className="text-6xl font-heading font-bold mb-2">{cert.badge}</div>
                                    <div className="text-xl font-semibold mb-2">{cert.title}</div>
                                    <div className="bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                                        {cert.year}
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="lg:col-span-2 p-8 lg:p-12">
                                    <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                                        {cert.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        {cert.description}
                                    </p>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900 mb-3">Logros Destacados:</h4>
                                        {cert.achievements.map((achievement) => (
                                            <div key={achievement} className="flex items-start space-x-3">
                                                <CheckCircle size={20} className="text-terminel-green flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-200"
                >
                    <p className="text-gray-700 mb-4">
                        Nuestro compromiso con la calidad y la responsabilidad es constante.
                        Seguimos trabajando para mantener y superar estos estándares.
                    </p>
                    <a
                        href="/servicios"
                        className="inline-flex items-center space-x-2 text-terminel-green font-semibold hover:text-terminel-green-600 transition-colors"
                    >
                        <span>Descubre nuestros servicios certificados</span>
                        <span>→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
