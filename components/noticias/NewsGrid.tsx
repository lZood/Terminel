'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Filter, Building2, TrendingUp, CloudRain, Award } from 'lucide-react'
import Link from 'next/link'

interface NewsArticle {
    id: number
    title: string
    excerpt: string
    category: 'Empresa' | 'Tendencias' | 'Alertas Climáticas' | 'Casos de Éxito'
    date: string
    image: string
    readTime: string
    icon: string
}

const articles: NewsArticle[] = [
    {
        id: 2,
        title: 'Grupo Terminel firma alianza estratégica con Asgrow para temporada 2026',
        excerpt: 'Fortalecemos nuestra oferta de semillas premium para productores con las mejores variedades de maíz blanco adaptadas al clima de Sinaloa.',
        category: 'Empresa',
        date: '2026-02-05',
        image: '/api/placeholder/600/400',
        readTime: '3 min',
        icon: '🤝',
    },
    {
        id: 3,
        title: 'Modernización de silos en Bamoa: Mayor capacidad de almacenamiento',
        excerpt: 'Inversión de $15 millones mejora infraestructura y aumenta capacidad en 20,000 toneladas adicionales.',
        category: 'Empresa',
        date: '2026-02-01',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '🏗️',
    },
    {
        id: 4,
        title: 'Productores locales superan expectativas de cosecha de garbanzo 2025',
        excerpt: 'Don Miguel Torres de Ruiz Cortines logró rendimiento de 3.2 ton/ha con asesoría técnica de nuestro equipo agrónomo.',
        category: 'Casos de Éxito',
        date: '2026-01-28',
        image: '/api/placeholder/600/400',
        readTime: '5 min',
        icon: '🌟',
    },
    {
        id: 5,
        title: 'Pronóstico favorable: Temporada de lluvias beneficiará ciclo primavera-verano',
        excerpt: 'Análisis climático regional indica condiciones óptimas para maíz y frijol en los próximos meses.',
        category: 'Alertas Climáticas',
        date: '2026-01-25',
        image: '/api/placeholder/600/400',
        readTime: '3 min',
        icon: '🌧️',
    },
    {
        id: 6,
        title: 'Precio internacional del maíz alcanza máximo histórico en enero',
        excerpt: 'Mercados internacionales favorecen exportaciones mexicanas. Análisis de oportunidades para productores.',
        category: 'Tendencias',
        date: '2026-01-20',
        image: '/api/placeholder/600/400',
        readTime: '6 min',
        icon: '📈',
    },
    {
        id: 7,
        title: 'Grupo Terminel recibe certificación Great Place to Work 2024',
        excerpt: 'Reconocimiento destaca nuestro compromiso con el bienestar de más de 200 colaboradores en toda la región.',
        category: 'Empresa',
        date: '2026-01-15',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '🏆',
    },
    {
        id: 8,
        title: 'Nuevas capacitaciones digitales para productores: Portal Terminel 2.0',
        excerpt: 'Lanzamos programa de formación online gratuito sobre tecnología agrícola, manejo de siembra y comercialización para todos nuestros aliados.',
        category: 'Empresa',
        date: '2026-01-12',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '💻',
    },
    {
        id: 9,
        title: 'Celebramos el Día del Productor con más de 500 agricultores de la región',
        excerpt: 'Evento anual reunió a productores de Guasave, Los Mochis y Bamoa con conferencias magistrales sobre innovación agrícola y networking.',
        category: 'Empresa',
        date: '2026-01-08',
        image: '/api/placeholder/600/400',
        readTime: '5 min',
        icon: '🎉',
    },
    {
        id: 10,
        title: 'Alerta: Recomendaciones ante posible periodo de sequía en marzo',
        excerpt: 'Nuestro equipo meteorológico sugiere estrategias de riego eficiente y variedades resistentes para mitigar riesgos climáticos.',
        category: 'Alertas Climáticas',
        date: '2026-01-05',
        image: '/api/placeholder/600/400',
        readTime: '6 min',
        icon: '☀️',
    },
    {
        id: 11,
        title: 'Exportación récord: Garbanzo sinaloense rompe cifras en mercados asiáticos',
        excerpt: 'India y Turquía incrementan demanda 35% respecto al año anterior. Oportunidad histórica para productores locales.',
        category: 'Tendencias',
        date: '2025-12-28',
        image: '/api/placeholder/600/400',
        readTime: '5 min',
        icon: '🌍',
    },
    {
        id: 12,
        title: 'Historia de éxito: Familia Mendoza duplica producción con agricultura de precisión',
        excerpt: 'Implementación de tecnología GPS y sensores de humedad aumentó rendimiento de 8 a 17 ton/ha en cultivo de maíz.',
        category: 'Casos de Éxito',
        date: '2025-12-20',
        image: '/api/placeholder/600/400',
        readTime: '7 min',
        icon: '🚜',
    },
    {
        id: 13,
        title: 'Grupo Terminel lanza programa de becas para hijos de productores',
        excerpt: 'Inversión de $2 millones en educación: 50 becas completas para carreras en agronomía, ingeniería y administración.',
        category: 'Empresa',
        date: '2025-12-15',
        image: '/api/placeholder/600/400',
        readTime: '4 min',
        icon: '🎓',
    },
]

const categories = [
    { name: 'Todas', icon: Filter, color: 'text-gray-700' },
    { name: 'Empresa', icon: Building2, color: 'text-terminel-green' },
    { name: 'Tendencias', icon: TrendingUp, color: 'text-blue-600' },
    { name: 'Alertas Climáticas', icon: CloudRain, color: 'text-orange-600' },
    { name: 'Casos de Éxito', icon: Award, color: 'text-purple-600' },
]

const categoryColors: Record<string, string> = {
    'Empresa': 'bg-terminel-green text-white',
    'Tendencias': 'bg-blue-600 text-white',
    'Alertas Climáticas': 'bg-orange-600 text-white',
    'Casos de Éxito': 'bg-purple-600 text-white',
}

export default function NewsGrid() {
    const [selectedCategory, setSelectedCategory] = useState('Todas')

    const filteredArticles = selectedCategory === 'Todas'
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
                        {categories.map((category) => {
                            const Icon = category.icon
                            return (
                                <button
                                    key={category.name}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === category.name
                                        ? 'bg-terminel-green text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{category.name}</span>
                                </button>
                            )
                        })}
                    </div>
                    <div className="text-center mt-4 text-sm text-gray-600">
                        Mostrando <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'artículo' : 'artículos'}
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
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Meta */}
                                <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} className="text-terminel-green" />
                                        <span>{new Date(article.date).toLocaleDateString('es-MX', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center space-x-1">
                                        <Clock size={14} className="text-terminel-green" />
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 group-hover:text-terminel-green transition-colors line-clamp-2">
                                    {article.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                {/* CTA */}
                                <Link
                                    href={`/noticias/${article.id}`}
                                    className="inline-flex items-center space-x-2 text-terminel-green hover:text-terminel-green-700 font-semibold text-sm group/link"
                                >
                                    <span>Leer artículo completo</span>
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
                            No hay artículos en esta categoría
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Intenta seleccionar otra categoría
                        </p>
                        <button
                            onClick={() => setSelectedCategory('Todas')}
                            className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            <span>Ver todos los artículos</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
