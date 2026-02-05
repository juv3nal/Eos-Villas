import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Bed, Bath, Star, MapPin, Award, BookOpen, Leaf, ShieldCheck } from 'lucide-react'
import './PropertyCard.css'

const PropertyCard = ({ id, name, location, price, guests, bedrooms, bathrooms, rating = 5.0, image, badges = [] }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/property/${id}`);
    };

    const getBadgeIcon = (badge) => {
        const type = (badge || '').toLowerCase();
        if (type === 'premium') return <Award size={14} style={{ marginRight: '4px' }} />
        if (type === 'eco') return <Leaf size={14} style={{ marginRight: '4px' }} />
        if (type === 'luxury') return <Star size={14} fill="currentColor" style={{ marginRight: '4px' }} />
        if (type === 'signature') return <Award size={14} style={{ marginRight: '4px' }} />
        if (type === 'historical') return <BookOpen size={14} style={{ marginRight: '4px' }} />
        if (type === 'licensed') return <ShieldCheck size={14} style={{ marginRight: '4px' }} />
        return null
    }

    return (
        <div className="property-card-wrapper" onClick={handleCardClick}>
            <div className="property-card">
                <div className="property-image">
                    <img src={image} alt={name} loading="lazy" />
                    <div className="property-badges">
                        {(badges || []).map(badge => {
                            const badgeSlug = badge.toLowerCase().replace(/\s+/g, '-');
                            return (
                                <span key={badge} className={`badge badge-${badgeSlug}`}>
                                    {getBadgeIcon(badge)}
                                    {badge}
                                </span>
                            );
                        })}
                    </div>

                    <div className="price-tag">
                        <span className="price-label">from</span>
                        <span className="price-amount">€{price}</span>
                        <span className="price-period">/night</span>
                    </div>
                </div>

                <div className="card-content">
                    <div className="card-header">
                        <div className="rating-mini">
                            <Star size={12} fill="currentColor" />
                            <span>{rating || 5.0} Review Score</span>
                        </div>
                        <h3 title={name}>{name}</h3>
                        <p className="location-text">
                            <MapPin size={14} />
                            {location}
                        </p>
                    </div>

                    <div className="amenities-grid">
                        <div className="amenity">
                            <Users size={16} />
                            <span>{guests} <small>Guests</small></span>
                        </div>
                        <div className="amenity">
                            <Bed size={16} />
                            <span>{bedrooms} <small>Beds</small></span>
                        </div>
                        <div className="amenity">
                            <Bath size={16} />
                            <span>{bathrooms} <small>Baths</small></span>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="details-link">
                            Discover
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PropertyCard
