import React, { useState } from "react";
import {
  AboutIcon,
  CartIcon,
  ContactIcon,
  GroceryIcon,
  HomeIcon,
} from "./Icons";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { Grocery } from "../utils/lazyRoutes";

const Header = () => {
  const [loginButton, setLoginButton] = useState("Login");

  // Start downloading the Grocery chunk the moment the pointer touches the
  // link. By the time the click lands it is usually already cached, so the
  // Suspense fallback never gets a chance to appear.
  // onFocus covers keyboard users, who never fire a mouseenter.
  const preloadGrocery = () => Grocery.preload();
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
            <Link
              className="nav-link"
              to="/grocery"
              onMouseEnter={preloadGrocery}
              onFocus={preloadGrocery}
            >
              <GroceryIcon />
              Grocery
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
