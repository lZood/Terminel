'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    Users,
    Filter,
    ArrowRight,
    Factory,
    Warehouse,
    Settings
} from 'lucide-react'
import Link from 'next/link'

const jobs = [
    {
        id: 1,
        title: 'Ingeniero Agrónomo',
        department: 'Acopio',
        location: 'Guasave',
        type: 'Tiempo Completo',
        experience: '2-4 años',
        salary: '$15,000 - $20,000',
        deadline: '2026-03-15',
        description: 'Responsable de asesoría técnica a productores, análisis de calidad de granos y supervisión de procesos de acopio.',
        icon: Warehouse,
        color: 'from-green-500 to-emerald-600',
    },
    {
        id: 2,
        title: 'Operador de Molino',
        department: 'Molino',
        location: 'Guasave',
        type: 'Tiempo Completo',
        experience: '1-2 años',
        salary: '$12,000 - $15,000',
        deadline: '2026-02-28',
        description: 'Operación de maquinaria de molienda, control de calidad de harinas, mantenimiento preventivo básico.',
        icon: Factory,
        color: 'from-orange-500 to-red-600',
    },
    {
        id: 3,
        title: 'Supervisor de Calidad',
        department: 'Planta Envasadora',
        location: 'Los Mochis',
        type: 'Tiempo Completo',
        experience: '3-5 años',
        salary: '$18,000 - $25,000',
        deadline: '2026-03-30',
        description: 'Supervisión de procesos de empaquetado, cumplimiento ISO 22000:2018, gestión de equipo de control de calidad.',
        icon: Settings,
        color: 'from-blue-500 to-cyan-600',
    },
    {
        id: 4,
        title: 'Contador Senior',
        department: 'Administrativo',
        location: 'Guasave',
        type: 'Tiempo Completo',
        experience: '5+ años',
        salary: '$25,000 - $35,000',
        deadline: '2026-04-15',
        description: 'Contabilidad general, auditorías, reportes financieros, coordinación con despacho externo.',
        icon: Briefcase,
        color: 'from-purple-500 to-indigo-600',
    },
    {
        id: 5,
        title: 'Auxiliar de Báscula',
        department: 'Acopio',
        location: 'Ruiz Cortines',
        type: 'Temporal',
        experience: 'Sin experiencia',
        salary: '$8,000 - $10,000',
        deadline: '2026-02-20',
        description: 'Apoyo en pesaje de granos, registro de boletas, atención a productores en temporada de cosecha.',
        icon: Warehouse,
        color: 'from-yellow-500 to-orange-600',
    },
]

const filters = {
    departments: ['Todos', 'Acopio', 'Molino', 'Planta Envasadora', 'Administrativo'],
    locations: ['Todas', 'Guasave', 'Los Mochis', 'Ruiz Cortines', 'Bamoa'],
    types: ['Todos', 'Tiempo Completo', 'Temporal'],
}

export default function ActiveJobs() {
    const [selectedDepartment, setSelectedDepartment] = useState('Todos')
    const [selectedLocation, setSelectedLocation] = useState('Todas')
    const [selectedType, setSelectedType] = useState('Todos')

    const filteredJobs = jobs.filter((job) => {
        return (
            (selectedDepartment === 'Todos' || job.department === selectedDepartment) &&
            (selectedLocation === 'Todas' || job.location === selectedLocation) &&
            (selectedType === 'Todos' || job.type === selectedType)
        )
    })

    return (
        <section className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-6 py-3 rounded-full mb-6">
                        <Briefcase size={20} />
                        <span className="font-semibold">Oportunidades Disponibles</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Vacantes Activas
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Encuentra la posición perfecta para desarrollar tu carrera profesional
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="card-glass p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <Filter size={20} className="text-terminel-green" />
                            <h3 className="font-semibold text-gray-900">Filtrar vacantes</h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Department Filter */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Departamento
                                </label>
                                <select
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                >
                                    {filters.departments.map((dept) => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Ubicación
                                </label>
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                >
                                    {filters.locations.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Tipo de Empleo
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                >
                                    {filters.types.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                            Mostrando <strong>{filteredJobs.length}</strong> de <strong>{jobs.length}</strong> vacantes
                        </div>
                    </div>
                </motion.div>

                {/* Job Listings */}
                <div className="space-y-6">
                    {filteredJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card-glass hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="p-6 lg:p-8">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                    {/* Left: Job Details */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                                <job.icon size={28} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-heading font-bold text-xl lg:text-2xl text-gray-900 mb-2">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                                    <span className="inline-flex items-center space-x-1">
                                                        <Users size={16} className="text-terminel-green" />
                                                        <span>{job.department}</span>
                                                    </span>
                                                    <span className="inline-flex items-center space-x-1">
                                                        <MapPin size={16} className="text-terminel-green" />
                                                        <span>{job.location}</span>
                                                    </span>
                                                    <span className="inline-flex items-center space-x-1">
                                                        <Clock size={16} className="text-terminel-green" />
                                                        <span>{job.type}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            {job.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="inline-flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                                                <Briefcase size={16} className="text-gray-600" />
                                                <span className="text-gray-700">{job.experience}</span>
                                            </div>
                                            <div className="inline-flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-lg">
                                                <DollarSign size={16} className="text-green-700" />
                                                <span className="text-green-700 font-semibold">{job.salary}</span>
                                            </div>
                                            <div className="text-gray-600">
                                                Aplica antes del: <strong>{new Date(job.deadline).toLocaleDateString('es-MX')}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Apply Button */}
                                    <div className="flex-shrink-0">
                                        <Link
                                            href={`/carreras/aplicar?job=${job.id}`}
                                            className="group/btn flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 whitespace-nowrap"
                                        >
                                            <span>Aplicar Ahora</span>
                                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredJobs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                            No se encontraron vacantes
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Intenta ajustar los filtros para ver más oportunidades
                        </p>
                        <button
                            onClick={() => {
                                setSelectedDepartment('Todos')
                                setSelectedLocation('Todas')
                                setSelectedType('Todos')
                            }}
                            className="inline-flex items-center space-x-2 bg-terminel-green hover:bg-terminel-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            <span>Limpiar Filtros</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
