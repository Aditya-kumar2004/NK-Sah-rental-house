import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({
    label,
    title,
    subtitle,
    align = 'center',
    className = '',
}) => {
    const isCenter = align === 'center';

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}
        >
            {label && (
                <div className="inline-flex items-center gap-2 mb-3">
                    <span className="section-label text-primary">
                        {label}
                    </span>
                </div>
            )}

            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-heading font-semibold text-foreground tracking-[-0.01em] leading-[1.2]">
                {title}
            </h2>

            {/* Thin gold divider */}
            <div
                className={`w-12 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 my-4 rounded-full ${
                    isCenter ? 'mx-auto' : ''
                }`}
                aria-hidden="true"
            />

            {subtitle && (
                <p className="text-muted-foreground text-base sm:text-[17px] leading-[1.7] font-body font-normal max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeading;

