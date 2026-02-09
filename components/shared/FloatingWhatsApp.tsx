'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, CreditCard, Wheat, ShoppingCart, Wrench } from 'lucide-react'

interface Department {
    name: string
    icon: React.ReactNode
    phone: string
    message: string
    color: string
}

const departments: Department[] = [
    {
        name: 'Créditos',
        icon: <CreditCard size={20} />,
        phone: '526871234567',
        message: 'Hola, me gustaría información sobre créditos de habilitación para el ciclo agrícola.',
        color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
        name: 'Acopio',
        icon: <Wheat size={20} />,
        phone: '526871234568',
        message: 'Hola, necesito información sobre entrega de cosecha en sus centros de acopio.',
        color: 'bg-green-600 hover:bg-green-700',
    },
    {
        name: 'Ventas',
        icon: <ShoppingCart size={20} />,
        phone: '526871234569',
        message: 'Hola, me interesa conocer los productos disponibles en su planta de empaque.',
        color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
        name: 'Soporte Técnico',
        icon: <Wrench size={20} />,
        phone: '526871234570',
        message: 'Hola, necesito asesoría técnica sobre productos agrícolas.',
        color: 'bg-orange-500 hover:bg-orange-600',
    },
]

export default function FloatingWhatsApp() {
    const [isOpen, setIsOpen] = useState(false)

    const handleDepartmentClick = (dept: Department) => {
        const whatsappUrl = `https://wa.me/${dept.phone}?text=${encodeURIComponent(dept.message)}`
        window.open(whatsappUrl, '_blank')
        setIsOpen(false)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-terminel-green to-terminel-green-700 text-white p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-heading font-bold text-lg">¿En qué te ayudamos?</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-white/90">
                                Selecciona el departamento que necesitas
                            </p>
                        </div>

                        {/* Department List */}
                        <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                            {departments.map((dept, index) => (
                                <motion.button
                                    key={dept.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.08, duration: 0.25 }}
                                    onClick={() => handleDepartmentClick(dept)}
                                    className={`w-full flex items-center space-x-3 p-4 rounded-xl ${dept.color} text-white transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg`}
                                >
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        {dept.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold">{dept.name}</p>
                                        <p className="text-xs text-white/80">Click para chatear</p>
                                    </div>
                                    <MessageCircle size={18} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-100">
                            <p className="text-xs text-gray-600">
                                Horario: Lun-Vie 8:00-18:00 | Sáb 8:00-14:00
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main WhatsApp Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300">
                    {isOpen ? (
                        <X size={32} className="text-white" />
                    ) : (
                        <MessageCircle size={32} className="text-white" />
                    )}
                </div>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                    >
                        <span className="text-white text-xs font-bold">4</span>
                    </motion.div>
                )}
            </motion.button>
        </div>
    )
}
