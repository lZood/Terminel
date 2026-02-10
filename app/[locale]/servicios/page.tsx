import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'

// Dynamic imports for better code splitting
const Hero = dynamic(() => import('@/components/servicios/Hero'))
const AcopioSection = dynamic(() => import('@/components/servicios/AcopioSection'))
const MolinoSection = dynamic(() => import('@/components/servicios/MolinoSection'))
const LosVallesSection = dynamic(() => import('@/components/servicios/LosVallesSection'))
const ComplementaryServices = dynamic(() => import('@/components/servicios/ComplementaryServices'))

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'ServicesPage' })

    return {
        title: t('meta_title'),
        description: t('meta_desc'),
        keywords: t('meta_keywords').split(','),
    }
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
