import React, { Component } from "react";
import { ContactIcon, LocationIcon } from "./Icons";

class UserClass extends Component {
  constructor(props) {
    super(props);

    this.state = { count: 0 };
    console.log(`${this.props.name} Child Constructor`);
  }

  componentDidMount() {
    console.log(`${this.props.name} Child Mounted`);
  }

  render() {
    const { name } = this.props;
    const { count } = this.state;
    console.log(`${name} Child Rendered`);
    return (
      <div className="user-card">
        <div className="user-card-banner" />

        <div className="user-card-body">
          <div className="user-avatar">TJ</div>

          <h1>Count: {count}</h1>
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

          <button
            onClick={() => {
              this.setState({ count: count + 1 });
            }}
          >
            Count Increase
          </button>
        </div>
      </div>
    );
  }
}

export default UserClass;
