import React from 'react';
import { MapPin, Info, Calendar, Car, Users, CheckCircle, Clock } from 'lucide-react';
import './DestinationGuide.css';

const DestinationGuide = ({ guide }) => {
    if (!guide) return null;

    return (
        <div className="destination-guide">
            <div className="guide-hero">
                <div className="guide-badge">
                    <Info size={14} /> Local Guide
                </div>
                <h2>{guide.title}</h2>
                <p className="guide-summary">{guide.summary}</p>

                {guide.highlights && (
                    <div className="guide-highlights">
                        {guide.highlights.map((item, idx) => (
                            <span key={idx} className="highlight-tag">
                                <CheckCircle size={14} /> {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="guide-grid">
                {/* Left Column: Essential Info */}
                <div className="guide-essential">
                    <section className="guide-section">
                        <h3><Users size={20} /> Who it suits</h3>
                        <ul className="bullet-list">
                            {guide.whoItSuits.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="guide-section">
                        <h3><Car size={20} /> Getting there & around</h3>
                        <div className="info-box">
                            <p><strong>To the gateway:</strong> {guide.gettingThere}</p>
                            <p><strong>On the ground:</strong> {guide.gettingAround}</p>
                        </div>
                    </section>

                    <section className="guide-section-row">
                        <div className="info-card">
                            <h4><Calendar size={18} /> Best time to visit</h4>
                            <p>{guide.bestTimeToVisit}</p>
                        </div>
                        <div className="info-card">
                            <h4><Info size={18} /> Good to know</h4>
                            <p>{guide.goodToKnow}</p>
                        </div>
                    </section>
                </div>

                {/* Right Column: Itineraries */}
                <div className="guide-itineraries">
                    <h3><Clock size={20} /> Suggested Itineraries</h3>
                    {guide.itineraries.map((itinerary, idx) => (
                        <div key={idx} className="itinerary-block">
                            <h4>{itinerary.title}</h4>
                            <ul className="itinerary-list">
                                {itinerary.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DestinationGuide;
