import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Users, Bed, Bath, Wifi, Wind, Car,
    Waves, Share2, MapPin, Check,
    Star, ChevronRight, Info, Calendar,
    Shield, Maximize, Ruler, Utensils,
    Flame, Tv, Coffee, X
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { properties } from '../data/properties';
import './PropertyDetail.css';

const PropertyDetail = () => {
    const { id, slug } = useParams();
    const property = properties.find(p =>
        (slug && p.slug === slug) ||
        (id && p.id === parseInt(id))
    );
    const [readMore, setReadMore] = useState(false);

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMapOpen, setIsMapOpen] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [bookingGuests, setBookingGuests] = useState('2');

    const allImages = property?.images || [property?.image];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isGalleryOpen) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGalleryOpen, currentImageIndex]);

    const openGallery = (index = 0) => {
        setCurrentImageIndex(index);
        setIsGalleryOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const openMap = () => {
        setIsMapOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMap = () => {
        setIsMapOpen(false);
        document.body.style.overflow = 'auto';
    };

    const calculateNights = () => {
        if (!startDate || !endDate) return 0;
        const diffTime = Math.abs(endDate - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getDailyPrice = () => {
        if (!property) return 0;
        if (!startDate || !property.seasonalRates) return property.price;

        const month = startDate.getMonth();
        const rate = property.seasonalRates.find(r => r.months.includes(month));
        return rate ? rate.rate : property.price;
    };

    const nights = calculateNights();
    const dailyPrice = getDailyPrice();
    const totalPrice = property ? dailyPrice * (nights || 1) : 0;

    if (!property) {
        return (
            <div className="container py-5 text-center">
                <h2>Property not found</h2>
                <Link to="/" className="btn btn-primary mt-3">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="property-detail-page">
            {/* Breadcrumbs */}
            <div className="breadcrumbs-nav py-3">
                <div className="container">
                    <div className="d-flex align-items-center text-muted small">
                        <Link to="/" className="text-muted text-decoration-none hover-primary">Home</Link>
                        <ChevronRight size={14} className="mx-2 opacity-50" />
                        <Link to={`/destination/${property.destination.toLowerCase()}`} className="text-muted text-decoration-none hover-primary">{property.destination}</Link>
                        <ChevronRight size={14} className="mx-2 opacity-50" />
                        <span className="text-dark font-weight-bold">{property.name}</span>
                    </div>
                </div>
            </div>

            {/* Premium Gallery Section */}
            <div className="property-gallery-section container py-3">
                <div className="gallery-header d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h1 className="display-4 font-weight-bold mb-2">{property.name}</h1>
                        <div className="d-flex align-items-center text-muted">
                            <MapPin size={18} className="text-primary mr-2" />
                            <span className="h5 mb-0 font-weight-normal">{property.location}</span>
                        </div>
                    </div>
                    <div className="d-flex gap-3 pb-2">

                        <button className="action-btn">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="premium-gallery-grid">
                    <div className="gallery-main" onClick={() => openGallery(0)}>
                        <img src={property.image} alt={property.name} className="img-fluid" />
                        <div className="gallery-badges">
                            {property.badges.map(badge => (
                                <span key={badge} className={`badge-pill ${badge.toLowerCase()}`}>{badge}</span>
                            ))}
                        </div>
                    </div>
                    <div className="gallery-side-top" onClick={() => openGallery(1)}>
                        <img src={property.images?.[1] || property.image} alt="Interior 1" className="img-fluid" />
                    </div>
                    <div className="gallery-side-bottom-left" onClick={() => openGallery(2)}>
                        <img src={property.images?.[2] || property.image} alt="Exterior 1" className="img-fluid" />
                    </div>
                    <div className="gallery-side-bottom-right" onClick={() => openGallery(0)}>
                        <img src={property.images?.[0] || property.image} alt="Pool View" className="img-fluid" />
                        <div className="show-all-photos">
                            <Maximize size={24} className="mb-2" />
                            <span>View All Photos</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Gallery Overlay */}
            {isGalleryOpen && (
                <div className="gallery-overlay" onClick={closeGallery}>
                    <button className="close-gallery" onClick={closeGallery}>
                        <X size={24} />
                    </button>

                    <button
                        className="gallery-nav prev"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <ChevronRight size={40} className="rotate-180" />
                    </button>

                    <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
                        <div className="image-container">
                            <img
                                src={allImages[currentImageIndex]}
                                alt={`Property ${currentImageIndex + 1}`}
                                className="img-fluid main-image"
                            />
                        </div>
                        <div className="gallery-info">
                            <span className="image-counter">
                                {currentImageIndex + 1} / {allImages.length}
                            </span>
                            <span className="property-name">{property.name}</span>
                        </div>
                    </div>

                    <button
                        className="gallery-nav next"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <ChevronRight size={40} />
                    </button>

                    <div className="gallery-thumbnails" onClick={(e) => e.stopPropagation()}>
                        {allImages.map((img, idx) => (
                            <div
                                key={idx}
                                className={`thumbnail-item ${idx === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(idx)}
                            >
                                <img src={img} alt={`Thumb ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Map Overlay */}
            {isMapOpen && (
                <div className="map-overlay" onClick={closeMap}>
                    <div className="map-container-premium" onClick={(e) => e.stopPropagation()}>
                        <button className="close-map" onClick={closeMap}>
                            <X size={20} />
                        </button>
                        <div className="map-content-premium">
                            <div className="map-header text-center">
                                <h3 className="modal-title-premium">Property Location</h3>
                                <p className="modal-subtitle-premium">{property.location}</p>
                            </div>

                            <div className="map-frame-container">
                                <iframe
                                    title="Property Map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location || property.destination)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                ></iframe>
                            </div>

                            <div className="map-footer text-center">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location || property.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-map-action"
                                >
                                    Open in Full Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        {/* High-Fidelity Specs */}
                        <div className="premium-specs-grid mb-5">
                            <div className="p-spec-card">
                                <Users size={28} className="text-primary" />
                                <div className="p-spec-info">
                                    <span className="p-spec-label">Capacity</span>
                                    <span className="p-spec-value">{property.guests} Guests</span>
                                </div>
                            </div>
                            <div className="p-spec-card">
                                <Bed size={28} className="text-primary" />
                                <div className="p-spec-info">
                                    <span className="p-spec-label">Bedrooms</span>
                                    <span className="p-spec-value">{property.bedrooms} Bedrooms</span>
                                </div>
                            </div>
                            <div className="p-spec-card">
                                <Bath size={28} className="text-primary" />
                                <div className="p-spec-info">
                                    <span className="p-spec-label">Bathrooms</span>
                                    <span className="p-spec-value">{property.bathrooms} En-suite</span>
                                </div>
                            </div>
                            <div className="p-spec-card clickable" onClick={openMap}>
                                <MapPin size={28} className="text-primary" />
                                <div className="p-spec-info">
                                    <span className="p-spec-label">Location</span>
                                    <span className="p-spec-value">View on Map</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <section className="property-section mb-5">
                            <h3 className="section-title h4 mb-4">Property Narrative</h3>
                            <div className={`narrative-text ${readMore ? 'expanded' : ''}`}>
                                <p className="lead">{property.description}</p>
                                <p>Every corner of this residence has been designed with a deep respect for local aesthetics combined with global luxury standards. From the curated artwork to the high-thread-count linens, no detail has been overlooked. The outdoor spaces function as an extension of the living area, with multiple shaded terraces perfect for alfresco dining or quiet contemplation of the Mediterranean landscape.</p>
                            </div>
                            <button className="read-more-toggle mt-3" onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'Show less -' : 'Read full story +'}
                            </button>
                        </section>

                        {/* Amenities Grouped */}
                        <section className="property-section mb-5">
                            <h3 className="section-title h4 mb-4">Exceptional Amenities</h3>
                            <div className="amenities-container">
                                <div className="row">
                                    {property.amenities.inside && (
                                        <div className="col-md-4 mb-4">
                                            <h5 className="h6 text-uppercase text-muted tracking-widest mb-3">Living & Comfort</h5>
                                            <ul className="amenity-list list-unstyled">
                                                {property.amenities.inside.map((item, idx) => (
                                                    <li key={idx}><Check size={16} className="text-primary mr-2" /> {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {property.amenities.outside && (
                                        <div className="col-md-4 mb-4">
                                            <h5 className="h6 text-uppercase text-muted tracking-widest mb-3">Outdoor & Leisure</h5>
                                            <ul className="amenity-list list-unstyled">
                                                {property.amenities.outside.map((item, idx) => (
                                                    <li key={idx}><Check size={16} className="text-primary mr-2" /> {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {property.amenities.service && (
                                        <div className="col-md-4 mb-4">
                                            <h5 className="h6 text-uppercase text-muted tracking-widest mb-3">Premium Services</h5>
                                            <ul className="amenity-list list-unstyled">
                                                {property.amenities.service.map((item, idx) => (
                                                    <li key={idx}><Check size={16} className="text-primary mr-2" /> {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {!property.amenities.inside && (
                                        <>
                                            <div className="col-md-6 mb-4">
                                                <h5 className="h6 text-uppercase text-muted tracking-widest mb-3">Living & Comfort</h5>
                                                <ul className="amenity-list list-unstyled">
                                                    {property.amenities.ac && <li><Wind size={18} /> High-end Air Conditioning</li>}
                                                    {property.amenities.wifi && <li><Wifi size={18} /> Fiber Optic Wi-Fi</li>}
                                                    {property.amenities.fireplace && <li><Flame size={18} /> Traditional Wood Fireplace</li>}
                                                    {property.amenities.homeCinema && <li><Tv size={18} /> Private Home Cinema</li>}
                                                </ul>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <h5 className="h6 text-uppercase text-muted tracking-widest mb-3">Outdoor & Leisure</h5>
                                                <ul className="amenity-list list-unstyled">
                                                    {property.amenities.pool && <li><Waves size={18} /> Private Infinity Pool</li>}
                                                    {property.amenities.bbq && <li><Flame size={18} /> Professional BBQ Area</li>}
                                                    {property.amenities.parking && <li><Car size={18} /> Gated Parking</li>}
                                                    {property.amenities.chef && <li><Utensils size={18} /> Private Chef Available</li>}
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Reviews Section */}
                        {(property.reviews || property.testimonials) && (
                            <section className="property-section mb-5" id="reviews">
                                <h3 className="section-title h4 mb-4">Guest Experiences</h3>
                                <div className="reviews-grid">
                                    {(property.reviews || property.testimonials).map((review, idx) => (
                                        <div key={idx} className="review-card-premium">
                                            <div className="review-header">
                                                <div className="review-meta">
                                                    <div className="stars-wrapper">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                fill={i < review.rating ? "var(--warning)" : "transparent"}
                                                                className={i < review.rating ? "text-warning" : "text-muted opacity-25"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="review-date">{review.date || 'Authentic Stay'}</span>
                                                </div>
                                                {review.source && (
                                                    <div className="review-source badge badge-light">
                                                        {review.source}
                                                    </div>
                                                )}
                                            </div>

                                            {review.title && <h4 className="review-title">{review.title}</h4>}
                                            <p className="review-content">"{review.content}"</p>

                                            <div className="review-footer">
                                                <div className="review-author">
                                                    <div className="author-avatar">{review.author.charAt(0)}</div>
                                                    <div className="author-info">
                                                        <span className="author-name">{review.author}</span>
                                                        <span className="stay-verified">Verified Guest</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Booking Sidebar - Premium Sticky */}
                    <div className="col-lg-4">
                        <div className="premium-booking-card">
                            <div className="price-box mb-4">
                                <div className="price-display mb-1">
                                    <span className="h1 font-weight-bold">€{dailyPrice}</span>
                                    <span className="per-night">/ night</span>
                                </div>
                                <div className="rating-display d-flex align-items-center text-warning small">
                                    <Star size={14} fill="currentColor" className="mr-1" />
                                    <span className="font-weight-bold">{property.rating}</span>
                                    <span className="reviews-count">(24 reviews)</span>
                                </div>
                            </div>

                            <div className="booking-form-premium">
                                <div className="form-group-custom first">
                                    <label>Dates</label>
                                    <div className="datepicker-wrapper">
                                        <DatePicker
                                            selectsRange={true}
                                            startDate={startDate}
                                            endDate={endDate}
                                            onChange={(update) => {
                                                const [start, end] = update;
                                                setStartDate(start);
                                                setEndDate(end);
                                            }}
                                            placeholderText="Check-in — Check-out"
                                            className="datepicker-input"
                                            minDate={new Date()}
                                            dateFormat="MMM d, yyyy"
                                        />
                                    </div>
                                    <Calendar className="icon" size={20} />
                                </div>
                                <div className="form-group-custom last">
                                    <label>Guests</label>
                                    <select
                                        className="guest-select"
                                        value={bookingGuests}
                                        onChange={(e) => setBookingGuests(e.target.value)}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="icon rotate-90" size={20} />
                                </div>

                                <button className="btn btn-primary btn-block btn-premium mt-4">
                                    Secure your dates
                                </button>

                                <p className="booking-info-text text-center small text-muted mt-3 mb-4">
                                    <Info size={12} className="mr-1" />
                                    No immediate charge. Free cancellation for 48h.
                                </p>

                                <div className="booking-breakdown pt-3 border-top">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">€{dailyPrice} x {nights || 1} {nights === 1 ? 'night' : 'nights'}</span>
                                        <span>€{totalPrice}</span>
                                    </div>
                                    <div className="d-flex justify-content-between font-weight-bold h5 mt-3 pt-3 border-top">
                                        <span className="total-label">Total</span>
                                        <span className="text-primary total-price">€{totalPrice}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
