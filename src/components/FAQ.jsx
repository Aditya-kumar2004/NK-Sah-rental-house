import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const FAQItem = ({ item, isOpen, onClick }) => {
    return (
        <motion.div
            initial={false}
            className={`border-b border-white/10 last:border-0 ${isOpen ? 'bg-white/5' : 'bg-transparent'} transition-colors duration-300 rounded-xl mb-2 overflow-hidden`}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-gold' : 'text-foreground group-hover:text-gold/80'}`}>
                    {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-gold bg-gold/20 rotate-180' : 'border-white/20 group-hover:border-gold/50'}`}>
                    {isOpen ? <Minus className="w-4 h-4 text-gold" /> : <Plus className="w-4 h-4 text-muted-foreground group-hover:text-gold" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                            {item.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const { language } = useLanguage();
    const t = translations[language].faq;
    const [openIndex, setOpenIndex] = useState(0); // First one open by default

    return (
        <section id="faq" className="section-padding bg-background relative">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <HelpCircle className="w-5 h-5 text-gold" />
                        <span className="text-gold font-medium text-sm uppercase tracking-wider">FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground mt-4">
                        {t.subtitle}
                    </p>
                </motion.div>

                <div className="glass-card p-4 md:p-8 rounded-2xl shadow-elevated">
                    {t.items.map((item, index) => (
                        <FAQItem
                            key={index}
                            item={item}
                            isOpen={index === openIndex}
                            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
