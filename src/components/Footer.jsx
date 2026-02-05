import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        if (window.innerWidth > 768) return;
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <img src="/images/logo.png" alt="EOS Villas Logo" style={{ height: '40px', width: 'auto', marginBottom: '1.25rem', filter: 'brightness(0) invert(1)' }} />
                        <p className="footer-desc">Premium holiday rentals across the Mediterranean.</p>
                        <div className="social-links">
                            <a href="#"><Facebook size={18} /></a>
                            <a href="#"><Twitter size={18} /></a>
                            <a href="#"><Instagram size={18} /></a>
                            <a href="#"><Youtube size={18} /></a>
                        </div>
                    </div>

                    <div className={`footer-links ${openSection === 'quick' ? 'open' : ''}`}>
                        <h4 onClick={() => toggleSection('quick')}>Quick Links</h4>
                        <ul>
                            <li><Link to="#">About Us</Link></li>
                            <li><Link to="/destinations">Destinations</Link></li>
                            <li><Link to="#">Special Offers</Link></li>
                            <li><Link to="#">Travel Blog</Link></li>
                        </ul>
                    </div>

                    <div className={`footer-links ${openSection === 'dest' ? 'open' : ''}`}>
                        <h4 onClick={() => toggleSection('dest')}>Destinations</h4>
                        <ul>
                            <li><Link to="/destination/corfu">Corfu, Greece</Link></li>
                            <li><Link to="/destination/paxos">Paxos, Greece</Link></li>
                            <li><Link to="/destination/cyprus">Cyprus</Link></li>
                            <li><Link to="/destination/algarve">Algarve, Portugal</Link></li>
                            <li><Link to="/destination/costa-del-sol">Costa del Sol, Spain</Link></li>
                            <li><Link to="/destination/halkidiki">Halkidiki, Greece</Link></li>
                        </ul>
                    </div>

                    <div className={`footer-contact ${openSection === 'contact' ? 'open' : ''}`}>
                        <h4 onClick={() => toggleSection('contact')}>Contact Us</h4>
                        <ul>
                            <li><Phone size={16} /> <span>+30 26630 91044</span></li>
                            <li><Mail size={16} /> <span>info@eostravel.com</span></li>
                            <li><MapPin size={16} /> <span>Stephanos, Corfu</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} EOS Travel. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
