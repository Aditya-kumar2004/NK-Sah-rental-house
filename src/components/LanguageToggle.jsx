import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            type="button"
            onClick={toggleLanguage}
            className="relative min-h-[44px] min-w-[58px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/90 dark:bg-card/80 backdrop-blur-sm border border-[#B8820F]/30 dark:border-border/50 text-sm font-body font-medium transition-colors hover:bg-white dark:hover:bg-card shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`EN / हि: Switch language to ${language === 'en' ? 'Hindi' : 'English'}`}
        >
            <span
                className={`transition-colors ${language === 'en' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
                EN
            </span>
            <span className="text-muted-foreground">/</span>
            <span
                className={`transition-colors ${language === 'hi' ? 'text-primary font-bold' : 'text-muted-foreground'}`}
            >
                हि
            </span>
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/50"
                initial={false}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.button>
    );
};

export default LanguageToggle;
