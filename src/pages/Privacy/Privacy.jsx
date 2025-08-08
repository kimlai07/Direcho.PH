import React from 'react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-policy">
            <div className="privacy-container">
                <div className="privacy-header">
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <p className="privacy-subtitle">
                        Last updated: {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </div>

                <div className="privacy-content">
                    <section className="privacy-section">
                        <p className="privacy-intro">
                            Your privacy is important to us at Direcho.ph. This privacy policy explains how we collect, 
                            use, and protect your information when you use our car buying and selling platform.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Information We Collect</h2>
                        <div className="section-content">
                            <h3>Personal Information</h3>
                            <ul>
                                <li>Name and contact information (email, phone number, address)</li>
                                <li>Government-issued identification when required</li>
                                <li>Payment and billing information</li>
                                <li>Vehicle information when selling or buying</li>
                            </ul>
                            
                            <h3>Usage Information</h3>
                            <ul>
                                <li>How you interact with our website and services</li>
                                <li>Search queries and preferences</li>
                                <li>Device information and IP address</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">How We Use Your Information</h2>
                        <div className="section-content">
                            <p>We use your information to:</p>
                            <ul>
                                <li>Provide and improve our car marketplace services</li>
                                <li>Process transactions and communicate with you</li>
                                <li>Verify your identity and prevent fraud</li>
                                <li>Send you relevant updates and marketing communications</li>
                                <li>Comply with legal obligations</li>
                                <li>Analyze usage patterns to enhance user experience</li>
                            </ul>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Information Sharing</h2>
                        <div className="section-content">
                            <p>We may share your information with:</p>
                            <ul>
                                <li><strong>Service Providers:</strong> Third parties who help us operate our platform</li>
                                <li><strong>Business Partners:</strong> Trusted partners for financing and insurance services</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                            </ul>
                            <p className="note">
                                We never sell your personal information to third parties for marketing purposes.
                            </p>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Data Protection & Security</h2>
                        <div className="section-content">
                            <p>
                                We implement appropriate security measures to protect your personal information from 
                                unauthorized access, alteration, disclosure, or destruction, including:
                            </p>
                            <ul>
                                <li>SSL encryption for data transmission</li>
                                <li>Secure data storage with access controls</li>
                                <li>Regular security audits and updates</li>
                                <li>Employee training on data protection</li>
                            </ul>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Your Rights</h2>
                        <div className="section-content">
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access and review your personal information</li>
                                <li>Request corrections to inaccurate data</li>
                                <li>Delete your account and associated data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Request data portability</li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us using the information provided below.
                            </p>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Cookies & Tracking</h2>
                        <div className="section-content">
                            <p>
                                We use cookies and similar technologies to improve your browsing experience, 
                                analyze site traffic, and personalize content. You can control cookie settings 
                                through your browser preferences.
                            </p>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Changes to This Privacy Policy</h2>
                        <div className="section-content">
                            <p>
                                We may update our privacy policy from time to time to reflect changes in our 
                                practices or legal requirements. We will notify you of any significant changes 
                                by posting the updated policy on this page and updating the "Last updated" date.
                            </p>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2 className="section-title">Contact Us</h2>
                        <div className="section-content">
                            <p>
                                If you have any questions about this privacy policy or our data practices, 
                                please contact us:
                            </p>
                            <div className="contact-info">
                                <p><strong>Email:</strong> privacy@direcho.ph</p>
                                <p><strong>Phone:</strong> +63 (2) 8XXX-XXXX</p>
                                <p><strong>Address:</strong> Manila, Philippines</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;