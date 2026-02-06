import React from 'react';
import { MapPin, Info, Car, Users, Navigation } from 'lucide-react';
import './LocalTips.css';

const LocalTips = ({ tips }) => {
    if (!tips) return null;

    const getCarBadgeClass = (level) => {
        switch (level) {
            case 'recommended': return 'badge-recommended';
            case 'optional': return 'badge-optional';
            case 'notNeeded': return 'badge-not-needed';
            default: return '';
        }
    };

    const getCarLabel = (level) => {
        switch (level) {
            case 'recommended': return 'Car Recommended';
            case 'optional': return 'Car Optional';
            case 'notNeeded': return 'Car Not Essential';
            default: return '';
        }
    };

    return (
        <div className="local-tips-container">
            <div className="local-tips-header">
                <Navigation size={24} className="header-icon" />
                <h3>Local Insights & Tips</h3>
            </div>

            <div className="tips-grid">
                {/* Around your villa */}
                <div className="tips-card">
                    <div className="tips-card-title">
                        <MapPin size={18} />
                        <h4>Around your villa</h4>
                    </div>
                    <p>{tips.aroundYourVilla}</p>
                </div>

                {/* Car requirements */}
                <div className="tips-card">
                    <div className="tips-card-title">
                        <Car size={18} />
                        <h4>Do I need a car?</h4>
                        <span className={`car-badge ${getCarBadgeClass(tips.needACar.level)}`}>
                            {getCarLabel(tips.needACar.level)}
                        </span>
                    </div>
                    <p>{tips.needACar.text}</p>
                </div>

                {/* Ideal for */}
                <div className="tips-card">
                    <div className="tips-card-title">
                        <Users size={18} />
                        <h4>Ideal for</h4>
                    </div>
                    <div className="tags-container">
                        {tips.idealFor.map((item, idx) => (
                            <span key={idx} className="ideal-tag">{item}</span>
                        ))}
                    </div>
                </div>

                {/* Nearby points of interest */}
                {tips.nearby && (
                    <div className="tips-card full-width">
                        <div className="tips-card-title">
                            <Info size={18} />
                            <h4>Nearby highlights</h4>
                        </div>
                        <div className="nearby-list">
                            {tips.nearby.map((item, idx) => (
                                <div key={idx} className="nearby-item">
                                    <span className="nearby-label">{item.label}</span>
                                    <span className="nearby-note">{item.note}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocalTips;
