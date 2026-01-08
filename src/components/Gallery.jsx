import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import TiltCard3D from './TiltCard3D';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/lib/translations';

// Import gallery images
import room1 from '@/assets/gallery/room-1.jpg';
import room2 from '@/assets/gallery/room-2.jpg';
import kitchen from '@/assets/gallery/kitchen.jpg';
import bathroom from '@/assets/gallery/bathroom.jpg';
import exterior from '@/assets/gallery/exterior.jpg';
import livingRoom from '@/assets/gallery/living-room.jpg';

const imageSources = [exterior, room1, room2, livingRoom, kitchen, bathroom];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const { language } = useLanguage();
    const t = translations[language].gallery;

    const galleryImages = imageSources.map((src, index) => ({
        src,
        title: t.images[index].title,
        category: t.images[index].category,
    }));

    const openLightbox = (index) => {
        setSelectedImage(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        if (selectedImage !== null) {
            setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
        }
    };

    const goToNext = () => {
        if (selectedImage !== null) {
            setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
    };

    return (
        <section id="gallery" className="section-padding bg-cream">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">{t.title}</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-deep-brown mt-2">
                        {t.heading}
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <TiltCard3D intensity={10} className="h-full">
                                <div
                                    className="relative group cursor-pointer overflow-hidden rounded-xl -m-6 md:-m-8"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/80 via-deep-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-gold text-xs uppercase tracking-wider font-medium">
                                                {image.category}
                                            </span>
                                            <h3 className="text-primary-foreground font-serif text-xl font-semibold mt-1">
                                                {image.title}
                                            </h3>
                                        </div>

                                        {/* Zoom icon */}
                                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <ZoomIn className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                    </div>
                                </div>
                            </TiltCard3D>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-deep-brown/95 backdrop-blur-lg flex items-center justify-center"
                        onClick={closeLightbox}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/20 transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Previous button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/20 transition-colors z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Next button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/20 transition-colors z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-5xl max-h-[85vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={galleryImages[selectedImage].src}
                                alt={galleryImages[selectedImage].title}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />

                            {/* Image info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-deep-brown/90 to-transparent rounded-b-2xl">
                                <span className="text-gold text-xs uppercase tracking-wider font-medium">
                                    {galleryImages[selectedImage].category}
                                </span>
                                <h3 className="text-primary-foreground font-serif text-2xl font-semibold mt-1">
                                    {galleryImages[selectedImage].title}
                                </h3>
                                <p className="text-primary-foreground/60 text-sm mt-2">
                                    {selectedImage + 1} / {galleryImages.length}
                                </p>
                            </div>
                        </motion.div>

                        {/* Thumbnail strip */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 pb-2">
                            {galleryImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(index);
                                    }}
                                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${index === selectedImage
                                        ? 'border-gold opacity-100 scale-110'
                                        : 'border-transparent opacity-50 hover:opacity-75'
                                        }`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-full h-full object-cover"
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
