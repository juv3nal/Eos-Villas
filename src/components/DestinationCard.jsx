import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DestinationCard.css';

const DestinationCard = ({ name, country, image, startingPrice, propertyCount, slug }) => {
    const navigate = useNavigate();

    return (
        <div className="destination-card" onClick={() => navigate(`/destination/${slug}`)}>
            <img src={image} alt={name} className="destination-image" loading="lazy" />
            <div className="destination-overlay">
                <div className="destination-info">
                    <p>{country}</p>
                    <h3>{name}</h3>
                </div>
                <div className="destination-stats">
                    <div className="price-tag">
                        Starting from
                        <span>€{startingPrice}</span>
                    </div>
                    <div className="property-count">
                        {propertyCount} Properties
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
