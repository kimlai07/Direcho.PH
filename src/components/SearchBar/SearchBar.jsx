import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [activeTab, setActiveTab] = useState('buy');
    const [searchTerm, setSearchTerm] = useState('');
    const [budget, setBudget] = useState('');
    const [city, setCity] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch({ searchTerm, budget, city, type: activeTab });
    };

    return (
        <div className="search-bar">
            <div className="search-tabs">
                <button 
                    className={`tab ${activeTab === 'buy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('buy')}
                >
                    🚗 Buy Car
                </button>
                <button 
                    className={`tab ${activeTab === 'sell' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sell')}
                >
                    💰 Sell Car
                </button>
            </div>
            
            {activeTab === 'buy' ? (
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-inputs">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search by brand, model or budget"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                                <option value="">Select Budget</option>
                                <option value="0-500000">Under ₱500,000</option>
                                <option value="500000-1000000">₱500,000 - ₱1,000,000</option>
                                <option value="1000000-2000000">₱1,000,000 - ₱2,000,000</option>
                                <option value="2000000+">Above ₱2,000,000</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="search-button">
                        Search Cars
                    </button>
                </form>
            ) : (
                <div className="sell-form">
                    <div className="sell-content">
                        <h3>Get Best Price for Your Car</h3>
                        <p>Enter your car details and get instant quote in Philippine Peso</p>
                        <button className="sell-button">Get Quote Now</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;