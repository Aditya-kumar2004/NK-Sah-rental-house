import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard3D from './TiltCard3D';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { language } = useLanguage();
    const t = translations[language].reviews;

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % t.items.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + t.items.length) % t.items.length);
    };

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            nextReview();
        }, 6000);
        return () => clearInterval(timer);
    }, [language, currentIndex]); // Removed language dependency, improved stability

    return (
        <section id="reviews" className="section-padding bg-background relative border-t border-white/5">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-medium text-sm uppercase tracking-wider">{t.testimonials}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-2">
                        {t.title}
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${language}-${currentIndex}`}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <TiltCard3D className="w-full" intensity={6}>
                                    <div className="glass-card p-8 md:p-14 text-center border-gold/10 relative overflow-hidden">
                                        {/* Decorative big quote */}
                                        <div className="absolute top-4 left-4 text-gold/5 text-9xl font-serif leading-none select-none">“</div>

                                        <Quote className="w-12 h-12 text-gold/30 mx-auto mb-6" />

                                        {/* Stars */}
                                        <div className="flex justify-center gap-1.5 mb-8">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Star className="w-5 h-5 fill-gold text-gold drop-shadow-md" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Review text */}
                                        <p className="text-xl md:text-2xl text-foreground font-light italic leading-relaxed mb-10 relative z-10">
                                            "{t.items[currentIndex].text}"
                                        </p>

                                        {/* Reviewer info */}
                                        <div className="border-t border-white/10 pt-6 inline-block w-full max-w-xs mx-auto">
                                            <p className="font-serif font-semibold text-lg text-gold tracking-wide">
                                                {t.items[currentIndex].name}
                                            </p>
                                            <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">
                                                {t.items[currentIndex].date}
                                            </p>
                                        </div>
                                    </div>
                                </TiltCard3D>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows - visible on desktop/hover */}
                        <motion.button
                            onClick={prevReview}
                            className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 w-12 h-12 rounded-full glass-card hover:bg-gold hover:text-black flex items-center justify-center transition-all z-20 shadow-lg"
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            onClick={nextReview}
                            className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 w-12 h-12 rounded-full glass-card hover:bg-gold hover:text-black flex items-center justify-center transition-all z-20 shadow-lg"
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>

                        {/* Dots */}
                        <div className="flex justify-center items-center gap-3 mt-10">
                            {t.items.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${index === currentIndex
                                        ? 'bg-gold w-8 shadow-[0_0_10px_#FFD700]'
                                        : 'bg-white/20 w-1.5 hover:bg-white/40'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
