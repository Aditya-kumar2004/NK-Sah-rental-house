import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

const WhatsAppButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const primaryPhone = '919771233530';
    const secondaryPhone = '917050308555';
    const message = encodeURIComponent('Hi, I want to book a room at NK Sah Rental House.');

    const controls = useAnimation();
    const buttonRef = useRef(null);

    // Check for prefers-reduced-motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        controls.start({
            scale: 1,
            opacity: 1,
            transition: { delay: 0.8 },
        });
    }, [controls]);

    const handleDragEnd = (event, info) => {
        const screenWidth = window.innerWidth;
        const buttonRect = buttonRef.current?.getBoundingClientRect();
        const buttonWidth = buttonRect?.width || 56;
        const margin = 20;

        const snapToLeft = info.point.x < screenWidth / 2;
        setIsLeft(snapToLeft);

        const targetX = snapToLeft ? -(screenWidth - buttonWidth - 2 * margin) : 0;

        controls.start({
            x: targetX,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        });
    };

    const toggleOpen = () => {
        setHasInteracted(true);
        setIsOpen(!isOpen);
    };

    return (
        <motion.div
            ref={buttonRef}
            drag
            dragMomentum={false}
            animate={controls}
            onDragEnd={handleDragEnd}
            dragConstraints={{ left: -window.innerWidth + 100, right: 0, top: -window.innerHeight + 100, bottom: 0 }}
            className="fixed bottom-5 right-5 z-50 cursor-grab active:cursor-grabbing"
            initial={{ scale: 0, opacity: 0 }}
        >
            <div className="relative flex flex-col items-center gap-4">
                {/* WhatsApp Chat Popup */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9, originX: isLeft ? 0 : 1, originY: 1 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className={`absolute bottom-20 ${
                                isLeft ? 'left-0' : 'right-0'
                            } w-72 sm:w-80 glass-card p-5 shadow-elevated border-border/80 z-50`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center relative shadow-sm">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">NK Sah Support</p>
                                        <p className="text-xs text-muted-foreground">Online now</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                                    aria-label="Close chat popup"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Message Preview */}
                            <div className="bg-secondary/60 rounded-xl p-3.5 mb-4 border border-border/50 relative">
                                <div className="absolute top-0 left-4 -mt-1.5 w-3 h-3 bg-secondary/60 transform rotate-45 border-t border-l border-border/50"></div>
                                <p className="text-sm text-foreground/85 leading-relaxed">
                                    👋 Hi! Looking for a comfortable room? We're here to help you at NK Sah Rental House.
                                </p>
                            </div>

                            {/* Contact Options */}
                            <div className="space-y-2">
                                <a
                                    href={`https://wa.me/${primaryPhone}?text=${message}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] transition-all hover:scale-[1.02] shadow-md group relative overflow-hidden"
                                >
                                    <Phone className="w-4 h-4 text-white z-10" />
                                    <div className="flex-1 text-left z-10">
                                        <p className="text-white text-sm font-semibold">Chat on WhatsApp</p>
                                        <p className="text-white/80 text-xs">Usually replies instantly</p>
                                    </div>
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white opacity-80 z-10" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </a>

                                <a
                                    href={`https://wa.me/${secondaryPhone}?text=${message}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 w-full p-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/60 transition-colors group"
                                >
                                    <Phone className="w-4 h-4 text-foreground/70" />
                                    <div className="flex-1 text-left">
                                        <p className="text-foreground text-sm font-medium">Alternate Contact</p>
                                        <p className="text-muted-foreground text-xs">+91 7050308555</p>
                                    </div>
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Call Now Floating Button (Stacked 16px above WhatsApp, same 56px circle, hidden when WhatsApp popup is open) */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="relative group"
                        >
                            <a
                                href={`tel:${siteConfig.phone}`}
                                aria-label="Call NK Sah Rental House"
                                className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-rose-500 hover:from-red-500 hover:to-red-600 shadow-[0_4px_20px_rgba(220,38,38,0.5)] hover:shadow-[0_6px_25px_rgba(220,38,38,0.7)] transition-all flex items-center justify-center active:scale-95 z-50 group"
                            >
                                {/* Soft Pulse Ring (disabled if reduced motion) */}
                                {!prefersReducedMotion && (
                                    <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-40 pointer-events-none" />
                                )}

                                <Phone className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                            </a>

                            {/* Desktop Hover Tooltip */}
                            <div className="hidden md:flex absolute right-16 top-1/2 -translate-y-1/2 items-center px-3 py-1.5 rounded-lg bg-zinc-950 text-white border border-white/10 text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                <span>Call Now: +91 97712 33530</span>
                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-950 border-r border-t border-white/10 rotate-45" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main WhatsApp Button (56px circle) */}
                <div className="relative">
                    <motion.button
                        type="button"
                        onClick={toggleOpen}
                        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
                        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.65)] transition-all flex items-center justify-center group active:scale-95 z-50"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6 text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="whatsapp"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Notification Dot when closed (sibling to avoid text label mismatch) */}
                    {!isOpen && (
                        <span aria-hidden="true" className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-background flex items-center justify-center pointer-events-none z-50">
                            <span className="text-[9px] text-white font-bold leading-none">1</span>
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default WhatsAppButton;
