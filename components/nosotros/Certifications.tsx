'use client'

import { motion } from 'framer-motion'
import { Award, Shield, Heart, CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Certifications() {
    const t = useTranslations('Certifications')

    const certifications = [
        {
            icon: Award,
            badge: 'GPTW',
            titleKey: 'gptw.title',
            year: '2024',
            descKey: 'gptw.desc',
            color: 'from-yellow-500 to-yellow-600',
            achievementsKey: 'gptw.achievements',
        },
        {
            icon: Shield,
            badge: 'ISO',
            titleKey: 'iso.title',
            year: 'Vigente',
            descKey: 'iso.desc',
            color: 'from-terminel-green to-terminel-green-700',
            achievementsKey: 'iso.achievements',
        },
        {
            icon: Heart,
            badge: 'ESR',
            titleKey: 'esr.title',
            year: '2025',
            descKey: 'esr.desc',
            color: 'from-red-500 to-red-600',
            achievementsKey: 'esr.achievements',
        },
    ]

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
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {certifications.map((cert, index) => {
                        // We reconstruct the achievements array using raw keys because t.raw() might not be fully typed or available depending on setup
                        // Instead, let's just map indices 0-3 since we know the structure has 4 items
                        const achievements = [0, 1, 2, 3].map(i => t(`${cert.achievementsKey}.${i}`))

                        return (
                            <motion.div
                                key={cert.badge}
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
                                        <div className="text-xl font-semibold mb-2">{t(cert.titleKey)}</div>
                                        <div className="bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold">
                                            {cert.year}
                                        </div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="lg:col-span-2 p-8 lg:p-12">
                                        <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">
                                            {t(cert.titleKey)}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                            {t(cert.descKey)}
                                        </p>

                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-gray-900 mb-3">{t('achievements_title')}</h4>
                                            {achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-start space-x-3">
                                                    <CheckCircle size={20} className="text-terminel-green flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700">{achievement}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-200"
                >
                    <p className="text-gray-700 mb-4">
                        {t('cta_text')}
                    </p>
                    <Link
                        href="/servicios"
                        className="inline-flex items-center space-x-2 text-terminel-green font-semibold hover:text-terminel-green-600 transition-colors"
                    >
                        <span>{t('cta_button')}</span>
                        <span>→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
