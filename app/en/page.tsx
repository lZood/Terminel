import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/en/Hero'))
const ExportCatalog = dynamic(() => import('@/components/en/ExportCatalog'))
const ExportCapabilities = dynamic(() => import('@/components/en/ExportCapabilities'))
const ContactForBuyers = dynamic(() => import('@/components/en/ContactForBuyers'))

export const metadata: Metadata = {
    title: 'Grupo Terminel - Leading Agricultural Excellence in Mexico Since 1970',
    description: 'Mexican agricultural company specializing in white corn, chickpeas, beans, and wheat export. 110,000-ton storage capacity, ISO 22000:2018 certified, exporting to 15+ countries worldwide.',
    keywords: ['Mexican agriculture', 'white corn export', 'chickpeas export', 'ISO 22000', 'grain storage', 'agricultural Mexico', 'Sinaloa agriculture', 'bulk grains'],
}

export default function InternationalPage() {
    return (
        <main>
            <Hero />
            <ExportCatalog />
            <ExportCapabilities />
            <ContactForBuyers />
        </main>
    )
}
