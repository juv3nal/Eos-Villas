import React, { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar'
import PropertyCarousel from '../components/PropertyCarousel'
import PropertyGrid from '../components/PropertyGrid'
import Hero from '../components/Hero'
import MapModal from '../components/MapModal'
import { LayoutGrid, Layers } from 'lucide-react'
import { properties } from '../data/properties'
import { destinations } from '../data/destinations'
import {
    MapPin, Info, ArrowRight,
    Palmtree, Castle, Utensils,
    Anchor, Trees as TreePine, Wine,
    Sun, History, Waves,
    Club, ChefHat, Map,
    Globe, Tag, Camera,
    Music, ShoppingBag, Shield,
    Umbrella, Mountain
} from 'lucide-react'
import { getDestinationGuide } from '../content'
import DestinationGuide from '../components/DestinationGuide'
import './Destination.css'

// Helper to resolve icon string to component
const IconMap = {
    Palmtree, Castle, Utensils,
    Anchor, TreePine, Wine,
    Sun, History, Waves,
    Club, ChefHat, Map,
    Globe, Tag, Camera,
    Music, ShoppingBag, Shield,
    Umbrella, Mountain
};

function Destination() {
    const { area } = useParams();
    const areaKey = area.toLowerCase();
    const guideData = useMemo(() => getDestinationGuide(areaKey), [areaKey]);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
    const [sortBy, setSortBy] = useState('Recommended');

    const destinationData = useMemo(() => {
        return destinations.find(d =>
            d.id.toLowerCase() === areaKey ||
            d.slug.toLowerCase() === areaKey ||
            d.name.toLowerCase() === areaKey
        );
    }, [areaKey]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [areaKey]);

    const info = destinationData ? {
        title: `${destinationData.name} Collection`,
        destination: destinationData.name,
        subtitle: "Experience authentic luxury in our hand-picked properties",
        description: destinationData.description,
        images: [destinationData.image],
        highlights: destinationData.highlights
    } : {
        title: `${area.charAt(0).toUpperCase() + area.slice(1)} Rentals`,
        destination: area,
        subtitle: "Discover beautiful villas and apartments",
        description: "Explore our exclusive selection of properties in this stunning location.",
        images: ["https://www.eostravel.com/images/home/Corfu.jpg"],
        highlights: []
    };

    const [filters, setFilters] = useState({
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

    // Shuffle properties only when the destination changes
    const shuffledProperties = useMemo(() => {
        return [...properties].sort(() => 0.5 - Math.random());
    }, [areaKey]);

    const filteredProperties = useMemo(() => {
        let results = shuffledProperties.filter(prop => {
            // Destination match - check against name or areaKey
            const propDest = prop.destination.toLowerCase();
            const match = propDest === areaKey ||
                (destinationData && propDest === destinationData.name.toLowerCase());

            if (!match) return false;

            // Price filter
            if (prop.price > filters.maxPrice) return false;

            // Type filter - Case insensitive and robust match
            if (filters.types.length > 0) {
                const propType = (prop.type || '').toLowerCase();
                if (!filters.types.some(t => t.toLowerCase() === propType)) return false;
            }

            // Amenities filter - with safety check
            if (prop.amenities) {
                for (const [key, value] of Object.entries(filters.amenities)) {
                    if (value && !prop.amenities[key]) return false;
                }
            } else if (Object.values(filters.amenities).some(v => v)) {
                return false;
            }

            return true;
        });

        // Apply Sorting
        if (sortBy === 'Price: Low to High') {
            results.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
            results.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'Highest Rated') {
            results.sort((a, b) => b.rating - a.rating);
        }
        // 'Recommended' is the default shuffled order

        return results;
    }, [areaKey, destinationData, filters, shuffledProperties, sortBy]);

    // Total properties in this destination (unfiltered)
    const totalStats = useMemo(() => {
        const areaProps = properties.filter(prop => {
            const propDest = (prop.destination || '').toLowerCase();
            return propDest === areaKey ||
                (destinationData && propDest === destinationData.name.toLowerCase());
        });

        const prices = areaProps.map(p => p.price);
        return {
            count: areaProps.length || destinationData?.propertyCount || 0,
            minPrice: prices.length > 0 ? Math.min(...prices) : (destinationData?.startingPrice || 100)
        };
    }, [areaKey, destinationData]);

    const handleFilterChange = (newFilters) => {
        console.log('Filters changed in Destination:', newFilters);
        setFilters(newFilters);
    };

    return (
        <div className="destination-page">
            <Hero
                images={info.images}
                title={info.title}
                subtitle={info.subtitle}
                destination={info.destination}
                showSearch={true}
            />

            <div className="destination-content container">
                {/* Destination Guide Block */}
                {guideData && <DestinationGuide guide={guideData} />}

                {/* SEO & Intro Section */}
                <div className="seo-intro-card">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center mb-3">
                                <MapPin className="text-primary mr-2" size={20} />
                                <span className="text-uppercase tracking-widest small font-weight-bold text-muted">Destination Guide</span>
                            </div>
                            <h2 className="display-5 mb-4 font-weight-bold text-dark">Welcome to {info.destination}</h2>
                            <div className="lead text-muted description-text">
                                {info.description}
                            </div>
                        </div>
                        <div className="col-lg-4 mt-4 mt-lg-0">
                            <div className="destination-stats-card">
                                <div className="stat-row">
                                    <div className="stat-value">{totalStats.count}</div>
                                    <div className="stat-label">Total Properties</div>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-row">
                                    <div className="stat-value">€{totalStats.minPrice}+</div>
                                    <div className="stat-label">Starting Price</div>
                                </div>
                                <button
                                    className="btn btn-outline-primary btn-block mt-4"
                                    onClick={() => setIsMapOpen(true)}
                                >
                                    View Map <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <MapModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    destinationName={info.destination}
                />

                <div className="row pb-5">
                    {/* Filters Sidebar */}
                    <div className="col-md-4 col-lg-3 mb-5">
                        <div className="sticky-filters">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                minPrice={totalStats.minPrice}
                            />
                        </div>
                    </div>

                    {/* Properties Grid/Carousel */}
                    <div className="col-md-8 col-lg-9">
                        <div className="results-header d-flex justify-content-between align-items-center mb-4">
                            <h3 className="h4 mb-0">
                                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
                            </h3>
                            <div className="d-flex align-items-center gap-3">
                                <div className="view-toggle btn-group mr-3 shadow-sm rounded-lg overflow-hidden" style={{ background: '#f8f9fa', padding: '4px' }}>
                                    <button
                                        className={`btn btn-sm ${viewMode === 'grid' ? 'btn-white shadow-sm active' : 'btn-ghost'}`}
                                        onClick={() => setViewMode('grid')}
                                        title="Grid View"
                                        style={{ border: 'none', padding: '8px 12px' }}
                                    >
                                        <LayoutGrid size={18} color={viewMode === 'grid' ? 'var(--primary)' : '#6c757d'} />
                                    </button>
                                    <button
                                        className={`btn btn-sm ${viewMode === 'carousel' ? 'btn-white shadow-sm active' : 'btn-ghost'}`}
                                        onClick={() => setViewMode('carousel')}
                                        title="Carousel View"
                                        style={{ border: 'none', padding: '8px 12px' }}
                                    >
                                        <Layers size={18} color={viewMode === 'carousel' ? 'var(--primary)' : '#6c757d'} />
                                    </button>
                                </div>
                                <div className="sort-dropdown">
                                    <select
                                        className="custom-select border-0 shadow-sm bg-white"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option>Recommended</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Highest Rated</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {filteredProperties.length > 0 ? (
                            <div className="property-listings">
                                {viewMode === 'grid' ? (
                                    <PropertyGrid properties={filteredProperties} />
                                ) : (
                                    <PropertyCarousel properties={filteredProperties} />
                                )}
                            </div>
                        ) : (
                            <div className="no-results-state text-center p-5 bg-white rounded-lg shadow-sm">
                                <Info size={48} className="text-muted mb-3 opacity-50" />
                                <h3 className="h5 mb-2">No properties match your criteria</h3>
                                <p className="text-muted mb-4">Try adjusting your filters to see more options in {info.destination}.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setFilters({ types: [], maxPrice: 1000, amenities: { pool: false, wifi: false, ac: false, parking: false, pets: false } })}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Highlights Section */}
            {info.highlights && info.highlights.length > 0 && (
                <div className="highlights-section bg-secondary text-white py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 mb-4 mb-lg-0">
                                <h3 className="display-5 mb-3">Why Eos in {info.destination}?</h3>
                                <p className="lead text-white-50">We curate experiences, not just stays. Discover what makes {info.destination} unique.</p>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    {info.highlights.map((highlight, index) => {
                                        const Icon = IconMap[highlight.icon] || Info;
                                        return (
                                            <div key={index} className="col-md-4 mb-4 mb-md-0">
                                                <div className="highlight-item">
                                                    <div className="icon-box mb-3">
                                                        <Icon size={24} className="text-white" />
                                                    </div>
                                                    <h5 className="h6 font-weight-bold">{highlight.title}</h5>
                                                    <p className="small text-white-50">{highlight.description || highlight.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Destination
