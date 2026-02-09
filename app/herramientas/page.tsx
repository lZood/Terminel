import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Hero from '@/components/herramientas/Hero'

const InteractiveSiloMap = dynamic(
    () => import('@/components/herramientas/InteractiveSiloMap')
)

const ProfitabilitySimulator = dynamic(
    () => import('@/components/herramientas/ProfitabilitySimulator')
)

const TechnicalLibrary = dynamic(
    () => import('@/components/herramientas/TechnicalLibrary')
)

const PriceAlerts = dynamic(
    () => import('@/components/herramientas/PriceAlerts')
)

export const metadata: Metadata = {
    title: 'Herramientas para Productores - Grupo Terminel',
    description: 'Herramientas digitales para productores: mapa de silos, calculadora de rentabilidad y biblioteca técnica con fichas de Asgrow, Yara y más.',
    keywords: ['Calculadora Agrícola', 'Mapa Silos Sinaloa', 'Fichas Técnicas Asgrow', 'Herramientas Productor', 'Simulador Rentabilidad'],
}

export default function HerramientasPage() {
    return (
        <>
            <Hero />
            <InteractiveSiloMap />
            <ProfitabilitySimulator />
            <PriceAlerts />
            <TechnicalLibrary />
        </>
    )
}
