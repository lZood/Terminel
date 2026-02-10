'use client'

import { useEffect, useState } from 'react'
import { Cloud, Droplets, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface WidgetData {
    weather: {
        temp: number
        condition: string
        humidity: number
    } | null
    damLevel: number | null
    cbotPrice: {
        price: number
        change: number
    } | null
}

export default function DynamicWidgets() {
    const [data, setData] = useState<WidgetData>({
        weather: null,
        damLevel: null,
        cbotPrice: null,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel
                const [weatherRes, damRes, priceRes] = await Promise.all([
                    fetch('/api/weather').catch(() => null),
                    fetch('/api/dam-levels').catch(() => null),
                    fetch('/api/cbot-prices').catch(() => null),
                ])

                const weather = weatherRes ? await weatherRes.json() : null
                const dam = damRes ? await damRes.json() : null
                const price = priceRes ? await priceRes.json() : null

                setData({ weather, damLevel: dam?.level, cbotPrice: price })
            } catch (error) {
                console.error('Error fetching widget data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // Refresh every 15 minutes
        const interval = setInterval(fetchData, 15 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    const t = useTranslations('DynamicWidgets')

    if (loading) {
        return (
            <section className="py-8 bg-gray-50 border-y border-gray-200">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                                <div className="h-8 bg-gray-200 rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-8 bg-gray-50 border-y border-gray-200">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Weather Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-700 flex items-center space-x-2">
                                <Cloud size={20} className="text-terminel-green" />
                                <span>{t('weather_title')}</span>
                            </h3>
                        </div>
                        {data.weather ? (
                            <div>
                                <div className="text-4xl font-bold text-terminel-green mb-1">
                                    {data.weather.temp}°C
                                </div>
                                <div className="text-sm text-gray-600 capitalize">{data.weather.condition}</div>
                                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                    <Droplets size={14} />
                                    <span>{t('humidity')}: {data.weather.humidity}%</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400">{t('not_available')}</div>
                        )}
                    </motion.div>

                    {/* Dam Level Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-semibold text-gray-700 mb-3">{t('dam_level_title')}</h3>
                        {data.damLevel !== null ? (
                            <div>
                                <div className="text-4xl font-bold text-terminel-green mb-3">
                                    {data.damLevel}%
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${data.damLevel}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full bg-gradient-to-r from-terminel-green to-terminel-green-600 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{t('regional_capacity')}</p>
                            </div>
                        ) : (
                            <div className="text-gray-400">{t('not_available')}</div>
                        )}
                    </motion.div>

                    {/* CBOT Prices Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-semibold text-gray-700 mb-3">{t('cbot_title')}</h3>
                        {data.cbotPrice ? (
                            <div>
                                <div className="text-4xl font-bold text-terminel-green mb-1">
                                    ${data.cbotPrice.price}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">{t('usd_per_bushel')}</div>
                                <div
                                    className={`flex items-center space-x-1 text-sm font-semibold ${data.cbotPrice.change >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {data.cbotPrice.change >= 0 ? (
                                        <TrendingUp size={16} />
                                    ) : (
                                        <TrendingDown size={16} />
                                    )}
                                    <span>
                                        {data.cbotPrice.change >= 0 ? '+' : ''}
                                        {data.cbotPrice.change.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400">{t('not_available')}</div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
