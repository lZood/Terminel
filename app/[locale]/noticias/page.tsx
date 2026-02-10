import { getTranslations } from 'next-intl/server'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/noticias/Hero'))
const FeaturedNews = dynamic(() => import('@/components/noticias/FeaturedNews'))
const NewsGrid = dynamic(() => import('@/components/noticias/NewsGrid'))

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'NewsPage' })

    return {
        title: t('meta_title'),
        description: t('meta_desc'),
        keywords: t('meta_keywords').split(','),
    }
}

export default function NoticiasPage() {
    return (
        <main>
            <Hero />
            <FeaturedNews />
            <NewsGrid />
        </main>
    )
}
