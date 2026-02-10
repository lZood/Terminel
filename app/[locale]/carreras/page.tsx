import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/carreras/Hero'))
const ActiveJobs = dynamic(() => import('@/components/carreras/ActiveJobs'))
const CultureSection = dynamic(() => import('@/components/carreras/CultureSection'))

export const metadata: Metadata = {
    title: 'Carreras - Únete a Grupo Terminel',
    description: 'Descubre oportunidades profesionales en Grupo Terminel. Certificados como Great Place to Work, ofrecemos un ambiente de crecimiento, desarrollo y trabajo en equipo en Sinaloa.',
    keywords: ['carreras', 'empleo', 'vacantes', 'trabajo', 'Great Place to Work', 'GPTW', 'oportunidades', 'Grupo Terminel', 'Sinaloa', 'agricultura'],
}

export default function CarrerasPage() {
    return (
        <main>
            <Hero />
            <ActiveJobs />
            <CultureSection />
        </main>
    )
}
