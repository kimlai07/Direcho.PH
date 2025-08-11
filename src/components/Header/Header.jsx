import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/direcho_black.svg';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Direcho.ph" className="logo-image" />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/cars"
              className={location.pathname === '/cars' ? 'active' : ''}
            >
              Browse Cars
            </Link>
          </li>
          <li>
            <Link 
              to="/sell"
              className={location.pathname === '/sell' ? 'active' : ''}
            >
              Sell Car
            </Link>
          </li>
          <li>
            <Link 
              to="/calculate"
              className={location.pathname === '/calculate' ? 'active' : ''}
            >
              Calculate
            </Link>
          </li>
          {/* <li>
            <Link 
              to="/profile"
              className={location.pathname === '/profile' ? 'active' : ''}
            >
              Profile
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;