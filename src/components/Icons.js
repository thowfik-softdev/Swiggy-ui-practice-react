import React from "react";

/* Inline icons - keeps the app dependency free */
const Icon = ({ children }) => (
  <svg
    className="icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export default Icon;

export const HomeIcon = () => (
  <Icon>
    <path d="M3 10.2 12 3l9 7.2" />
    <path d="M5.6 9.3V20h12.8V9.3" />
  </Icon>
);

export const AboutIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4.5" />
    <path d="M12 8.2h.01" />
  </Icon>
);

export const ContactIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.8 6.8 8.2 6 8.2-6" />
  </Icon>
);

export const CartIcon = () => (
  <Icon>
    <path d="M2.8 3.6h2.4l2.2 10.8h10.4l1.8-7.7H6.2" />
    <circle cx="9.5" cy="19.4" r="1.4" />
    <circle cx="17.5" cy="19.4" r="1.4" />
  </Icon>
);

export const SearchIcon = () => (
  <Icon>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.6-3.6" />
  </Icon>
);

export const ClockIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.2 1.9" />
  </Icon>
);

export const CloseIcon = () => (
  <Icon>
    <path d="m6.5 6.5 11 11" />
    <path d="m17.5 6.5-11 11" />
  </Icon>
);
