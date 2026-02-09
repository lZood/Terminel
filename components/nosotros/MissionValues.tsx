'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, Handshake, Leaf, Users, Compass } from 'lucide-react'

const values = [
    {
        icon: Heart,
        title: 'Compromiso',
        description: 'Dedicación total al desarrollo del campo sinaloense y al bienestar de nuestros productores',
        color: 'from-red-500 to-pink-600',
    },
    {
        icon: Handshake,
        title: 'Confianza',
        description: 'Relaciones transparentes y duraderas basadas en la honestidad y el cumplimiento',
        color: 'from-blue-500 to-cyan-600',
    },
    {
        icon: Leaf,
        title: 'Sostenibilidad',
        description: 'Prácticas responsables que cuidan el medio ambiente para las futuras generaciones',
        color: 'from-green-500 to-emerald-600',
    },
    {
        icon: Users,
        title: 'Trabajo en Equipo',
        description: 'Colaboración y respeto mutuo como pilares de nuestro éxito',
        color: 'from-purple-500 to-indigo-600',
    },
]

export default function MissionValues() {
    return (
        <section className="section-spacing bg-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Nuestra Filosofía
                    </h2>
                </motion.div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-terminel-green to-terminel-green-700 p-8 lg:p-12 shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

                        <div className="relative flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                                    <Compass size={40} className="text-terminel-green" />
                                </div>
                            </div>
                            <div className="text-white">
                                <h3 className="font-heading font-bold text-3xl mb-4">Misión</h3>
                                <p className="text-2xl font-medium mb-4">
                                    <span className="text-harvest-gold font-heading font-bold">
                                        "Cosechamos Confianza"
                                    </span>
                                </p>
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Facilitar al productor insumos y servicios que maximizan su rentabilidad en un marco
                                    de credibilidad y cercanía. Nuestras operaciones abarcan desde la producción agrícola
                                    hasta la industrialización, pasando por comercio, financiamiento y servicios de apoyo
                                    que fortalecen el campo mexicano.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="card-glass p-8 lg:p-12"
                    >
                        <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-harvest-gold to-harvest-gold-600 shadow-xl flex items-center justify-center">
                                    <Eye size={40} className="text-terminel-green" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-3xl text-gray-900 mb-4">Visión</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Ser el referente agroindustrial de Sinaloa, reconocidos por nuestra innovación tecnológica,
                                    responsabilidad social y compromiso con el desarrollo sustentable. Aspiramos a expandir
                                    nuestras operaciones manteniendo la cercanía familiar y los valores que nos han distinguido
                                    por más de 55 años.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Values Grid */}
                    <div>
                        <h3 className="font-heading font-bold text-3xl text-center text-gray-900 mb-12">
                            Nuestros Valores
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-terminel-green"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <value.icon size={32} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-heading font-bold text-xl text-gray-900 mb-3 group-hover:text-terminel-green transition-colors">
                                                {value.title}
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-terminel-green/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
