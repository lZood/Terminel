'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminRoute && <Header />}
            <main className="min-h-screen">{children}</main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <FloatingWhatsApp />}
        </>
    );
}
