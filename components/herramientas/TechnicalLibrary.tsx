'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Download, FileText, Search, Tag } from 'lucide-react'

interface Document {
    id: string
    title: string
    category: 'Semillas' | 'Fertilizantes' | 'Protección' | 'Guías'
    brand: string
    fileSize: string
    updatedAt: string
    downloadUrl: string
    description: string
}

const documents: Document[] = [
    {
        id: 'asgrow-maize-2026',
        title: 'Catálogo Maíz Asgrow 2026',
        category: 'Semillas',
        brand: 'Asgrow',
        fileSize: '2.4 MB',
        updatedAt: 'Enero 2026',
        downloadUrl: '/docs/asgrow-maize-catalog.pdf',
        description: 'Variedades de maíz blanco y amarillo para Sinaloa',
    },
    {
        id: 'asgrow-soy',
        title: 'Guía de Variedades de Soya',
        category: 'Semillas',
        brand: 'Asgrow',
        fileSize: '1.8 MB',
        updatedAt: 'Diciembre 2025',
        downloadUrl: '/docs/asgrow-soy-guide.pdf',
        description: 'Características y rendimientos de soya Asgrow',
    },
    {
        id: 'yara-premium',
        title: 'Yara Línea Premium',
        category: 'Fertilizantes',
        brand: 'Yara',
        fileSize: '3.1 MB',
        updatedAt: 'Enero 2026',
        downloadUrl: '/docs/yara-premium-specs.pdf',
        description: 'Especificaciones técnicas de fertilizantes premium',
    },
    {
        id: 'yara-application',
        title: 'Guía de Aplicación Yara',
        category: 'Fertilizantes',
        brand: 'Yara',
        fileSize: '2.7 MB',
        updatedAt: 'Noviembre 2025',
        downloadUrl: '/docs/yara-application-guide.pdf',
        description: 'Dosificación y tiempos de aplicación recomendados',
    },
    {
        id: 'monsanto-roundup',
        title: 'Roundup - Ficha Técnica',
        category: 'Protección',
        brand: 'Monsanto',
        fileSize: '1.2 MB',
        updatedAt: 'Octubre 2025',
        downloadUrl: '/docs/roundup-technical.pdf',
        description: 'Uso seguro y efectivo de herbicidas Roundup',
    },
    {
        id: 'best-practices-maize',
        title: 'Mejores Prácticas: Maíz en Sinaloa',
        category: 'Guías',
        brand: 'Grupo Terminel',
        fileSize: '4.5 MB',
        updatedAt: 'Enero 2026',
        downloadUrl: '/docs/best-practices-maize.pdf',
        description: 'Guía completa de producción de maíz en el Valle de Guasave',
    },
    {
        id: 'water-management',
        title: 'Manejo Eficiente del Agua',
        category: 'Guías',
        brand: 'Grupo Terminel',
        fileSize: '3.3 MB',
        updatedAt: 'Diciembre 2025',
        downloadUrl: '/docs/water-management.pdf',
        description: 'Técnicas de riego y conservación de agua',
    },
    {
        id: 'garbanzo-export',
        title: 'Garbanzo: Calidad de Exportación',
        category: 'Guías',
        brand: 'Grupo Terminel',
        fileSize: '2.1 MB',
        updatedAt: 'Noviembre 2025',
        downloadUrl: '/docs/garbanzo-export-standards.pdf',
        description: 'Estándares de calidad para mercados internacionales',
    },
]

const categories = ['Todas', 'Semillas', 'Fertilizantes', 'Protección', 'Guías'] as const

const categoryIcons: Record<string, string> = {
    Semillas: '🌱',
    Fertilizantes: '⚗️',
    Protección: '🛡️',
    Guías: '📖',
}

const categoryColors: Record<string, string> = {
    Semillas: 'bg-green-100 text-green-700',
    Fertilizantes: 'bg-blue-100 text-blue-700',
    Protección: 'bg-red-100 text-red-700',
    Guías: 'bg-purple-100 text-purple-700',
}

export default function TechnicalLibrary() {
    const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('Todas')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredDocuments = documents.filter((doc) => {
        const matchesCategory = activeCategory === 'Todas' || doc.category === activeCategory
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.brand.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <section id="biblioteca" className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-4 py-2 rounded-full font-semibold text-sm mb-6">
                        <BookOpen size={18} />
                        <span>Biblioteca Técnica Digital</span>
                    </div>

                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Recursos para tu Cultivo
                    </h2>

                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Accede a fichas técnicas, catálogos de productos y guías prácticas
                        para optimizar tu producción
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto mb-8"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, marca o palabra clave..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 outline-none transition-all text-lg"
                        />
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeCategory === category
                                    ? 'bg-terminel-green text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category !== 'Todas' && categoryIcons[category]} {category}
                            {category !== 'Todas' && (
                                <span className="ml-2 text-xs opacity-75">
                                    ({documents.filter(d => d.category === category).length})
                                </span>
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Documents Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocuments.map((doc, index) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="card-glass p-6 hover:scale-105 transition-transform duration-300 group"
                        >
                            {/* Category Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[doc.category]}`}>
                                    <span>{categoryIcons[doc.category]}</span>
                                    <span>{doc.category}</span>
                                </span>
                                <span className="text-xs text-gray-500">{doc.fileSize}</span>
                            </div>

                            {/* PDF Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText size={32} className="text-white" />
                            </div>

                            {/* Title & Brand */}
                            <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                                {doc.title}
                            </h3>

                            <div className="flex items-center space-x-2 mb-3">
                                <Tag size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-600 font-medium">{doc.brand}</span>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {doc.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <span className="text-xs text-gray-500">
                                    {doc.updatedAt}
                                </span>
                                <a
                                    href={doc.downloadUrl}
                                    download
                                    className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors active:scale-95"
                                >
                                    <Download size={16} />
                                    <span>Descargar</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredDocuments.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={40} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-lg">
                            No se encontraron documentos que coincidan con tu búsqueda
                        </p>
                    </motion.div>
                )}

                {/* Info Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-gradient-to-r from-terminel-green/10 to-harvest-gold/10 rounded-2xl p-8 text-center border-2 border-terminel-green/20"
                >
                    <p className="text-gray-700 mb-2">
                        <strong className="text-terminel-green">¿No encuentras lo que buscas?</strong>
                    </p>
                    <p className="text-gray-600 mb-4">
                        Contacta a nuestro equipo de asesoría técnica para solicitar documentos adicionales
                    </p>
                    <a
                        href="tel:+526871234567"
                        className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all active:scale-95"
                    >
                        <span>📞 Contactar Asesor</span>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
