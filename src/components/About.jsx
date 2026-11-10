import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';
import { siteConfig } from '@/config/site';
import exteriorImg from '@/assets/gallery/exterior.webp';

const About = () => {
    const { language } = useLanguage();
    const t = translations[language].about;

    return (
        <section id="about" className="section-padding bg-white dark:bg-card/40 relative">
            <div className="container-custom">
                <SectionHeading
                    label={t.welcome}
                    title={t.title}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left: Text & Badges */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4 leading-tight">
                            {t.name}
                        </h3>

                        <p className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-4 font-normal">
                            {t.name} {t.description1}
                        </p>

                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 font-normal">
                            {t.description2}
                        </p>

                        {/* 3 Highlight Badges */}
                        <div className="flex flex-wrap gap-2.5 pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FBF0D5] dark:bg-secondary border border-[#F0E4CE] dark:border-border/80 text-[#1F1A14] dark:text-foreground text-xs sm:text-sm font-medium shadow-subtle">
                                <span className="text-primary font-bold">✓</span>
                                <span>{t.familyFriendly}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FBF0D5] dark:bg-secondary border border-[#F0E4CE] dark:border-border/80 text-[#1F1A14] dark:text-foreground text-xs sm:text-sm font-medium shadow-subtle">
                                <span className="text-primary font-bold">✓</span>
                                <span>{t.cleanRooms}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FBF0D5] dark:bg-secondary border border-[#F0E4CE] dark:border-border/80 text-[#1F1A14] dark:text-foreground text-xs sm:text-sm font-medium shadow-subtle">
                                <span className="text-primary font-bold">✓</span>
                                <span>{t.affordableRates}</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: Property Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-card bg-card aspect-[4/3] sm:aspect-[16/10] lg:h-[380px] w-full group">
                            <img
                                src={exteriorImg}
                                alt="NK Sah Rental House Property View"
                                width="800"
                                height="600"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                            {/* Floating location tag */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm font-medium">
                                <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                                    📍 {siteConfig.address.full}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
