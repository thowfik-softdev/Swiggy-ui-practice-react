import React, { Component } from "react";
import { ContactIcon, LocationIcon } from "./Icons";

class UserClass extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return (
      <div className="user-card">
        <div className="user-card-banner" />

        <div className="user-card-body">
          <div className="user-avatar">TJ</div>

          <h2 className="user-name">{name}</h2>
          <p className="user-role">Software Engineer</p>

          <div className="user-meta">
            <span className="user-meta-row">
              <LocationIcon />
              Chennai, India
            </span>
            <a
              className="user-meta-row user-link"
              href={`mailto:thowfik.softdev@gmail.com`}
            >
              <ContactIcon />
              thowfik.softdev@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserClass;
