import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            type="button"
            onClick={toggleTheme}
            className="relative w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/90 dark:bg-card/80 backdrop-blur-sm border border-[#B8820F]/30 dark:border-border/50 shadow-sm flex items-center justify-center overflow-hidden hover:bg-white dark:hover:bg-card transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'dark' ? 180 : 0,
                    scale: theme === 'dark' ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-primary" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === 'light' ? -180 : 0,
                    scale: theme === 'light' ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-primary" />
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
