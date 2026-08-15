import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="mx-auto flex w-full max-w-shell flex-col items-center px-4 pb-24 pt-20 text-center md:px-10">
      <span className="mb-4 text-[44px]">🧭</span>

      <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
        {err?.status ?? "Oops"}
        {err?.statusText ? ` — ${err.statusText}` : ""}
      </h1>

      <p className="max-w-[440px] text-[14.5px] leading-relaxed text-ink-500">
        {err?.status === 404
          ? "That page does not exist. It may have moved, or the link may be out of date."
          : "Something went wrong while loading this page."}
      </p>

      {err?.message && (
        <code className="mt-4 block max-w-[520px] break-words rounded-sm border border-line bg-line-soft px-3.5 py-2.5 font-mono text-xs text-ink-500">
          {err.message}
        </code>
      )}

      <Link
        className="mt-[22px] rounded-full bg-ink-900 px-[22px] py-[11px] text-sm font-semibold text-surface no-underline transition-colors hover:bg-brand"
        to="/"
      >
        Back to home
      </Link>
    </div>
  );
};

export default Error;
