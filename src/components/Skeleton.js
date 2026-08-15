import React from "react";

// Numbers are treated as pixels, strings are passed straight through,
// so callers can use either <Skeleton width={120} /> or <Skeleton width="70%" />
const toSize = (value) => (typeof value === "number" ? `${value}px` : value);

/**
 * A single shimmering placeholder block.
 * Every dimension comes from the caller - this component decides nothing.
 */
const Skeleton = ({ width = "100%", height = 16, radius = 8, circle = false }) => (
  <span
    className="skeleton"
    style={{
      width: toSize(width),
      height: toSize(height),
      borderRadius: circle ? "50%" : toSize(radius),
    }}
  />
);

export default Skeleton;

/**
 * Whole-page placeholder for the restaurant menu route.
 *
 * Lives here rather than inside RestaurantMenu.js so App.js can use it as the
 * Suspense fallback WITHOUT importing RestaurantMenu - which would pull the
 * lazy chunk back into the main bundle and undo the code splitting entirely.
 */
export const MenuSkeleton = () => (
  <div className="menu-page">
    <Skeleton width={220} height={14} />
    <Skeleton width={280} height={34} radius={10} />
    <Skeleton width="100%" height={260} radius={20} />
    <div className="menu-meta-skeleton">
      <Skeleton width={150} height={18} />
      <Skeleton width={120} height={18} />
    </div>
    <Skeleton width={180} height={22} />
    {[0, 1, 2].map((i) => (
      <div className="menu-item" key={i}>
        <div className="menu-item-text">
          <Skeleton width="60%" height={17} />
          <Skeleton width={70} height={14} />
          <Skeleton width="90%" height={13} />
        </div>
        <Skeleton width={130} height={110} radius={14} />
      </div>
    ))}
  </div>
);

/**
 * Whole-page placeholder for the grocery route.
 *
 * A code-split route needs a fallback that holds the same shape as the real
 * page, otherwise the layout jumps the moment the chunk lands. A bare
 * "Loading..." is worse than nothing - it shifts everything below it.
 */
export const GrocerySkeleton = () => (
  <div className="grocery-page">
    <Skeleton width={110} height={22} radius={999} />
    <div style={{ height: 14 }} />
    <Skeleton width={420} height={38} radius={10} />
    <div style={{ height: 12 }} />
    <Skeleton width="60%" height={16} />
    <div style={{ height: 24 }} />
    <Skeleton width={620} height={54} radius={14} />

    <div className="grocery-chips" style={{ marginTop: 30 }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} width={118} height={40} radius={999} />
      ))}
    </div>

    <div className="grocery-banners">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} width="100%" height={190} radius={20} />
      ))}
    </div>

    {Array.from({ length: 2 }).map((_, section) => (
      <div className="grocery-section" key={section}>
        <div className="grocery-section-head">
          <Skeleton width={220} height={24} />
          <Skeleton width={70} height={22} radius={999} />
        </div>
        <div className="grocery-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width="100%" height={250} radius={14} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * A placeholder shaped like a RestaurantCard.
 * It is built entirely out of <Skeleton /> blocks, and the image height is
 * passed in so it can be kept in sync with the real card.
 */
export const RestaurantCardSkeleton = ({ imageHeight = 168 }) => (
  <div className="res-card skeleton-card">
    <Skeleton width="100%" height={imageHeight} radius={0} />

    <div className="res-card-info">
      <Skeleton width="72%" height={17} />

      <div className="res-meta">
        <Skeleton width={46} height={20} radius={6} />
        <Skeleton width={4} height={4} circle />
        <Skeleton width={72} height={14} />
      </div>

      <Skeleton width="88%" height={13} />

      <div className="res-footer">
        <Skeleton width={90} height={12} />
        <Skeleton width={70} height={12} />
      </div>
    </div>
  </div>
);
