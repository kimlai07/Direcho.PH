import React, { useState } from 'react';
import './Calculate.css';

const Calculate = () => {
    const [calculationType, setCalculationType] = useState('loan');
    const [loanData, setLoanData] = useState({
        sellingPrice: '',
        loanPercentage: 70, // default 70%
        loanTerm: '24' // default 2 years
    });
    const [depreciationData, setDepreciationData] = useState({
        carPrice: '',
        carAge: '',
        mileage: '',
        condition: 'good'
    });
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState({});

    const handleDepreciationChange = (e) => {
        const { name, value } = e.target;
        setDepreciationData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleLoanChange = (e) => {
        const { name, value } = e.target;
        setLoanData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Update CSS custom property for slider fill
        if (name === 'loanPercentage') {
            document.documentElement.style.setProperty('--slider-value', value);
        }
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateLoanForm = () => {
        const newErrors = {};
        
        if (!loanData.sellingPrice || loanData.sellingPrice <= 0) {
            newErrors.sellingPrice = 'Please enter a valid selling price';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateDepreciationForm = () => {
        const newErrors = {};
        
        if (!depreciationData.carPrice || depreciationData.carPrice <= 0) {
            newErrors.carPrice = 'Please enter a valid original car price';
        }
        if (!depreciationData.carAge || depreciationData.carAge < 0) {
            newErrors.carAge = 'Please enter a valid car age';
        }
        if (!depreciationData.mileage || depreciationData.mileage < 0) {
            newErrors.mileage = 'Please enter valid mileage';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calculateLoan = () => {
        if (!validateLoanForm()) return;

        const sellingPrice = parseFloat(loanData.sellingPrice);
        const loanPercentage = parseFloat(loanData.loanPercentage) / 100;
        const loanTerm = parseInt(loanData.loanTerm);

        // Calculate loan amount and other fees
        const loanAmount = sellingPrice * loanPercentage;
        const downPayment = sellingPrice - loanAmount;
        const chattelFee = loanAmount * 0.08; // 8% of loan amount
        const transferFee = 15000;
        const markUp = sellingPrice * 0.03; // 3% markup
        
        // All in cash out
        const allInCashOut = downPayment + chattelFee + transferFee + markUp;

        // Monthly amortization based on terms
        let monthlyAmortization = 0;
        let interestRate = 0;

        switch (loanTerm) {
            case 24: // 2 years
                interestRate = 0.312; // 31.2%
                monthlyAmortization = ((loanAmount * interestRate) + loanAmount) / 24;
                break;
            case 36: // 3 years
                interestRate = 0.468; // 46.8%
                monthlyAmortization = ((loanAmount * interestRate) + loanAmount) / 36;
                break;
            case 48: // 4 years
                interestRate = 0.624; // 62.4%
                monthlyAmortization = ((loanAmount * interestRate) + loanAmount) / 48;
                break;
            case 60: // 5 years
                interestRate = 0.75; // 75%
                monthlyAmortization = ((loanAmount * interestRate) + loanAmount) / 60;
                break;
            default:
                interestRate = 0.468;
                monthlyAmortization = ((loanAmount * interestRate) + loanAmount) / 36;
        }

        setResults({
            type: 'loan',
            sellingPrice: sellingPrice.toFixed(2),
            loanAmount: loanAmount.toFixed(2),
            downPayment: downPayment.toFixed(2),
            chattelFee: chattelFee.toFixed(2),
            transferFee: transferFee.toFixed(2),
            markUp: markUp.toFixed(2),
            allInCashOut: allInCashOut.toFixed(2),
            monthlyAmortization: monthlyAmortization.toFixed(2),
            loanPercentage: loanData.loanPercentage,
            termYears: loanTerm / 12
        });
    };

    const calculateDepreciation = () => {
        if (!validateDepreciationForm()) return;

        const originalPrice = parseFloat(depreciationData.carPrice);
        const age = parseFloat(depreciationData.carAge);
        const mileage = parseFloat(depreciationData.mileage);
        
        let depreciationRate = 0.15;
        
        const conditionMultiplier = {
            'excellent': 0.9,
            'good': 1.0,
            'fair': 1.2,
            'poor': 1.5
        };
        
        depreciationRate *= conditionMultiplier[depreciationData.condition];
        
        const averageKmPerYear = mileage / Math.max(age, 1);
        if (averageKmPerYear > 15000) {
            depreciationRate += 0.05;
        }
        
        const currentValue = originalPrice * Math.pow(1 - depreciationRate, age);
        const totalDepreciation = originalPrice - currentValue;
        const depreciationPercentage = (totalDepreciation / originalPrice) * 100;

        setResults({
            type: 'depreciation',
            currentValue: Math.max(currentValue, originalPrice * 0.1).toFixed(2),
            totalDepreciation: totalDepreciation.toFixed(2),
            depreciationPercentage: depreciationPercentage.toFixed(1),
            originalPrice: originalPrice.toFixed(2)
        });
    };

    const handleCalculate = () => {
        if (calculationType === 'loan') {
            calculateLoan();
        } else {
            calculateDepreciation();
        }
    };

    return (
        <div className="calculate">
            <div className="calculate-container">
                <div className="calculate-header">
                    <h1 className="calculate-title">Car Calculator</h1>
                    <p className="calculate-subtitle">
                        Calculate loan payments or estimate your car's current value
                    </p>
                </div>

                <div className="calculator-tabs">
                    <button 
                        className={`tab-button ${calculationType === 'loan' ? 'active' : ''}`}
                        onClick={() => {
                            setCalculationType('loan');
                            setResults(null);
                            setErrors({});
                        }}
                    >
                        💰 Loan Calculator
                    </button>
                    <button 
                        className={`tab-button ${calculationType === 'depreciation' ? 'active' : ''}`}
                        onClick={() => {
                            setCalculationType('depreciation');
                            setResults(null);
                            setErrors({});
                        }}
                    >
                        📈 Value Calculator
                    </button>
                </div>

                <div className="calculator-content">
                    {calculationType === 'loan' ? (
                        <div className="loan-calculator">
                            <h2>Auto Loan Calculator</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} className="calculator-form">
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label htmlFor="sellingPrice">Selling Price (PHP) *</label>
                                        <input
                                            type="number"
                                            id="sellingPrice"
                                            name="sellingPrice"
                                            value={loanData.sellingPrice}
                                            onChange={handleLoanChange}
                                            placeholder="e.g., 800000"
                                            className={errors.sellingPrice ? 'error' : ''}
                                        />
                                        {errors.sellingPrice && <span className="error-message">{errors.sellingPrice}</span>}
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="loanPercentage">
                                            <span>Loan Percentage</span>
                                            <span className="percentage-value">{loanData.loanPercentage}%</span>
                                        </label>
                                        <div className="slider-container">
                                            <input
                                                type="range"
                                                id="loanPercentage"
                                                name="loanPercentage"
                                                min="30"
                                                max="100"
                                                value={loanData.loanPercentage}
                                                onChange={handleLoanChange}
                                                className="loan-slider"
                                            />
                                            <div className="slider-labels">
                                                <span>30%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="loanTerm">Loan Term</label>
                                        <select
                                            id="loanTerm"
                                            name="loanTerm"
                                            value={loanData.loanTerm}
                                            onChange={handleLoanChange}
                                        >
                                            <option value="24">2 years (24 months)</option>
                                            <option value="36">3 years (36 months)</option>
                                            <option value="48">4 years (48 months)</option>
                                            <option value="60">5 years (60 months)</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="calculate-button">
                                    Calculate Loan Details
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="depreciation-calculator">
                            <h2>Car Value Calculator</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} className="calculator-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="carPrice">Original Car Price (PHP) *</label>
                                        <input
                                            type="number"
                                            id="carPrice"
                                            name="carPrice"
                                            value={depreciationData.carPrice}
                                            onChange={handleDepreciationChange}
                                            placeholder="e.g., 1000000"
                                            className={errors.carPrice ? 'error' : ''}
                                        />
                                        {errors.carPrice && <span className="error-message">{errors.carPrice}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="carAge">Car Age (Years) *</label>
                                        <input
                                            type="number"
                                            id="carAge"
                                            name="carAge"
                                            value={depreciationData.carAge}
                                            onChange={handleDepreciationChange}
                                            placeholder="e.g., 3"
                                            className={errors.carAge ? 'error' : ''}
                                        />
                                        {errors.carAge && <span className="error-message">{errors.carAge}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="mileage">Mileage (km) *</label>
                                        <input
                                            type="number"
                                            id="mileage"
                                            name="mileage"
                                            value={depreciationData.mileage}
                                            onChange={handleDepreciationChange}
                                            placeholder="e.g., 45000"
                                            className={errors.mileage ? 'error' : ''}
                                        />
                                        {errors.mileage && <span className="error-message">{errors.mileage}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="condition">Car Condition</label>
                                        <select
                                            id="condition"
                                            name="condition"
                                            value={depreciationData.condition}
                                            onChange={handleDepreciationChange}
                                        >
                                            <option value="excellent">Excellent</option>
                                            <option value="good">Good</option>
                                            <option value="fair">Fair</option>
                                            <option value="poor">Poor</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="calculate-button">
                                    Calculate Current Value
                                </button>
                            </form>
                        </div>
                    )}

                    {results && (
                        <div className="results-section">
                            <h2>Calculation Results</h2>
                            {results.type === 'loan' ? (
                                <div className="loan-results">
                                    <div className="result-summary">
                                        <div className="summary-card primary">
                                            <h3>All In Cash Out</h3>
                                            <p className="amount large">₱{parseFloat(results.allInCashOut).toLocaleString()}</p>
                                        </div>
                                        <div className="summary-card secondary">
                                            <h3>Monthly Amortization</h3>
                                            <p className="amount large">₱{parseFloat(results.monthlyAmortization).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="breakdown">
                                        <h3>Breakdown Details</h3>
                                        <div className="breakdown-grid">
                                            <div className="breakdown-item">
                                                <span className="label">Selling Price:</span>
                                                <span className="value">₱{parseFloat(results.sellingPrice).toLocaleString()}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Loan Amount ({results.loanPercentage}%):</span>
                                                <span className="value">₱{parseFloat(results.loanAmount).toLocaleString()}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Down Payment:</span>
                                                <span className="value">₱{parseFloat(results.downPayment).toLocaleString()}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Chattel Fee (8%):</span>
                                                <span className="value">₱{parseFloat(results.chattelFee).toLocaleString()}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Transfer Fee:</span>
                                                <span className="value">₱{parseFloat(results.transferFee).toLocaleString()}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Mark Up (3%):</span>
                                                <span className="value">₱{parseFloat(results.markUp).toLocaleString()}</span>
                                            </div>
                                            <div className="breakdown-item">
                                                <span className="label">Term:</span>
                                                <span className="value">{results.termYears} years</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="depreciation-results">
                                    <div className="result-card primary">
                                        <h3>Estimated Current Value</h3>
                                        <p className="amount">₱{parseFloat(results.currentValue).toLocaleString()}</p>
                                    </div>
                                    <div className="result-card">
                                        <h3>Total Depreciation</h3>
                                        <p className="amount">₱{parseFloat(results.totalDepreciation).toLocaleString()}</p>
                                    </div>
                                    <div className="result-card">
                                        <h3>Depreciation %</h3>
                                        <p className="amount">{results.depreciationPercentage}%</p>
                                    </div>
                                    <div className="result-card">
                                        <h3>Original Price</h3>
                                        <p className="amount">₱{parseFloat(results.originalPrice).toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculate;