import { Quote } from 'lucide-react';
import './ReviewCard.css';

const ReviewCard = ({ author, role, text, rating, location, date }) => {
    return (
        <div className="review-card">
            <Quote className="quote-icon" size={24} />
            <div className="review-stars">
                {[...Array(rating)].map((_, i) => (
                    <span key={i}>★</span>
                ))}
            </div>
            <p className="review-text">"{text}"</p>
            <div className="review-author">
                <div className="author-info">
                    <h5>{author}</h5>
                    <span>{role}</span>
                </div>
            </div>
            <div className="review-footer">
                <span>{location}</span>
                <span>{date}</span>
            </div>
        </div>
    );
};

export default ReviewCard;
