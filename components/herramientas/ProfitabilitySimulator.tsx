'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Wheat, ArrowRight } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { useTranslations } from 'next-intl'

// Chickpea SVG Component (matching AcopioSection)
const ChickpeaIcon = () => (
    <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="52" r="35" fill="#f1be67" />
        <path d="M 20 35 Q 30 25, 45 28 Q 35 40, 25 42 Z" fill="#e8ab52" />
        <ellipse cx="40" cy="38" rx="12" ry="8" fill="#f9d08f" opacity="0.6" />
        <ellipse cx="55" cy="65" rx="25" ry="15" fill="#d9a347" opacity="0.3" />
    </svg>
)

interface CropOption {
    id: string
    icon: string | 'chickpea'
    avgYield: number // ton/ha
    unit: string
}

const crops: CropOption[] = [
    { id: 'maiz', icon: '🌽', avgYield: 10.5, unit: 'ton/ha' },
    { id: 'garbanzo', icon: 'chickpea', avgYield: 2.8, unit: 'ton/ha' },
    { id: 'frijol', icon: '🫘', avgYield: 2.2, unit: 'ton/ha' },
    { id: 'trigo', icon: '🌾', avgYield: 6.5, unit: 'ton/ha' },
]

interface SimulationResults {
    totalProduction: number
    grossRevenue: number
    pricePerTon: number
    cropId: string
}

export default function ProfitabilitySimulator() {
    const t = useTranslations('ProfitabilitySimulator')
    const [selectedCrop, setSelectedCrop] = useState<string>('maiz')
    const [hectares, setHectares] = useState<string>('')
    const [customYield, setCustomYield] = useState<string>('')
    const [customPrice, setCustomPrice] = useState<string>('')
    const [cbotPrice, setCbotPrice] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<SimulationResults | null>(null)

    const currentCrop = crops.find(c => c.id === selectedCrop)!

    // Fetch CBOT price for maize
    useEffect(() => {
        if (selectedCrop === 'maiz') {
            fetch('/api/cbot-prices')
                .then(res => res.json())
                .then(data => {
                    // Convert USD/bushel to MXN/ton (1 ton = ~39.37 bushels, exchange rate ~18 MXN/USD)
                    const pricePerTon = data.price * 39.37 * 18
                    setCbotPrice(pricePerTon)
                })
                .catch(() => setCbotPrice(null))
        }
    }, [selectedCrop])

    const handleCalculate = () => {
        if (!hectares || parseFloat(hectares) <= 0) {
            alert(t('form.alert_hectares'))
            return
        }

        setLoading(true)

        // Simulate calculation delay for better UX
        setTimeout(() => {
            const ha = parseFloat(hectares)
            const yieldPerHa = customYield ? parseFloat(customYield) : currentCrop.avgYield

            // Determine price per ton
            let pricePerTon: number
            if (customPrice && parseFloat(customPrice) > 0) {
                pricePerTon = parseFloat(customPrice)
            } else if (selectedCrop === 'maiz' && cbotPrice) {
                pricePerTon = cbotPrice
            } else {
                // Default regional prices (MXN/ton)
                const defaultPrices: Record<string, number> = {
                    maiz: 5200,
                    garbanzo: 18500,
                    frijol: 16000,
                    trigo: 6800,
                }
                pricePerTon = defaultPrices[selectedCrop]
            }

            const totalProduction = ha * yieldPerHa
            const grossRevenue = totalProduction * pricePerTon

            setResults({
                totalProduction,
                grossRevenue,
                pricePerTon,
                cropId: currentCrop.id,
            })
            setLoading(false)
        }, 800)
    }

    return (
        <section id="calculadora" className="section-spacing bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-harvest-gold/20 text-harvest-gold-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
                        <Calculator size={18} />
                        <span>{t('badge')}</span>
                    </div>

                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        {t('title')}
                    </h2>

                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left: Input Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="card-glass p-8"
                        >
                            <h3 className="font-heading font-semibold text-xl text-gray-900 mb-6">
                                {t('form.title')}
                            </h3>

                            {/* Crop Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    {t('form.crop_label')}
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {crops.map((crop) => (
                                        <button
                                            key={crop.id}
                                            onClick={() => setSelectedCrop(crop.id)}
                                            className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${selectedCrop === crop.id
                                                ? 'border-terminel-green bg-terminel-green/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {crop.icon === 'chickpea' ? (
                                                <ChickpeaIcon />
                                            ) : (
                                                <span className="text-2xl">{crop.icon}</span>
                                            )}
                                            <span className="text-sm font-medium text-gray-900">{t(`crops.${crop.id}`)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Hectares */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('form.hectares_label')}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={hectares}
                                    onChange={(e) => setHectares(e.target.value)}
                                    placeholder={t('form.hectares_placeholder')}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 outline-none transition-all"
                                />
                            </div>

                            {/* Expected Yield */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('form.yield_label')}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={customYield}
                                    onChange={(e) => setCustomYield(e.target.value)}
                                    placeholder={t('form.yield_placeholder', { yield: currentCrop.avgYield })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 outline-none transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {t.rich('form.yield_avg', {
                                        yield: currentCrop.avgYield,
                                        unit: currentCrop.unit,
                                        bold: (chunks) => <strong>{chunks}</strong>
                                    })}
                                </p>
                            </div>

                            {/* Price Override */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('form.price_label')}
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="100"
                                    value={customPrice}
                                    onChange={(e) => setCustomPrice(e.target.value)}
                                    placeholder={selectedCrop === 'maiz' && cbotPrice
                                        ? t('form.price_current', { price: formatCurrency(cbotPrice) })
                                        : t('form.price_placeholder')
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 outline-none transition-all"
                                />
                                {selectedCrop === 'maiz' && cbotPrice && (
                                    <p className="text-xs text-terminel-green mt-1">
                                        {t('form.cbot_current', { price: formatCurrency(cbotPrice) })}
                                    </p>
                                )}
                            </div>

                            {/* Calculate Button */}
                            <button
                                onClick={handleCalculate}
                                disabled={loading}
                                className="w-full bg-terminel-green hover:bg-terminel-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-50 shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>{t('form.calculating_button')}</span>
                                    </>
                                ) : (
                                    <>
                                        <Calculator size={20} />
                                        <span>{t('form.calculate_button')}</span>
                                    </>
                                )}
                            </button>
                        </motion.div>

                        {/* Right: Results */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {results ? (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-gradient-to-br from-terminel-green to-terminel-green-800 rounded-2xl p-8 text-white shadow-xl"
                                    >
                                        <div className="flex items-center space-x-2 mb-4">
                                            <TrendingUp size={24} />
                                            <span className="font-semibold">{t('results.title')}</span>
                                        </div>
                                        <div className="text-5xl font-heading font-bold mb-2">
                                            {formatCurrency(results.grossRevenue)}
                                        </div>
                                        <p className="text-white/90 text-sm">{t('results.gross_revenue')}</p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="card-glass p-6"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">{t('results.total_production')}</div>
                                                <div className="text-3xl font-heading font-bold text-terminel-green">
                                                    {formatNumber(results.totalProduction)}
                                                </div>
                                                <div className="text-sm text-gray-600">{t('results.tons_of', { crop: t(`crops.${results.cropId}`) })}</div>
                                            </div>
                                            <Wheat size={40} className="text-harvest-gold" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="card-glass p-6"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="text-sm text-gray-600 mb-1">{t('results.price_per_ton')}</div>
                                                <div className="text-3xl font-heading font-bold text-gray-900">
                                                    {formatCurrency(results.pricePerTon)}
                                                </div>
                                                <div className="text-sm text-gray-600">{t('results.mxn_per_ton')}</div>
                                            </div>
                                            <DollarSign size={40} className="text-harvest-gold" />
                                        </div>
                                    </motion.div>

                                    {/* CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-harvest-gold/10 border-2 border-harvest-gold rounded-xl p-6 text-center"
                                    >
                                        <p className="text-gray-900 mb-4 font-medium">
                                            {t('results.cta_text')}
                                        </p>
                                        <a
                                            href="/servicios#financiamiento"
                                            className="inline-flex items-center space-x-2 bg-gradient-harvest text-terminel-green font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-all active:scale-95"
                                        >
                                            <span>{t('results.cta_button')}</span>
                                            <ArrowRight size={18} />
                                        </a>
                                    </motion.div>
                                </>
                            ) : (
                                <div className="card-glass p-12 text-center h-full flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Calculator size={40} className="text-gray-400" />
                                    </div>
                                    <p className="text-gray-600">
                                        {t('results.empty_state')}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
