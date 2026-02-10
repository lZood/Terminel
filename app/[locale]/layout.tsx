import '../globals.css'
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import ConditionalLayout from '@/components/shared/ConditionalLayout'

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

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${outfit.variable}`}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <ConditionalLayout>{children}</ConditionalLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
