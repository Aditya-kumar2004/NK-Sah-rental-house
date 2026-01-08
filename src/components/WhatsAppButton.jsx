import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';

const WhatsAppButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const primaryPhone = '919771233530';
    const secondaryPhone = '917050308555';
    const message = encodeURIComponent('Hi, I want to book a room at NK Sah Rental House.');

    const controls = useAnimation();
    const buttonRef = React.useRef(null);

    useEffect(() => {
        controls.start({
            scale: 1,
            opacity: 1,
            transition: { delay: 1 }
        });
    }, [controls]);

    // Auto-open logic (after 10s if not interacted)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasInteracted && !isOpen) {
                setIsOpen(true);
            }
        }, 8000);
        return () => clearTimeout(timer);
    }, [hasInteracted, isOpen]);

    const handleDragEnd = (event, info) => {
        const screenWidth = window.innerWidth;
        const buttonRect = buttonRef.current?.getBoundingClientRect();
        const buttonWidth = buttonRect?.width || 64;
        const margin = 24;

        const snapToLeft = info.point.x < screenWidth / 2;
        setIsLeft(snapToLeft);

        const targetX = snapToLeft ? -(screenWidth - buttonWidth - 2 * margin) : 0;

        controls.start({
            x: targetX,
            transition: { type: "spring", stiffness: 300, damping: 30 }
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
            className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing"
            initial={{ scale: 0, opacity: 0 }}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, originX: isLeft ? 0 : 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute bottom-20 ${isLeft ? 'left-0' : 'right-0'} w-72 glass-card p-5 shadow-elevated border-gold/10`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center relative">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
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
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Message Preview */}
                        <div className="bg-secondary/40 rounded-xl p-4 mb-4 border border-white/5 relative">
                            <div className="absolute top-0 left-4 -mt-2 w-4 h-4 bg-secondary/40 transform rotate-45 border-t border-l border-white/5"></div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                👋 Hi! Looking for a comfortable room? We're here to help you at NK Sah Rental House.
                            </p>
                        </div>

                        {/* Contact Options */}
                        <div className="space-y-2">
                            <a
                                href={`https://wa.me/${primaryPhone}?text=${message}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] transition-all hover:scale-[1.02] shadow-lg group relative overflow-hidden"
                            >
                                {/* Shimmer */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>

                                <Phone className="w-4 h-4 text-white z-10" />
                                <div className="flex-1 text-left z-10">
                                    <p className="text-white text-sm font-medium">Chat on WhatsApp</p>
                                    <p className="text-white/80 text-xs">Usually replies instantly</p>
                                </div>
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white opacity-80 z-10">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>

                            <a
                                href={`https://wa.me/${secondaryPhone}?text=${message}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 w-full p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
                            >
                                <Phone className="w-4 h-4 text-foreground/70" />
                                <div className="flex-1 text-left">
                                    <p className="text-foreground text-sm font-medium">Alternate Contact</p>
                                    <p className="text-muted-foreground text-xs">+91 7050308555</p>
                                </div>
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                onClick={toggleOpen}
                className="relative w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-[0_0_20px_#25D36660] hover:shadow-[0_0_30px_#25D36680] transition-all flex items-center justify-center group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-700"></div>

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-7 h-7 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="whatsapp"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </motion.div>
                    )
                    }
                </AnimatePresence>

                {/* Pulse animation when closed */}
                {!isOpen && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-background flex items-center justify-center animate-bounce delay-1000">
                            <span className="text-[10px] text-white font-bold">1</span>
                        </span>
                    </>
                )}
            </motion.button>
        </motion.div>
    );
};

export default WhatsAppButton;
