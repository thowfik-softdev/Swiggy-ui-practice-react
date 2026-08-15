import React from "react";

/**
 * The "why order with us" band that closes a page.
 * Content comes in as a prop, so one component serves every page.
 */
const PerksStrip = ({ perks }) => {
  if (!perks?.length) return null;

  return (
    <section className="mt-11 grid grid-cols-1 gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-2 md:p-7 lg:grid-cols-4">
      {perks.map((perk) => (
        <div key={perk.id}>
          <span className="mb-2.5 block text-[26px]">{perk.icon}</span>
          <h4 className="mb-1 text-[14.5px] font-bold">{perk.title}</h4>
          <p className="text-[12.5px] leading-relaxed text-ink-500">
            {perk.text}
          </p>
        </div>
      ))}
    </section>
  );
};

export default PerksStrip;
