import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Heart, ChevronUp, MessageCircle, ShieldCheck, Zap, Users, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';
import { siteConfig } from '@/config/site';

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
        { label: 'FAQ', href: '#faq' },
        { label: navT.contact, href: '#contact' },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="bg-[#0B0D10] text-zinc-300 relative border-t border-white/10 transition-colors duration-300 overflow-hidden">
            {/* Ambient luxury lighting aura */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/10 blur-[160px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />
            {/* Subtle decorative dot pattern */}
            <div
                className="absolute inset-0 bg-[radial-gradient(#B8820F_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.05] pointer-events-none"
                aria-hidden="true"
            />

            <div className="container-custom pt-16 pb-12 relative z-10">
                {/* Pre-Footer Action Banner / Invitation Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl bg-gradient-to-r from-[#14171E] via-[#1B202A] to-[#14171E] border border-primary/30 p-8 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-16 overflow-hidden"
                >
                    {/* Golden top light line */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/25 mb-4 uppercase tracking-wider">
                                📍 {siteConfig.address.short}
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-snug mb-3">
                                {t.bannerTitle}
                            </h3>
                            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                                {t.bannerSubtitle}
                            </p>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto flex-shrink-0">
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="btn-primary-3d w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black shadow-lg"
                            >
                                <Phone className="w-4 h-4" />
                                <span>{t.callNow}</span>
                            </a>

                            <a
                                href={siteConfig.whatsapp?.chatUrl || 'https://wa.me/919771233530'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 transition-colors shadow-sm"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>{t.chatWhatsApp}</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Main 4-Column Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
                    {/* Column 1: Brand & Trust Badges (4 cols) */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3.5 mb-5">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/40 shadow-sm flex-shrink-0">
                                <img
                                    src="/logo.png"
                                    alt="NK Sah Rental House"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-serif font-bold text-xl leading-tight text-white tracking-wide">
                                    NK Sah
                                </p>
                                <p className="text-primary text-[11px] uppercase tracking-widest font-semibold">
                                    {t.rentalHouse}
                                </p>
                            </div>
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
                            {t.tagline}
                        </p>

                        {/* 3 Trust Badges */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                <span>{t.verifiedProperty || 'Verified Private Property'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                <span>{t.waterPower || '24/7 Water & Power Supply'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                                <Users className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <span>{t.familyFriendly || 'Family & Student Friendly'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Navigation Links (2 cols) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-primary mb-5">
                            {t.quickLinks}
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-1.5 group py-1"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:w-2 group-hover:bg-primary transition-all duration-200" />
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Channels (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-primary mb-5">
                            {t.contact}
                        </h4>

                        <div className="space-y-3">
                            {/* Primary Phone */}
                            <a
                                href={`tel:${siteConfig.phone}`}
                                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-black flex items-center justify-center transition-colors flex-shrink-0">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-zinc-400 uppercase tracking-wider">
                                        Direct Call 24/7
                                    </p>
                                    <p className="text-white text-sm font-semibold group-hover:text-primary transition-colors">
                                        {siteConfig.phoneDisplay}
                                    </p>
                                </div>
                            </a>

                            {/* WhatsApp Channel */}
                            <a
                                href={siteConfig.whatsapp?.chatUrl || 'https://wa.me/919771233530'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-emerald-500/30 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-black flex items-center justify-center transition-colors flex-shrink-0">
                                    <MessageCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-zinc-400 uppercase tracking-wider">
                                        WhatsApp Chat
                                    </p>
                                    <p className="text-white text-sm font-semibold group-hover:text-emerald-400 transition-colors">
                                        Chat with Owner
                                    </p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-primary/30 transition-all group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-black flex items-center justify-center transition-colors flex-shrink-0">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[11px] text-zinc-400 uppercase tracking-wider">
                                        Email Inquiries
                                    </p>
                                    <p className="text-white text-xs sm:text-sm font-medium truncate group-hover:text-primary transition-colors">
                                        {siteConfig.email}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Column 4: Location & Directions (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-primary mb-5">
                            {t.address}
                        </h4>

                        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 mb-4">
                            <div className="flex items-start gap-2.5 text-zinc-300 text-sm mb-3">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <p className="leading-relaxed text-xs sm:text-sm">
                                    Near City Montessori School,
                                    <br />
                                    Chotkipatti, Bargaw,
                                    <br />
                                    Bihar – 845401
                                </p>
                            </div>

                            {/* Coordinates Tag */}
                            <div className="text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md mb-3 inline-block">
                                27.0965° N, 84.1546° E
                            </div>

                            <a
                                href={siteConfig.maps.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-primary/20 hover:bg-primary hover:text-black border border-primary/40 transition-all duration-200 shadow-sm"
                            >
                                <span>{language === 'en' ? 'Get Directions on Google Maps' : 'गूगल मैप्स पर दिशा-निर्देश'}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright, Made with Artifex Web & Back to Top */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-zinc-400">
                    <p>
                        © {currentYear} NK Sah Rental House. {t.allRights}
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                            {t.madeWith || 'Made with'}
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline animate-pulse" />
                            <span>{language === 'en' ? 'by' : 'द्वारा'}</span>
                        </span>
                        <a
                            href={siteConfig.developer?.url || 'https://www.artifexweb.in/'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-primary/20 text-zinc-300 hover:text-primary border border-white/10 hover:border-primary/40 transition-all duration-200 font-medium group shadow-sm"
                            aria-label="Artifex Web - Website Developer"
                        >
                            <span className="text-xs font-semibold tracking-wide">
                                {siteConfig.developer?.name || 'Artifex Web'}
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>

                    {/* Back to Top Button */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-primary hover:text-black border border-white/10 hover:border-primary transition-all duration-200 text-zinc-300 group"
                        aria-label="Scroll back to top"
                    >
                        <span>{t.backToTop || 'Back to Top'}</span>
                        <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;