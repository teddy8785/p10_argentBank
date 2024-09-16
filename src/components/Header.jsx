import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/userSlice';
import '../styles/Header.css';
import logo from '../assets/argentBankLogo.png';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

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
          {user ? (
            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-user-circle"></i>
              Sign Out
            </NavLink>
          ) : (
            <NavLink className="main-nav-item" to="/signIn">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;