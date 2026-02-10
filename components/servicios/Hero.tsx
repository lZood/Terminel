'use client'

import { motion } from 'framer-motion'
import { Warehouse } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Hero() {
    const t = useTranslations('ServicesHero')

    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-terminel-green to-terminel-green-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-harvest-gold text-terminel-green px-6 py-2 rounded-full font-semibold text-sm mb-6">
                            <Warehouse size={18} />
                            <span>{t('badge')}</span>
                        </div>

                        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-7xl mb-6 leading-tight">
                            {t('title')}
                        </h1>

                        <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
