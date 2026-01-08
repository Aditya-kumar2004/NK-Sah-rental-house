import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageToggle from './LanguageToggle';
import ParticleGlobe from './ParticleGlobe';
import { translations } from '@/lib/translations';

const Hero = () => {
    const { language } = useLanguage();
    const t = translations[language].hero;

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
            {/* Language Toggle - Top Right */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-24 right-6 z-20"
            >
                <LanguageToggle />
            </motion.div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Blobs removed for clean Particle Globe look */}
            </div>

            {/* Content Container (Split Layout) */}
            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen pt-20">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center lg:text-left order-2 lg:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 mx-auto lg:mx-0"
                    >
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium tracking-wide">{t.location}</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        <span className="block font-serif gradient-text">{t.title1}</span>
                        <span className="block font-serif text-foreground">{t.title2}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                        {t.description}
                    </p>

                    {/* Rating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center lg:justify-start gap-4 mb-10"
                    >
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                            ))}
                        </div>
                        <span className="flex items-center gap-2 text-foreground font-medium">
                            4.9 <span className="w-1 h-1 rounded-full bg-foreground/30" /> {t.rating}
                        </span>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <a href="tel:+919771233530" className="btn-primary-3d w-full sm:w-auto flex items-center justify-center gap-2 group">
                            <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                            {t.callNow}
                        </a>
                        <a
                            href="#contact"
                            className="btn-outline-3d w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            <MapPin className="w-5 h-5" />
                            {t.getDirections}
                        </a>
                    </div>
                </motion.div>

                {/* Right: Particle Globe Visual */}
                <div className="hidden lg:block order-1 lg:order-2 h-full min-h-[500px]">
                    <ParticleGlobe />
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
