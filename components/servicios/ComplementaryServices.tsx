'use client'

import { motion } from 'framer-motion'
import { DollarSign, Sprout, TrendingUp, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
    {
        icon: DollarSign,
        title: 'Financiamiento Agrícola',
        description: 'Créditos de habilitación, adelantos de pago y garantías de precio para maximizar tu flujo de efectivo durante el ciclo agrícola.',
        benefits: ['Adelantos inmediatos', 'Tasas competitivas', 'Trámites ágiles'],
        gradient: 'from-green-500 to-emerald-600',
    },
    {
        icon: Sprout,
        title: 'Asesoría Técnica',
        description: 'Expertos agrónomos que te acompañan desde la siembra hasta la cosecha, optimizando rendimientos con base científica.',
        benefits: ['Análisis de suelo', 'Plan nutricional', 'Monitoreo de cultivos'],
        gradient: 'from-blue-500 to-cyan-600',
    },
    {
        icon: TrendingUp,
        title: 'Distribución de Insumos',
        description: 'Alianzas con las mejores marcas globales: semillas Asgrow, fertilizantes Yara, y nutrición de precisión.',
        benefits: ['Asgrow Seeds', 'Yara Fertilizantes', 'Garantía de calidad'],
        gradient: 'from-purple-500 to-indigo-600',
    },
    {
        icon: Shield,
        title: 'Fondos de Aseguramiento',
        description: 'Protección contra riesgos climáticos y garantías que respaldan tu inversión y esfuerzo.',
        benefits: ['Cobertura amplia', 'Respaldo institucional', 'Tranquilidad total'],
        gradient: 'from-orange-500 to-red-600',
    },
]

export default function ComplementaryServices() {
    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Servicios Complementarios
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Porque entendemos que el éxito agrícola requiere más que acopio,
                        ofrecemos un ecosistema completo de apoyo
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-glass p-8 hover:scale-105 transition-transform duration-300 group"
                        >
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                <service.icon size={28} className="text-white" />
                            </div>

                            <h3 className="font-heading font-bold text-xl text-gray-900 mb-3">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            <div className="space-y-2">
                                {service.benefits.map((benefit) => (
                                    <div key={benefit} className="flex items-center space-x-2 text-sm">
                                        <div className="w-1.5 h-1.5 bg-harvest-gold rounded-full" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 rounded-2xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

                    <div className="relative z-10">
                        <h3 className="font-heading font-bold text-2xl lg:text-4xl mb-4">
                            ¿Listo para maximizar tu producción?
                        </h3>
                        <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                            Únete a más de 400 productores que confían en Grupo Terminel
                            para sus operaciones agrícolas
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/portal"
                                className="group flex items-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 text-lg"
                            >
                                <span>Acceder al Portal</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="tel:+526871234567"
                                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 active:scale-95 text-lg"
                            >
                                <span>Contactar un Asesor</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
