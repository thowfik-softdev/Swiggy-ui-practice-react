import React from "react";
import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div className="page">
      <header className="page-head">
        <span className="page-eyebrow">Who built this</span>
        <h1 className="page-title">About</h1>
        <p className="page-subtitle">
          This is Thowfik Juhair, Software Engineer.
        </p>
      </header>

      <div className="about-layout">
        <User name="Thowfik Juhair (Function)" />
        <UserClass name="Thowfik Juhair (Class)" />
      </div>
    </div>
  );
};

export default About;
