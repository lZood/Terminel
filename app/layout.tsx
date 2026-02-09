import './globals.css'
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Grupo Terminel - 55 años cultivando el futuro del campo sinaloense',
    description: 'Líder agroindustrial en Guasave, Sinaloa. Acopio, procesamiento y comercialización de granos con certificaciones ISO 22000:2018 y Great Place to Work. Exportador de garbanzo a más de 15 países.',
    keywords: ['Exportador de Garbanzo México', 'Maíz Blanco Sinaloa', 'Servicios Agrícolas Guasave', 'Acopio de Granos', 'Terminel'],
    metadataBase: new URL('https://grupoterminel.com'),
    openGraph: {
        title: 'Grupo Terminel - Cosechamos Confianza',
        description: '55 años de liderazgo agroindustrial en Sinaloa',
        type: 'website',
        locale: 'es_MX',
        siteName: 'Grupo Terminel',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
            <body>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <FloatingWhatsApp />
            </body>
        </html>
    )
}
