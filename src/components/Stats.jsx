import React from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const Stats = () => {
    const { language } = useLanguage();
    const t = translations[language].stats;

    const statsData = [
        { label: t.happyTenants, value: 25, suffix: '+' },
        { label: t.googleRating, value: 4.9, suffix: '★' },
        { label: t.cleanRooms, value: 100, suffix: '%' },
        { label: t.availability, sub: t.availabilitySub, value: 24, suffix: '/7' },
    ];

    return (
        <section className="py-20 bg-background relative border-y border-white/5">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="relative inline-block">
                                <span className="text-4xl md:text-6xl font-serif font-bold text-gold text-shadow-gold block mb-2">
                                    {/* Handle float vs integer animation slightly differently if needed, but AnimatedNumber takes raw value */}
                                    <AnimatedNumber value={stat.value} />
                                    <span className="text-3xl md:text-5xl ml-1">{stat.suffix}</span>
                                </span>
                                {/* Glow effect behind number */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm mt-2">
                                {stat.label}
                            </p>
                            {stat.sub && (
                                <p className="text-xs text-primary/80 mt-1">{stat.sub}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
