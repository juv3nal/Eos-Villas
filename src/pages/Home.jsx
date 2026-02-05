import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Globe, Shield, CheckCircle } from 'lucide-react'
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

            {/* Holiday Styles */}
            <HolidayStylesSection />

            {/* Featured Destinations */}
            <section className="section bg-light featured-destinations-section">
                <div className="container">
                    <div className="section-header-compact">
                        <div>
                            <h2 className="title">Popular Destinations</h2>
                            <p className="subtitle">Explore the Mediterranean.</p>
                        </div>
                        <Link to="/destinations" className="link-arrow hide-mobile">Explore All →</Link>
                    </div>

                    <div className="mobile-carousel">
                        {featuredDestinations.map(dest => (
                            <div key={dest.id} className="mobile-carousel-item">
                                <DestinationCard {...dest} />
                            </div>
                        ))}
                    </div>
                    <Link to="/destinations" className="btn btn-outline show-mobile" style={{ marginTop: '1.5rem', width: '100%' }}>View All Destinations</Link>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="container section featured-properties-section">
                <div className="section-header-centered">
                    <h2>Featured Properties</h2>
                    <p>Our selection of exclusive villas and apartments.</p>
                </div>

                <div className="mobile-carousel">
                    {featuredProperties.map(prop => (
                        <div key={prop.id} className="mobile-carousel-item">
                            <PropertyCard {...prop} />
                        </div>
                    ))}
                </div>

                <div className="section-footer-compact">
                    <Link to="/search" className="btn btn-primary">
                        Find Your Perfect Villa
                    </Link>
                </div>
            </section>

            {/* Guest Reviews */}
            <section className="section guest-reviews-section">
                <div className="container">
                    <div className="section-header-centered dark">
                        <h2>What Our Guests Say</h2>
                        <p>Authentic experiences from our travelers.</p>
                    </div>

                    <div className="mobile-carousel review-carousel">
                        {reviews.map(review => (
                            <div key={review.id} className="mobile-carousel-item review-carousel-item">
                                <ReviewCard {...review} />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Local Experience - Blog/Stories */}
            <div className="local-experience-wrapper">
                <LocalExperience />
            </div>

            {/* Why Choose Eos - Trust Section (Compressed for mobile) */}
            <section className="container section why-choose-section hide-mobile">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span className="section-subtitle">The Eos Advantage</span>
                    <h2>Why Choose Eos?</h2>
                </div>
                <TrustBadges />
            </section>

            {/* Partners & Trust (Compressed for mobile) */}
            <section className="section partners-section hide-mobile">
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
            <section className="section newsletter-section">
                <div className="container">
                    <div className="newsletter-card">
                        <h2>Stay Inspired</h2>
                        <p>Subscribe for travel tips and exclusive alerts.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="newsletter-input"
                            />
                            <button className="newsletter-subscribe-btn">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Partners & Trust */}
            <section className="section" style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)' }}>
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
            <section className="section" style={{ padding: '6rem 2rem' }}>
                <div className="container">
                    <div style={{
                        background: 'var(--primary)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '4rem',
                        textAlign: 'center',
                        color: 'white',
                        boxShadow: '0 20px 40px rgba(255, 125, 0, 0.2)'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Stay Inspired</h2>
                        <p style={{ marginBottom: '2.5rem', opacity: 0.9, fontSize: '1.1rem' }}>Subscribe to our newsletter for travel tips, exclusive offers and new property alerts.</p>
                        <form className="newsletter-form" style={{
                            display: 'flex',
                            gap: '1rem',
                            maxWidth: '600px',
                            margin: '0 auto',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }} onSubmit={(e) => e.preventDefault()}>
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
        </div>
    )
}

export default Home
