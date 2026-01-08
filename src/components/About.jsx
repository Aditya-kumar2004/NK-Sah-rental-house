import React from 'react';
import { motion } from 'framer-motion';
import TiltCard3D from './TiltCard3D';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const About = () => {
    const { language } = useLanguage();
    const t = translations[language].about;

    return (
        <section id="about" className="section-padding bg-cream">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">{t.welcome}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-deep-brown mt-2">
                        {t.title}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <TiltCard3D className="w-full" intensity={8}>
                        <div className="text-center py-4">
                            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
                            <p className="text-lg md:text-xl text-black dark:text-white leading-relaxed mb-6 font-semibold">
                                <span className="text-2xl md:text-3xl font-serif text-black dark:text-white font-bold">
                                    {t.name}
                                </span>{' '}
                                {t.description1}
                            </p>
                            <p className="text-gray-900 dark:text-gray-200 leading-relaxed font-semibold">
                                {t.description2}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                                    ✓ {t.familyFriendly}
                                </div>
                                <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                                    ✓ {t.cleanRooms}
                                </div>
                                <div className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                                    ✓ {t.affordableRates}
                                </div>
                            </div>
                        </div>
                    </TiltCard3D>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
