import React, { useState } from "react";
import { ContactIcon, LocationIcon } from "./Icons";

const User = ({ name }) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const role = "Software Engineer";
  const location = "Chennai, India";
  const email = "thowfik.softdev@gmail.com";
  const initials = "TJ";

  return (
    <div className="user-card">
      <div className="user-card-banner" />

      <div className="user-card-body">
        <div>{count}</div>
        <div>{count2}</div>
        <div className="user-avatar">{initials}</div>
        <h2 className="user-name">{name}</h2>
        <p className="user-role">{role}</p>
        <div className="user-meta">
          <span className="user-meta-row">
            <LocationIcon />
            {location}
          </span>
          <a className="user-meta-row user-link" href={`mailto:${email}`}>
            <ContactIcon />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default User;
