import React from 'react';

const FilterPanel = ({ filters, onFilterChange }) => {
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        onFilterChange(name, value);
    };

    return (
        <div className="filter-panel">
            <h3>Filter Cars</h3>
            <div className="filter-group">
                <label htmlFor="make">Make:</label>
                <select name="make" id="make" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.makes.map((make) => (
                        <option key={make} value={make}>{make}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="model">Model:</label>
                <select name="model" id="model" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filters.models.map((model) => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="price">Price Range:</label>
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    onChange={handleFilterChange}
                />
            </div>
            <div className="filter-group">
                <label htmlFor="year">Year:</label>
                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    onChange={handleFilterChange}
                />
            </div>
            <button onClick={() => onFilterChange('apply')}>Apply Filters</button>
        </div>
    );
};

export default FilterPanel;