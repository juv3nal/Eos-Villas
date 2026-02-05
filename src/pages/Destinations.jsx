import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Star, Calendar, Info, Mail } from 'lucide-react'
import { destinations } from '../data/destinations'
import BookingBanner from '../components/BookingBanner'
import './Destinations.css'

function Destinations() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="destinations-page">
            {/* Immersive Parallax Hero */}
            <section className="destinations-hero">
                <div className="parallax-bg" style={{ backgroundImage: `url('/images/_MG_8175.jpg')` }}></div>
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <span className="hero-subtitle">The Mediterranean Awaits</span>
                    <h1 className="hero-title">Discover the Extraordinary</h1>
                    <p className="hero-description">
                        Hand-picked luxury villas across the most iconic Mediterranean destinations.
                        Your journey to an unforgettable holiday starts here.
                    </p>
                    <div className="hero-actions">
                        <a href="#explore" className="btn btn-primary btn-lg">Explore Collections</a>
                        <Link to="/search" className="btn btn-outline-white btn-lg">Search All Villas</Link>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </div>
            </section>

            {/* Compact Destinations Gallery */}
            <section id="explore" className="destinations-section container">
                <div className="section-header">
                    <span className="section-subtitle">Find Your Perfect Escape</span>
                    <h2 className="section-title">Explore Our Collections</h2>
                </div>

                <div className="destinations-gallery">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="dest-gallery-card">
                            <Link to={`/destination/${dest.slug}`} className="card-image-link">
                                <div className="card-image-wrapper">
                                    <img src={dest.image} alt={dest.name} className="card-bg-image" />
                                    <div className="card-gradient-overlay"></div>
                                    <div className="card-content-overlay">
                                        <div className="card-top-meta">
                                            <span className="dest-tag">{dest.country}</span>
                                            <div className="dest-rating">
                                                <Star size={12} fill="currentColor" />
                                                <span>4.9</span>
                                            </div>
                                        </div>
                                        <div className="card-bottom-info">
                                            <h3 className="dest-card-name">{dest.name}</h3>
                                            <div className="dest-card-stats">
                                                <span>{dest.propertyCount} Properties</span>
                                                <span className="stat-separator"></span>
                                                <span>From €{dest.startingPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="card-footer-actions">
                                <Link to={`/destination/${dest.slug}`} className="btn-explore">
                                    View Collection <ArrowRight size={16} />
                                </Link>
                                <a href="mailto:info@eostravel.com" className="btn-inquiry" title="Quick Inquiry">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Flexible Bookings Banner */}
            <BookingBanner />
        </div>
    )
}

export default Destinations
