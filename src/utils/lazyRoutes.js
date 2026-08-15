import { lazyWithPreload } from "./lazyWithPreload";

/**
 * Every code-split route lives here, in ONE place.
 *
 * App.js needs them to render. Header.js needs them to preload on hover.
 * If each file called lazy() itself they would be two different components
 * wrapping two different promises, and hovering would warm a chunk that the
 * router then ignored.
 */
export const Grocery = lazyWithPreload(() => import("../components/Grocery"));

export const RestaurantMenu = lazyWithPreload(
  () => import("../components/RestaurantMenu"),
);
