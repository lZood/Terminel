'use client'

import { motion } from 'framer-motion'
import { Award, Download, CheckCircle, Calendar, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const certifications = [
    {
        name: 'Great Place to Work',
        year: '2024',
        issuer: 'Great Place to Work® Institute',
        description: 'Certificación que reconoce a las organizaciones con las mejores prácticas de ambiente laboral y cultura organizacional.',
        validUntil: '2025',
        score: 'Nivel Platino',
        benefits: [
            'Ambiente de confianza y credibilidad',
            'Orgullo por el trabajo realizado',
            'Camaradería entre colaboradores',
            'Desarrollo profesional continuo',
        ],
        color: 'from-blue-500 to-cyan-600',
        icon: '🏆',
    },
    {
        name: 'ISO 22000:2018',
        year: '2018',
        issuer: 'International Organization for Standardization',
        description: 'Sistema de gestión de inocuidad de los alimentos que garantiza la seguridad alimentaria en toda la cadena de suministro.',
        validUntil: 'Vigente',
        scope: 'Acopio, molienda y empaquetado',
        benefits: [
            'Trazabilidad completa de productos',
            'Control de puntos críticos (HACCP)',
            'Auditorías internas periódicas',
            'Cumplimiento internacional',
        ],
        color: 'from-red-500 to-orange-600',
        icon: '✓',
    },
]

export default function CertificationsShowcase() {
    return (
        <section className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-harvest-gold/20 text-harvest-gold-700 px-6 py-3 rounded-full mb-6">
                        <Award size={20} />
                        <span className="font-semibold">Reconocimientos</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Certificaciones y Acreditaciones
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Nuestro compromiso con la excelencia está respaldado por certificaciones
                        internacionales y reconocimientos de prestigio
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="card-glass p-8 hover:shadow-2xl transition-all duration-300 group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                                        {cert.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-xl text-gray-900 mb-1">
                                            {cert.name}
                                        </h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <Calendar size={14} />
                                            <span>Obtenida en {cert.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {cert.description}
                                </p>
                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Emisor</div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {cert.issuer}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Vigencia</div>
                                        <div className="text-sm font-semibold text-green-600">
                                            {cert.validUntil}
                                        </div>
                                    </div>
                                    {cert.scope && (
                                        <div className="col-span-2">
                                            <div className="text-xs text-gray-500 mb-1">Alcance</div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {cert.scope}
                                            </div>
                                        </div>
                                    )}
                                    {cert.score && (
                                        <div className="col-span-2">
                                            <div className="text-xs text-gray-500 mb-1">Nivel</div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {cert.score}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">Beneficios Clave:</h4>
                                <ul className="space-y-2">
                                    {cert.benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start space-x-2">
                                            <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3">
                                <button className="flex-1 flex items-center justify-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors">
                                    <Download size={18} />
                                    <span>Descargar Certificado</span>
                                </button>
                                <button className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    <ExternalLink size={18} className="text-gray-700" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA for More Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 rounded-2xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

                    <div className="relative z-10">
                        <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-4">
                            ¿Quieres conocer más sobre nuestro compromiso?
                        </h3>
                        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                            Descubre cómo trabajamos cada día para construir un futuro más sostenible
                            y responsable para Sinaloa
                        </p>
                        <Link
                            href="/nosotros"
                            className="inline-flex items-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
                        >
                            <span>Conoce Nuestra Historia</span>
                            <ExternalLink size={18} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
