import React, { Component } from "react";
import { ContactIcon, LocationIcon } from "./Icons";

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "",
        location: "",
        avatar_url: "",
      },
    };
    // console.log(`${this.props.name} Child Constructor`);
  }

  async componentDidMount() {
    // console.log(`${this.props.name} Child Mounted`);
    const data = await fetch("https://api.github.com/users/thowfik-softdev");
    const json = await data.json();
    console.log(json);
    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    console.log("Child Component Updated");
  }

  componentWillUnmount() {
    console.log("Child Component Unmounted");
  }

  render() {
    const { login, avatar_url } = this.state.userInfo;
    // console.log(`${name} Child Rendered`);
    return (
      <div className="user-card">
        <div className="user-card-banner" />

        <div className="user-card-body">
          {/* avatar_url is empty until componentDidMount resolves, so fall
              back to the initials rather than rendering a broken image */}
          <div className="user-avatar">
            {avatar_url ? <img src={avatar_url} alt={login} /> : "TJ"}
          </div>

          <h2 className="user-name">{login}</h2>
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
