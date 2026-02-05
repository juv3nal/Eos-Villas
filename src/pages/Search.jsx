import React, { useState, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import PropertyGrid from '../components/PropertyGrid'
import FilterSidebar from '../components/FilterSidebar'
import { Search as SearchIcon, MapPin, Home, Info, X, SlidersHorizontal, ChevronRight, Star } from 'lucide-react'
import './Search.css'

function Search() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q')?.toLowerCase() || '';
    const showLastMinuteOnly = queryParams.get('lastMinute') === 'true';
    const themeFilter = queryParams.get('theme');

    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6);
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
    }, [query, filters, showLastMinuteOnly, themeFilter]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setVisibleCount(6); // Reset pagination
    };

    const clearFilters = () => {
        setFilters({
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
        setVisibleCount(6);
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

    const displayResults = filteredResults.slice(0, visibleCount);
    const hasMore = visibleCount < filteredResults.length;

    return (
        <div className={`search-page ${isFilterDrawerOpen ? 'drawer-open' : ''}`}>
            <div className="container">
                <header className="search-header">
                    <div className="search-info">
                        <h1>
                            {themeFilter ? getThemeTitle(themeFilter) : (showLastMinuteOnly ? 'Last Minute Offers' : (query ? `Results for "${query}"` : 'All Properties'))}
                        </h1>
                        <div className="results-meta">
                            <span className="results-count">
                                {filteredResults.length} {filteredResults.length === 1 ? 'found' : 'found'}
                            </span>
                            {themeFilter && (
                                <Link to="/search" className="clear-theme-filter">
                                    <Info size={14} />
                                    {getThemeTitle(themeFilter)} <span>✕</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Quick Filters */}
                    <div className="quick-filters-row">
                        <button className="mobile-filter-trigger" onClick={() => setIsFilterDrawerOpen(true)}>
                            <SlidersHorizontal size={18} /> Filters
                        </button>
                        <div className="quick-chips">
                            <button className={`chip ${filters.maxPrice < 1000 ? 'active' : ''}`} onClick={() => setIsFilterDrawerOpen(true)}>Price</button>
                            <button className={`chip ${filters.amenities.pool ? 'active' : ''}`} onClick={() => handleFilterChange({ ...filters, amenities: { ...filters.amenities, pool: !filters.amenities.pool } })}>Pool</button>
                            <button className={`chip ${filters.amenities.wifi ? 'active' : ''}`} onClick={() => handleFilterChange({ ...filters, amenities: { ...filters.amenities, wifi: !filters.amenities.wifi } })}>WiFi</button>
                            <button className={`chip ${filters.types.includes('Villa') ? 'active' : ''}`} onClick={() => handleFilterChange({ ...filters, types: filters.types.includes('Villa') ? filters.types.filter(t => t !== 'Villa') : [...filters.types, 'Villa'] })}>Villas</button>
                        </div>
                    </div>
                </header>

                <div className="search-content-wrapper">
                    {/* Desktop Sidebar / Mobile Drawer Overlay */}
                    <div className={`sidebar-overlay ${isFilterDrawerOpen ? 'open' : ''}`} onClick={() => setIsFilterDrawerOpen(false)} />

                    <aside className={`search-sidebar ${isFilterDrawerOpen ? 'open' : ''}`}>
                        <div className="sidebar-header mobile-only">
                            <h3>Filters</h3>
                            <button className="close-filters" onClick={() => setIsFilterDrawerOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="filter-inner">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                minPrice={minPrice}
                            />

                            <div className="sidebar-footer mobile-only">
                                <button className="btn btn-primary w-100" onClick={() => setIsFilterDrawerOpen(false)}>
                                    Show {filteredResults.length} Results
                                </button>
                                <button className="clear-all-btn" onClick={clearFilters}>Clear All</button>
                            </div>
                        </div>
                    </aside>

                    <main className="search-main">
                        {displayResults.length > 0 ? (
                            <>
                                <PropertyGrid properties={displayResults} />
                                {hasMore && (
                                    <div className="load-more-container">
                                        <button className="btn-load-more" onClick={() => setVisibleCount(prev => prev + 6)}>
                                            Load More Properties
                                        </button>
                                        <p className="progress-text">Showing {displayResults.length} of {filteredResults.length}</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="no-results">
                                <SearchIcon size={64} className="text-muted mb-3 opacity-50" />
                                <h2>No properties found</h2>
                                <p>Try adjusting your search or filters to see more options.</p>
                                <button className="btn btn-primary mt-4" onClick={clearFilters}>
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Search;
