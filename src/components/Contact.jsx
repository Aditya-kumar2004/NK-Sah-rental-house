import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Map, Clock, Navigation } from 'lucide-react';
import TiltCard3D from './TiltCard3D';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const ContactItem = ({ icon: Icon, title, content, link, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
    >
        <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-gold/30">
            <Icon className="w-5 h-5 text-gold" />
        </div>
        <div className="flex-1">
            <h3 className="font-serif font-medium text-foreground mb-1">{title}</h3>
            {link ? (
                <a href={link} className="text-muted-foreground hover:text-gold transition-colors block text-sm sm:text-base break-words">
                    {content}
                </a>
            ) : (
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {content}
                </p>
            )}
        </div>
    </motion.div>
);

const Contact = () => {
    const { language } = useLanguage();
    const t = translations[language].contact;

    return (
        <section id="contact" className="section-padding bg-background relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute -left-20 top-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -right-20 bottom-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-medium text-sm uppercase tracking-wider">{t.getInTouch}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-2">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="glass-card p-6 md:p-8 rounded-2xl border-gold/10 h-full">
                            <h3 className="text-xl font-serif font-bold text-foreground mb-6 pb-4 border-b border-white/10">
                                {t.contactInfo}
                            </h3>

                            <div className="space-y-2">
                                <ContactItem
                                    icon={Phone}
                                    title={t.primaryPhone}
                                    content="+91 9771233530"
                                    link="tel:+919771233530"
                                    delay={0.1}
                                />
                                <ContactItem
                                    icon={Phone}
                                    title={t.secondaryPhone}
                                    content="+91 7050308555"
                                    link="tel:+917050308555"
                                    delay={0.2}
                                />
                                <ContactItem
                                    icon={Mail}
                                    title={t.email}
                                    content="contact@nksahrental.com"
                                    link="mailto:contact@nksahrental.com"
                                    delay={0.3}
                                />
                                <ContactItem
                                    icon={Clock}
                                    title={t.availability}
                                    content={t.available247}
                                    delay={0.4}
                                />
                                <ContactItem
                                    icon={Map}
                                    title={t.ourLocation}
                                    content={`Chotkipatti Bargaw, near City Montessori School, Bihar 852202`}
                                    delay={0.5}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-full min-h-[300px] md:min-h-[400px]"
                    >
                        <TiltCard3D className="h-full" intensity={5}>
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-elevated group">
                                <iframe
                                    src="https://maps.google.com/maps?q=Nand+Kishor+Rental+House&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="filter grayscale-[20%] hover:grayscale-0 transition-all duration-700 contrast-125 opacity-90 hover:opacity-100 min-h-[300px] md:min-h-[450px]"
                                ></iframe>

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-2xl ring-1 ring-white/5"></div>

                                {/* Floating Button */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                    <a
                                        href="https://google.com/maps/place/Nand+Kishor+Rental+House/data=!4m2!3m1!1s0x0:0xcd551a9781bc0649?sa=X&ved=1t:2428&ictx=111"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/90 hover:bg-gold text-black font-semibold shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all transform hover:scale-105 hover:-translate-y-1 whitespace-nowrap"
                                    >
                                        <Navigation className="w-4 h-4 flex-shrink-0" />
                                        <span>{t.openInMaps}</span>
                                    </a>
                                </div>
                            </div>
                        </TiltCard3D>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
