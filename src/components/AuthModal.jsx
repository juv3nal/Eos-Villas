import React, { useState } from 'react';
import { X, Mail, Lock, User, Github, Chrome, Loader2 } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onClose();
        }, 1500);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-modal-glass" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="auth-content">
                    <div className="auth-header text-center mb-5">
                        <img src="/images/logo.png" alt="EOS Villas" className="auth-logo mb-4" />
                        <h2 className="display-6 font-weight-bold mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-muted">
                            {isLogin
                                ? 'Enter your details to access your sanctuary.'
                                : 'Join our exclusive community of travelers.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="form-group-premium mb-4">
                                <label className="form-label-premium">Full Name</label>
                                <div className="input-wrapper-premium">
                                    <User className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        className="form-control-premium"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group-premium mb-4">
                            <label className="form-label-premium">Email Address</label>
                            <div className="input-wrapper-premium">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className="form-control-premium"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group-premium mb-5">
                            <label className="form-label-premium">Password</label>
                            <div className="input-wrapper-premium">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="form-control-premium"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {isLogin && (
                                <div className="text-right mt-2">
                                    <button type="button" className="btn-link-premium">Forgot Password?</button>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn-premium btn-block py-3 mb-4 d-flex align-items-center justify-content-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin mr-2" size={20} />
                            ) : null}
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>

                        <div className="auth-divider mb-4">
                            <span>Or continue with</span>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <button type="button" className="btn-social-premium btn-block">
                                    <Chrome size={20} className="mr-2" /> Google
                                </button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn-social-premium btn-block">
                                    <Github size={20} className="mr-2" /> Github
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="auth-footer text-center mt-5">
                        <p className="mb-0">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                className="btn-link-premium font-weight-bold"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
