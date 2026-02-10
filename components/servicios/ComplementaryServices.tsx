'use client'

import { motion } from 'framer-motion'
import { DollarSign, Sprout, TrendingUp, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ComplementaryServices() {
    const t = useTranslations('ComplementaryServices')

    const services = [
        {
            icon: DollarSign,
            key: 'financing',
            gradient: 'from-green-500 to-emerald-600',
        },
        {
            icon: Sprout,
            key: 'advisory',
            gradient: 'from-blue-500 to-cyan-600',
        },
        {
            icon: TrendingUp,
            key: 'supplies',
            gradient: 'from-purple-500 to-indigo-600',
        },
        {
            icon: Shield,
            key: 'insurance',
            gradient: 'from-orange-500 to-red-600',
        },
    ]

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
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {services.map((service, index) => {
                        const benefits = [0, 1, 2].map(i => t(`${service.key}.benefits.${i}`))

                        return (
                            <motion.div
                                key={service.key}
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
                                    {t(`${service.key}.title`)}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {t(`${service.key}.desc`)}
                                </p>

                                <div className="space-y-2">
                                    {benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center space-x-2 text-sm">
                                            <div className="w-1.5 h-1.5 bg-harvest-gold rounded-full" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
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
                            {t('cta_title')}
                        </h3>
                        <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                            {t('cta_desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/portal"
                                className="group flex items-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 text-lg"
                            >
                                <span>{t('cta_portal')}</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="tel:+526871234567"
                                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 active:scale-95 text-lg"
                            >
                                <span>{t('cta_contact')}</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
