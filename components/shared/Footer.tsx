import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'

export default function Footer() {
    const t = useTranslations('Footer')

    const footerLinks = {
        empresa: [
            { name: t('links.about'), href: '/nosotros' },
            { name: t('links.services'), href: '/servicios' },
            { name: t('links.tools'), href: '/herramientas' },
            { name: t('links.sustainability'), href: '/sustentabilidad' },
            { name: t('links.careers'), href: '/carreras' },
            { name: t('links.news'), href: '/noticias' },
        ],
        servicios: [
            { name: t('links.storage'), href: '/servicios#acopio' },
            { name: t('links.mill'), href: '/servicios#molino' },
            { name: t('links.packaging'), href: '/servicios#los-valles' },
            { name: t('links.portal'), href: '/portal' },
        ],
        legal: [
            { name: t('links.privacy'), href: '/privacidad' },
            { name: t('links.terms'), href: '/terminos' },
            { name: t('links.ethics'), href: '/nosotros#etica' },
        ],
    }

    return (
        <footer className="bg-terminel-green text-white">
            {/* Top Footer */}
            <div className="container-custom py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 mb-6">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/images/logoTerminel.PNG"
                                    alt="Grupo Terminel Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-heading font-black text-2xl leading-none tracking-tighter text-white">
                                    TERMINEL
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-300 mb-8 leading-relaxed text-sm">
                            {t('brand_desc')}
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-wider">{t('columns.company')}</h4>
                        <ul className="space-y-4">
                            {footerLinks.empresa.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-300 hover:text-harvest-gold transition-colors flex items-center group">
                                        <ArrowUpRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-wider">{t('columns.services')}</h4>
                        <ul className="space-y-4">
                            {footerLinks.servicios.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-300 hover:text-harvest-gold transition-colors flex items-center group">
                                        <ArrowUpRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-white uppercase tracking-wider">{t('columns.contact')}</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <MapPin className="text-harvest-gold mr-3 flex-shrink-0" size={20} />
                                <span className="text-gray-300 text-sm">
                                    Carr. México 15 Km. 160+500<br />
                                    Col. Ejidal, Guasave, Sin.
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="text-harvest-gold mr-3" size={20} />
                                <a href="tel:6871234567" className="text-gray-300 hover:text-white transition-colors">
                                    (687) 123 4567
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-harvest-gold mr-3" size={20} />
                                <a href="mailto:contacto@terminel.mx" className="text-gray-300 hover:text-white transition-colors">
                                    contacto@terminel.mx
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-white/10">
                <div className="container-custom py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} Grupo Terminel. {t('copyright')}</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            {footerLinks.legal.map((link) => (
                                <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
