import React from 'react';
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms">
            <div className="terms-container">
                <div className="terms-header">
                    <h1 className="terms-title">Terms of Service</h1>
                    <p className="terms-subtitle">
                        Last updated: {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </div>

                <div className="terms-content">
                    <section className="terms-section">
                        <p className="terms-intro">
                            Welcome to Direcho.ph! These Terms of Service ("Terms") govern your use of our car marketplace platform. 
                            By accessing or using our services, you agree to be bound by these Terms.
                        </p>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">1. Acceptance of Terms</h2>
                        <div className="section-content">
                            <p>
                                By accessing and using Direcho.ph, you accept and agree to be bound by the terms and 
                                provision of this agreement. If you do not agree to abide by the above, please do not 
                                use this service.
                            </p>
                            <p>
                                These Terms apply to all visitors, users, and others who access or use our services, 
                                including buyers, sellers, and browsers.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">2. Description of Service</h2>
                        <div className="section-content">
                            <p>Direcho.ph provides an online platform that allows users to:</p>
                            <ul>
                                <li>Buy and sell automobiles</li>
                                <li>List vehicle information and specifications</li>
                                <li>Search and browse available vehicles</li>
                                <li>Connect with potential buyers and sellers</li>
                                <li>Access vehicle history and verification services</li>
                            </ul>
                            <p>
                                We act as an intermediary platform and do not own, sell, or purchase any vehicles listed on our site.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">3. User Accounts and Registration</h2>
                        <div className="section-content">
                            <h3>Account Creation</h3>
                            <ul>
                                <li>You must provide accurate and complete information when creating an account</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You must be at least 18 years old to create an account</li>
                                <li>One person may not maintain multiple accounts</li>
                            </ul>
                            
                            <h3>Account Responsibilities</h3>
                            <ul>
                                <li>You are responsible for all activities that occur under your account</li>
                                <li>Notify us immediately of any unauthorized use of your account</li>
                                <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                            </ul>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">4. User Conduct and Responsibilities</h2>
                        <div className="section-content">
                            <h3>Prohibited Activities</h3>
                            <p>You agree not to:</p>
                            <ul>
                                <li>Post false, misleading, or fraudulent vehicle information</li>
                                <li>Use the platform for any illegal activities</li>
                                <li>Harass, abuse, or harm other users</li>
                                <li>Attempt to gain unauthorized access to our systems</li>
                                <li>Upload viruses or malicious code</li>
                                <li>Scrape or collect user data without permission</li>
                                <li>Impersonate another person or entity</li>
                            </ul>

                            <h3>Content Standards</h3>
                            <ul>
                                <li>All vehicle listings must be accurate and truthful</li>
                                <li>Photos must be of the actual vehicle being sold</li>
                                <li>Pricing information must be current and accurate</li>
                                <li>Communication must be professional and respectful</li>
                            </ul>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">5. Vehicle Listings and Transactions</h2>
                        <div className="section-content">
                            <h3>Seller Responsibilities</h3>
                            <ul>
                                <li>Provide accurate vehicle information and descriptions</li>
                                <li>Ensure legal ownership of vehicles being sold</li>
                                <li>Complete all necessary paperwork and transfers</li>
                                <li>Honor agreed-upon sale terms</li>
                            </ul>

                            <h3>Buyer Responsibilities</h3>
                            <ul>
                                <li>Verify vehicle information before purchase</li>
                                <li>Conduct inspections as deemed necessary</li>
                                <li>Ensure proper insurance and registration</li>
                                <li>Complete payment as agreed</li>
                            </ul>

                            <h3>Platform Role</h3>
                            <p>
                                Direcho.ph serves as a marketplace platform only. We do not participate in actual 
                                transactions between buyers and sellers, nor do we guarantee the accuracy of listings 
                                or the completion of transactions.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">6. Fees and Payments</h2>
                        <div className="section-content">
                            <h3>Listing Fees</h3>
                            <ul>
                                <li>Basic vehicle listings are free for individual sellers</li>
                                <li>Premium listing features may incur additional charges</li>
                                <li>Dealer accounts may have different fee structures</li>
                            </ul>

                            <h3>Transaction Fees</h3>
                            <ul>
                                <li>We may charge a commission on successful sales</li>
                                <li>All fees will be clearly disclosed before listing</li>
                                <li>Fees are non-refundable unless otherwise stated</li>
                            </ul>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">7. Intellectual Property</h2>
                        <div className="section-content">
                            <p>
                                The Direcho.ph platform, including its design, features, and content, is protected by 
                                intellectual property laws. You may not copy, modify, or distribute our content without 
                                explicit permission.
                            </p>
                            <p>
                                By posting content on our platform, you grant us a non-exclusive license to use, 
                                display, and promote your listings.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">8. Privacy and Data Protection</h2>
                        <div className="section-content">
                            <p>
                                Your privacy is important to us. Please review our Privacy Policy to understand how 
                                we collect, use, and protect your personal information.
                            </p>
                            <p>
                                By using our services, you consent to the collection and use of information as outlined 
                                in our Privacy Policy.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">9. Disclaimers and Limitation of Liability</h2>
                        <div className="section-content">
                            <h3>Service Disclaimer</h3>
                            <p>
                                Our services are provided "as is" without warranties of any kind. We do not guarantee 
                                the accuracy, completeness, or reliability of any information on our platform.
                            </p>

                            <h3>Limitation of Liability</h3>
                            <p>
                                In no event shall Direcho.ph be liable for any direct, indirect, incidental, special, 
                                or consequential damages arising from:
                            </p>
                            <ul>
                                <li>Use or inability to use our services</li>
                                <li>Transactions between users</li>
                                <li>Vehicle defects or misrepresentations</li>
                                <li>Data loss or security breaches</li>
                                <li>Third-party actions or content</li>
                            </ul>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">10. Indemnification</h2>
                        <div className="section-content">
                            <p>
                                You agree to indemnify and hold harmless Direcho.ph from any claims, damages, or 
                                expenses arising from your use of our services, violation of these Terms, or 
                                infringement of any rights of another.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">11. Termination</h2>
                        <div className="section-content">
                            <p>
                                We reserve the right to terminate or suspend your account and access to our services 
                                at our sole discretion, without notice, for conduct that we believe violates these 
                                Terms or is harmful to other users or our business.
                            </p>
                            <p>
                                You may terminate your account at any time by contacting our support team.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">12. Changes to Terms</h2>
                        <div className="section-content">
                            <p>
                                We reserve the right to modify these Terms at any time. We will notify users of 
                                significant changes via email or platform notifications. Your continued use of our 
                                services after changes constitutes acceptance of the new Terms.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">13. Governing Law and Jurisdiction</h2>
                        <div className="section-content">
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the 
                                Republic of the Philippines. Any disputes arising under these Terms shall be subject 
                                to the exclusive jurisdiction of the courts of the Philippines.
                            </p>
                        </div>
                    </section>

                    <section className="terms-section">
                        <h2 className="section-title">14. Contact Information</h2>
                        <div className="section-content">
                            <p>
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="contact-info">
                                <p><strong>Email:</strong> legal@direcho.ph</p>
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

export default Terms;