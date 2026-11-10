import React from 'react';
import SectionHeading from './SectionHeading';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

const Reviews = () => {
    const { language } = useLanguage();
    const t = translations[language].reviews;
    const items = t.items;

    // Double the items for seamless infinite circular loop
    const marqueeItems = [...items, ...items];

    return (
        <section id="reviews" className="section-padding bg-[#FFF8EE] dark:bg-[#121417] relative border-t border-[#F0E4CE] dark:border-border/60 overflow-hidden">
            {/* Ambient luxury lighting aura */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-primary/10 dark:bg-primary/15 blur-[160px] rounded-full pointer-events-none -z-10"
                aria-hidden="true"
            />
            {/* Subtle decorative dot pattern */}
            <div
                className="absolute inset-0 bg-[radial-gradient(#B8820F_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
                aria-hidden="true"
            />

            <div className="container-custom relative z-10">
                <SectionHeading
                    label={t.testimonials}
                    title={t.title}
                    subtitle={t.subtitle}
                />

                {/* Social Proof Trust Badge */}
                <div className="flex justify-center -mt-6 mb-10">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-[#181B20] border border-[#F0E4CE] dark:border-primary/30 shadow-sm">
                        <div className="flex items-center gap-1" role="img" aria-label="5 star rating">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-[#1F1A14] dark:text-white">
                            4.9 / 5.0
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="text-xs text-[#5A4E3F] dark:text-white/80 font-medium">
                            {t.trustBadge || 'Verified Tenant Reviews'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Continuous Circular Carousel Track (Left to Right Marquee, No Arrows) */}
            <div className="relative w-full overflow-hidden py-4 -my-4 group">
                {/* Left & Right Smooth Edge Fade Masks */}
                <div
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-36 bg-gradient-to-r from-[#FFF8EE] dark:from-[#121417] to-transparent z-10"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-36 bg-gradient-to-l from-[#FFF8EE] dark:from-[#121417] to-transparent z-10"
                    aria-hidden="true"
                />

                {/* Infinite Marquee Track moving from Left to Right */}
                <div className="animate-marquee-ltr flex items-stretch gap-6 px-3">
                    {marqueeItems.map((item, idx) => (
                        <div
                            key={`${item.name}-${idx}`}
                            className="w-[300px] sm:w-[350px] md:w-[380px] h-[280px] flex-shrink-0 relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#181B20] border border-[#E8DAC0] dark:border-primary/25 shadow-[0_10px_30px_rgba(120,90,30,0.06)] dark:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)] hover:border-primary/50 dark:hover:border-primary/60 transition-all duration-300 hover:-translate-y-1.5 select-none"
                        >
                            {/* Gold Top Light Highlight on Hover */}
                            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

                            {/* Watermark Quote Icon */}
                            <Quote className="w-16 h-16 text-primary/[0.05] dark:text-primary/[0.10] absolute right-4 top-4 select-none pointer-events-none rotate-12" />

                            {/* Top Metadata: Tag & 5 Stars */}
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3.5">
                                    {item.tag ? (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:text-amber-400 border border-primary/20 uppercase tracking-wider">
                                            {item.tag}
                                        </span>
                                    ) : (
                                        <span />
                                    )}

                                    {/* Stars */}
                                    <div className="flex items-center gap-1" role="img" aria-label="5 star rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
                                        ))}
                                    </div>
                                </div>

                                {/* Review Quote Text */}
                                <blockquote className="text-sm sm:text-base text-foreground font-heading italic leading-[1.7] line-clamp-4 font-normal">
                                    "{item.text}"
                                </blockquote>
                            </div>

                            {/* Bottom Profile Row */}
                            <div className="border-t border-[#F0E4CE] dark:border-border/70 pt-3.5 flex items-center gap-3">
                                {/* Monogram Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500/20 to-primary/30 border-2 border-primary/40 flex items-center justify-center shadow-sm">
                                        <span className="font-heading font-bold text-sm text-primary dark:text-amber-400">
                                            {item.initials || item.name.slice(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20 absolute -bottom-0.5 -right-0.5 bg-white dark:bg-[#181B20] rounded-full" />
                                </div>

                                {/* Reviewer Details */}
                                <div className="overflow-hidden">
                                    <p className="font-heading font-semibold text-sm sm:text-base text-[#1F1A14] dark:text-white tracking-[-0.01em] truncate">
                                        {item.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs font-body uppercase tracking-wider mt-0.5 font-medium flex items-center gap-1 truncate">
                                        <span>{item.date}</span>
                                        <span>•</span>
                                        <span className="text-primary font-semibold truncate">{t.verifiedStay || 'Verified'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle Pause Hint */}
            <div className="container-custom relative z-10 text-center mt-6">
                <span className="text-xs text-muted-foreground/75 tracking-wider font-light">
                    {language === 'en' ? '• Pause by hovering over any card •' : '• रोकने के लिए किसी भी कार्ड पर कर्सर ले जाएं •'}
                </span>
            </div>
        </section>
    );
};

export default Reviews;