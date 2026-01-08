import React from 'react';
import { motion } from 'framer-motion';
import TiltCard3D from './TiltCard3D';
import { Sparkles, Trees, Users, MapPinned, Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const icons = [Sparkles, Trees, Users, MapPinned, Heart];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

const Amenities = () => {
    const { language } = useLanguage();
    const t = translations[language].amenities;

    return (
        <section id="amenities" className="section-padding bg-background">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">{t.features}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-deep-brown mt-2">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {t.items.map((amenity, index) => {
                        const Icon = icons[index];
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <TiltCard3D className="h-full" intensity={12}>
                                    <div className="flex flex-col items-center text-center py-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-light to-secondary flex items-center justify-center mb-6">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-serif font-semibold text-deep-brown mb-3">
                                            {amenity.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {amenity.description}
                                        </p>
                                    </div>
                                </TiltCard3D>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Amenities;
