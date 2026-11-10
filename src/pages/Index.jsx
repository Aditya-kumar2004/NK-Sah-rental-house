import React, { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Amenities from '@/components/Amenities';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

const Stats = lazy(() => import('@/components/Stats'));
const Gallery = lazy(() => import('@/components/Gallery'));
const Reviews = lazy(() => import('@/components/Reviews'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Contact = lazy(() => import('@/components/Contact'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));

const SectionPlaceholder = ({ minHeight = "400px" }) => (
    <div style={{ minHeight }} className="w-full flex items-center justify-center py-12" aria-hidden="true">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin opacity-50" />
    </div>
);

const Index = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
            <Navigation />

            <main>
                <Hero />
                <About />
                <Amenities />
                <Suspense fallback={<SectionPlaceholder minHeight="180px" />}>
                    <Stats />
                </Suspense>
                <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
                    <Gallery />
                </Suspense>
                <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
                    <Reviews />
                </Suspense>
                <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
                    <FAQ />
                </Suspense>
                <Suspense fallback={<SectionPlaceholder minHeight="600px" />}>
                    <Contact />
                </Suspense>
            </main>

            <Footer />
            <Suspense fallback={null}>
                <WhatsAppButton />
            </Suspense>

            {/* SEO: Local Business Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": ["LocalBusiness", "LodgingBusiness"],
                        "name": siteConfig.name,
                        "alternateName": siteConfig.nameHindi,
                        "description": "Comfortable, clean and affordable rental stay for families, students and professionals in Bihar",
                        "image": "https://sahrental.vercel.app/hero/hero.jpg",
                        "url": "https://sahrental.vercel.app/",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": siteConfig.address.full,
                            "addressLocality": "Bargaw",
                            "addressRegion": "Bihar",
                            "postalCode": siteConfig.address.postalCode,
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": siteConfig.geo.latitude,
                            "longitude": siteConfig.geo.longitude
                        },
                        "hasMap": siteConfig.maps.searchUrl,
                        "telephone": siteConfig.phone,
                        "email": siteConfig.email,
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "25"
                        },
                        "priceRange": "₹₹"
                    })
                }}
            />
        </div>
    );
};

export default Index;
