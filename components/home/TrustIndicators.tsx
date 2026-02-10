'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Heart, Leaf } from 'lucide-react'
import Image from 'next/image'

import { useTranslations } from 'next-intl'

export default function TrustIndicators() {
    const t = useTranslations('TrustIndicators')

    const certifications = [
        {
            icon: Award,
            title: t('certifications.gptw_title'),
            description: t('certifications.gptw_desc'),
            year: t('certifications.gptw_year'),
            color: 'from-yellow-500 to-yellow-600',
        },
        {
            icon: Shield,
            title: t('certifications.iso_title'),
            description: t('certifications.iso_desc'),
            year: t('certifications.iso_year'),
            color: 'from-terminel-green to-terminel-green-700',
        },
        {
            icon: Heart,
            title: t('certifications.esr_title'),
            description: t('certifications.esr_desc'),
            year: t('certifications.esr_year'),
            color: 'from-red-500 to-red-600',
        },
        {
            icon: Leaf,
            title: t('certifications.sustainability_title'),
            description: t('certifications.sustainability_desc'),
            year: t('certifications.sustainability_year'),
            color: 'from-green-500 to-green-600',
        },
    ]
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
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('description')}
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
                                "{t('quote.text')}"
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full bg-harvest-gold flex items-center justify-center font-heading font-bold text-2xl text-terminel-green">
                                    AT
                                </div>
                                <div>
                                    <div className="font-heading font-semibold text-lg">
                                        {t('quote.author')}
                                    </div>
                                    <div className="text-sm text-gray-200">
                                        {t('quote.role')}
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
