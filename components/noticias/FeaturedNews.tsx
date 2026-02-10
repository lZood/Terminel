'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const featuredArticle = {
    id: 1,
    date: '2026-02-08',
    image: '/api/placeholder/1200/600',
    readTime: '5 min',
}

export default function FeaturedNews() {
    const t = useTranslations('FeaturedNews')

    return (
        <section className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-harvest-gold/20 text-harvest-gold-700 px-6 py-3 rounded-full mb-6">
                        <Sparkles size={20} />
                        <span className="font-semibold">{t('badge')}</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        {t('title')}
                    </h2>
                </motion.div>

                {/* Featured Article Card */}
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card-glass overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-80 lg:h-full overflow-hidden bg-gradient-to-br from-terminel-green-100 to-harvest-gold-100">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="text-8xl mb-4">🏭</div>
                                    <p className="text-terminel-green font-semibold">Planta Envasadora Los Valles</p>
                                </div>
                            </div>
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-terminel-green text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                                    {t('article.category')}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            {/* Meta */}
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Calendar size={16} className="text-terminel-green" />
                                    <span>{new Date(featuredArticle.date).toLocaleDateString()}</span>
                                </div>
                                <span>•</span>
                                <span>{t('read_time', { time: featuredArticle.readTime })}</span>
                            </div>

                            {/* Title */}
                            <h3 className="font-heading font-bold text-2xl lg:text-4xl text-gray-900 mb-4 group-hover:text-terminel-green transition-colors">
                                {t('article.title')}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {t('article.excerpt')}
                            </p>

                            {/* Author & CTA */}
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    {t('by')} <strong className="text-terminel-green">{t('article.author')}</strong>
                                </div>
                                <Link
                                    href={`/noticias/${featuredArticle.id}`}
                                    className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 active:scale-95 group/btn"
                                >
                                    <span>{t('read_more')}</span>
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.article>
            </div>
        </section>
    )
}
