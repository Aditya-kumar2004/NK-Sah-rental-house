import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';
import { Users, Star, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const Stats = () => {
    const { language } = useLanguage();
    const t = translations[language].stats;

    const statsData = [
        {
            label: t.happyTenants,
            sub: language === 'en' ? 'Verified Residents' : 'सत्यापित निवासी',
            value: 25,
            suffix: '+',
            icon: Users,
            iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        },
        {
            label: t.googleRating,
            sub: language === 'en' ? '★★★★★ 5-Star Rated' : '★★★★★ 5-स्टार रेटिंग',
            value: 4.9,
            suffix: '★',
            icon: Star,
            iconColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
        },
        {
            label: t.cleanRooms,
            sub: language === 'en' ? 'Daily Sanitized' : 'दैनिक स्वच्छता',
            value: 100,
            suffix: '%',
            icon: Sparkles,
            iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        },
        {
            label: t.availability,
            sub: language === 'en' ? 'Direct Owner Support' : 'सीधी मालिक सहायता',
            value: 24,
            suffix: '/7',
            icon: Clock,
            iconColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        },
    ];

    return (
        <section className="py-8 sm:py-12 bg-[#FFFBF4] dark:bg-[#0B0D10] relative transition-colors duration-300">
            <div className="container-custom">
                {/* Floating Architectural Credibility Capsule */}
                <div className="bg-white dark:bg-[#12151A] border border-[#EEDBBA] dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_15px_45px_-15px_rgba(184,130,15,0.15)] dark:shadow-[0_20px_55px_rgba(0,0,0,0.65)] relative overflow-hidden">
                    {/* Top ambient gold light spill */}
                    <div
                        className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-36 bg-amber-500/10 blur-3xl pointer-events-none rounded-full"
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 divide-border/60">
                        {statsData.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-20px' }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className={`flex flex-col items-center justify-center text-center p-3 sm:p-4 group hover:-translate-y-1 transition-transform duration-300 ${
                                        index >= 2 ? 'pt-6 sm:pt-4' : ''
                                    }`}
                                >
                                    {/* Icon Badge */}
                                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center mb-3 border ${stat.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* Shimmering Big Number Counter */}
                                    <div className="flex items-baseline justify-center font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight mb-1">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-500">
                                            <AnimatedNumber value={stat.value} />
                                        </span>
                                        <span className="ml-0.5 text-2xl sm:text-3xl lg:text-4xl text-amber-500 font-serif">
                                            {stat.suffix}
                                        </span>
                                    </div>

                                    {/* Stat Label */}
                                    <p className="text-foreground font-semibold text-xs sm:text-sm tracking-wider uppercase mt-1">
                                        {stat.label}
                                    </p>

                                    {/* Subtitle / Verification Tag */}
                                    {stat.sub && (
                                        <span className="inline-block text-[11px] sm:text-xs text-muted-foreground mt-1 font-medium">
                                            {stat.sub}
                                        </span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
