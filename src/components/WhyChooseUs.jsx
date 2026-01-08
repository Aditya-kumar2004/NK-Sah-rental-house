import React from 'react';
import { motion } from 'framer-motion';
import TiltCard3D from './TiltCard3D';
import { ShieldCheck, Sparkles, BookOpen, Wallet, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const icons = [ShieldCheck, Sparkles, BookOpen, Wallet, MapPin];

const WhyChooseUs = () => {
    const { language } = useLanguage();
    const t = translations[language].whyUs;

    return (
        <section id="why-us" className="section-padding bg-background relative overflow-hidden">
            {/* Background glowing blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-medium text-sm uppercase tracking-wider">{t.title}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-2">
                        {t.subtitle}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {t.items.map((item, index) => {
                        const Icon = icons[index];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <TiltCard3D className="h-full" intensity={10}>
                                    <div className="bg-secondary/20 backdrop-blur-sm border border-white/5 hover:border-gold/30 p-8 rounded-2xl h-full transition-all duration-300 group">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="w-7 h-7 text-gold" />
                                        </div>
                                        <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </TiltCard3D>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
