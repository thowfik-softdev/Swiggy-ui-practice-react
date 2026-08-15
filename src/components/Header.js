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

// One shared pill shape for both <Link> and <button>, so a link and a button
// sit at exactly the same height. Written once here rather than repeated on
// every nav item.
const pill =
  "inline-flex items-center gap-2 h-10 px-3 md:px-4 rounded-full border border-transparent " +
  "text-[14.5px] font-medium leading-none whitespace-nowrap cursor-pointer select-none " +
  "no-underline transition-colors duration-200 ease-smooth";

const navLink = `${pill} text-ink-700 hover:text-brand hover:bg-brand-soft [&_svg]:text-ink-300 hover:[&_svg]:text-brand`;

const Header = () => {
  const [loginButton, setLoginButton] = useState("Login");

  // Start downloading the Grocery chunk the moment the pointer touches the
  // link, so it is usually cached before the click lands.
  const preloadGrocery = () => Grocery.preload();

  return (
    <div className="sticky top-0 z-20 flex h-16 md:h-[76px] items-center justify-between border-b border-line bg-surface px-3 md:px-6 lg:px-10 shadow-xs">
      <div className="flex items-center">
        <img
          className="h-10 w-10 md:h-12 md:w-12 rounded-md object-cover shadow-sm transition-transform duration-[250ms] ease-smooth hover:scale-105 hover:-rotate-2"
          src={LOGO_URL}
          alt="logo"
        />
      </div>

      <nav>
        <ul className="flex items-center gap-0 sm:gap-1">
          <li>
            <Link className={navLink} to="/">
              <HomeIcon />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link className={navLink} to="/about">
              <AboutIcon />
              <span className="hidden lg:inline">About</span>
            </Link>
          </li>
          <li>
            <Link
              className={navLink}
              to="/grocery"
              onMouseEnter={preloadGrocery}
              onFocus={preloadGrocery}
            >
              <GroceryIcon />
              <span className="hidden lg:inline">Grocery</span>
            </Link>
          </li>
          <li>
            <Link className={navLink} to="/contact">
              <ContactIcon />
              <span className="hidden lg:inline">Contact</span>
            </Link>
          </li>
          <li>
            <Link
              className={`${pill} ml-1 md:ml-2 bg-ink-900 font-semibold text-surface hover:bg-brand [&_svg]:text-white/75 hover:[&_svg]:text-surface`}
              to="/cart"
            >
              <CartIcon />
              <span className="hidden lg:inline">Cart</span>
            </Link>
          </li>
          <li>
            <button
              className={`${pill} border-line font-semibold text-ink-700 hover:border-brand hover:bg-brand-soft hover:text-brand active:scale-[0.97]`}
              onClick={() =>
                setLoginButton(loginButton === "Login" ? "Logout" : "Login")
              }
            >
              {loginButton}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
