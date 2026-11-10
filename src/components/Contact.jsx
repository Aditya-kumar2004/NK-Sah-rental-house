import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Navigation,
    Copy,
    Check,
    ExternalLink,
    ShieldCheck,
    MessageCircle,
    Building2,
    ShoppingBag,
    Milestone
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';
import { siteConfig } from '@/config/site';

const Contact = () => {
    const { language } = useLanguage();
    const t = translations[language].contact;
    const [copied, setCopied] = useState(false);

    const addressText = language === 'hi' ? siteConfig.address.fullHindi : siteConfig.address.full;
    const landmarkText = language === 'hi' ? siteConfig.address.landmark : 'Near City Montessori School';

    const copyCoordinates = () => {
        const textToCopy = `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            });
        }
    };

    return (
        <section id="contact" className="section-padding bg-[#FFFBF4] dark:bg-[#0B0D10] relative overflow-hidden transition-colors duration-300">
            {/* Ambient luxury lighting */}
            <div
                className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-amber-500/5 dark:bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />

            <div className="container-custom relative z-10">
                <SectionHeading
                    label={t.getInTouch}
                    title={t.title}
                    subtitle={t.subtitle}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                    {/* Left Column: Direct Owner Concierge Hub (7 cols on lg) */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 flex flex-col justify-between"
                    >
                        <div className="bg-white dark:bg-[#12151A] border border-[#EEDBBA] dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_12px_40px_-15px_rgba(184,130,15,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-full flex flex-col justify-between relative overflow-hidden">
                            {/* Decorative gold hairline corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none rounded-bl-3xl" />

                            <div>
                                {/* Header Badge: Zero Brokerage & Verified Owner */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-4 tracking-wide">
                                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                                    <span>{t.badge || 'Direct Owner Connect • Zero Brokerage'}</span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3 leading-tight">
                                    {t.heading || 'Connect Directly with the Property Owner'}
                                </h3>

                                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-7 max-w-xl">
                                    {t.description || 'Whether you want to check room availability, schedule a private walkthrough, or discuss pricing, we are here to assist you.'}
                                </p>

                                {/* 4 Interactive Channel Cards */}
                                <div className="space-y-3.5">
                                    {/* 1. Direct Phone Call (Featured High-Priority Red Card) */}
                                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-500/[0.04] via-transparent to-red-500/[0.02] dark:from-red-500/10 dark:to-transparent border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start sm:items-center gap-3.5">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-rose-500 text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(220,38,38,0.35)] group-hover:scale-105 transition-transform duration-300">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                                                            {t.primaryPhone || 'Direct Phone Call'}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                            {t.available247 || 'Live 24/7'}
                                                        </span>
                                                    </div>
                                                    <p className="text-lg sm:text-xl font-bold font-mono text-foreground tracking-tight">
                                                        {siteConfig.phoneDisplay}
                                                    </p>
                                                </div>
                                            </div>

                                            <a
                                                href={`tel:${siteConfig.phone}`}
                                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 shadow-[0_4px_16px_rgba(220,38,38,0.4)] transition-all whitespace-nowrap"
                                            >
                                                <Phone className="w-4 h-4" />
                                                <span>{t.callOwnerNow || 'Call Owner Now'}</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* 2. WhatsApp Concierge Card */}
                                    <div className="p-4 sm:p-5 rounded-2xl bg-[#25D366]/[0.04] dark:bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 group">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start sm:items-center gap-3.5">
                                                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(37,211,102,0.35)] group-hover:scale-105 transition-transform duration-300">
                                                    <MessageCircle className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                                            WhatsApp Concierge
                                                        </span>
                                                        <span className="text-[11px] text-muted-foreground font-medium">
                                                            &lt; 15 min reply
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium text-foreground">
                                                        Primary: <span className="font-mono font-semibold">+91 97712 33530</span>
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Alternate: <span className="font-mono">+91 70503 08555</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                                                <a
                                                    href={siteConfig.whatsapp?.chatUrl || 'https://wa.me/919771233530'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] active:scale-95 shadow-sm transition-all whitespace-nowrap flex-1 sm:flex-none"
                                                >
                                                    <MessageCircle className="w-4 h-4" />
                                                    <span>{t.chatWhatsApp || 'Chat Now'}</span>
                                                </a>
                                                <a
                                                    href={siteConfig.whatsapp?.alternateChatUrl || 'https://wa.me/917050308555'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-medium text-foreground bg-secondary/80 hover:bg-secondary border border-border/60 transition-all whitespace-nowrap"
                                                    title="Chat with alternate number"
                                                >
                                                    <span>Alt Line</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Official Email Card */}
                                    <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-border/70 hover:border-primary/40 transition-all duration-300">
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        {t.email || 'Email Support'}
                                                    </span>
                                                </div>
                                                <a
                                                    href={`mailto:${siteConfig.email}`}
                                                    className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors truncate block"
                                                >
                                                    {siteConfig.email}
                                                </a>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                                    {t.emailSub || 'For tenancy agreements, receipts & inquiries'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. Visiting & Room Tour Hours */}
                                    <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-border/70">
                                        <div className="flex items-start gap-3.5">
                                            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    {t.visitingHours || 'Property Viewing Hours'}
                                                </span>
                                                <p className="text-sm font-semibold text-foreground mt-0.5">
                                                    {t.visitingTime || 'Monday – Sunday: 7:00 AM – 9:00 PM'}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                                    💡 {t.visitingNotice || 'Prior call recommended for in-person room tours'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Smart Interactive Location & Google Map (5 cols on lg) */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-5 flex flex-col justify-between"
                    >
                        <div className="bg-white dark:bg-[#12151A] border border-[#EEDBBA] dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_-15px_rgba(184,130,15,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-full flex flex-col justify-between">
                            <div>
                                {/* Header Address Block */}
                                <div className="mb-5 pb-5 border-b border-border/70">
                                    <div className="flex items-center justify-between gap-3 mb-2.5">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                            <h4 className="font-serif font-bold text-lg text-foreground">
                                                {t.ourLocation || 'Property Location'}
                                            </h4>
                                        </div>

                                        {/* Coordinates Copy Badge */}
                                        <button
                                            type="button"
                                            onClick={copyCoordinates}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground text-xs font-mono border border-border/60 transition-all hover:scale-105 active:scale-95 group"
                                            title="Click to copy GPS coordinates"
                                            aria-label="Copy GPS coordinates"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-emerald-500 font-sans font-semibold">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    <span>27.0965, 84.1546</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <p className="text-sm font-semibold text-foreground leading-relaxed">
                                        📍 {landmarkText}
                                    </p>
                                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                                        {addressText}
                                    </p>
                                </div>

                                {/* Embedded Google Map Frame */}
                                <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-[#EEDBBA] dark:border-white/10 shadow-inner bg-card group mb-5">
                                    <iframe
                                        src={siteConfig.maps.embedUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-full rounded-2xl filter saturate-[1.05] contrast-[1.02]"
                                        title="NK Sah Rental House interactive map location"
                                    />

                                    {/* Top Left Floating Radar Badge */}
                                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/85 text-white backdrop-blur-md border border-white/20 text-[11px] font-semibold shadow-md">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                            <span>NK Sah Rental House</span>
                                        </div>
                                    </div>

                                    {/* Bottom Floating Map CTA Button */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
                                        <a
                                            href={siteConfig.maps.searchUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-zinc-950 bg-white/95 hover:bg-white backdrop-blur-md shadow-lg border border-black/10 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                                            aria-label="Open full map in Google Maps"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>{t.openInMaps || 'Open in Google Maps'}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Direct Direction Link */}
                                <a
                                    href={siteConfig.maps.directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-3d w-full min-h-[48px] py-3 text-sm flex items-center justify-center gap-2 mb-5 shadow-md font-semibold text-black"
                                >
                                    <Navigation className="w-4 h-4 flex-shrink-0" />
                                    <span>{t.getDirections || 'Get Turn-by-Turn Directions'}</span>
                                </a>

                                {/* 4 Neighborhood Distance Chips */}
                                <div className="pt-4 border-t border-border/70">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                                        {t.neighborhoodTitle || 'Neighborhood Proximity'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="p-2.5 rounded-xl bg-secondary/50 dark:bg-white/[0.02] border border-border/50 flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-primary flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-foreground truncate">City Montessori</p>
                                                <p className="text-[10px] text-muted-foreground">&lt; 2 min walk</p>
                                            </div>
                                        </div>

                                        <div className="p-2.5 rounded-xl bg-secondary/50 dark:bg-white/[0.02] border border-border/50 flex items-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-foreground truncate">Local Market</p>
                                                <p className="text-[10px] text-muted-foreground">3 min walk</p>
                                            </div>
                                        </div>

                                        <div className="p-2.5 rounded-xl bg-secondary/50 dark:bg-white/[0.02] border border-border/50 flex items-center gap-2">
                                            <Milestone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-foreground truncate">Main Highway</p>
                                                <p className="text-[10px] text-muted-foreground">Direct road</p>
                                            </div>
                                        </div>

                                        <div className="p-2.5 rounded-xl bg-secondary/50 dark:bg-white/[0.02] border border-border/50 flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                            <div className="min-w-0">
                                                <p className="font-semibold text-foreground truncate">Security</p>
                                                <p className="text-[10px] text-muted-foreground">Family friendly</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
