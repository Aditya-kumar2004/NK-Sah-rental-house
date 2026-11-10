import React from 'react';
import { motion } from 'framer-motion';
import TiltCard3D from './TiltCard3D';
import SectionHeading from './SectionHeading';
import {
    Sparkles,
    Moon,
    ShieldCheck,
    Wallet,
    MapPin,
    HeartHandshake,
    Zap,
    Droplets,
    Lock
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const icons = [Sparkles, Moon, ShieldCheck, Wallet, MapPin, HeartHandshake];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const Amenities = () => {
    const { language } = useLanguage();
    const t = translations[language].amenities;

    return (
        <section id="amenities" className="section-padding bg-[#FFFBF4] dark:bg-[#0B0D10] relative overflow-hidden transition-colors duration-300">
            {/* Ambient luxury lighting */}
            <div
                className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/5 dark:bg-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />

            <div className="container-custom relative z-10">
                <SectionHeading
                    label={t.features}
                    title={t.title}
                    subtitle={t.subtitle}
                />

                {/* 3x2 Grid on desktop, 2x3 on tablet, 1 col on mobile */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
                >
                    {t.items.map((amenity, index) => {
                        const Icon = icons[index % icons.length];
                        const cardIndex = String(index + 1).padStart(2, '0');

                        return (
                            <motion.div key={index} variants={itemVariants} className="h-full">
                                <TiltCard3D className="h-full" intensity={6} noPadding={true}>
                                    <div className="h-full flex flex-col justify-between bg-white dark:bg-[#12151A] border border-[#EEDBBA] dark:border-white/10 rounded-3xl p-6 sm:p-7 md:p-8 hover:border-amber-500/60 dark:hover:border-amber-500/60 shadow-[0_10px_30px_-15px_rgba(184,130,15,0.12)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.55)] transition-all duration-300 relative overflow-hidden group">
                                        {/* Subtle corner light sheen */}
                                        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div>
                                            {/* Top Bar: Icon + Index & Tag Pill */}
                                            <div className="flex items-center justify-between gap-3 mb-6">
                                                <div className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-amber-500/60 transition-all duration-300 shadow-sm">
                                                    <Icon className="w-6 h-6" />
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {amenity.tag && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-body font-semibold tracking-wide bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25">
                                                            {amenity.tag}
                                                        </span>
                                                    )}
                                                    <span className="font-mono text-xs font-bold text-muted-foreground/50">
                                                        {cardIndex}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* H3 Card Title: 1.25rem to 1.5rem, weight 600 */}
                                            <h3 className="text-[1.25rem] sm:text-[1.5rem] font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-[1.3] tracking-[-0.01em]">
                                                {amenity.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-muted-foreground text-sm sm:text-base leading-[1.7] font-body font-normal">
                                                {amenity.description}
                                            </p>
                                        </div>

                                        {/* Bottom active hover accent bar */}
                                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-rose-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                                    </div>
                                </TiltCard3D>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom Trust Guarantee Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-[#12151A]/80 backdrop-blur-md border border-[#EEDBBA] dark:border-white/10 shadow-sm"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-foreground">
                                    {t.trust1 || '24/7 Security & Safe Gated Boundary'}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {language === 'en' ? 'CCTV Monitored • Private Compound' : 'सीसीटीवी निगरानी • निजी परिसर'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-3 p-2 border-t md:border-t-0 md:border-l border-border/60">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                                <Droplets className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-foreground">
                                    {t.trust2 || 'Continuous Clean Water & Power Supply'}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {language === 'en' ? 'Deep Borewell Water • Dedicated Sub-meters' : 'स्वच्छ बोरवेल पानी • अलग सब-मीटर'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-3 p-2 border-t md:border-t-0 md:border-l border-border/60">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
                                <HeartHandshake className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-foreground">
                                    {t.trust3 || 'Direct On-Site Owner Assistance'}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {language === 'en' ? 'Prompt maintenance & zero brokerage fees' : 'त्वरित रखरखाव व कोई दलाली नहीं'}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Amenities;
