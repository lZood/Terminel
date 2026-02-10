'use client'

import { motion } from 'framer-motion'
import { User, Sprout, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function CTASection() {
    const t = useTranslations('CTASection')

    return (
        <section className="section-spacing bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 shadow-xl">
                            <Sprout size={40} className="text-terminel-green" />
                        </div>

                        {/* Heading */}
                        <h2 className="font-heading font-bold text-3xl lg:text-5xl mb-6">
                            {t('title')}
                        </h2>

                        <p className="text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed">
                            {t('description')}
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="w-12 h-12 bg-harvest-gold rounded-lg flex items-center justify-center mb-4 shadow-md">
                                    <svg className="w-6 h-6 text-terminel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-semibold text-lg mb-2 text-white">{t('features.tickets_title')}</h3>
                                <p className="text-sm text-white/80">{t('features.tickets_desc')}</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="w-12 h-12 bg-harvest-gold rounded-lg flex items-center justify-center mb-4 shadow-md">
                                    <svg className="w-6 h-6 text-terminel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-semibold text-lg mb-2 text-white">{t('features.settlements_title')}</h3>
                                <p className="text-sm text-white/80">{t('features.settlements_desc')}</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="w-12 h-12 bg-harvest-gold rounded-lg flex items-center justify-center mb-4 shadow-md">
                                    <svg className="w-6 h-6 text-terminel-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-semibold text-lg mb-2 text-white">{t('features.support_title')}</h3>
                                <p className="text-sm text-white/80">{t('features.support_desc')}</p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/portal"
                                className="group flex items-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 text-lg"
                            >
                                <User size={20} />
                                <span>{t('portal_button')}</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/nosotros"
                                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 active:scale-95 text-lg"
                            >
                                <span>{t('about_button')}</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
