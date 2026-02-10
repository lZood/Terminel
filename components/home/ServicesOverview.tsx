'use client'

import { motion } from 'framer-motion'
import { Warehouse, Factory, PackageCheck, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'



export default function ServicesOverview() {
    const t = useTranslations('ServicesOverview')

    const servicesData = [
        {
            icon: Warehouse,
            title: t('services.acopio_title'),
            description: t('services.acopio_desc'),
            capacity: '110,000 Ton',
            features: t('services.acopio_features').split(','),
            color: 'from-terminel-green to-terminel-green-700',
        },
        {
            icon: Factory,
            title: t('services.molino_title'),
            description: t('services.molino_desc'),
            capacity: '28,000 Ton',
            features: t('services.molino_features').split(','),
            color: 'from-harvest-gold-500 to-harvest-gold-700',
        },
        {
            icon: PackageCheck,
            title: t('services.planta_title'),
            description: t('services.planta_desc'),
            capacity: '8 Ton/Hora',
            features: t('services.planta_features').split(','),
            color: 'from-blue-600 to-blue-800',
        },
    ]

    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-gray-100">
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                                {/* Header with gradient */}
                                <div className={`bg-gradient-to-br ${service.color} p-8 text-white`}>
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-4">
                                        <service.icon size={32} />
                                    </div>
                                    <h3 className="font-heading font-bold text-2xl mb-2">
                                        {service.title}
                                    </h3>
                                    <div className="inline-block bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                                        {service.capacity}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-grow flex flex-col">
                                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 mb-6">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center space-x-2 text-sm text-gray-700">
                                                <div className="w-1.5 h-1.5 bg-terminel-green rounded-full" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Learn More Link */}
                                    <Link
                                        href="/servicios"
                                        className="inline-flex items-center space-x-2 text-terminel-green font-semibold hover:text-terminel-green-600 transition-colors group-hover:translate-x-1 transform duration-200"
                                    >
                                        <span>{t('learn_more')}</span>
                                        <ArrowRight size={16} />
                                    </Link>
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
                    className="text-center bg-white rounded-2xl p-8 lg:p-12 shadow-lg"
                >
                    <h3 className="font-heading font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                        {t('complementary_title')}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        {t('complementary_desc')}
                    </p>
                    <Link
                        href="/servicios"
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <span>{t('view_all')}</span>
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
