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
                                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>
                        </div>
                        <button
                            className="icon-btn hide-mobile"
                            aria-label="Account"
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            <User size={20} />
                        </button>
                        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-search">
                        <form onSubmit={handleSearchSubmit}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Find your villa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                    <ul className="mobile-nav-links">
                        <li><Link to="/destination/corfu" onClick={() => setIsMobileMenuOpen(false)}>Corfu</Link></li>
                        <li><Link to="/destination/paxos" onClick={() => setIsMobileMenuOpen(false)}>Paxos</Link></li>
                        <li><Link to="/destination/algarve" onClick={() => setIsMobileMenuOpen(false)}>Algarve</Link></li>
                        <li><Link to="/destination/halkidiki" onClick={() => setIsMobileMenuOpen(false)}>Halkidiki</Link></li>
                        <li><Link to="/destination/costa-del-sol" onClick={() => setIsMobileMenuOpen(false)}>Costa Del Sol</Link></li>
                        <li className="divider"></li>
                        <li><Link to="#" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
                        <li><Link to="#" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
                        <li><Link to="#" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
                        <li className="divider"></li>
                        <li>
                            <button
                                className="btn-link-premium"
                                style={{ padding: '15px 25px', width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center' }}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsAuthModalOpen(true);
                                }}
                            >
                                <User size={18} className="mr-3" /> Sign In / Register
                            </button>
                        </li>
                    </ul>
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
