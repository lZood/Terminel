'use client'

import { motion } from 'framer-motion'
import {
    Award,
    Heart,
    TrendingUp,
    Users,
    Smile,
    GraduationCap,
    Shield,
    Coffee
} from 'lucide-react'

const benefits = [
    {
        icon: Heart,
        title: 'Salud y Bienestar',
        description: 'Seguro médico, chequeos anuales y programa de bienestar físico',
        color: 'from-red-500 to-rose-600',
    },
    {
        icon: GraduationCap,
        title: 'Desarrollo Profesional',
        description: 'Capacitación continua, certificaciones y oportunidades de crecimiento',
        color: 'from-blue-500 to-cyan-600',
    },
    {
        icon: TrendingUp,
        title: 'Crecimiento Interno',
        description: 'Promociones basadas en méritos, plan de carrera personalizado',
        color: 'from-green-500 to-emerald-600',
    },
    {
        icon: Coffee,
        title: 'Balance Vida-Trabajo',
        description: 'Horarios flexibles, días de vacaciones adicionales',
        color: 'from-orange-500 to-amber-600',
    },
    {
        icon: Shield,
        title: 'Seguridad Laboral',
        description: 'Estabilidad, cumplimiento legal y ambiente seguro',
        color: 'from-purple-500 to-indigo-600',
    },
    {
        icon: Smile,
        title: 'Ambiente Positivo',
        description: 'Cultura de respeto, reconocimiento y celebraciones en equipo',
        color: 'from-pink-500 to-rose-600',
    },
]

const testimonials = [
    {
        name: 'María López',
        role: 'Supervisora de Calidad',
        years: '8 años en Terminel',
        quote: 'Llegué como auxiliar de laboratorio y ahora coordino todo el equipo de calidad. En Terminel me han dado todas las herramientas para crecer profesionalmente.',
        avatar: '👩‍🔬',
    },
    {
        name: 'Ricardo Martínez',
        role: 'Operador de Molino',
        years: '12 años en Terminel',
        quote: 'Aquí no eres solo un número. La empresa invierte en tu capacitación y te hace sentir parte de una familia. Es mi segunda casa.',
        avatar: '👨‍🏭',
    },
    {
        name: 'Ana Soto',
        role: 'Ingeniera Agrónoma',
        years: '5 años en Terminel',
        quote: 'Como mujer en el sector agrícola, he encontrado en Terminel un ambiente de igualdad de oportunidades y apoyo genuino para desarrollar mi carrera.',
        avatar: '👩‍🌾',
    },
]

const values = [
    {
        title: 'Compromiso',
        description: 'Dedicación total con nuestros productores, colaboradores y comunidad',
        emoji: '🤝',
    },
    {
        title: 'Confianza',
        description: 'Base de todas nuestras relaciones y decisiones empresariales',
        emoji: '💚',
    },
    {
        title: 'Sostenibilidad',
        description: 'Responsabilidad ambiental y social en cada acción que realizamos',
        emoji: '🌱',
    },
]

export default function CultureSection() {
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
                        <Award size={20} />
                        <span className="font-semibold">Great Place to Work 2024</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Nuestra Cultura Organizacional
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        No solo ofrecemos empleos, construimos carreras. Descubre por qué
                        nuestros colaboradores nos eligen año tras año
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <div className="mb-20">
                    <h3 className="font-heading font-bold text-2xl text-gray-900 text-center mb-12">
                        Beneficios y Prestaciones
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-glass p-6 hover:scale-105 transition-transform duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <benefit.icon size={28} className="text-white" />
                                </div>
                                <h4 className="font-heading font-bold text-lg text-gray-900 mb-2">
                                    {benefit.title}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="mb-20">
                    <h3 className="font-heading font-bold text-2xl text-gray-900 text-center mb-12">
                        Voces de Nuestro Equipo
                    </h3>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="card-glass p-8 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-6xl mb-4 text-center">{testimonial.avatar}</div>
                                <blockquote className="text-gray-700 italic leading-relaxed mb-6 text-center">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="text-center border-t border-gray-200 pt-4">
                                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-terminel-green">{testimonial.role}</div>
                                    <div className="text-xs text-gray-500 mt-1">{testimonial.years}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <div>
                    <h3 className="font-heading font-bold text-2xl text-gray-900 text-center mb-12">
                        Nuestros Valores en Acción
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-6xl mb-4">{value.emoji}</div>
                                <h4 className="font-heading font-bold text-xl text-terminel-green mb-3">
                                    {value.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 rounded-2xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />

                    <div className="relative z-10">
                        <Users size={48} className="text-harvest-gold mx-auto mb-4" />
                        <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-4">
                            ¿Listo para unirte a nosotros?
                        </h3>
                        <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                            Revisa nuestras vacantes activas y comienza el proceso de aplicación hoy mismo
                        </p>
                        <a
                            href="#vacantes"
                            className="inline-flex items-center space-x-2 bg-harvest-gold hover:bg-harvest-gold-600 text-terminel-green font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
                        >
                            <span>Ver Vacantes Disponibles</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
