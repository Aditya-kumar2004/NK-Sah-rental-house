import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Heart, Home } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { language } = useLanguage();
    const t = translations[language].footer;
    const navT = translations[language].nav;

    const quickLinks = [
        { label: navT.about, href: '#about' },
        { label: navT.amenities, href: '#amenities' },
        { label: navT.gallery, href: '#gallery' },
        { label: navT.reviews, href: '#reviews' },
        { label: navT.contact, href: '#contact' },
    ];

    return (
        <footer className="bg-deep-brown dark:bg-[hsl(30,25%,18%)] text-white/90">
            <div className="container-custom py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/20 shadow-lg shadow-gold/10">
                                <img
                                    src="/logo.png"
                                    alt="NK Sah Rental House"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-serif font-bold text-lg leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">NK Sah</p>
                                <p className="text-gold/80 text-[10px] uppercase tracking-wider font-medium">{t.rentalHouse}</p>
                            </div>
                        </div>
                        <p className="text-white/50 text-xs leading-relaxed max-w-xs">
                            {t.tagline}
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="font-serif font-semibold text-base mb-3 text-gold/90">{t.quickLinks}</h4>
                        <ul className="space-y-1.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-white/60 text-xs hover:text-gold transition-all duration-300 flex items-center gap-2 hover:translate-x-1"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gold/50"></span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="font-serif font-semibold text-base mb-3 text-gold/90">{t.contact}</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="tel:+919771233530" className="flex items-center gap-2 text-white/60 text-xs hover:text-gold transition-colors group">
                                    <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-gold/20 transition-colors">
                                        <Phone className="w-3 h-3" />
                                    </div>
                                    +91 9771233530
                                </a>
                            </li>
                            <li>
                                <a href="tel:+917050308555" className="flex items-center gap-2 text-white/60 text-xs hover:text-gold transition-colors group">
                                    <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-gold/20 transition-colors">
                                        <Phone className="w-3 h-3" />
                                    </div>
                                    +91 7050308555
                                </a>
                            </li>
                            <li>
                                <a href="mailto:adityakuma876@gmail.com" className="flex items-center gap-2 text-white/60 text-xs hover:text-gold transition-colors group">
                                    <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-gold/20 transition-colors">
                                        <Mail className="w-3 h-3" />
                                    </div>
                                    adityakuma876@gmail.com
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="font-serif font-semibold text-base mb-3 text-gold/90">{t.address}</h4>
                        <div className="flex items-start gap-2 text-white/60 text-xs group mb-4">
                            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-gold/20 transition-colors mt-0.5">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                            </div>
                            <p className="leading-relaxed">
                                City Montessori School,
                                <br />
                                Chotkipatti Bargaw,
                                <br />
                                Tirhut Division, Bihar – 845101
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 text-gold rounded-lg text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                            <MapPin className="w-3 h-3" />
                            Get Directions
                        </a>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm">
                        © {currentYear} NK Sah Rental House. {t.allRights}
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-white/40 text-sm flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by
                        </p>
                        <a
                            href="mailto:aditykuma876@gmail.com"
                            className="flex items-center gap-2 bg-white/5 hover:bg-gold/10 px-3 py-1 rounded-full transition-all group border border-white/5 hover:border-gold/20"
                        >
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-gold to-orange-500 flex items-center justify-center text-[10px] font-bold text-black font-serif shadow-glow">
                                AK
                            </div>
                            <span className="text-white/70 text-sm font-medium group-hover:text-gold transition-colors">
                                Aditya Kumar
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
