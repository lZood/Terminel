'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Filter, Building2, TrendingUp, CloudRain, Award } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type CategoryKey = 'all' | 'company' | 'trends' | 'weather_alerts' | 'success_stories'

interface NewsArticle {
    id: number
    category: Exclude<CategoryKey, 'all'>
    date: string
    image: string
    readTime: string
    icon: string
}

const articles: NewsArticle[] = [
    {
        id: 2,
        category: 'company',
        date: '2026-02-05',
        image: '/api/placeholder/600/400',
        readTime: '3 min',
        icon: '🤝',
    },
    {
        id: 3,
        category: 'company',
        date: '2026-02-01',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '🏗️',
    },
    {
        id: 4,
        category: 'success_stories',
        date: '2026-01-28',
        image: '/api/placeholder/600/400',
        readTime: '5 min',
        icon: '🌟',
    },
    {
        id: 5,
        category: 'weather_alerts',
        date: '2026-01-25',
        image: '/api/placeholder/600/400',
        readTime: '3 min',
        icon: '🌧️',
    },
    {
        id: 6,
        category: 'trends',
        date: '2026-01-20',
        image: '/api/placeholder/600/400',
        readTime: '6 min',
        icon: '📈',
    },
    {
        id: 7,
        category: 'company',
        date: '2026-01-15',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '🏆',
    },
    {
        id: 8,
        category: 'company',
        date: '2026-01-12',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '💻',
    },
    {
        id: 9,
        category: 'company',
        date: '2026-01-08',
        image: '/api/placeholder/600/400',
        readTime: '5 min',
        icon: '🎉',
    },
    {
        id: 10,
        category: 'weather_alerts',
        date: '2026-01-05',
        image: '/api/placeholder/600/400',
        readTime: '6 min',
        icon: '☀️',
    },
    {
        id: 11,
        category: 'trends',
        date: '2025-12-28',
        image: '/api/placeholder/600/400',
        readTime: '5 min',
        icon: '🌍',
    },
    {
        id: 12,
        category: 'success_stories',
        date: '2025-12-20',
        image: '/api/placeholder/600/400',
        readTime: '7 min',
        icon: '🚜',
    },
    {
        id: 13,
        category: 'company',
        date: '2025-12-15',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '🎓',
    },
]

const categoriesConfig: { key: CategoryKey, icon: any }[] = [
    { key: 'all', icon: Filter },
    { key: 'company', icon: Building2 },
    { key: 'trends', icon: TrendingUp },
    { key: 'weather_alerts', icon: CloudRain },
    { key: 'success_stories', icon: Award },
]

const categoryColors: Record<Exclude<CategoryKey, 'all'>, string> = {
    'company': 'bg-terminel-green text-white',
    'trends': 'bg-blue-600 text-white',
    'weather_alerts': 'bg-orange-600 text-white',
    'success_stories': 'bg-purple-600 text-white',
}

export default function NewsGrid() {
    const t = useTranslations('NewsGrid')
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all')

    const filteredArticles = selectedCategory === 'all'
        ? articles
        : articles.filter(article => article.category === selectedCategory)

    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap justify-center gap-3">
                        {categoriesConfig.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setSelectedCategory(cat.key)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === cat.key
                                        ? 'bg-terminel-green text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{t(`categories.${cat.key}`)}</span>
                                </button>
                            )
                        })}
                    </div>
                    <div className="text-center mt-4 text-sm text-gray-600">
                        {/* 
                           Warning: complex ICU message for plural might be tricky if not set up.
                           But next-intl supports it. 
                           "showing_articles": "Mostrando <strong>{count}</strong> {count, plural, one {artículo} other {artículos}}"
                        */}
                        <span dangerouslySetInnerHTML={{ __html: t('showing_articles', { count: filteredArticles.length }) }} />
                        {/* Or simpler approach if dangerouslySet is avoided */}
                        {/* Actually, t.rich is better but t.raw works for HTML strings if we are careful. */}
                    </div>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-glass overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col"
                        >
                            {/* Image/Icon */}
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-7xl">{article.icon}</div>
                                </div>
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1.5 rounded-lg font-semibold text-xs shadow-lg ${categoryColors[article.category]}`}>
                                        {t(`categories.${article.category}`)}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Meta */}
                                <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} className="text-terminel-green" />
                                        <span>{new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={14} className="text-terminel-green" />
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 group-hover:text-terminel-green transition-colors line-clamp-2">
                                    {t(`articles.${article.id}.title`)}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                                    {t(`articles.${article.id}.excerpt`)}
                                </p>

                                {/* CTA */}
                                <Link
                                    href={`/noticias/${article.id}`}
                                    className="inline-flex items-center space-x-2 text-terminel-green hover:text-terminel-green-700 font-semibold text-sm group/link"
                                >
                                    <span>{t('read_full_article')}</span>
                                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* No Results */}
                {filteredArticles.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📰</div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                            {t('no_articles_title')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {t('no_articles_desc')}
                        </p>
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            <span>{t('view_all')}</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
