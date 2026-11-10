import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language } = useLanguage();
    const t = translations[language].nav;

    const navLinks = [
        { href: '#about', label: t.about },
        { href: '#amenities', label: t.amenities },
        { href: '#gallery', label: t.gallery },
        { href: '#reviews', label: t.reviews },
        { href: '#contact', label: t.contact },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/90 dark:bg-[#121417]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-soft border-b border-black/[0.06] dark:border-white/10'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 group" aria-label="NK Sah Rental House">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm transition-transform group-hover:scale-105">
                                <picture>
                                    <source srcSet="/logo.webp" type="image/webp" />
                                    <img
                                        src="/logo.png"
                                        alt="NK Sah Rental House logo"
                                        width="44"
                                        height="44"
                                        className="w-full h-full object-cover"
                                    />
                                </picture>
                            </div>
                            <div className="hidden sm:block">
                                <p
                                    className={`font-serif font-semibold leading-tight transition-colors ${
                                        isScrolled
                                            ? 'text-[#1F1A14] dark:text-foreground'
                                            : 'text-[#1F1A14] dark:text-white drop-shadow-none dark:drop-shadow-sm'
                                    }`}
                                >
                                    NK Sah
                                </p>
                                <p
                                    className={`text-xs transition-colors ${
                                        isScrolled
                                            ? 'text-muted-foreground'
                                            : 'text-[#5A4E3F] dark:text-white/80'
                                    }`}
                                >
                                    {language === 'en' ? 'Rental House' : 'रेंटल हाउस'}
                                </p>
                            </div>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`relative font-medium text-sm py-1 transition-colors ${
                                        isScrolled
                                            ? 'text-[#4A4036] dark:text-foreground/80 hover:text-primary dark:hover:text-primary'
                                            : 'text-[#1F1A14] dark:text-white/90 hover:text-primary dark:hover:text-amber-300'
                                    } group/link`}
                                >
                                    <span>{link.label}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full rounded-full" />
                                </a>
                            ))}
                            <LanguageToggle />
                            <ThemeToggle />
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="relative py-2.5 px-5 text-sm flex items-center gap-2 text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl font-semibold shadow-[0_2px_12px_rgba(220,38,38,0.35)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.55)] border border-red-400/30 transition-all duration-200 active:scale-95 group"
                            >
                                <Phone className="w-4 h-4 text-white transition-transform group-hover:rotate-12" />
                                <span>{t.callNow}</span>
                            </a>
                        </div>

                        {/* Mobile Menu Actions */}
                        <div className="flex items-center gap-2 md:hidden">
                            <LanguageToggle />
                            <ThemeToggle />
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                                aria-expanded={isMobileMenuOpen}
                                className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-all ${
                                    isScrolled || isMobileMenuOpen
                                        ? 'bg-card text-foreground border border-border shadow-sm'
                                        : 'bg-white/80 dark:bg-white/15 backdrop-blur-md border border-[#B8820F]/30 dark:border-white/25 text-[#1F1A14] dark:text-white hover:bg-white dark:hover:bg-white/25 shadow-sm'
                                }`}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Slide-in Drawer with Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
                            aria-hidden="true"
                        />

                        {/* Slide-in Drawer */}
                        <motion.aside
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] z-50 bg-card border-l border-border shadow-2xl flex flex-col justify-between p-6 md:hidden overflow-y-auto"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile Navigation Menu"
                        >
                            {/* Drawer Header */}
                            <div>
                                <div className="flex items-center justify-between pb-5 border-b border-border/70">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                                            <picture>
                                                <source srcSet="/logo.webp" type="image/webp" />
                                                <img
                                                    src="/logo.png"
                                                    alt="NK Sah logo"
                                                    width="40"
                                                    height="40"
                                                    className="w-full h-full object-cover"
                                                />
                                            </picture>
                                        </div>
                                        <div>
                                            <p className="font-serif font-bold text-foreground leading-tight">NK Sah</p>
                                            <p className="text-[11px] text-muted-foreground">
                                                {language === 'en' ? 'Rental House' : 'रेंटल हाउस'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        aria-label="Close navigation menu"
                                        className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-secondary/80 hover:bg-secondary text-foreground transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Nav Links */}
                                <nav className="py-5 space-y-1.5" aria-label="Mobile links">
                                    {navLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center min-h-[44px] px-3.5 py-2.5 rounded-xl text-foreground/85 hover:text-primary hover:bg-secondary/60 transition-colors font-medium text-base"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            {/* Drawer Bottom Controls: Language, Theme & Call Now */}
                            <div className="pt-4 border-t border-border/70 space-y-3">
                                <div className="flex items-center justify-between min-h-[44px] px-2 py-1">
                                    <span className="text-foreground/80 font-medium text-sm">
                                        {language === 'en' ? 'Language' : 'भाषा'}
                                    </span>
                                    <LanguageToggle />
                                </div>

                                <div className="flex items-center justify-between min-h-[44px] px-2 py-1 border-t border-border/40 pt-2">
                                    <span className="text-foreground/80 font-medium text-sm">
                                        {language === 'en' ? 'Theme' : 'थीम'}
                                    </span>
                                    <ThemeToggle />
                                </div>

                                <a
                                    href={`tel:${siteConfig.phone}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full min-h-[48px] py-3.5 flex items-center justify-center gap-2 mt-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-all active:scale-95"
                                >
                                    <Phone className="w-4 h-4 text-white" />
                                    <span>{t.callNow}</span>
                                </a>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
