import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/userSlice";
import "../styles/Header.css";
import logo from "../assets/argentBankLogo.png";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const profile = useSelector((state) => state.profile.profile);

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
        <div className="main-nav-link">
          {user ? (
             <>
             <NavLink className="main-nav-item" to="/user">
               <i className="fa fa-user-circle"></i>
               {profile ? profile.userName : "user"}
             </NavLink>
             <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
               <i className="fa fa-sign-out"></i>
               Sign Out
             </NavLink>
           </>
          ) : (
            <NavLink className="main-nav-item" to="/signin">
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

