import React from "react";
import { pageShell } from "../utils/styles";

// Numbers are treated as pixels, strings pass straight through, so callers can
// use either <Skeleton width={120} /> or <Skeleton width="70%" />
const toSize = (value) => (typeof value === "number" ? `${value}px` : value);

/**
 * A single shimmering placeholder block.
 *
 * The `.skeleton` class is one of only two things left in the stylesheet -
 * an animated background-position over a gradient is the one thing utilities
 * genuinely cannot express. Everything else is passed in as inline size.
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
 * Lives here rather than in RestaurantMenu.js so App.js can use it as the
 * Suspense fallback WITHOUT importing RestaurantMenu - which would pull the
 * lazy chunk back into the main bundle and undo the code splitting.
 */
export const MenuSkeleton = () => (
  <div className={`${pageShell} flex flex-col gap-3.5`}>
    <Skeleton width={220} height={14} />
    <Skeleton width={280} height={34} radius={10} />
    <Skeleton width="100%" height={260} radius={20} />
    <div className="flex gap-3.5">
      <Skeleton width={150} height={18} />
      <Skeleton width={120} height={18} />
    </div>
    <Skeleton width={180} height={22} />
    {[0, 1, 2].map((i) => (
      <div
        className="flex items-start justify-between gap-6 border-t border-line-soft py-5"
        key={i}
      >
        <div className="min-w-0 flex-1 space-y-2">
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
 * Whole-page placeholder for the grocery route. A code-split route needs a
 * fallback that holds the same shape as the real page, or the layout jumps the
 * moment the chunk lands.
 */
export const GrocerySkeleton = () => (
  <div className={pageShell}>
    <Skeleton width={110} height={22} radius={999} />
    <div className="h-3.5" />
    <Skeleton width={420} height={38} radius={10} />
    <div className="h-3" />
    <Skeleton width="60%" height={16} />
    <div className="h-6" />
    <Skeleton width={620} height={54} radius={14} />

    <div className="mt-7 flex gap-2.5 overflow-hidden pb-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} width={118} height={40} radius={999} />
      ))}
    </div>

    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} width="100%" height={190} radius={20} />
      ))}
    </div>

    {Array.from({ length: 2 }).map((_, section) => (
      <div className="mb-11" key={section}>
        <div className="mb-5 flex items-end justify-between border-b border-line pb-3.5">
          <Skeleton width={220} height={24} />
          <Skeleton width={70} height={22} radius={999} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-4">
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
 */
export const RestaurantCardSkeleton = ({ imageHeight = 152 }) => (
  <div className="flex flex-col overflow-hidden rounded-md border border-line bg-surface shadow-xs">
    <Skeleton width="100%" height={imageHeight} radius={0} />

    <div className="flex flex-col gap-3 px-3.5 pb-4 pt-3">
      <Skeleton width="72%" height={17} />

      <div className="flex items-center gap-2.5">
        <Skeleton width={46} height={20} radius={6} />
        <Skeleton width={4} height={4} circle />
        <Skeleton width={72} height={14} />
      </div>

      <Skeleton width="88%" height={13} />

      <div className="flex items-center justify-between gap-2.5 border-t border-line-soft pt-3">
        <Skeleton width={90} height={12} />
        <Skeleton width={70} height={12} />
      </div>
    </div>
  </div>
);
