import React from 'react';
import { Star, MapPin, Phone } from 'lucide-react';
import HeroVideoPlayer from './HeroVideoPlayer';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';
import { siteConfig } from '@/config/site';

const Hero = () => {
    const { language } = useLanguage();
    const t = translations[language].hero;

    return (
        <section className="relative w-full h-[100svh] min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#FFF8EE] dark:bg-black">
            {/* Seamless Multi-Clip Video Player Background with Stacked Crossfade & Poster Fallback */}
            <HeroVideoPlayer />

            {/* Hero content: Left-aligned on desktop, centered & thumb-friendly at the bottom on mobile */}
            <div className="container-custom relative z-10 w-full min-h-[100svh] flex flex-col justify-end md:justify-center items-center lg:items-start text-center lg:text-left pt-24 pb-20 md:py-20">
                {/* Hero container: Transparent with clean, crisp typography and zero smoke or haze */}
                <div className="max-w-3xl flex flex-col items-center lg:items-start bg-transparent">
                    {/* Small location pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 dark:bg-white/10 backdrop-blur-md border border-[#B8820F]/30 dark:border-white/20 text-[#1F1A14] dark:text-white/90 text-xs sm:text-sm font-medium tracking-wide shadow-sm mb-4 sm:mb-6">
                        <span className="text-base leading-none">📍</span>
                        <span>{t.location}</span>
                    </div>

                    {/* H1 Title: clamp(2.4rem, 6vw, 4.5rem), line-height 1.1, weight 700 */}
                    <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-heading font-bold text-[#110E0B] dark:text-white tracking-[-0.01em] leading-[1.1] mb-4 sm:mb-5 text-balance drop-shadow-sm dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                        {t.title || 'NK Sah Rental House'}
                    </h1>

                    {/* Subtitle: Plus Jakarta Sans / Noto Sans Devanagari */}
                    <p className="text-base sm:text-xl md:text-2xl text-[#1F1A14] dark:text-white/85 font-body font-normal leading-[1.7] max-w-2xl mb-5 sm:mb-6 text-balance drop-shadow-none dark:drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                        {t.subtitle || t.description}
                    </p>

                    {/* Rating pill: ★★★★★ 4.9 • Trusted by families */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 dark:bg-white/10 backdrop-blur-md border border-[#B8820F]/30 dark:border-white/20 shadow-sm mb-6 sm:mb-8">
                        <div className="flex items-center gap-1" role="img" aria-label="5 star rating">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-sm"
                                />
                            ))}
                        </div>
                        <span className="text-[#110E0B] dark:text-white font-body font-medium text-sm sm:text-base flex items-center gap-2">
                            <span className="font-semibold">4.9</span>
                            <span className="w-1 h-1 rounded-full bg-[#110E0B]/30 dark:bg-white/60 inline-block" />
                            <span className="text-[#3D3226] dark:text-white/90">{t.rating}</span>
                        </span>
                    </div>

                    {/* Two buttons: Primary 'Call Now' (Red Luxury Gradient, 15-16px, weight 600) and Secondary 'Get Directions' */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="relative w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-body font-semibold text-white bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 shadow-[0_4px_20px_rgba(220,38,38,0.45)] hover:shadow-[0_6px_25px_rgba(220,38,38,0.65)] border border-red-400/30 transition-all duration-300 text-[15px] sm:text-base select-none group"
                        >
                            <Phone className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                            <span>{t.callNow}</span>
                        </a>
                        <a
                            href={siteConfig.maps.directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] sm:text-base font-body font-semibold rounded-xl text-[#1F1A14] dark:text-white bg-white dark:bg-white/10 hover:bg-[#FFF3DB] dark:hover:bg-white/20 backdrop-blur-md border border-[#B8820F]/35 dark:border-white/25 hover:border-[#B8820F] dark:hover:border-white/50 transition-all duration-300 shadow-sm hover:-translate-y-0.5"
                        >
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <span>{t.getDirections}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
