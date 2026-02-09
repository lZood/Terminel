'use client'

import { motion } from 'framer-motion'
import {
    Warehouse,
    MapPin,
    Ship,
    TrendingUp,
    Globe,
    CheckCircle
} from 'lucide-react'

const capabilities = [
    {
        icon: Warehouse,
        title: 'Massive Storage Capacity',
        description: '110,000 metric tons across 3 strategic locations in Sinaloa',
        color: 'from-blue-500 to-cyan-600',
    },
    {
        icon: MapPin,
        title: 'Strategic Location',
        description: 'Direct access to Mexico Highway 15, connecting to major ports',
        color: 'from-green-500 to-emerald-600',
    },
    {
        icon: Ship,
        title: 'Port Access',
        description: 'Close proximity to Topolobampo and Mazatlán seaports for efficient export',
        color: 'from-orange-500 to-red-600',
    },
    {
        icon: CheckCircle,
        title: 'Quality Control',
        description: 'ISO 22000:2018 certified processes, full traceability and documentation',
        color: 'from-purple-500 to-indigo-600',
    },
]

const exportDestinations = [
    { country: 'United States', flag: '🇺🇸', region: 'North America' },
    { country: 'Canada', flag: '🇨🇦', region: 'North America' },
    { country: 'Japan', flag: '🇯🇵', region: 'Asia' },
    { country: 'South Korea', flag: '🇰🇷', region: 'Asia' },
    { country: 'Spain', flag: '🇪🇸', region: 'Europe' },
    { country: 'Italy', flag: '🇮🇹', region: 'Europe' },
    { country: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
    { country: 'Turkey', flag: '🇹🇷', region: 'Middle East' },
    { country: 'Lebanon', flag: '🇱🇧', region: 'Middle East' },
    { country: 'India', flag: '🇮🇳', region: 'Asia' },
    { country: 'Pakistan', flag: '🇵🇰', region: 'Asia' },
    { country: 'Algeria', flag: '🇩🇿', region: 'Africa' },
    { country: 'Tunisia', flag: '🇹🇳', region: 'Africa' },
    { country: 'Colombia', flag: '🇨🇴', region: 'South America' },
    { country: 'Peru', flag: '🇵🇪', region: 'South America' },
]

export default function ExportCapabilities() {
    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-harvest-gold/20 text-harvest-gold-700 px-6 py-3 rounded-full mb-6">
                        <Globe size={20} />
                        <span className="font-semibold">Global Reach</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Export Infrastructure & Capabilities
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        World-class facilities and strategic location ensure reliable,
                        high-quality deliveries to international buyers
                    </p>
                </motion.div>

                {/* Capabilities Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {capabilities.map((capability, index) => (
                        <motion.div
                            key={capability.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-glass p-6 text-center hover:scale-105 transition-transform duration-300 group"
                        >
                            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${capability.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                <capability.icon size={28} className="text-white" />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">
                                {capability.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {capability.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Export Destinations */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">
                            Exporting to 15+ Countries Worldwide
                        </h3>
                        <p className="text-gray-600">
                            Trusted partners across five continents
                        </p>
                    </motion.div>

                    <div className="card-glass p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {exportDestinations.map((destination, index) => (
                                <motion.div
                                    key={destination.country}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                                        {destination.flag}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 text-center">
                                        {destination.country}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {destination.region}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Logistics Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid md:grid-cols-3 gap-6"
                >
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-3xl font-heading font-bold text-terminel-green mb-2">
                            3
                        </div>
                        <div className="text-sm text-gray-600">Strategic Facilities</div>
                        <div className="text-xs text-gray-500 mt-1">Guasave, Los Mochis, Bamoa</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-3xl font-heading font-bold text-terminel-green mb-2">
                            &lt; 2h
                        </div>
                        <div className="text-sm text-gray-600">Port Distance</div>
                        <div className="text-xs text-gray-500 mt-1">To Topolobampo Port</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-md">
                        <div className="text-3xl font-heading font-bold text-terminel-green mb-2">
                            24/7
                        </div>
                        <div className="text-sm text-gray-600">Operations</div>
                        <div className="text-xs text-gray-500 mt-1">During harvest season</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
