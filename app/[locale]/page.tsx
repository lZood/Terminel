import Hero from '@/components/home/Hero'
import ImpactMetrics from '@/components/home/ImpactMetrics'
import ServicesOverview from '@/components/home/ServicesOverview'
import TrustIndicators from '@/components/home/TrustIndicators'
import LatestNews from '@/components/home/LatestNews'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
    return (
        <>
            <Hero />
            <ImpactMetrics />
            <ServicesOverview />
            <TrustIndicators />
            <LatestNews />
            <CTASection />
        </>
    )
}
