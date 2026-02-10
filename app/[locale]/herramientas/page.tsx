import { getTranslations } from 'next-intl/server'
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'ToolsPage' })

    return {
        title: t('meta_title'),
        description: t('meta_desc'),
        keywords: t('meta_keywords').split(','),
    }
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
