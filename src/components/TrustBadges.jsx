import React from 'react'
import { ShieldCheck, Lock, Headphones, Gem } from 'lucide-react'
import './TrustBadges.css'

const TrustBadges = () => {
    const badges = [
        {
            icon: <ShieldCheck size={48} strokeWidth={1.5} />,
            title: "EOT Licensed",
            description: "Fully regulated and certified Greek villas"
        },
        {
            icon: <Lock size={48} strokeWidth={1.5} />,
            title: "Secure Payments",
            description: "Safe & encrypted booking process"
        },
        {
            icon: <Headphones size={48} strokeWidth={1.5} />,
            title: "24/7 Concierge",
            description: "Local support throughout your stay"
        },
        {
            icon: <Gem size={48} strokeWidth={1.5} />,
            title: "Handpicked",
            description: "Only the finest properties make our collection"
        }
    ]

    return (
        <div className="trust-badges-grid">
            {badges.map((badge, index) => (
                <div key={index} className="trust-badge-item">
                    <div className="trust-icon">
                        {badge.icon}
                    </div>
                    <h3 className="trust-title">{badge.title}</h3>
                    <p className="trust-description">{badge.description}</p>
                </div>
            ))}
        </div>
    )
}

export default TrustBadges
