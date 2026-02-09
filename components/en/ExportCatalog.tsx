'use client'

import { motion } from 'framer-motion'
import { Package, Download, CheckCircle, Award } from 'lucide-react'

const products = [
    {
        name: 'White Corn',
        scientificName: 'Zea mays',
        description: 'Premium quality white corn from Sinaloa, ideal for human consumption and industrial processing.',
        specs: {
            moisture: '≤ 14%',
            purity: '≥ 98%',
            brokenGrains: '≤ 3%',
            foreignMatter: '≤ 1%',
        },
        packaging: ['Bulk', '25kg bags', '50kg bags', 'Custom'],
        emoji: '🌽',
        color: 'from-yellow-400 to-yellow-600',
        minOrder: '20 MT',
        availability: 'Year-round',
    },
    {
        name: 'Chickpeas',
        scientificName: 'Cicer arietinum',
        description: 'Export-grade chickpeas, Kabuli type, large caliber. Exported to 15+ countries worldwide.',
        specs: {
            caliber: '8-9 mm',
            moisture: '≤ 12%',
            purity: '≥ 99%',
            defects: '≤ 2%',
        },
        packaging: ['Bulk', '25kg bags', '50kg bags', 'PP bags'],
        emoji: '🫘',
        color: 'from-amber-400 to-amber-600',
        minOrder: '10 MT',
        availability: 'Seasonal (Nov-Apr)',
    },
    {
        name: 'Premium Beans',
        scientificName: 'Phaseolus vulgaris',
        description: 'High-quality Azufrado and Pinto beans, carefully selected and processed.',
        specs: {
            moisture: '≤ 15%',
            purity: '≥ 97%',
            defects: '≤ 3%',
            cleanness: '≥ 98%',
        },
        packaging: ['Bulk', '25kg bags', '50kg bags'],
        emoji: '🫘',
        color: 'from-red-400 to-red-600',
        minOrder: '15 MT',
        availability: 'Seasonal',
    },
    {
        name: 'Selected Wheat',
        scientificName: 'Triticum aestivum',
        description: 'Quality wheat varieties for milling and industrial use, processed in our own mill.',
        specs: {
            protein: '11-13%',
            moisture: '≤ 13%',
            gluten: '≥ 25%',
            testWeight: '≥ 78 kg/hl',
        },
        packaging: ['Bulk', '50kg bags', 'Custom'],
        emoji: '🌾',
        color: 'from-orange-400 to-orange-600',
        minOrder: '25 MT',
        availability: 'Year-round',
    },
]

export default function ExportCatalog() {
    return (
        <section id="catalog" className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-6 py-3 rounded-full mb-6">
                        <Package size={20} />
                        <span className="font-semibold">Export Products</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Product Catalog for Export
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover our range of premium agricultural products,
                        all backed by ISO 22000:2018 certification and strict quality controls
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-glass overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                        >
                            {/* Product Header */}
                            <div className={`bg-gradient-to-br ${product.color} p-8 text-white`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-6xl">{product.emoji}</div>
                                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold">
                                        {product.availability}
                                    </div>
                                </div>
                                <h3 className="font-heading font-bold text-2xl mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-sm italic text-white/80">
                                    {product.scientificName}
                                </p>
                            </div>

                            {/* Product Body */}
                            <div className="p-8">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {product.description}
                                </p>

                                {/* Specifications */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                                        <Award size={18} className="text-terminel-green" />
                                        <span>Quality Specifications:</span>
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="bg-gray-50 rounded-lg p-3">
                                                <div className="text-xs text-gray-500 capitalize mb-1">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </div>
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Packaging Options */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Packaging Options:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.packaging.map((pkg) => (
                                            <span
                                                key={pkg}
                                                className="bg-terminel-green/10 text-terminel-green px-3 py-1.5 rounded-lg text-sm font-medium"
                                            >
                                                {pkg}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Info */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Minimum Order</div>
                                        <div className="font-bold text-terminel-green">{product.minOrder}</div>
                                    </div>
                                    <button className="flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                                        <Download size={16} />
                                        <span>Spec Sheet</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card-glass p-8 bg-gradient-to-r from-gray-50 to-white border-2 border-terminel-green/20"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
                                <Award size={32} className="text-terminel-green" />
                                <h3 className="font-heading font-bold text-2xl text-gray-900">
                                    ISO 22000:2018 Certified
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                All our products comply with international food safety management standards.
                                Full traceability from field to shipment.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button className="flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95">
                                <Download size={18} />
                                <span>Download Certificates</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
