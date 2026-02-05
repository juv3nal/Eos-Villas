import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import './StoryCard.css';

const StoryCard = ({ title, excerpt, image, category, date, readTime, slug }) => {
    return (
        <div className="story-card">
            <div className="story-image">
                <img src={image} alt={title} loading="lazy" />
                <span className="story-category">{category}</span>
            </div>
            <div className="story-content">
                <div className="story-meta">
                    <span className="meta-item">
                        <Calendar size={14} />
                        {date}
                    </span>
                    <span className="meta-item">
                        <Clock size={14} />
                        {readTime}
                    </span>
                </div>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <a href={`/stories/${slug}`} className="story-link">
                    Read Story <ArrowRight size={16} />
                </a>
            </div>
        </div>
    );
};

export default StoryCard;
