import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyGrid.css';

const PropertyGrid = ({ properties }) => {
    if (!properties || properties.length === 0) return null;

    return (
        <div className="property-grid animate-fade-in">
            {properties.map((property) => (
                <div className="grid-item" key={property.id}>
                    <PropertyCard {...property} />
                </div>
            ))}
        </div>
    );
};

export default PropertyGrid;
