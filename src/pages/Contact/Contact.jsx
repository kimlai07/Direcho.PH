import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Contact form submitted:', formData);
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error sending message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="contact">
                <div className="contact-container">
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h1>Thank You!</h1>
                        <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                        <button 
                            className="back-button"
                            onClick={() => setIsSubmitted(false)}
                        >
                            Send Another Message
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">
                        Have questions about buying or selling a car? We're here to help!
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <div className="info-cards">
                            <div className="info-card">
                                <div className="info-icon">📧</div>
                                <h3>Email Us</h3>
                                <p>support@direcho.ph</p>
                                <p>Response within 24 hours</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">📞</div>
                                <h3>Call Us</h3>
                                <p>+63 (2) 8XXX-XXXX</p>
                                <p>Mon-Fri: 9AM-6PM</p>
                            </div>
                            <div className="info-card">
                                <div className="info-icon">📍</div>
                                <h3>Visit Us</h3>
                                <p>Manila, Philippines</p>
                                <p>By appointment only</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject *</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'error' : ''}
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="buying">Buying a Car</option>
                                        <option value="selling">Selling a Car</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="account">Account Issues</option>
                                        <option value="payment">Payment & Billing</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Please describe your inquiry in detail..."
                                    rows="6"
                                    className={errors.message ? 'error' : ''}
                                />
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h3>How do I sell my car?</h3>
                            <p>Simply create an account, fill out our car details form, and we'll help you list your vehicle to thousands of potential buyers.</p>
                        </div>
                        <div className="faq-item">
                            <h3>Is there a fee to list my car?</h3>
                            <p>Basic listings are free. We only charge a small commission when your car is successfully sold through our platform.</p>
                        </div>
                        <div className="faq-item">
                            <h3>How do I know if a car is reliable?</h3>
                            <p>All cars on our platform undergo verification. We provide detailed history reports and encourage professional inspections.</p>
                        </div>
                        <div className="faq-item">
                            <h3>What payment methods do you accept?</h3>
                            <p>We support bank transfers, credit cards, and verified financing options through our trusted partners.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;