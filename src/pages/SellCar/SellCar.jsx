import React, { useState } from 'react';
import './SellCar.css';

const SellCar = () => {
    const [carDetails, setCarDetails] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        description: '',
        fuelType: '',
        transmission: '',
        color: '',
        condition: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({
            ...carDetails,
            [name]: value,
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
        
        if (!carDetails.make.trim()) newErrors.make = 'Make is required';
        if (!carDetails.model.trim()) newErrors.model = 'Model is required';
        if (!carDetails.year || carDetails.year < 1980 || carDetails.year > new Date().getFullYear() + 1) {
            newErrors.year = 'Please enter a valid year';
        }
        if (!carDetails.price || carDetails.price <= 0) newErrors.price = 'Please enter a valid price';
        if (!carDetails.mileage || carDetails.mileage < 0) newErrors.mileage = 'Please enter valid mileage';
        if (!carDetails.description.trim()) newErrors.description = 'Description is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            // Add API call to submit car details
            console.log('Car details submitted:', carDetails);
            // You can add success message or redirect here
            alert('Car details submitted successfully!');
        } catch (error) {
            console.error('Error submitting car details:', error);
            alert('Error submitting car details. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="sell-car">
            <div className="sell-car-container">
                <div className="sell-car-header">
                    <h1 className="sell-car-title">Sell Your Car</h1>
                    <p className="sell-car-subtitle">Fill in the details below to list your car for sale</p>
                </div>

                <form onSubmit={handleSubmit} className="sell-car-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="make">Make *</label>
                            <input
                                type="text"
                                id="make"
                                name="make"
                                value={carDetails.make}
                                onChange={handleChange}
                                placeholder="e.g., Toyota, Honda, BMW"
                                className={errors.make ? 'error' : ''}
                            />
                            {errors.make && <span className="error-message">{errors.make}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model *</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={carDetails.model}
                                onChange={handleChange}
                                placeholder="e.g., Camry, Civic, X3"
                                className={errors.model ? 'error' : ''}
                            />
                            {errors.model && <span className="error-message">{errors.model}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Year *</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={carDetails.year}
                                onChange={handleChange}
                                placeholder="e.g., 2020"
                                min="1980"
                                max={new Date().getFullYear() + 1}
                                className={errors.year ? 'error' : ''}
                            />
                            {errors.year && <span className="error-message">{errors.year}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price (PHP) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={carDetails.price}
                                onChange={handleChange}
                                placeholder="e.g., 500000"
                                min="0"
                                className={errors.price ? 'error' : ''}
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="mileage">Mileage (km) *</label>
                            <input
                                type="number"
                                id="mileage"
                                name="mileage"
                                value={carDetails.mileage}
                                onChange={handleChange}
                                placeholder="e.g., 50000"
                                min="0"
                                className={errors.mileage ? 'error' : ''}
                            />
                            {errors.mileage && <span className="error-message">{errors.mileage}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="fuelType">Fuel Type</label>
                            <select
                                id="fuelType"
                                name="fuelType"
                                value={carDetails.fuelType}
                                onChange={handleChange}
                            >
                                <option value="">Select fuel type</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="transmission">Transmission</label>
                            <select
                                id="transmission"
                                name="transmission"
                                value={carDetails.transmission}
                                onChange={handleChange}
                            >
                                <option value="">Select transmission</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                                <option value="CVT">CVT</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={carDetails.color}
                                onChange={handleChange}
                                placeholder="e.g., White, Black, Silver"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="condition">Condition</label>
                            <select
                                id="condition"
                                name="condition"
                                value={carDetails.condition}
                                onChange={handleChange}
                            >
                                <option value="">Select condition</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={carDetails.description}
                            onChange={handleChange}
                            placeholder="Provide detailed information about your car, including features, maintenance history, any issues, etc."
                            rows="5"
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Car Details'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellCar;