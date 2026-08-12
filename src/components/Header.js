import React, { useState } from "react";
import { AboutIcon, CartIcon, ContactIcon, HomeIcon } from "./Icons";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [loginButton, setLoginButton] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link className="nav-link" to="/">
              <HomeIcon />
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              <AboutIcon />
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/contact">
              <ContactIcon />
              Contact
            </Link>
          </li>
          <li>
            <Link className="nav-link nav-cart" to="/cart">
              <CartIcon />
              Cart
            </Link>
          </li>
          <li>
            <button
              className="login-btn"
              onClick={() =>
                setLoginButton(loginButton === "Login" ? "Logout" : "Login")
              }
            >
              {loginButton}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
