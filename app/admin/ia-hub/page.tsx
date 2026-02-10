'use client';

import { Bot, Sparkles, Brain, Eye, MessageSquare, Lock } from 'lucide-react';

const aiModules = [
    {
        id: 1,
        name: 'OCR de Boletas',
        description: 'Extracción automática de datos de boletas de báscula',
        icon: Eye,
        status: 'próximo',
        features: [
            'Lectura automática de folio, peso y fecha',
            'Validación contra formato estándar',
            'Precisión >95%',
        ],
    },
    {
        id: 2,
        name: 'Credit Scoring Agrícola',
        description: 'Evaluación de riesgo crediticio para productores',
        icon: Brain,
        status: 'desarrollo',
        features: [
            'Análisis de historial de pagos',
            'Factores climáticos y de mercado',
            'Recomendación automática',
        ],
    },
    {
        id: 3,
        name: 'Detector de Anomalías',
        description: 'Identificación de irregularidades en entregas',
        icon: Sparkles,
        status: 'beta',
        features: [
            'Pesos fuera de rango',
            'Calidad inconsistente',
            'Patrones sospechosos',
        ],
    },
    {
        id: 4,
        name: 'HR Chatbot',
        description: 'Asistente virtual para empleados',
        icon: MessageSquare,
        status: 'prototipo',
        features: [
            'Consultas de nómina y vacaciones',
            'Políticas de la empresa',
            'Disponible 24/7',
        ],
    },
];

export default function IAHubPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <Bot className="w-10 h-10" />
                    <h1 className="text-3xl font-bold">IA Hub</h1>
                </div>
                <p className="text-purple-100 max-w-2xl">
                    Centro de módulos inteligentes que transforman el trabajo administrativo
                    manual en supervisión asistida por IA
                </p>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">En Producción</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">En Beta</p>
                    <p className="text-2xl font-bold text-blue-600">1</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">En Desarrollo</p>
                    <p className="text-2xl font-bold text-purple-600">1</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Próximamente</p>
                    <p className="text-2xl font-bold text-amber-600">2</p>
                </div>
            </div>

            {/* AI Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiModules.map((module) => (
                    <div
                        key={module.id}
                        className="bg-white rounded-2xl p-6 shadow-md border border-gray-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                                    <module.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {module.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">{module.description}</p>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${module.status === 'beta'
                                        ? 'bg-blue-100 text-blue-700'
                                        : module.status === 'desarrollo'
                                            ? 'bg-purple-100 text-purple-700'
                                            : module.status === 'prototipo'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-amber-100 text-amber-700'
                                    }`}
                            >
                                {module.status}
                            </span>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {module.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors text-sm">
                                Ver Demo
                            </button>
                            <button
                                disabled={module.status === 'próximo'}
                                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${module.status === 'próximo'
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#175641] hover:bg-[#1a6b4f] text-white'
                                    }`}
                            >
                                {module.status === 'próximo' ? 'Próximamente' : 'Configurar'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Integration Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <Lock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-purple-900 mb-2">
                            Preparado para Integración IA
                        </h3>
                        <p className="text-sm text-purple-800 mb-3">
                            Estos módulos están listos para conectarse a servicios de IA externos:
                        </p>
                        <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
                            <li>Google Cloud Vision API / AWS Textract para OCR</li>
                            <li>Modelos ML personalizados para credit scoring</li>
                            <li>Azure OpenAI / Anthropic para el chatbot</li>
                            <li>Algoritmos de detección de anomalías con Scikit-learn</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Beneficios Esperados al Implementar IA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-3xl font-bold text-[#175641] mb-2">70%</div>
                        <p className="text-sm text-gray-600">
                            Reducción en tiempo de captura manual de datos
                        </p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-[#175641] mb-2">95%</div>
                        <p className="text-sm text-gray-600">
                            Precisión en validación automática de entregas
                        </p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-[#175641] mb-2">24/7</div>
                        <p className="text-sm text-gray-600">
                            Disponibilidad del asistente virtual para empleados
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
