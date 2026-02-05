import React from 'react'
import { RefreshCw } from 'lucide-react'
import './FilterSidebar.css'

const FilterSidebar = ({ filters, onFilterChange, minPrice = 50 }) => {
    const handleTypeChange = (type) => {
        const newTypes = filters.types.includes(type)
            ? filters.types.filter(t => t !== type)
            : [...filters.types, type];
        onFilterChange({ ...filters, types: newTypes });
    };

    const handleAmenityChange = (amenity) => {
        const newAmenities = { ...filters.amenities, [amenity]: !filters.amenities[amenity] };
        onFilterChange({ ...filters, amenities: newAmenities });
    };

    const handlePriceChange = (e) => {
        onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) });
    };

    const handleReset = () => {
        onFilterChange({
            types: [],
            maxPrice: 1000,
            amenities: {
                pool: false,
                wifi: false,
                ac: false,
                parking: false,
                pets: false
            }
        });
    };

    return (
        <div className="filter-sidebar">
            <div className="filter-section">
                <h3>Property Type</h3>
                <div className="checkbox-group">
                    {['Villa', 'Apartment', 'House', 'Cottage'].map(type => (
                        <label key={type}>
                            <input
                                type="checkbox"
                                checked={filters.types.includes(type)}
                                onChange={() => handleTypeChange(type)}
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3>Max Price: €{filters.maxPrice}</h3>
                <input
                    type="range"
                    min={minPrice}
                    max="1000"
                    step="10"
                    value={filters.maxPrice}
                    onInput={handlePriceChange}
                    className="price-slider"
                />
                <div className="price-range-labels">
                    <span>€{minPrice}</span>
                    <span>€1000+</span>
                </div>
            </div>

            <div className="filter-section">
                <h3>Amenities</h3>
                <div className="checkbox-group">
                    {Object.keys(filters.amenities).map(amenity => (
                        <label key={amenity} style={{ textTransform: 'capitalize' }}>
                            <input
                                type="checkbox"
                                checked={filters.amenities[amenity]}
                                onChange={() => handleAmenityChange(amenity)}
                            />
                            {amenity.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                    ))}
                </div>
            </div>

            <button className="apply-filter-btn" onClick={handleReset}>
                <RefreshCw size={16} /> Reset All Filters
            </button>
        </div>
    )
}

export default FilterSidebar
