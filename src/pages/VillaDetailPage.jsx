import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Users, Bed, Bath, Wifi, Wind, Car,
    Waves, Share2, MapPin, Check,
    Star, ChevronRight, Info, Calendar,
    Shield, Maximize, Ruler, Utensils,
    Flame, Tv, Coffee, X, ArrowLeft
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { properties } from '../data/properties';
import { getVillaTips } from '../content';
import LocalTips from '../components/LocalTips';
import './VillaDetailPage.css';

const VillaDetailPage = () => {
    const { slug } = useParams();
    const property = useMemo(() => properties.find(p => p.slug === slug), [slug]);
    const tips = useMemo(() => getVillaTips(slug), [slug]);

    const [readMore, setReadMore] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [bookingGuests, setBookingGuests] = useState('2');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!property) {
        return (
            <div className="container py-5 text-center">
                <h2>Villa not found</h2>
                <p className="text-muted">We couldn't find the villa you were looking for.</p>
                <Link to="/search" className="btn btn-primary mt-3">Search All Villas</Link>
            </div>
        );
    }

    const allImages = property.images || [property.image];
    const dailyPrice = property.price; // Simplified for now
    const nights = startDate && endDate ? Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;
    const totalPrice = dailyPrice * (nights || 1);

    return (
        <div className="villa-detail-page">
            <div className="container py-4">
                <Link to="/search" className="back-link">
                    <ArrowLeft size={16} /> Back to Search
                </Link>
            </div>

            <div className="container">
                <div className="villa-header">
                    <div className="villa-title-main">
                        <div className="badge-row">
                            {property.badges.map(badge => (
                                <span key={badge} className={`badge-tag ${badge.toLowerCase()}`}>{badge}</span>
                            ))}
                        </div>
                        <h1>{property.name}</h1>
                        <div className="villa-location">
                            <MapPin size={18} />
                            <span>{property.location}, {property.destination}</span>
                        </div>
                    </div>
                    <div className="villa-actions">
                        <button className="action-btn"><Share2 size={20} /></button>
                    </div>
                </div>

                {/* Hero Gallery */}
                <div className="villa-gallery-grid" onClick={() => setIsGalleryOpen(true)}>
                    <div className="gallery-item main">
                        <img src={property.image} alt={property.name} />
                    </div>
                    <div className="gallery-item-group">
                        <div className="gallery-item"><img src={allImages[1] || property.image} alt="Villa view" /></div>
                        <div className="gallery-item"><img src={allImages[2] || property.image} alt="Villa view" /></div>
                        <div className="view-all-overlay">
                            <Maximize size={24} />
                            <span>View {allImages.length} Photos</span>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-8">
                        {/* Summary Bar */}
                        <div className="villa-stats-bar">
                            <div className="stat-item">
                                <Users size={24} />
                                <div><strong>{property.guests}</strong> <span>Guests</span></div>
                            </div>
                            <div className="stat-item">
                                <Bed size={24} />
                                <div><strong>{property.bedrooms}</strong> <span>Bedrooms</span></div>
                            </div>
                            <div className="stat-item">
                                <Bath size={24} />
                                <div><strong>{property.bathrooms}</strong> <span>Bathrooms</span></div>
                            </div>
                            <div className="stat-item">
                                <Waves size={24} />
                                <div><strong>Private</strong> <span>Pool</span></div>
                            </div>
                        </div>

                        {/* Description */}
                        <section className="detail-section">
                            <h3>About this Villa</h3>
                            <div className={`description-text ${readMore ? 'expanded' : ''}`}>
                                <p className="lead">{property.description}</p>
                                <p>This exceptional property offers the perfect balance of traditional Mediterranean architecture and modern luxury. Every room is designed to showcase the stunning local views, while the outdoor spaces provide several areas for relaxation, dining, and soaking up the sun.</p>
                            </div>
                            <button className="text-toggle" onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'Show less' : 'Read more about this villa'}
                            </button>
                        </section>

                        {/* Amenities */}
                        <section className="detail-section">
                            <h3>Villa Amenities</h3>
                            <div className="amenities-grid-detailed">
                                <div className="amenity-col">
                                    <h4>Inside</h4>
                                    <ul>
                                        <li><Check size={16} /> Air Conditioning</li>
                                        <li><Check size={16} /> High-speed Wi-Fi</li>
                                        <li><Check size={16} /> Fully equipped kitchen</li>
                                        <li><Check size={16} /> Satellite TV</li>
                                    </ul>
                                </div>
                                <div className="amenity-col">
                                    <h4>Outside</h4>
                                    <ul>
                                        <li><Check size={16} /> Private swimming pool</li>
                                        <li><Check size={16} /> Sun loungers & umbrellas</li>
                                        <li><Check size={16} /> Alfresco dining area</li>
                                        <li><Check size={16} /> Private parking</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Local Tips Block */}
                        <LocalTips tips={tips} />
                    </div>

                    <div className="col-lg-4">
                        <div className="booking-sidebar-card">
                            <div className="price-header">
                                <div className="price-val">
                                    <span className="currency">€</span>
                                    <span className="amount">{dailyPrice}</span>
                                    <span className="period">/ night</span>
                                </div>
                                <div className="rating-mini">
                                    <Star size={14} fill="var(--primary)" />
                                    <span>{property.rating}</span>
                                    <small>(24 reviews)</small>
                                </div>
                            </div>

                            <div className="booking-inputs">
                                <div className="date-input-group">
                                    <Calendar size={18} />
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(update) => {
                                            const [start, end] = update;
                                            setStartDate(start);
                                            setEndDate(end);
                                        }}
                                        placeholderText="Add dates"
                                        className="booking-datepicker"
                                    />
                                </div>
                                <div className="guest-input-group">
                                    <Users size={18} />
                                    <select value={bookingGuests} onChange={(e) => setBookingGuests(e.target.value)}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button className="book-btn">Secure your holiday</button>
                            <p className="no-charge-text">You won't be charged yet</p>

                            <div className="price-breakdown">
                                <div className="breakdown-row">
                                    <span>€{dailyPrice} x {nights || 1} nights</span>
                                    <span>€{totalPrice}</span>
                                </div>
                                <div className="breakdown-row total">
                                    <span>Total</span>
                                    <span>€{totalPrice}</span>
                                </div>
                            </div>
                        </div>

                        <div className="trust-sidebar-card">
                            <div className="trust-item">
                                <Shield size={18} />
                                <span>ABTOT & GNTO Protected</span>
                            </div>
                            <div className="trust-item">
                                <Check size={18} />
                                <span>Safe Stay Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VillaDetailPage;
