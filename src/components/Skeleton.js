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
