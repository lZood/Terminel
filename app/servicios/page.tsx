import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic imports for better code splitting
const Hero = dynamic(() => import('@/components/servicios/Hero'))
const AcopioSection = dynamic(() => import('@/components/servicios/AcopioSection'))
const MolinoSection = dynamic(() => import('@/components/servicios/MolinoSection'))
const LosVallesSection = dynamic(() => import('@/components/servicios/LosVallesSection'))
const ComplementaryServices = dynamic(() => import('@/components/servicios/ComplementaryServices'))

export const metadata: Metadata = {
    title: 'Servicios - Grupo Terminel | Acopio, Molino y Planta Los Valles',
    description: 'Servicios agroindustriales integrales: acopio de 110,000 toneladas, Molino Hernando de Villafañe, Planta Los Valles (8 ton/h), financiamiento y asesoría técnica.',
    keywords: ['Acopio de Granos Sinaloa', 'Molino Harinas Guasave', 'Planta Los Valles', 'Servicios Agrícolas', 'Financiamiento Agrícola'],
}

export default function ServiciosPage() {
    return (
        <>
            <Hero />
            <AcopioSection />
            <MolinoSection />
            <LosVallesSection />
            <ComplementaryServices />
        </>
    )
}
