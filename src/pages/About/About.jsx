import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
    const navigate = useNavigate();

    const handleBrowseCars = () => {
        navigate('/cars');
    };

    const handleSellCar = () => {
        navigate('/sell');
    };
    return (
        <div className="about">
            <div className="about-container">
                <div className="about-header">
                    <h1 className="about-title">About Direcho.ph</h1>
                    <p className="about-subtitle">
                        Your trusted partner in buying and selling cars in the Philippines
                    </p>
                </div>

                <div className="about-content">
                    <section className="hero-section">
                        <div className="hero-text">
                            <h2>Revolutionizing the Car Marketplace</h2>
                            <p>
                                At Direcho.ph, we're transforming how Filipinos buy and sell cars. Our platform 
                                connects buyers and sellers across the Philippines, making car transactions 
                                transparent, secure, and hassle-free.
                            </p>
                        </div>
                    </section>

                    <section className="mission-section">
                        <div className="content-grid">
                            <div className="mission-card">
                                <div className="card-icon">🎯</div>
                                <h3>Our Mission</h3>
                                <p>
                                    To democratize car ownership by providing a transparent, efficient, and 
                                    trustworthy platform that empowers every Filipino to make informed decisions 
                                    about buying and selling vehicles.
                                </p>
                            </div>
                            <div className="mission-card">
                                <div className="card-icon">👁️</div>
                                <h3>Our Vision</h3>
                                <p>
                                    To become the Philippines' most trusted automotive marketplace, where every 
                                    car transaction is conducted with complete transparency and confidence.
                                </p>
                            </div>
                            <div className="mission-card">
                                <div className="card-icon">⭐</div>
                                <h3>Our Values</h3>
                                <p>
                                    Transparency, integrity, innovation, and customer-centricity drive everything 
                                    we do. We believe in building lasting relationships through trust and reliability.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="story-section">
                        <h2>Our Story</h2>
                        <div className="story-content">
                            <p>
                                Founded with a simple yet powerful vision, Direcho.ph emerged from the need to 
                                create a more transparent and efficient car marketplace in the Philippines. We 
                                recognized that buying or selling a car shouldn't be complicated, stressful, or 
                                filled with uncertainty.
                            </p>
                            <p>
                                Our team of automotive enthusiasts and technology experts came together to build 
                                a platform that addresses the common pain points in car transactions. From ensuring 
                                accurate vehicle information to providing secure communication channels, every 
                                feature is designed with our users' needs in mind.
                            </p>
                            <p>
                                Today, Direcho.ph serves thousands of car buyers and sellers across the Philippines, 
                                facilitating transactions worth millions of pesos while maintaining our commitment 
                                to transparency and trust.
                            </p>
                        </div>
                    </section>

                    <section className="features-section">
                        <h2>Why Choose Direcho.ph?</h2>
                        <div className="features-grid">
                            <div className="feature-item">
                                <div className="feature-icon">🔍</div>
                                <h3>Verified Listings</h3>
                                <p>All vehicle listings undergo thorough verification to ensure accuracy and authenticity.</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🛡️</div>
                                <h3>Secure Transactions</h3>
                                <p>Advanced security measures protect your personal information and financial data.</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">📱</div>
                                <h3>User-Friendly Platform</h3>
                                <p>Intuitive design makes browsing, searching, and listing vehicles simple and enjoyable.</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">💬</div>
                                <h3>Expert Support</h3>
                                <p>Our knowledgeable team provides assistance throughout your buying or selling journey.</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">📊</div>
                                <h3>Market Insights</h3>
                                <p>Access valuable market data and pricing information to make informed decisions.</p>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🌍</div>
                                <h3>Nationwide Reach</h3>
                                <p>Connect with buyers and sellers from all across the Philippines.</p>
                            </div>
                        </div>
                    </section>

                    <section className="stats-section">
                        <h2>Our Impact</h2>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">10,000+</div>
                                <div className="stat-label">Cars Listed</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">25,000+</div>
                                <div className="stat-label">Happy Users</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">5,000+</div>
                                <div className="stat-label">Successful Sales</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Customer Support</div>
                            </div>
                        </div>
                    </section>

                    <section className="team-section">
                        <h2>Meet Our Team</h2>
                        <p className="team-intro">
                            Behind Direcho.ph is a passionate team of professionals dedicated to revolutionizing 
                            the automotive marketplace in the Philippines.
                        </p>
                        <div className="team-grid">
                            <div className="team-member">
                                <div className="member-avatar">👨‍💼</div>
                                <h3>Leadership Team</h3>
                                <p>Experienced executives with deep automotive and technology expertise.</p>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">👩‍💻</div>
                                <h3>Technology Team</h3>
                                <p>Skilled developers and engineers building cutting-edge platform features.</p>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">🎨</div>
                                <h3>Design Team</h3>
                                <p>Creative professionals focused on delivering exceptional user experiences.</p>
                            </div>
                            <div className="team-member">
                                <div className="member-avatar">🤝</div>
                                <h3>Customer Success</h3>
                                <p>Dedicated support specialists ensuring every user has a positive experience.</p>
                            </div>
                        </div>
                    </section>

                    <section className="commitment-section">
                        <h2>Our Commitment</h2>
                        <div className="commitment-content">
                            <div className="commitment-item">
                                <h3>🌱 Sustainability</h3>
                                <p>
                                    We promote sustainable transportation by facilitating the resale of vehicles, 
                                    reducing waste and extending vehicle lifecycles.
                                </p>
                            </div>
                            <div className="commitment-item">
                                <h3>🤝 Community</h3>
                                <p>
                                    We're committed to building a strong automotive community in the Philippines, 
                                    connecting enthusiasts and everyday drivers alike.
                                </p>
                            </div>
                            <div className="commitment-item">
                                <h3>📈 Innovation</h3>
                                <p>
                                    We continuously invest in new technologies and features to improve the car 
                                    buying and selling experience for all users.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="cta-section">
                        <div className="cta-content">
                            <h2>Ready to Start Your Journey?</h2>
                            <p>
                                Whether you're looking to buy your dream car or sell your current vehicle, 
                                Direcho.ph is here to help you every step of the way.
                            </p>
                            <div className="cta-buttons">
                            <button 
                                className="cta-button primary" 
                                onClick={handleBrowseCars}
                            >
                                Browse Cars
                            </button>
                            <button 
                                className="cta-button secondary" 
                                onClick={handleSellCar}
                            >
                                Sell Your Car
                            </button>
                        </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;