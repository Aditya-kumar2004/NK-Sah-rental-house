import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Amenities from '@/components/Amenities';
import Stats from '@/components/Stats';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ParticleGlobe from '@/components/ParticleGlobe';

const Index = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
            <Navigation />

            <main>
                <Hero />
                <About />
                <WhyChooseUs />
                <Amenities />
                <Stats />
                <Gallery />
                <Reviews />
                <FAQ />

                {/* Globe Section - Visual Breaker */}
                <section className="h-[50vh] min-h-[400px] flex items-center justify-center bg-gradient-to-b from-background to-black border-y border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                    <ParticleGlobe />
                </section>

                <Contact />
            </main>

            <Footer />
            <WhatsAppButton />

            {/* SEO: Local Business Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LodgingBusiness",
                        "name": "NK Sah Rental House",
                        "alternateName": "नंद किशोर रेंटल हाउस",
                        "description": "Comfortable, clean and affordable rental stay for families, students and professionals in Bihar",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "City Montessori School, Chotkipatti Bargaw",
                            "addressLocality": "Tirhut Division",
                            "addressRegion": "Bihar",
                            "postalCode": "845101",
                            "addressCountry": "IN"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 26.45,
                            "longitude": 85.85
                        },
                        "telephone": ["+919771233530", "+917050308555"],
                        "email": "adityakuma876@gmail.com",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "5",
                            "reviewCount": "50"
                        },
                        "priceRange": "₹₹"
                    })
                }}
            />
        </div>
    );
};

export default Index;
