import React from 'react';
import { motion } from 'framer-motion';
import TiltCard3D from './TiltCard3D';
import SectionHeading from './SectionHeading';
import { Sparkles, Moon, ShieldCheck, Wallet, MapPin, HeartHandshake } from 'lucide-react';
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
    hidden: { opacity: 0, y: 20 },
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
        <section id="amenities" className="section-padding bg-[#FFF8EE] dark:bg-background relative">
            <div className="container-custom">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {t.items.map((amenity, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.div key={index} variants={itemVariants} className="h-full">
                                <TiltCard3D className="h-full" intensity={8}>
                                    <div className="flex flex-col h-full group">
                                        <div className="w-12 h-12 rounded-xl bg-[#FBF0D5] dark:bg-primary/10 border border-[#F0E4CE] dark:border-primary/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-serif font-semibold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                                            {amenity.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed font-normal">
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
