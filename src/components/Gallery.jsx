import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

// Import gallery images directly (WebP optimized)
import exteriorImg from '@/assets/gallery/exterior.webp';
import room1Img from '@/assets/gallery/room-1.webp';
import room2Img from '@/assets/gallery/room-2.webp';
import livingRoomImg from '@/assets/gallery/living-room.webp';
import kitchenImg from '@/assets/gallery/kitchen.webp';
import bathroomImg from '@/assets/gallery/bathroom.webp';

const imageFiles = [
    exteriorImg,
    room1Img,
    room2Img,
    livingRoomImg,
    kitchenImg,
    bathroomImg,
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { language } = useLanguage();
    const t = translations[language].gallery;

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const galleryImages = t.images.map((img, index) => ({
        ...img,
        src: imageFiles[index],
    }));

    const openLightbox = (index) => {
        setSelectedImage(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    const goToPrevious = () => {
        setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    // Global keyboard listener for Lightbox (Escape, ArrowLeft, ArrowRight)
    useEffect(() => {
        if (selectedImage === null) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    // Touch swipe navigation for mobile Lightbox
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;
        const minSwipeThreshold = 50;

        if (Math.abs(delta) > minSwipeThreshold) {
            if (delta > 0) {
                // Swiped left -> show next
                goToNext();
            } else {
                // Swiped right -> show previous
                goToPrevious();
            }
        }
    };

    return (
        <section id="gallery" className="section-padding bg-[#FFF8EE] dark:bg-background relative">
            <div className="container-custom">
                <SectionHeading
                    label={t.title}
                    title={t.heading}
                    subtitle={t.subtitle}
                />

                {/* Gallery Grid with hover zoom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="h-full"
                        >
                            <div
                                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/40 h-full"
                                onClick={() => openLightbox(index)}
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-muted">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        width="600"
                                        height="450"
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-amber-400 text-xs uppercase tracking-wider font-semibold">
                                            {image.category}
                                        </span>
                                        <h3 className="text-white font-serif text-xl font-semibold mt-1">
                                            {image.title}
                                        </h3>
                                    </div>

                                    {/* Zoom Icon */}
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                                        <ZoomIn className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox with keyboard & mobile swipe navigation */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center select-none"
                        onClick={closeLightbox}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
                            aria-label="Close image preview"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Previous button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Next button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.25 }}
                            className="relative max-w-5xl max-h-[85vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={galleryImages[selectedImage].src}
                                alt={galleryImages[selectedImage].title}
                                className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                            />

                            {/* Image Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
                                <span className="text-amber-400 text-xs uppercase tracking-wider font-semibold">
                                    {galleryImages[selectedImage].category}
                                </span>
                                <h3 className="text-white font-serif text-xl sm:text-2xl font-semibold mt-1">
                                    {galleryImages[selectedImage].title}
                                </h3>
                                <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                                    {selectedImage + 1} / {galleryImages.length}
                                </p>
                            </div>
                        </motion.div>

                        {/* Thumbnail Bar */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 pb-1">
                            {galleryImages.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(index);
                                    }}
                                    className={`flex-shrink-0 w-14 h-11 min-h-[44px] min-w-[44px] rounded-lg overflow-hidden border-2 transition-all ${
                                        index === selectedImage
                                            ? 'border-primary opacity-100 scale-105'
                                            : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                                    aria-label={`View photo ${index + 1}`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
