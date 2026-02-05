import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Bed, Bath, Star, MapPin, Award, BookOpen, Leaf, ShieldCheck } from 'lucide-react'
import './PropertyCard.css'

const PropertyCard = ({
    id, name, location, price, guests, bedrooms, bathrooms, rating = 5.0, image, badges = [],
    lastMinute = false, discountPercent, originalPrice, offerEndsAt, minNights,
    mainThemeLabel
}) => {
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
                    <div className="property-badges hide-mobile">
                        {lastMinute && (
                            <span className="badge badge-last-minute">
                                <Award size={14} style={{ marginRight: '4px' }} />
                                -{discountPercent}%
                            </span>
                        )}
                    </div>
                </div>


                <div className="card-content">
                    <div className="card-header">
                        <div className="mobile-compact-row show-mobile">
                            <div className="rating-mini">
                                <Star size={12} fill="currentColor" />
                                <span>{rating || 5.0}</span>
                            </div>
                            {lastMinute && <span className="mobile-badge-urgent">Offer</span>}
                        </div>
                        <h3 title={name}>{name}</h3>
                        <p className="location-text">
                            <MapPin size={12} />
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
                    </div>

                    <div className="card-footer-booking">
                        <div className="price-block">
                            <span className="price-val">€{price}</span>
                            <span className="price-sub">/night</span>
                        </div>
                        <div className="details-link-compact">
                            {lastMinute ? 'View' : 'Details'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default PropertyCard
