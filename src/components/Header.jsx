import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, User, Search } from 'lucide-react'
import AuthModal from './AuthModal'
import './Header.css'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setIsSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <>
            <header className={`header glass ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container header-inner">
                    <div className="logo">
                        <Link to="/">
                            <img src="/images/logo.png" alt="EOS Villas Logo" style={{ height: '50px', width: 'auto' }} />
                        </Link>
                    </div>

                    <nav className="nav-desktop">
                        <ul className="nav-links">
                            <li className="has-dropdown">
                                <Link to="/destinations">Destinations <ChevronDown size={16} /></Link>
                                <ul className="dropdown">
                                    <li><Link to="/destinations">All Destinations</Link></li>
                                    <li className="divider" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', margin: '5px 0' }}></li>
                                    <li><Link to="/destination/corfu">Corfu</Link></li>
                                    <li><Link to="/destination/paxos">Paxos</Link></li>
                                    <li><Link to="/destination/algarve">Algarve</Link></li>
                                    <li><Link to="/destination/halkidiki">Halkidiki</Link></li>
                                    <li><Link to="/destination/costa-del-sol">Costa Del Sol</Link></li>
                                </ul>
                            </li>
                            <li><Link to="#">Services</Link></li>
                            <li><Link to="#">About</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                            <form onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search villas..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus={isSearchOpen}
                                />
                            </form>
                            <button
                                className="icon-btn search-toggle"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Search"
                            >
                                {isSearchOpen ? <X size={20} /> : <Search size={22} />}
                            </button>
                        </div>
                        <button
                            className="icon-btn hide-mobile"
                            aria-label="Account"
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            <User size={20} />
                        </button>
                        <button
                            className="mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Overlay */}
                <div
                    className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Mobile Slide-in Drawer */}
                <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="drawer-header">
                        <div className="logo">
                            <img src="/images/logo.png" alt="EOS Villas" style={{ height: '32px' }} />
                        </div>
                        <button className="close-drawer" onClick={() => setIsMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="drawer-content">
                        <div className="mobile-search-compact">
                            <form onSubmit={handleSearchSubmit}>
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        <div className="drawer-section">
                            <h4>Destinations</h4>
                            <ul className="drawer-links">
                                <li><Link to="/destinations" onClick={() => setIsMobileMenuOpen(false)}>All Destinations</Link></li>
                                <li><Link to="/destination/corfu" onClick={() => setIsMobileMenuOpen(false)}>Corfu</Link></li>
                                <li><Link to="/destination/paxos" onClick={() => setIsMobileMenuOpen(false)}>Paxos</Link></li>
                                <li><Link to="/destination/algarve" onClick={() => setIsMobileMenuOpen(false)}>Algarve</Link></li>
                                <li><Link to="/destination/halkidiki" onClick={() => setIsMobileMenuOpen(false)}>Halkidiki</Link></li>
                            </ul>
                        </div>

                        <div className="drawer-section">
                            <h4>Company</h4>
                            <ul className="drawer-links">
                                <li><Link to="#" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
                                <li><Link to="#" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
                                <li><Link to="#" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
                            </ul>
                        </div>

                        <div className="drawer-footer">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsAuthModalOpen(true);
                                }}
                            >
                                <User size={18} /> Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    )
}

export default Header
