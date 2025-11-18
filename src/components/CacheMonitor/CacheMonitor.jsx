import React, { useState, useEffect } from 'react';
import { getCacheStats, clearCache, clearCacheKey } from '../../services/api';
import './CacheMonitor.css';

/**
 * CacheMonitor Component
 * Developer tool to monitor and manage cache
 * Can be added to any page during development or testing
 */
const CacheMonitor = () => {
  const [stats, setStats] = useState({ total: 0, valid: 0, expired: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const updateStats = () => {
    const currentStats = getCacheStats();
    setStats(currentStats);
  };

  useEffect(() => {
    updateStats();
    
    // Update stats every 5 seconds
    const interval = setInterval(updateStats, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClearAll = () => {
    clearCache();
    updateStats();
    alert('All cache cleared!');
  };

  const handleClearVehicles = () => {
    clearCacheKey('all_vehicles');
    clearCacheKey('new_vehicles');
    updateStats();
    alert('Vehicle cache cleared!');
  };

  const handleClearProfile = () => {
    clearCacheKey('user_profile');
    clearCacheKey('user_cars');
    updateStats();
    alert('Profile cache cleared!');
  };

  if (!isExpanded) {
    return (
      <div className="cache-monitor collapsed">
        <button 
          onClick={() => setIsExpanded(true)}
          className="cache-monitor-toggle"
          title="Open Cache Monitor"
        >
          📊 Cache: {stats.valid}
        </button>
      </div>
    );
  }

  return (
    <div className="cache-monitor expanded">
      <div className="cache-monitor-header">
        <h3>🔍 Cache Monitor</h3>
        <button 
          onClick={() => setIsExpanded(false)}
          className="cache-monitor-close"
        >
          ×
        </button>
      </div>
      
      <div className="cache-stats">
        <div className="stat-item">
          <span className="stat-label">Total Entries:</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Valid:</span>
          <span className="stat-value valid">{stats.valid}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expired:</span>
          <span className="stat-value expired">{stats.expired}</span>
        </div>
      </div>

      <div className="cache-actions">
        <button onClick={updateStats} className="btn-refresh">
          🔄 Refresh Stats
        </button>
        <button onClick={handleClearVehicles} className="btn-clear-partial">
          🚗 Clear Vehicles
        </button>
        <button onClick={handleClearProfile} className="btn-clear-partial">
          👤 Clear Profile
        </button>
        <button onClick={handleClearAll} className="btn-clear-all">
          🗑️ Clear All Cache
        </button>
      </div>

      <div className="cache-info">
        <p>💡 Cache reduces database reads by storing data temporarily</p>
        <p>⏱️ Auto-updates every 5 seconds</p>
      </div>
    </div>
  );
};

export default CacheMonitor;
