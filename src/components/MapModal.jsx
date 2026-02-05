import React from 'react';
import { X } from 'lucide-react';
import './MapModal.css';

const MapModal = ({ isOpen, onClose, destinationName }) => {
    if (!isOpen) return null;

    // Encode destination name for Google Maps URL
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(destinationName)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="map-modal-overlay" onClick={onClose}>
            <div className="map-modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="map-modal-header">
                    <h3>Explore {destinationName}</h3>
                    <button className="close-button" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className="map-modal-body">
                    <iframe
                        title={`Map of ${destinationName}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={mapSrc}
                    ></iframe>
                </div>
                <div className="map-modal-footer">
                    <p className="small text-muted">Showing property locations in {destinationName}</p>
                </div>
            </div>
        </div>
    );
};

export default MapModal;
