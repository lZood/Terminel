'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Mail, Smartphone, TrendingUp, CheckCircle2 } from 'lucide-react'

type NotificationType = 'email' | 'sms' | 'both'
type CropType = 'maiz' | 'garbanzo' | 'frijol' | 'trigo'

export default function PriceAlerts() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        crop: 'maiz' as CropType,
        targetPrice: '',
        notificationType: 'email' as NotificationType,
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const crops = [
        { value: 'maiz', label: 'Maíz Blanco', unit: 'MXN/ton' },
        { value: 'garbanzo', label: 'Garbanzo', unit: 'MXN/ton' },
        { value: 'frijol', label: 'Frijol', unit: 'MXN/ton' },
        { value: 'trigo', label: 'Trigo', unit: 'MXN/ton' },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Implement API call to save subscription
        // For now, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitted(true)
        setIsLoading(false)

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
                name: '',
                email: '',
                phone: '',
                crop: 'maiz',
                targetPrice: '',
                notificationType: 'email',
            })
        }, 3000)
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    if (isSubmitted) {
        return (
            <section id="alertas-precios" className="section-spacing bg-gradient-to-br from-green-50 to-blue-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md mx-auto text-center"
                    >
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={48} className="text-white" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-terminel-green mb-4">
                            ¡Suscripción Exitosa!
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Te notificaremos cuando el precio de <strong>{crops.find(c => c.value === formData.crop)?.label}</strong> alcance{' '}
                            <strong>${Number(formData.targetPrice).toLocaleString('es-MX')}/ton</strong>.
                        </p>
                    </motion.div>
                </div>
            </section>
        )
    }

    return (
        <section id="alertas-precios" className="section-spacing bg-gradient-to-br from-green-50 to-blue-50">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-4 py-2 rounded-full font-semibold text-sm mb-6">
                            <Bell size={18} />
                            <span>Sistema de Alertas</span>
                        </div>

                        <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                            Alertas de Precios en Tiempo Real
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Recibe notificaciones instantáneas cuando los precios de tus cultivos alcancen el valor que buscas.
                            Nunca pierdas una oportunidad de venta.
                        </p>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card-glass p-8 lg:p-12"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Grid Layout */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Nombre Completo *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 transition-all outline-none"
                                        placeholder="Juan Pérez"
                                    />
                                </div>

                                {/* Crop Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Cultivo *
                                    </label>
                                    <select
                                        required
                                        value={formData.crop}
                                        onChange={(e) => handleChange('crop', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 transition-all outline-none bg-white"
                                    >
                                        {crops.map(crop => (
                                            <option key={crop.value} value={crop.value}>
                                                {crop.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Correo Electrónico *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 transition-all outline-none"
                                        placeholder="juan@ejemplo.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Teléfono (WhatsApp)
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 transition-all outline-none"
                                        placeholder="687 123 4567"
                                    />
                                </div>
                            </div>

                            {/* Target Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Precio Objetivo (MXN/ton) *
                                </label>
                                <div className="relative">
                                    <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.targetPrice}
                                        onChange={(e) => handleChange('targetPrice', e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-terminel-green focus:ring-2 focus:ring-terminel-green/20 transition-all outline-none text-lg font-semibold"
                                        placeholder="5,500.00"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Te notificaremos cuando el precio alcance o supere este valor
                                </p>
                            </div>

                            {/* Notification Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-4">
                                    Tipo de Notificación *
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('notificationType', 'email')}
                                        className={`flex items-center justify-center space-x-3 p-4 rounded-xl border-2 transition-all ${formData.notificationType === 'email'
                                                ? 'border-terminel-green bg-terminel-green/5 text-terminel-green'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        <Mail size={20} />
                                        <span className="font-semibold">Email</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleChange('notificationType', 'sms')}
                                        className={`flex items-center justify-center space-x-3 p-4 rounded-xl border-2 transition-all ${formData.notificationType === 'sms'
                                                ? 'border-terminel-green bg-terminel-green/5 text-terminel-green'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        <Smartphone size={20} />
                                        <span className="font-semibold">SMS</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleChange('notificationType', 'both')}
                                        className={`flex items-center justify-center space-x-3 p-4 rounded-xl border-2 transition-all ${formData.notificationType === 'both'
                                                ? 'border-terminel-green bg-terminel-green/5 text-terminel-green'
                                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <Mail size={16} />
                                            <span>+</span>
                                            <Smartphone size={16} />
                                        </div>
                                        <span className="font-semibold">Ambos</span>
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-terminel-green to-terminel-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Suscribiendo...</span>
                                    </>
                                ) : (
                                    <>
                                        <Bell size={20} />
                                        <span>Activar Alertas</span>
                                    </>
                                )}
                            </motion.button>

                            {/* Privacy Note */}
                            <p className="text-xs text-center text-gray-500">
                                Al suscribirte, aceptas recibir notificaciones de precios. Puedes cancelar en cualquier momento.
                            </p>
                        </form>
                    </motion.div>

                    {/* Info Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="text-blue-600" size={24} />
                            </div>
                            <h4 className="font-heading font-bold text-lg mb-2">Datos en Tiempo Real</h4>
                            <p className="text-sm text-gray-600">
                                Precios actualizados cada hora desde mercados nacionales e internacionales.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <Bell className="text-green-600" size={24} />
                            </div>
                            <h4 className="font-heading font-bold text-lg mb-2">Notificaciones Instantáneas</h4>
                            <p className="text-sm text-gray-600">
                                Recibe alertas en menos de 5 minutos cuando el precio alcance tu objetivo.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border-2 border-gray-100">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <CheckCircle2 className="text-purple-600" size={24} />
                            </div>
                            <h4 className="font-heading font-bold text-lg mb-2">100% Gratuito</h4>
                            <p className="text-sm text-gray-600">
                                Sin costos ocultos. Servicio exclusivo para productores asociados a Terminel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
