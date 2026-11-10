import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Map, Clock, Navigation } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';
import { siteConfig } from '@/config/site';

const ContactItem = ({ icon: Icon, title, content, link, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-[#FBF0D5]/50 dark:hover:bg-secondary/40 transition-colors group"
    >
        <div className="w-11 h-11 rounded-xl bg-[#FBF0D5] dark:bg-primary/10 border border-[#F0E4CE] dark:border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-serif font-medium text-foreground text-sm sm:text-base mb-0.5">{title}</h4>
            {link ? (
                <a
                    href={link}
                    target={link.startsWith('http') ? '_blank' : undefined}
                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[#4A4036] dark:text-muted-foreground hover:text-primary transition-colors inline-flex items-center min-h-[44px] text-sm sm:text-base break-words"
                >
                    {content}
                </a>
            ) : (
                <p className="text-[#4A4036] dark:text-muted-foreground text-sm sm:text-base leading-relaxed py-2">
                    {content}
                </p>
            )}
        </div>
    </motion.div>
);

const Contact = () => {
    const { language } = useLanguage();
    const t = translations[language].contact;

    const addressText = language === 'hi' ? siteConfig.address.fullHindi : siteConfig.address.full;

    return (
        <section id="contact" className="section-padding bg-white dark:bg-background relative overflow-hidden">
            <div className="container-custom relative z-10">
                <SectionHeading
                    label={t.getInTouch}
                    title={t.title}
                    subtitle={t.subtitle}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                    >
                        <div className="bg-white dark:bg-card border border-[#F0E4CE] dark:border-border/80 p-6 md:p-8 rounded-2xl shadow-card h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-foreground mb-6 pb-4 border-b border-border/60">
                                    {t.contactInfo}
                                </h3>

                                <div className="space-y-1">
                                    <ContactItem
                                        icon={Phone}
                                        title={t.primaryPhone}
                                        content={siteConfig.phoneDisplay}
                                        link={`tel:${siteConfig.phone}`}
                                        delay={0.05}
                                    />
                                    <ContactItem
                                        icon={Mail}
                                        title={t.email}
                                        content={siteConfig.email}
                                        link={`mailto:${siteConfig.email}`}
                                        delay={0.1}
                                    />
                                    <ContactItem
                                        icon={Clock}
                                        title={t.availability}
                                        content={t.available247}
                                        delay={0.15}
                                    />
                                    <ContactItem
                                        icon={Map}
                                        title={t.ourLocation}
                                        content={addressText}
                                        link={siteConfig.maps.directionsUrl}
                                        delay={0.2}
                                    />
                                </div>
                            </div>

                            {/* Direct Get Directions Link in Contact Card */}
                            <div className="pt-6 mt-4 border-t border-border/60">
                                <a
                                    href={siteConfig.maps.directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline-3d w-full min-h-[48px] py-3 text-sm flex items-center justify-center gap-2"
                                >
                                    <Navigation className="w-4 h-4" />
                                    <span>{t.getDirections || 'Get Directions'}</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Google Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-full min-h-[350px] md:min-h-[440px]"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#F0E4CE] dark:border-border/80 shadow-card bg-card group">
                            {/* Google Maps Embedded iframe with exact coordinates */}
                            <iframe
                                src={siteConfig.maps.embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full min-h-[350px] md:min-h-[440px] rounded-2xl transition-all duration-500"
                                title="NK Sah Rental House location"
                            />

                            {/* Single overlay button: Open in Google Maps */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
                                <a
                                    href={siteConfig.maps.searchUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary-3d min-h-[44px] py-2.5 px-6 text-sm font-semibold rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap"
                                    aria-label="Open location in Google Maps"
                                >
                                    <Navigation className="w-4 h-4 flex-shrink-0" />
                                    <span>{t.openInMaps}</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
