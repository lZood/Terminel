'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useFormatter } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function LatestNews() {
    const t = useTranslations('LatestNews')
    const format = useFormatter()

    const newsArticles = [
        {
            id: 1,
            title: t('articles.article1.title'),
            excerpt: t('articles.article1.excerpt'),
            category: t('articles.article1.category'),
            publishedAt: '2026-02-08',
            imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=800&q=80',
        },
        {
            id: 2,
            title: t('articles.article2.title'),
            excerpt: t('articles.article2.excerpt'),
            category: t('articles.article2.category'),
            publishedAt: '2026-02-05',
            imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
        },
        {
            id: 3,
            title: t('articles.article3.title'),
            excerpt: t('articles.article3.excerpt'),
            category: t('articles.article3.category'),
            publishedAt: '2026-02-01',
            imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
        },
    ]

    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            {t('description')}
                        </p>
                    </div>
                    <Link
                        href="/noticias"
                        className="hidden lg:flex items-center space-x-2 text-terminel-green font-semibold hover:text-terminel-green-600 transition-colors group"
                    >
                        <span>{t('view_all')}</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsArticles.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/noticias/${article.id}`} className="group block">
                                <div className="card-glass overflow-hidden h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-block bg-harvest-gold text-terminel-green px-3 py-1 rounded-full text-xs font-semibold">{article.category}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                                            <Calendar size={14} />
                                            <time>{format.dateTime(new Date(article.publishedAt), { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                        </div>

                                        <h3 className="font-heading font-semibold text-xl text-gray-900 mb-3 group-hover:text-terminel-green transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex items-center space-x-2 text-terminel-green font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                            <span>{t('read_more')}</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-8 text-center lg:hidden">
                    <Link
                        href="/noticias"
                        className="btn-outline inline-flex items-center space-x-2"
                    >
                        <span>{t('view_all_mobile')}</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    )
}
