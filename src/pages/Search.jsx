import React, { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import PropertyGrid from '../components/PropertyGrid'
import FilterSidebar from '../components/FilterSidebar'
import { Search as SearchIcon, MapPin, Home, Info } from 'lucide-react'
import './Search.css'

function Search() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q')?.toLowerCase() || '';
    const showLastMinuteOnly = queryParams.get('lastMinute') === 'true';
    const themeFilter = queryParams.get('theme');

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

    const minPrice = useMemo(() => {
        const prices = properties.map(p => p.price);
        return prices.length > 0 ? Math.min(...prices) : 50;
    }, []);

    const filteredResults = useMemo(() => {
        let results = properties;

        // Apply Search Query
        if (query) {
            results = results.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.destination.toLowerCase().includes(query) ||
                p.location.toLowerCase().includes(query) ||
                p.type.toLowerCase().includes(query)
            );
        }

        // Apply Last Minute Filter
        if (showLastMinuteOnly) {
            results = results.filter(p => p.lastMinute === true);
        }

        // Apply Theme Filter
        if (themeFilter) {
            results = results.filter(p => p.themes?.includes(themeFilter));
        }

        // Apply Filters
        results = results.filter(prop => {
            // Price filter
            if (prop.price > filters.maxPrice) return false;

            // Type filter
            if (filters.types.length > 0) {
                const propType = (prop.type || '').toLowerCase();
                if (!filters.types.some(t => t.toLowerCase() === propType)) return false;
            }

            // Amenities filter
            if (prop.amenities) {
                for (const [key, value] of Object.entries(filters.amenities)) {
                    if (value && !prop.amenities[key]) return false;
                }
            } else if (Object.values(filters.amenities).some(v => v)) {
                return false;
            }

            return true;
        });

        return results;
    }, [query, filters]);

    const handleFilterChange = (newFilters) => {
        console.log('Filters changed in Search:', newFilters);
        setFilters(newFilters);
    };

    const getThemeTitle = (theme) => {
        const themes = {
            'couples': 'Couples Retreats',
            'family': 'Family Holidays',
            'beach': 'Beach & Sun Stays',
            'active': 'Active & Adventure',
            'group': 'Group Getaways',
            'remote': 'Remote & Tranquil Hideaways'
        };
        return themes[theme] || 'Themed Stays';
    };

    return (
        <div className="search-page">
            <div className="container">
                <header className="search-header">
                    <div className="search-info">
                        <h1>
                            {themeFilter ? getThemeTitle(themeFilter) : (showLastMinuteOnly ? 'Last Minute Offers' : (query ? `Results for "${query}"` : 'All Properties'))}
                        </h1>
                        <div className="results-meta">
                            <span className="results-count">
                                {filteredResults.length} {filteredResults.length === 1 ? 'property' : 'properties'} found
                            </span>
                            {themeFilter && (
                                <Link to="/search" className="clear-theme-filter">
                                    <Info size={14} />
                                    Holiday style: {getThemeTitle(themeFilter)} <span>✕</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <div className="row">
                    {/* Filters Sidebar */}
                    <aside className="col-md-4 col-lg-3 mb-5">
                        <div className="sticky-filters">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                minPrice={minPrice}
                            />
                        </div>
                    </aside>

                    {/* Results Content */}
                    <main className="col-md-8 col-lg-9">
                        {filteredResults.length > 0 ? (
                            <PropertyGrid properties={filteredResults} />
                        ) : (
                            <div className="no-results">
                                <div className="no-results-content">
                                    <SearchIcon size={64} className="text-muted mb-3 opacity-50" />
                                    <h2>No properties found</h2>
                                    <p>Try adjusting your search or filters to see more options.</p>

                                    {query && (
                                        <div className="suggestions">
                                            <p>Popular searches:</p>
                                            <div className="suggestion-chips">
                                                <Link to="/search?q=Corfu" className="chip">Corfu</Link>
                                                <Link to="/search?q=Villa" className="chip">Villa</Link>
                                                <Link to="/search?q=Algarve" className="chip">Algarve</Link>
                                                <Link to="/search?q=Pool" className="chip">Pool</Link>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-primary mt-4"
                                        onClick={() => setFilters({ types: [], maxPrice: 1000, amenities: { pool: false, wifi: false, ac: false, parking: false, pets: false } })}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Search;
