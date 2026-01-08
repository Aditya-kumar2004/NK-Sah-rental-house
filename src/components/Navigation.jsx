import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Home } from 'lucide-react';
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
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-card/90 backdrop-blur-xl shadow-soft'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm">
                                <img
                                    src="/logo.png"
                                    alt="NK Sah Rental House"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <p className="font-serif font-semibold text-deep-brown leading-tight">NK Sah</p>
                                <p className="text-xs text-muted-foreground">{language === 'en' ? 'Rental House' : 'रेंटल हाउस'}</p>
                            </div>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <LanguageToggle />
                            <ThemeToggle />
                            <a
                                href="tel:+919771233530"
                                className="btn-primary-3d py-2.5 px-5 text-sm flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4" />
                                {t.callNow}
                            </a>
                        </div>

                        {/* Mobile Menu Actions */}
                        <div className="flex items-center gap-3 md:hidden">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 text-foreground" />
                                ) : (
                                    <Menu className="w-5 h-5 text-foreground" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-20 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl shadow-elevated md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-3 text-foreground/80 hover:text-primary transition-colors font-medium border-b border-border/50"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex items-center justify-between py-3 border-b border-border/50">
                                <span className="text-foreground/80 font-medium">{language === 'en' ? 'Language' : 'भाषा'}</span>
                                <LanguageToggle />
                            </div>
                            <a
                                href="tel:+919771233530"
                                className="btn-primary-3d w-full py-3 flex items-center justify-center gap-2 mt-4"
                            >
                                <Phone className="w-4 h-4" />
                                {t.callNow}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
