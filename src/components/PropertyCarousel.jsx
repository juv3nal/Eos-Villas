import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import './PropertyCarousel.css';

const PropertyCarousel = ({ properties }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);

    const scrollNext = () => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0].offsetWidth + 32; // width + gap
            carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0].offsetWidth + 32; // width + gap
            carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsAtStart(scrollLeft <= 5);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        }
    };

    useEffect(() => {
        const currentRef = carouselRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    if (!properties || properties.length === 0) return null;

    return (
        <div className="property-carousel-container">
            <div className="carousel-header">
                <div className="carousel-nav-buttons">
                    <button
                        className={`nav-button ${isAtStart ? 'disabled' : ''}`}
                        onClick={scrollPrev}
                        disabled={isAtStart}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className={`nav-button ${isAtEnd ? 'disabled' : ''}`}
                        onClick={scrollNext}
                        disabled={isAtEnd}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="carousel-track" ref={carouselRef}>
                {properties.map((property) => (
                    <div className="carousel-item" key={property.id}>
                        <PropertyCard {...property} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyCarousel;
