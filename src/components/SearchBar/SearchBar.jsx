import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onClear }) => {
    const [activeTab, setActiveTab] = useState('buy');
    const [searchTerm, setSearchTerm] = useState('');
    const [budget, setBudget] = useState('');
    const [city, setCity] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch({ searchTerm, budget, city, type: activeTab });
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setBudget('');
        setCity('');
        if (onClear) {
            onClear();
        }
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
                        <button type="submit" className="search-button">
                            Search Cars
                        </button>
                        <button 
                            type="button" 
                            className="clear-button" 
                            onClick={handleClearSearch}
                        >
                            Clear
                        </button>
                    </div>
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