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
        <section className="bg-white dark:bg-card border-y border-[#F0E4CE] dark:border-border/80 shadow-[0_10px_30px_rgba(120,90,30,0.06)] dark:shadow-subtle py-8 md:py-12 relative">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#F0E4CE] dark:divide-border/60">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`flex flex-col items-center justify-center text-center p-4 sm:p-6 ${
                                index === 1 ? 'border-t-0 md:border-t-0' : ''
                            }`}
                        >
                            <div className="flex items-baseline justify-center font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight mb-1">
                                <AnimatedNumber value={stat.value} />
                                <span className="ml-0.5 text-2xl sm:text-3xl lg:text-4xl text-primary font-serif">
                                    {stat.suffix}
                                </span>
                            </div>

                            <p className="text-[#1F1A14] dark:text-foreground/90 font-medium text-xs sm:text-sm tracking-wider uppercase mt-1">
                                {stat.label}
                            </p>
                            {stat.sub && (
                                <p className="text-xs text-[#7A6D5C] dark:text-muted-foreground mt-0.5 font-normal">
                                    {stat.sub}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
