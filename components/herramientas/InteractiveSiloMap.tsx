'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Navigation, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface SiloLocation {
    id: string
    capacity: string
    status: 'Operativo' | 'Cerrado'
    phone: string
    isMain?: boolean
    mapsUrl: string
    directionsUrl: string
}

const siloLocations: SiloLocation[] = [
    {
        id: 'guasave-centro',
        capacity: '110,000 ton',
        status: 'Operativo',
        phone: '687 123 4567',
        isMain: true,
        mapsUrl: 'https://maps.app.goo.gl/Ysk43QdxMSwBrBMSA',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.590004,-108.492843',
    },
    {
        id: 'ruiz-cortines',
        capacity: '35,000 ton',
        status: 'Operativo',
        phone: '687 123 4568',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.675342,-108.517943',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.675342,-108.517943',
    },
    {
        id: 'bamoa',
        capacity: '28,000 ton',
        status: 'Operativo',
        phone: '687 123 4569',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.702329,-108.321734',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.702329,-108.321734',
    },
    {
        id: 'los-mochis',
        capacity: '42,000 ton',
        status: 'Operativo',
        phone: '668 123 4567',
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=25.871314,-109.033301',
        directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.871314,-109.033301',
    },
]

export default function InteractiveSiloMap() {
    const t = useTranslations('InteractiveSiloMap')

    return (
        <section id="mapa-silos" className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-4 py-2 rounded-full font-semibold text-sm mb-6">
                        <MapPin size={18} />
                        <span>{t('badge')}</span>
                    </div>

                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        {t('title')}
                    </h2>

                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Location Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {siloLocations.map((location, index) => (
                        <motion.div
                            key={location.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-glass p-6 hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                                        {t(`locations.${location.id}.name`)}
                                    </h3>
                                    {location.isMain && (
                                        <span className="inline-block bg-harvest-gold text-terminel-green px-2 py-0.5 rounded text-xs font-semibold mb-2">
                                            {t('label_main')}
                                        </span>
                                    )}
                                </div>
                                <div className={`w-3 h-3 rounded-full ${location.status === 'Operativo' ? 'bg-green-500' : 'bg-red-500'
                                    }`} />
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-start space-x-2 text-sm">
                                    <MapPin size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{t(`locations.${location.id}.address`)}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Clock size={16} className="text-gray-500 flex-shrink-0" />
                                    <span className="text-gray-700 font-semibold">{location.capacity}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm">
                                    <Phone size={16} className="text-gray-500 flex-shrink-0" />
                                    <a href={`tel:${location.phone}`} className="text-terminel-green hover:underline">
                                        {location.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <a
                                    href={location.directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 bg-terminel-green hover:bg-terminel-green-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors active:scale-95 text-sm"
                                >
                                    <Navigation size={16} />
                                    <span>{t('btn_directions')}</span>
                                </a>
                                <a
                                    href={location.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-2.5 rounded-lg transition-colors active:scale-95 text-sm"
                                >
                                    <MapPin size={16} />
                                    <span>{t('btn_map')}</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Info Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-terminel-green/10 to-harvest-gold/10 rounded-2xl p-8 text-center border-2 border-terminel-green/20"
                >
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <MapPin size={24} className="text-terminel-green" />
                        <h3 className="font-heading  font-bold text-xl text-terminel-green">{t('footer_title')}</h3>
                    </div>
                    <p className="text-gray-700 max-w-3xl mx-auto">
                        {t.rich('footer_desc', {
                            green: (chunks) => <strong className="text-terminel-green">{chunks}</strong>
                        })}
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
