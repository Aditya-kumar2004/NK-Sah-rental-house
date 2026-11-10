import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Phone, MessageCircle, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';
import { siteConfig } from '@/config/site';

const FAQItem = ({ item, index, isOpen, onClick }) => {
    const formattedNumber = String(index + 1).padStart(2, '0');

    return (
        <div
            className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                isOpen
                    ? 'bg-white dark:bg-[#181B20] border-primary/50 dark:border-primary/60 shadow-[0_10px_30px_rgba(120,90,30,0.08)] dark:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)]'
                    : 'bg-white dark:bg-[#181B20]/90 border-[#F0E4CE] dark:border-border/60 hover:border-primary/40 dark:hover:border-primary/40 shadow-sm hover:shadow-card hover:-translate-y-0.5'
            }`}
        >
            <button
                type="button"
                onClick={onClick}
                className="w-full min-h-[56px] flex items-center justify-between p-4 sm:p-5 md:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3.5 sm:gap-4 pr-3">
                    {/* Number Badge */}
                    <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 transition-colors ${
                            isOpen
                                ? 'bg-primary text-white dark:text-black shadow-sm'
                                : 'bg-primary/10 text-primary dark:text-amber-400 group-hover:bg-primary group-hover:text-white dark:group-hover:text-black'
                        }`}
                    >
                        {formattedNumber}
                    </span>

                    {/* Question Title in Plus Jakarta Sans / Noto Sans Devanagari */}
                    <span
                        className={`text-base sm:text-lg font-body transition-colors leading-[1.4] ${
                            isOpen
                                ? 'text-primary font-bold'
                                : 'text-[#1F1A14] dark:text-white font-semibold group-hover:text-primary'
                        }`}
                    >
                        {item.question}
                    </span>
                </div>

                {/* Toggle Pill Icon */}
                <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                            ? 'border-primary bg-primary text-white dark:text-black rotate-180 shadow-sm'
                            : 'border-[#F0E4CE] dark:border-border/80 text-muted-foreground group-hover:border-primary group-hover:text-primary'
                    }`}
                >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
            </button>

            {/* Smooth Expandable Answer */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[#4A4036] dark:text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-[#F0E4CE]/60 dark:border-border/40 pt-4">
                            <p className="pl-0 sm:pl-11">{item.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const { language } = useLanguage();
    const t = translations[language].faq;
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="section-padding bg-[#FFF8EE] dark:bg-[#121417] relative border-t border-[#F0E4CE] dark:border-border/60 overflow-hidden">
            {/* Ambient luxury lighting aura */}
            <div
                className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-primary/10 dark:bg-primary/15 blur-[150px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />

            <div className="container-custom">
                {/* 2-Column Split Layout on Desktop, Stacked on Mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Editorial Sticky Heading & Direct Support Card */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        {/* Section Label: 0.8rem, uppercase, weight 600, letter-spacing 0.15em */}
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="section-label text-primary">
                                {t.label || 'FAQ'}
                            </span>
                        </div>

                        {/* Title: clamp(1.9rem, 4vw, 3rem), weight 600 */}
                        <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-heading font-semibold text-[#1F1A14] dark:text-white tracking-[-0.01em] leading-[1.2]">
                            {t.title}
                        </h2>

                        {/* Luxury Gold Divider */}
                        <div className="flex items-center gap-2.5 my-5" aria-hidden="true">
                            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-primary/60 to-primary" />
                            <span className="w-1.5 h-1.5 rotate-45 bg-primary shadow-sm shadow-primary/50" />
                            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-primary/60 to-primary" />
                        </div>

                        {/* Subtitle */}
                        <p className="text-[#5A4E3F] dark:text-muted-foreground text-base sm:text-[17px] leading-[1.7] font-body font-normal mb-8 max-w-md">
                            {t.subtitle}
                        </p>

                        {/* Still Have Questions Support Card */}
                        <div className="rounded-3xl bg-white dark:bg-[#181B20] border border-[#F0E4CE] dark:border-primary/25 p-6 sm:p-7 shadow-[0_10px_30px_rgba(120,90,30,0.06)] dark:shadow-card">
                            <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                                <HelpCircle className="w-6 h-6" />
                            </div>

                            <h3 className="font-heading font-semibold text-[1.25rem] text-[#1F1A14] dark:text-white mb-1.5 tracking-[-0.01em]">
                                {t.stillHaveQuestions || 'Still Have Questions?'}
                            </h3>
                            <p className="text-xs sm:text-sm font-body text-muted-foreground mb-5 leading-[1.7]">
                                {t.stillHaveQuestionsSub || 'Can’t find the answer? Contact the owner directly for instant details.'}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <a
                                    href={`tel:${siteConfig.phone}`}
                                    className="btn-primary-3d min-h-[44px] flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold shadow-sm text-black"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>{t.callOwner || 'Call Directly'}</span>
                                </a>

                                <a
                                    href={siteConfig.whatsapp?.chatUrl || 'https://wa.me/919771233530'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-h-[44px] flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-800/50 transition-colors shadow-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>{t.chatWhatsApp || 'WhatsApp'}</span>
                                </a>
                            </div>

                            <div className="mt-4 pt-3.5 border-t border-[#F0E4CE]/60 dark:border-border/40 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>{t.quickResponse || 'Fast response 24/7'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stacked Individual Luxury Accordion Cards */}
                    <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                        {t.items.map((item, index) => (
                            <FAQItem
                                key={index}
                                index={index}
                                item={item}
                                isOpen={index === openIndex}
                                onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;