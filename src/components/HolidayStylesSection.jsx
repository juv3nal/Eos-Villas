import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Users, Sun, Tent, Users2, Leaf, ArrowRight } from 'lucide-react'
import './HolidayStylesSection.css'

const categories = [
    {
        id: 'couples',
        title: 'Couples retreats',
        description: 'Romantic villas with privacy and views',
        icon: <Heart size={28} />,
        theme: 'couples'
    },
    {
        id: 'family',
        title: 'Family holidays',
        description: 'Spacious stays with child-friendly pools',
        icon: <Users size={28} />,
        theme: 'family',
        featured: true
    },
    {
        id: 'beach',
        title: 'Beach & sun',
        description: 'Villas just steps from the turquoise sea',
        icon: <Sun size={28} />,
        theme: 'beach'
    },
    {
        id: 'active',
        title: 'Active & adventure',
        description: 'Near hiking trails and water sports',
        icon: <Tent size={28} />,
        theme: 'active'
    },
    {
        id: 'group',
        title: 'Group getaways',
        description: 'Large estates for friends and reunions',
        icon: <Users2 size={28} />,
        theme: 'group'
    },
    {
        id: 'remote',
        title: 'Remote & tranquil',
        description: 'Secluded hideaways in nature',
        icon: <Leaf size={28} />,
        theme: 'remote'
    }
];

const HolidayStylesSection = () => {
    return (
        <section className="holiday-styles-section">
            <div className="container">
                <div className="styles-header text-center">
                    <h2 className="section-title">Find Your Holiday Style</h2>
                    <p className="section-subtitle">
                        Handpicked stays tailored for every type of traveler.
                        <span className="subtitle-detail">Browse curated stays perfect for how you like to travel.</span>
                    </p>
                </div>

                <div className="styles-grid-wrapper">
                    <div className="styles-grid">
                        {categories.map((cat) => (
                            <Link
                                to={`/search?theme=${cat.theme}`}
                                key={cat.id}
                                className={`style-card ${cat.featured ? 'style-card-featured' : ''}`}
                            >
                                <div className="style-icon-wrapper">
                                    {cat.icon}
                                </div>
                                <div className="style-content">
                                    <h3>{cat.title}</h3>
                                    <p>{cat.description}</p>
                                    <div className="style-cta">
                                        <span>View stays</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HolidayStylesSection;
