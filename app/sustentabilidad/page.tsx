import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/sustentabilidad/Hero'))
const MetricsDashboard = dynamic(() => import('@/components/sustentabilidad/MetricsDashboard'))
const CertificationsShowcase = dynamic(() => import('@/components/sustentabilidad/CertificationsShowcase'))

export const metadata: Metadata = {
    title: 'Sustentabilidad - Grupo Terminel',
    description: 'Descubre nuestro compromiso con la sustentabilidad: métricas ESG, certificaciones ISO 22000:2018, Great Place to Work, y nuestro impacto social y ambiental en Sinaloa.',
    keywords: ['sustentabilidad', 'ESG', 'ISO 22000', 'Great Place to Work', 'GPTW', 'medio ambiente', 'responsabilidad social', 'Grupo Terminel'],
}

export default function SustentabilidadPage() {
    return (
        <main>
            <Hero />
            <MetricsDashboard />
            <CertificationsShowcase />
        </main>
    )
}
