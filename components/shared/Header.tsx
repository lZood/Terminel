'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Herramientas', href: '/herramientas' },
    { name: 'Tecnología', href: '/tecnologia' },
    { name: 'Noticias', href: '/noticias' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
                }`}
        >
            <div className="container-custom relative">
                <div className="flex items-center justify-between">
                    {/* Logo Branding - Left */}
                    <Link href="/" className="flex items-center space-x-3 group relative z-10">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="/images/logoTerminel.PNG"
                                alt="Grupo Terminel Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex flex-col transition-transform duration-300 group-hover:scale-110 origin-left">
                            <span className="font-heading font-black text-xl md:text-2xl leading-none tracking-tighter text-black">
                                TERMINEL
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Absolutely Centered */}
                    <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative group py-1"
                                >
                                    <span className={`text-sm lg:text-base transition-all duration-300 ${isActive
                                        ? 'font-bold text-terminel-green'
                                        : 'font-medium text-gray-700 group-hover:text-terminel-green group-hover:font-bold'
                                        }`}>
                                        {item.name}
                                    </span>
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-terminel-green transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`} />
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right Side: Portal Button & Mobile Menu */}
                    <div className="flex items-center gap-4 relative z-10">
                        <Link
                            href="/portal"
                            className="hidden md:block bg-gradient-harvest text-terminel-green font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                        >
                            Portal Productor
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-terminel-green/5 hover:text-terminel-green transition-colors font-medium rounded-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{item.name}</span>
                                    <ChevronRight size={18} />
                                </Link>
                            ))}
                            <div className="pt-4 px-4">
                                <Link
                                    href="/portal"
                                    className="block w-full bg-gradient-harvest text-terminel-green text-center font-bold py-4 rounded-xl shadow-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Portal Productor
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
