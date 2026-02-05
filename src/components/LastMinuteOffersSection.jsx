import React from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import PropertyCard from './PropertyCard'
import './LastMinuteOffersSection.css'

const LastMinuteOffersSection = ({ properties = [] }) => {
    if (properties.length === 0) return null;

    // Cap at 6 offers as requested
    const displayProperties = properties.slice(0, 6);

    return (
        <section className="last-minute-section">
            <div className="container">
                <div className="section-header-last-minute">
                    <div className="header-content">
                        <div className="urgency-badge">
                            <Clock size={14} />
                            <span>Limited Time Offers</span>
                        </div>
                        <h2 className="section-title">Last Minute Escapes</h2>
                        <p className="section-subtitle">
                            Limited-time offers for arrivals in the next 30 days.
                            <span className="urgency-microcopy">Book by Sunday to secure these rates.</span>
                        </p>
                    </div>
                    <Link to="/search?lastMinute=true" className="view-all-offers">
                        View all last minute offers →
                    </Link>
                </div>

                <div className="offers-container">
                    <div className="offers-grid">
                        {displayProperties.map(prop => (
                            <PropertyCard
                                key={prop.id}
                                {...prop}
                                lastMinute={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LastMinuteOffersSection;
