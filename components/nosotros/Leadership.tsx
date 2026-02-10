'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Leadership() {
    const t = useTranslations('Leadership')

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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    {/* Main Leader - Alejandro Terminel Rojo */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card-glass overflow-hidden mb-12"
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Image */}
                            <div className="bg-gradient-terminel p-12 flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-8 border-harvest-gold">
                                    <span className="font-heading font-bold text-9xl text-white">AT</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="inline-block bg-harvest-gold text-terminel-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4 self-start">
                                    {t('alejandro.role')}
                                </div>

                                <h3 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                                    {t('alejandro.name')}
                                </h3>

                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    {t('alejandro.bio_1')}
                                </p>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {t('alejandro.bio_2')}
                                </p>

                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-sm text-gray-500 italic mb-4">
                                        {t('alejandro.quote')}
                                    </p>
                                </div>

                                {/* Contact */}
                                <div className="flex items-center space-x-4 mt-6">
                                    <a
                                        href="mailto:alejandro@grupoterminel.com"
                                        className="flex items-center space-x-2 text-terminel-green hover:text-terminel-green-600 transition-colors"
                                    >
                                        <Mail size={18} />
                                        <span className="text-sm">{t('contact')}</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center space-x-2 text-terminel-green hover:text-terminel-green-600 transition-colors"
                                    >
                                        <Linkedin size={18} />
                                        <span className="text-sm">LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Founder Legacy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200"
                    >
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terminel-green to-terminel-green-700 flex items-center justify-center text-white font-heading font-bold text-3xl">
                                    EF
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">
                                    {t('enrique.name')}
                                </h3>
                                <div className="text-sm text-gray-500 mb-4">{t('enrique.role')}</div>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {t('enrique.bio_1')}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('enrique.bio_2')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
