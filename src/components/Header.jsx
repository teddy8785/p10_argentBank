import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/argentBankLogo.png';

function Header() {
  return (
    <header>
        <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </NavLink>
      <div>
        <NavLink className="main-nav-item" to="/signIn">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    </nav>
    </header>
  );
}

export default Header;
