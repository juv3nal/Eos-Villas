import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { experiences } from '../data/experienceData';
import './LocalExperience.css';

const LocalExperience = () => {
    const navigate = useNavigate();
    return (
        <section className="local-experience-section container">
            <div className="section-header">
                <div>
                    <span className="section-subtitle">Live like a local</span>
                    <h2 className="section-title">Authentic Experiences</h2>
                </div>
                <button className="view-all-btn">
                    View All Stories <ArrowRight size={18} />
                </button>
            </div>

            <div className="experience-grid">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="experience-card"
                        onClick={() => navigate(`/story/${exp.slug}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="experience-image">
                            <img src={exp.image} alt={exp.title} loading="lazy" />
                            <div className="experience-tag">
                                <Tag size={12} />
                                {exp.category}
                            </div>
                        </div>
                        <div className="experience-content">
                            <div className="experience-meta">
                                <Clock size={14} />
                                <span>{exp.readTime}</span>
                            </div>
                            <h3>{exp.title}</h3>
                            <div className="read-more">
                                Read More <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LocalExperience;
