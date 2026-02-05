import React, { useState, useMemo, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import './Hero.css'

import { destinations as destinationData } from '../data/destinations'

const Hero = ({ images = [], title, subtitle, destination: initialDestination, showSearch = true }) => {
    const [selectedDestination, setSelectedDestination] = useState(initialDestination || '');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [guests, setGuests] = useState('2');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);


    useEffect(() => {
        if (initialDestination) {
            setSelectedDestination(initialDestination);
        }
    }, [initialDestination]);

    // Pick the background image based on selected destination or random from initial images
    const backgroundImage = useMemo(() => {
        // First priority: use images prop if provided
        if (images && images.length > 0) {
            return images[0];
        }

        // Second priority: look up destination from data
        const matchingDest = destinationData.find(d =>
            d.name.toLowerCase() === (selectedDestination || '').toLowerCase() ||
            d.id === (selectedDestination || '').toLowerCase()
        );

        if (matchingDest) {
            return matchingDest.image;
        }

        // Fallback
        return "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000";
    }, [selectedDestination, images]);

    // Derived from data layer
    const destinations = destinationData.map(d => ({
        label: d.name,
        value: d.name
    }));

    return (
        <section className="hero-section">
            <div className="hero-bg">
                <div
                    key={backgroundImage} // Force re-animation on image change
                    className="hero-bg-layer active"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content animate-fade-in">
                <h1 className="hero-title">
                    <span className="hide-mobile">{title || <>Your Mediterranean Dream<span className="text-orange">scape</span></>}</span>
                    <span className="show-mobile">Curated villas across the Mediterranean</span>
                </h1>
                <p className="hero-subtitle hide-mobile">{subtitle || `Curated stays in ${selectedDestination || "the Mediterranean"}.`}</p>


                {showSearch && (
                    <div className="search-bar-wrapper">
                        {/* Mobile Trigger */}
                        <div className="mobile-search-trigger show-mobile" onClick={() => setIsMobileSearchOpen(true)}>
                            <Search size={20} className="text-orange" />
                            <span>Where to?</span>
                        </div>

                        {/* Desktop Search Bar */}
                        <div className={`search-bar animate-fade-in hide-mobile`} style={{ animationDelay: '0.2s' }}>
                            <div className="search-group">
                                <div className="search-icon"><MapPin size={18} /></div>
                                <div className="search-input">
                                    <label>Location</label>
                                    <div className="dropdown-wrapper">
                                        <select
                                            className="destination-select"
                                            value={selectedDestination}
                                            onChange={(e) => setSelectedDestination(e.target.value)}
                                        >
                                            <option value="" disabled>Where to?</option>
                                            {destinations.map(dest => (
                                                <option key={dest.value} value={dest.value}>{dest.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="dropdown-arrow" />
                                    </div>
                                </div>
                            </div>

                            <div className="divider-vertical"></div>

                            <div className="search-group">
                                <div className="search-icon"><Calendar size={18} /></div>
                                <div className="search-input">
                                    <label>Dates</label>
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={(update) => setDateRange(update)}
                                        placeholderText="Select dates"
                                        className="datepicker-input"
                                        minDate={new Date()}
                                        dateFormat="MMM d"
                                    />
                                </div>
                            </div>

                            <div className="divider-vertical"></div>

                            <div className="search-group">
                                <div className="search-icon"><Users size={18} /></div>
                                <div className="search-input">
                                    <label>Guests</label>
                                    <select
                                        className="destination-select"
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16].map(num => (
                                            <option key={num} value={num}>{num} Guests</option>
                                        ))}
                                        <option value="16+">16+ Guests</option>
                                    </select>
                                </div>
                            </div>

                            <button className="search-btn">
                                <Search size={20} />
                                <span>Search</span>
                            </button>
                        </div>

                        {/* Mobile Search Overlay/Sheet */}
                        {isMobileSearchOpen && (
                            <div className="mobile-search-overlay show-mobile">
                                <div className="mobile-search-sheet">
                                    <div className="sheet-header">
                                        <h3>Find your villa</h3>
                                        <button className="close-sheet" onClick={() => setIsMobileSearchOpen(false)}>✕</button>
                                    </div>
                                    <div className="sheet-body">
                                        <div className="mobile-search-field">
                                            <label><MapPin size={16} /> Location</label>
                                            <select
                                                value={selectedDestination}
                                                onChange={(e) => setSelectedDestination(e.target.value)}
                                            >
                                                <option value="">Anywhere</option>
                                                {destinations.map(dest => (
                                                    <option key={dest.value} value={dest.value}>{dest.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mobile-search-field">
                                            <label><Calendar size={16} /> Dates</label>
                                            <DatePicker
                                                selectsRange={true}
                                                startDate={startDate}
                                                endDate={endDate}
                                                onChange={(update) => setDateRange(update)}
                                                placeholderText="Select dates"
                                                className="mobile-datepicker"
                                                minDate={new Date()}
                                                dateFormat="MMM d"
                                                inline
                                            />
                                        </div>
                                        <div className="mobile-search-field">
                                            <label><Users size={16} /> Guests</label>
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(e.target.value)}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16].map(num => (
                                                    <option key={num} value={num}>{num} Guests</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sheet-footer">
                                        <button className="btn btn-primary w-100" onClick={() => setIsMobileSearchOpen(false)}>
                                            Search Villas
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    )
}

export default Hero
