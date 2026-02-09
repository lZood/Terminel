import type { Metadata } from 'next'
import Hero from '@/components/nosotros/Hero'
import InteractiveTimeline from '@/components/nosotros/InteractiveTimeline'
import Leadership from '@/components/nosotros/Leadership'
import MissionValues from '@/components/nosotros/MissionValues'
import Certifications from '@/components/nosotros/Certifications'

export const metadata: Metadata = {
    title: 'Nosotros - Grupo Terminel | 55 años de historia familiar',
    description: 'Conoce la historia de Grupo Terminel, fundada por Enrique Terminel Fonseca y dirigida por Alejandro Terminel Rojo. Líder agroindustrial con certificaciones GPTW e ISO 22000:2018.',
    keywords: ['Historia Grupo Terminel', 'Alejandro Terminel Rojo', 'Empresa Familiar Sinaloa', 'Great Place to Work', 'ISO 22000'],
}

export default function NosotrosPage() {
    return (
        <>
            <Hero />
            <InteractiveTimeline />
            <Leadership />
            <MissionValues />
            <Certifications />
        </>
    )
}
