import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/noticias/Hero'))
const FeaturedNews = dynamic(() => import('@/components/noticias/FeaturedNews'))
const NewsGrid = dynamic(() => import('@/components/noticias/NewsGrid'))

export const metadata: Metadata = {
    title: 'Voz del Campo - Noticias Grupo Terminel',
    description: 'Mantente informado sobre las últimas noticias de Grupo Terminel, tendencias agroindustriales, alertas climáticas y casos de éxito de productores en Sinaloa.',
    keywords: ['noticias agrícolas', 'Grupo Terminel noticias', 'agricultura Sinaloa', 'alertas climáticas', 'casos de éxito productores', 'tendencias agroindustriales'],
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
