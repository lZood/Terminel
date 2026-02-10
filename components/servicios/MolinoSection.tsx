'use client'

import { motion } from 'framer-motion'
import { Factory, TrendingUp, CheckCircle, Package } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function MolinoSection() {
    const t = useTranslations('MolinoSection')

    const brands = [
        { nameKey: '0', emoji: '🌾' },
        { nameKey: '1', emoji: '🥖' },
        { nameKey: '2', emoji: '✨' },
    ]

    const specs = [
        { key: 'storage' },
        { key: 'processing' },
        { key: 'years' },
        { key: 'products' },
    ]

    return (
        <section id="molino" className="section-spacing bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Image/Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="card-glass p-8 lg:p-12">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-terminel-green to-terminel-green-700 flex items-center justify-center mb-6 shadow-xl">
                                <Factory size={40} className="text-white" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {specs.map((spec, index) => (
                                    <motion.div
                                        key={spec.key}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="border-l-4 border-harvest-gold pl-4"
                                    >
                                        <div className="text-3xl font-heading font-bold text-terminel-green mb-1">
                                            {t(`specs.${spec.key}.value`)}
                                        </div>
                                        <div className="text-sm text-gray-600">{t(`specs.${spec.key}.label`)}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">{t('brands_title')}</h4>
                                <div className="space-y-3">
                                    {brands.map((brand) => (
                                        <div key={brand.nameKey} className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-harvest-gold to-harvest-gold-600 flex items-center justify-center text-xl shadow-md">
                                                {brand.emoji}
                                            </div>
                                            <span className="text-gray-700 font-medium">{t(`brands.${brand.nameKey}`)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center space-x-2 bg-harvest-gold/20 text-harvest-gold-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
                            <TrendingUp size={18} />
                            <span>{t('badge')}</span>
                        </div>

                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-gray-900 mb-6">
                            {t('title')}
                        </h2>

                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            {t.rich('intro', {
                                green: (chunks) => <strong className="text-terminel-green"> {chunks}</strong>
                            })}
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            {t('description')}
                        </p>

                        <div className="bg-white rounded-xl p-6 border-l-4 border-terminel-green shadow-md">
                            <p className="text-gray-700 leading-relaxed">
                                <strong className="text-terminel-green">{t('modernization_title')}</strong> {t('modernization_desc')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
