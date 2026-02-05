import React from 'react';
import { Link } from 'react-router-dom';
import './BookingBanner.css';

const BookingBanner = () => {
    return (
        <section className="booking-banner-section container">
            <p className="banner-intro-text">Making your dream holiday a reality, one detail at a time.</p>

            <div className="booking-card">
                <div className="booking-card-content">
                    <h2 className="booking-title">Flexible bookings with Eos Villas</h2>

                    <div className="booking-body">
                        <p className="booking-highlight">Are you dreaming of a relaxing holiday? Eos Villas has you covered!</p>

                        <p>Our flexible booking options make it easy to reserve your property with just a 10% refundable deposit, and you can re-schedule your dates free of charge.</p>

                        <p>Plus, we'll even hold your property for a week until you decide. And with the option to pay on arrival, booking your holiday has never been easier!</p>

                        <p>Don't miss out on this incredible offer.</p>

                        <div className="booking-footer">
                            <p>Book now and experience the ultimate in flexibility with Eos Villas.</p>
                        </div>
                    </div>
                </div>

                <div className="booking-actions">
                    <Link to="/search" className="btn btn-learn-more">Learn more</Link>
                </div>
            </div>
        </section>
    );
};

export default BookingBanner;
