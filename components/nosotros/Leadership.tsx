'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin } from 'lucide-react'

export default function Leadership() {
    return (
        <section className="section-spacing bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Liderazgo
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Visión familiar que trasciende generaciones
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    {/* Main Leader - Alejandro Terminel Rojo */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card-glass overflow-hidden mb-12"
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Image */}
                            <div className="bg-gradient-terminel p-12 flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-8 border-harvest-gold">
                                    <span className="font-heading font-bold text-9xl text-white">AT</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="inline-block bg-harvest-gold text-terminel-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4 self-start">
                                    Director General
                                </div>

                                <h3 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                                    Alejandro Terminel Rojo
                                </h3>

                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    Hijo del fundador Enrique Terminel Fonseca, Alejandro lidera la segunda generación
                                    del Grupo Terminel con una visión clara: agregar valor más allá del acopio tradicional
                                    y fortalecer el campo sinaloense.
                                </p>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Bajo su dirección, la empresa ha alcanzado hitos significativos como la inauguración
                                    de la Planta Los Valles, la certificación Great Place to Work, y la expansión de
                                    exportaciones de garbanzo a más de 15 países.
                                </p>

                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-sm text-gray-500 italic mb-4">
                                        "Construir Los Valles cumplió el sueño de mi padre de generar más valor para nuestros
                                        productores. Seguimos comprometidos con el desarrollo agrícola de Sinaloa."
                                    </p>
                                </div>

                                {/* Contact */}
                                <div className="flex items-center space-x-4 mt-6">
                                    <a
                                        href="mailto:alejandro@grupoterminel.com"
                                        className="flex items-center space-x-2 text-terminel-green hover:text-terminel-green-600 transition-colors"
                                    >
                                        <Mail size={18} />
                                        <span className="text-sm">Contacto</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center space-x-2 text-terminel-green hover:text-terminel-green-600 transition-colors"
                                    >
                                        <Linkedin size={18} />
                                        <span className="text-sm">LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Founder Legacy */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200"
                    >
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terminel-green to-terminel-green-700 flex items-center justify-center text-white font-heading font-bold text-3xl">
                                    EF
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">
                                    Enrique Terminel Fonseca
                                </h3>
                                <div className="text-sm text-gray-500 mb-4">Fundador (1970)</div>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Visionario emprendedor que en los años 70 identificó el potencial agrícola del Valle
                                    de Guasave. Con apoyo de colaboradores locales, inició la compra-venta de granos que
                                    con el tiempo se consolidó como el actual Grupo Terminel.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Su legado incluye la fundación del Molino Hernando de Villafañe en 1987 y las marcas
                                    propias "La Trinidad" y "Don Enrique", que hoy son sinónimo de calidad en la región.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
