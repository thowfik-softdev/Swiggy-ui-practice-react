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
    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    // console.log("Child Component Updated");
  }

  componentWillUnmount() {
    // console.log("Child Component Unmounted");
  }

  render() {
    const { login, avatar_url } = this.state.userInfo;
    const { name } = this.props;

    return (
      <div className="lift w-full max-w-[340px] overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition duration-[280ms] ease-smooth hover:-translate-y-1 hover:shadow-lg">
        <div className="h-[84px] bg-gradient-to-br from-brand to-brand-dark" />

        <div className="flex flex-col items-center px-6 pb-[26px] text-center">
          {/* avatar_url is empty until componentDidMount resolves, so fall
              back to the initials rather than rendering a broken image */}
          <div className="-mt-[38px] mb-3.5 flex h-[76px] w-[76px] select-none items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-ink-900 text-[26px] font-bold tracking-wide text-surface shadow-sm">
            {avatar_url ? (
              <img
                className="block h-full w-full object-cover"
                src={avatar_url}
                alt={login}
              />
            ) : (
              "TJ"
            )}
          </div>

          <h2 className="text-xl font-bold tracking-tight">
            {name ?? login ?? "Loading…"}
          </h2>
          <p className="mt-[3px] text-[13.5px] font-semibold text-brand">
            Software Engineer
          </p>

          <div className="mt-[18px] flex w-full flex-col gap-2.5 border-t border-line-soft pt-[18px]">
            <span className="inline-flex items-center justify-center gap-2 text-[13.5px] text-ink-500">
              <LocationIcon className="h-4 w-4 text-ink-300" />
              Chennai, India
            </span>
            <a
              className="group inline-flex items-center justify-center gap-2 text-[13.5px] text-ink-500 no-underline transition-colors hover:text-brand"
              href="mailto:thowfik.softdev@gmail.com"
            >
              <ContactIcon className="h-4 w-4 text-ink-300 transition-colors group-hover:text-brand" />
              thowfik.softdev@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserClass;
