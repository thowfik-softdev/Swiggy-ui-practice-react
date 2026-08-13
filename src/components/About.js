import React, { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends Component {
  constructor(props) {
    super(props);
    // console.log("Parent Component Constructor");
  }

  componentDidMount() {
    // console.log("Parent Component Mounted");
  }
  render() {
    // console.log("Parent Component Rendered");
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
          <UserClass />
        </div>
      </div>
    );
  }
}

export default About;
