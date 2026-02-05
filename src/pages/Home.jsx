import React, { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Globe, Shield, CheckCircle, X, ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import PropertyCard from '../components/PropertyCard'
import DestinationCard from '../components/DestinationCard'
import ReviewCard from '../components/ReviewCard'
import { properties } from '../data/properties'
import { destinations } from '../data/destinations'
import { reviews } from '../data/reviews'
import TrustBadges from '../components/TrustBadges'
import LocalExperience from '../components/LocalExperience'
import LastMinuteOffersSection from '../components/LastMinuteOffersSection'
import HolidayStylesSection from '../components/HolidayStylesSection'
import './Home.css'

const HERO_IMAGES = [
    "https://www.eostravel.com/images/main/Eos_Villas.jpg",
    "https://www.eostravel.com/images/main/Corfu_Villas.jpg",
    "https://www.eostravel.com/images/main/Paxos_Villas.jpg",
    "https://www.eostravel.com/images/main/Spain_villas.jpg",
    "https://www.eostravel.com/images/main/Cyprus_villas.jpg",
    "https://www.eostravel.com/images/main/Portugal_villas.jpg",
    "https://www.eostravel.com/images/main/Halkidiki_villas.jpg",
    "https://www.eostravel.com/images/main/Kefalonia_Villas.jpg",
    "https://www.eostravel.com/images/main/Turkey_villas.jpg"
];

function Home() {
    const [isReviewsOverlayOpen, setIsReviewsOverlayOpen] = useState(false);

    // Prevent body scroll when overlay is open
    useEffect(() => {
        if (isReviewsOverlayOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isReviewsOverlayOpen]);

    // Show properties with lowest booking counts (simulating "Hidden Gems" or promotion logic)
    // TODO: Connect to backend API: GET /api/properties?sort=bookings:asc
    const featuredProperties = useMemo(() => {
        return [...properties]
            .sort((a, b) => {
                // specific logic for prioritization
                const countA = a.bookingsCount !== undefined ? a.bookingsCount : 999;
                const countB = b.bookingsCount !== undefined ? b.bookingsCount : 999;
                return countA - countB;
            })
            .slice(0, 4);
    }, []);
    // Show top 3 destinations randomly
    const featuredDestinations = useMemo(() => {
        return [...destinations].sort(() => 0.5 - Math.random()).slice(0, 3);
    }, []);

    const lastMinuteProperties = useMemo(() => {
        return properties.filter(p => p.lastMinute === true);
    }, []);

    const randomizedImages = useMemo(() => {
        // Create a copy of the array and shuffle it
        const shuffled = [...HERO_IMAGES].sort(() => 0.5 - Math.random());
        return shuffled;
    }, []);

    return (
        <div className="home-page">
            <Hero images={randomizedImages} />

            {/* Last Minute Escapes */}
            <LastMinuteOffersSection properties={lastMinuteProperties} />

            {/* Why Choose Eos - Trust Section */}
            <section className="container trust-section-wrapper">
                <div className="trust-section-header">
                    <span className="section-subtitle">The Eos Advantage</span>
                    <h2>Why Choose Eos?</h2>
                </div>
                <TrustBadges />
            </section>

            {/* Holiday Styles */}
            <HolidayStylesSection />

            {/* Featured Destinations */}
            <section className="destinations-section">
                <div className="container">
                    <div className="destinations-header">
                        <div className="destinations-title-block">
                            <h2>Popular Destinations</h2>
                            <p>Explore the most beautiful corners of the Mediterranean.</p>
                        </div>
                        <Link to="/destinations" className="link-arrow">Explore All Destinations →</Link>
                    </div>

                    <div className="destinations-grid-wrapper">
                        <div className="destinations-grid">
                            {featuredDestinations.map(dest => (
                                <DestinationCard key={dest.id} {...dest} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="featured-properties-section">
                <div className="container">
                    <div className="featured-header">
                        <h2>Featured Properties</h2>
                        <p>Our selection of exclusive villas and apartments for an unforgettable holiday experience.</p>
                    </div>

                    <div className="properties-grid-wrapper">
                        <div className="properties-grid">
                            {featuredProperties.map(prop => (
                                <PropertyCard key={prop.id} {...prop} />
                            ))}
                        </div>
                    </div>

                    <div className="featured-cta">
                        <Link to="/search" className="btn btn-primary">
                            Find Your Perfect Villa
                        </Link>
                    </div>
                </div>
            </section>

            {/* Local Experience - Blog/Stories */}
            <div style={{ background: 'var(--surface-muted)' }}>
                <LocalExperience />
            </div>

            {/* Guest Reviews */}
            <section className="reviews-section">
                <div className="container">
                    <div className="reviews-header">
                        <div className="reviews-title-block">
                            <h2>What Our Guests Say</h2>
                            <p>Authentic experiences from travelers who stayed with us.</p>
                        </div>
                        <button
                            className="view-all-reviews-btn mobile-only"
                            onClick={() => setIsReviewsOverlayOpen(true)}
                        >
                            View All {reviews.length} Reviews <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="reviews-grid-wrapper">
                        <div className="reviews-grid">
                            {reviews.map(review => (
                                <ReviewCard key={review.id} {...review} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners & Trust */}
            <section className="partners-section">
                <div className="container">
                    <div className="trust-partners-grid">
                        <div className="trust-partner">
                            <ShieldCheck size={32} />
                            <span>EOT Licensed</span>
                        </div>
                        <div className="trust-partner">
                            <Globe size={32} />
                            <span>GNTO Member</span>
                        </div>
                        <div className="trust-partner">
                            <Shield size={32} />
                            <span>ABTOT Protected</span>
                        </div>
                        <div className="trust-partner">
                            <CheckCircle size={32} />
                            <span>Safe Stay</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-box">
                        <h2>Stay Inspired</h2>
                        <p>Subscribe to our newsletter for travel tips, exclusive offers and new property alerts.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="newsletter-input"
                            />
                            <button className="newsletter-subscribe-btn">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Reviews Overlay Modal for Mobile */}
            {isReviewsOverlayOpen && (
                <div className="reviews-overlay">
                    <div className="overlay-header">
                        <h3>Guest Reviews</h3>
                        <button className="close-overlay" onClick={() => setIsReviewsOverlayOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="overlay-content">
                        <div className="reviews-list-vertical">
                            {reviews.map(review => (
                                <ReviewCard key={`overlay-${review.id}`} {...review} />
                            ))}
                        </div>
                        <div className="overlay-footer">
                            <button className="btn btn-primary w-full" onClick={() => setIsReviewsOverlayOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
