'use client'

import { motion } from 'framer-motion'
import { Warehouse, MapPin, Truck, Scale } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Chickpea SVG Component
const ChickpeaIcon = () => (
    <svg viewBox="0 0 100 100" className="w-11 h-11" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main body of chickpea */}
        <circle cx="50" cy="52" r="35" fill="#f1be67" />
        {/* Characteristic indentation/beak */}
        <path
            d="M 20 35 Q 30 25, 45 28 Q 35 40, 25 42 Z"
            fill="#e8ab52"
        />
        {/* Highlight for depth */}
        <ellipse cx="40" cy="38" rx="12" ry="8" fill="#f9d08f" opacity="0.6" />
        {/* Shadow for depth */}
        <ellipse cx="55" cy="65" rx="25" ry="15" fill="#d9a347" opacity="0.3" />
    </svg>
)

export default function AcopioSection() {
    const t = useTranslations('AcopioSection')

    const locations = [
        'guasave_centro',
        'ruiz_cortines',
        'bamoa',
        'los_mochis',
    ]

    const grains = [
        { nameKey: 'white_corn', descKey: 'capacity', emoji: '🌽', color: 'from-yellow-400 to-yellow-600', type: 'emoji' },
        { nameKey: 'chickpea', descKey: 'export', color: 'from-amber-100 to-amber-200', type: 'chickpea' },
        { nameKey: 'bean', descKey: 'quality', emoji: '🫘', color: 'from-red-400 to-red-600', type: 'emoji' },
        { nameKey: 'wheat', descKey: 'variety', emoji: '🌾', color: 'from-orange-400 to-orange-600', type: 'emoji' },
    ]

    return (
        <section id="acopio" className="section-spacing bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-4 py-2 rounded-full font-semibold text-sm mb-6">
                            <Warehouse size={18} />
                            <span>{t('badge')}</span>
                        </div>

                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-gray-900 mb-6">
                            {t('title')}
                        </h2>

                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            {t.rich('description_1', {
                                green: (chunks) => <strong className="text-terminel-green">{chunks}</strong>
                            })}
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {t('description_2')}
                        </p>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start space-x-3">
                                <Scale size={24} className="text-harvest-gold flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{t('feature_scale')}</h4>
                                    <p className="text-sm text-gray-600">{t('feature_scale_desc')}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Truck size={24} className="text-harvest-gold flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">{t('feature_logistics')}</h4>
                                    <p className="text-sm text-gray-600">{t('feature_logistics_desc')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Locations */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                                <MapPin size={18} className="text-terminel-green" />
                                <span>{t('locations_title')}</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {locations.map((location) => (
                                    <span
                                        key={location}
                                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                                    >
                                        {t(`locations.${location}`)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Grains Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {grains.map((grain, index) => (
                            <motion.div
                                key={grain.nameKey}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-glass p-6 hover:scale-105 transition-transform duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${grain.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {grain.type === 'chickpea' ? (
                                        <ChickpeaIcon />
                                    ) : (
                                        <span className="text-4xl">{grain.emoji}</span>
                                    )}
                                </div>
                                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                                    {t(`grains.${grain.nameKey}`)}
                                </h3>
                                <p className="text-sm text-terminel-green font-semibold">
                                    {t(`grains.${grain.descKey}`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
