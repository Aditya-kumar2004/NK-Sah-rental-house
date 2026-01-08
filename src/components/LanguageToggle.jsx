import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            onClick={toggleLanguage}
            className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium transition-colors hover:bg-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
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
