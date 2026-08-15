import React from "react";
import { ContactIcon, LocationIcon } from "./Icons";

const User = ({ name }) => {
  const role = "Software Engineer";
  const location = "Chennai, India";
  const email = "thowfik.softdev@gmail.com";
  const initials = "TJ";

  return (
    <div className="lift w-full max-w-[340px] overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition duration-[280ms] ease-smooth hover:-translate-y-1 hover:shadow-lg">
      {/* the brand strip the avatar overlaps */}
      <div className="h-[84px] bg-gradient-to-br from-brand to-brand-dark" />

      <div className="flex flex-col items-center px-6 pb-[26px] text-center">
        <div className="-mt-[38px] mb-3.5 flex h-[76px] w-[76px] select-none items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-ink-900 text-[26px] font-bold tracking-wide text-surface shadow-sm">
          {initials}
        </div>

        <h2 className="text-xl font-bold tracking-tight">{name}</h2>
        <p className="mt-[3px] text-[13.5px] font-semibold text-brand">{role}</p>

        <div className="mt-[18px] flex w-full flex-col gap-2.5 border-t border-line-soft pt-[18px]">
          <span className="inline-flex items-center justify-center gap-2 text-[13.5px] text-ink-500">
            <LocationIcon className="h-4 w-4 text-ink-300" />
            {location}
          </span>
          <a
            className="group inline-flex items-center justify-center gap-2 text-[13.5px] text-ink-500 no-underline transition-colors hover:text-brand"
            href={`mailto:${email}`}
          >
            <ContactIcon className="h-4 w-4 text-ink-300 transition-colors group-hover:text-brand" />
            {email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default User;
