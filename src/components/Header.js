import React, { useState } from "react";
import { AboutIcon, CartIcon, ContactIcon, HomeIcon } from "./Icons";
import { LOGO_URL } from "../utils/constants";

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
            <HomeIcon />
            Home
          </li>
          <li>
            <AboutIcon />
            About
          </li>
          <li>
            <ContactIcon />
            Contact
          </li>
          <li className="nav-cart">
            <CartIcon />
            Cart
          </li>
          <li className="nav-cart">
            <button
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
