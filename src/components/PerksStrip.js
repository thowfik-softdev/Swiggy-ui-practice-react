import React from "react";

/**
 * The "why order with us" band that closes a page.
 *
 * Takes its content as a prop so the same component serves the food page and
 * the grocery page with different copy.
 */
const PerksStrip = ({ perks }) => {
  if (!perks?.length) return null;

  return (
    <section className="perks-strip">
      {perks.map((perk) => (
        <div className="perk" key={perk.id}>
          <span className="perk-icon">{perk.icon}</span>
          <h4>{perk.title}</h4>
          <p>{perk.text}</p>
        </div>
      ))}
    </section>
  );
};

export default PerksStrip;
