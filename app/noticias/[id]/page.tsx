'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function ArticlePage() {
    return (
        <main className="bg-white">
            {/* Header */}
            <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
                <div className="container-custom max-w-4xl">
                    {/* Back Button */}
                    <Link
                        href="/noticias"
                        className="inline-flex items-center space-x-2 text-terminel-green hover:text-terminel-green-700 font-semibold mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Volver a Noticias</span>
                    </Link>

                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-flex items-center space-x-2 bg-terminel-green text-white px-4 py-2 rounded-lg font-semibold text-sm">
                            <Building2 size={16} />
                            <span>Empresa</span>
                        </span>
                    </div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading font-bold text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight"
                    >
                        Grupo Terminel inaugura moderna planta envasadora &ldquo;Los Valles&rdquo; en 2026
                    </motion.h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center space-x-2">
                            <Calendar size={18} className="text-terminel-green" />
                            <span>8 de febrero, 2026</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock size={18} className="text-terminel-green" />
                            <span>5 min de lectura</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>Por <strong className="text-terminel-green">Grupo Terminel</strong></span>
                        </div>
                    </div>

                    {/* Share Button */}
                    <button className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                        <Share2 size={18} />
                        <span>Compartir</span>
                    </button>
                </div>
            </section>

            {/* Featured Image */}
            <section className="py-8 bg-gradient-to-br from-terminel-green-100 to-harvest-gold-100">
                <div className="container-custom max-w-5xl">
                    <div className="card-glass p-12 text-center">
                        <div className="text-9xl mb-4">🏭</div>
                        <p className="text-terminel-green font-semibold text-lg">Planta Envasadora Los Valles</p>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="section-spacing">
                <div className="container-custom max-w-3xl">
                    <article className="prose prose-lg max-w-none">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                            Con una inversión superior a los $50 millones de pesos, inauguramos nuestra más moderna
                            planta de envasado, marcando un hito histórico en la expansión de Grupo Terminel.
                        </p>

                        <h2 className="font-heading font-bold text-2xl text-gray-900 mt-12 mb-4">
                            Un paso hacia el futuro
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            La planta envasadora &ldquo;Los Valles&rdquo; representa nuestro compromiso con la innovación y la
                            excelencia en la agroindustria sinaloense. Esta nueva instalación cuenta con tecnología
                            de punta certificada bajo la norma <strong>ISO 22000:2018</strong>, garantizando los más
                            altos estándares de seguridad alimentaria.
                        </p>

                        <h2 className="font-heading font-bold text-2xl text-gray-900 mt-12 mb-4">
                            Capacidad y tecnología
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            La nueva planta tiene capacidad para procesar y envasar hasta <strong>15,000 toneladas
                                anuales</strong> de granos básicos, incluyendo:
                        </p>

                        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                            <li>Maíz blanco en presentaciones de 1kg, 5kg y 20kg</li>
                            <li>Garbanzo en bolsas de 500g y 1kg</li>
                            <li>Frijol en empaques de 1kg y 2kg</li>
                            <li>Harinas especializadas de trigo</li>
                        </ul>

                        <h2 className="font-heading font-bold text-2xl text-gray-900 mt-12 mb-4">
                            Generación de empleos
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Este proyecto genera más de <strong>100 empleos directos</strong> para familias de Sinaloa,
                            reafirmando nuestro compromiso con el desarrollo económico regional. Nuestro equipo recibirá
                            capacitación especializada en:
                        </p>

                        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                            <li>Operación de maquinaria automatizada</li>
                            <li>Control de calidad e inocuidad alimentaria</li>
                            <li>Manejo de sistemas de trazabilidad</li>
                            <li>Buenas prácticas de manufactura</li>
                        </ul>

                        <h2 className="font-heading font-bold text-2xl text-gray-900 mt-12 mb-4">
                            Certificación ISO 22000:2018
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            La planta opera bajo estrictos protocolos de seguridad alimentaria certificados
                            internacionalmente. Esto nos permite:
                        </p>

                        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                            <li>Garantizar trazabilidad completa desde el campo hasta el consumidor</li>
                            <li>Cumplir con estándares internacionales de exportación</li>
                            <li>Asegurar la máxima calidad en cada producto</li>
                            <li>Mantener auditorías y controles continuos</li>
                        </ul>

                        <div className="bg-terminel-green/10 border-l-4 border-terminel-green p-6 my-8 rounded-r-lg">
                            <p className="text-gray-900 font-medium italic">
                                &ldquo;Esta nueva planta no solo amplía nuestra capacidad productiva, sino que refuerza
                                nuestro compromiso de 55 años con los productores de Sinaloa y con la seguridad
                                alimentaria de México.&rdquo;
                            </p>
                            <p className="text-terminel-green font-semibold mt-2">
                                — Dirección General, Grupo Terminel
                            </p>
                        </div>

                        <h2 className="font-heading font-bold text-2xl text-gray-900 mt-12 mb-4">
                            Próximos pasos
                        </h2>

                        <p className="text-gray-700 leading-relaxed mb-6">
                            Con esta inauguración, Grupo Terminel consolida su posición como líder en la agroindustria
                            de Sinaloa. Nuestros planes de expansión continúan enfocados en:
                        </p>

                        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                            <li>Ampliar nuestra red de distribución nacional</li>
                            <li>Fortalecer alianzas con productores locales</li>
                            <li>Desarrollar nuevas líneas de productos premium</li>
                            <li>Mantener nuestro liderazgo en sostenibilidad y responsabilidad social</li>
                        </ul>

                        <div className="bg-harvest-gold/10 border-2 border-harvest-gold rounded-xl p-8 mt-12 text-center">
                            <p className="text-gray-900 font-semibold mb-4">
                                ¿Eres productor y quieres conocer más sobre nuestros servicios?
                            </p>
                            <Link
                                href="/servicios"
                                className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 active:scale-95"
                            >
                                <span>Conoce Nuestros Servicios</span>
                            </Link>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}
