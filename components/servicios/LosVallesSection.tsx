'use client'

import { motion } from 'framer-motion'
import { PackageCheck, Zap, Award, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function LosVallesSection() {
    const t = useTranslations('LosVallesSection')

    const features = [
        {
            icon: Zap,
            key: 'processing',
        },
        {
            icon: PackageCheck,
            key: 'packaging',
        },
        {
            icon: Award,
            key: 'quality',
        },
        {
            icon: Users,
            key: 'social',
        },
    ]

    // Since products is a simple array of strings in JSON, we can fetch them by index or map them if we know count
    // But t.raw is safer if configured, or just map indices 0,1,2
    const products = [0, 1, 2].map(i => t(`products.${i}`))

    return (
        <section id="los-valles" className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block bg-gradient-harvest text-terminel-green px-6 py-2 rounded-full font-bold text-sm mb-6">
                        {t('badge')}
                    </div>

                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-6">
                        {t('title')}
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                    {/* Left: Hero Image/Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="card-glass p-8 lg:p-12 bg-gradient-to-br from-terminel-green to-terminel-green-700 text-white">
                            <h3 className="font-heading font-bold text-4xl mb-4">{t('stat_capacity_title')}</h3>
                            <p className="text-xl text-gray-100 mb-8">
                                {t('stat_capacity_desc')}
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-3xl font-heading font-bold mb-2">{t('stat_storage_title')}</div>
                                    <div className="text-sm text-gray-200">{t('stat_storage_desc')}</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-heading font-bold mb-2">{t('stat_bags_title')}</div>
                                    <div className="text-sm text-gray-200">{t('stat_bags_desc')}</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/20">
                                <h4 className="font-semibold mb-3">{t('processed_products_title')}</h4>
                                <div className="space-y-2">
                                    {products.map((product) => (
                                        <div key={product} className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-harvest-gold rounded-full" />
                                            <span className="text-gray-100">{product}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start space-x-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-harvest-gold to-harvest-gold-600 flex items-center justify-center shadow-lg">
                                    <feature.icon size={24} className="text-terminel-green" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                                        {t(`features.${feature.key}.title`)}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {t(`features.${feature.key}.desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12 border-l-4 border-terminel-green"
                >
                    <p className="text-xl text-gray-700 leading-relaxed italic mb-4">
                        {t('quote')}
                    </p>
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-terminel-green flex items-center justify-center text-white font-heading font-bold">
                            AT
                        </div>
                        <div>
                            <div className="font-semibold text-gray-900">{t('quote_author')}</div>
                            <div className="text-sm text-gray-600">{t('quote_role')}</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
