import { lazy } from "react";

/**
 * React.lazy, plus a .preload() we can call ourselves.
 *
 * React.lazy only starts the download when the component is first RENDERED -
 * which is the moment the user has already clicked and is staring at the
 * Suspense fallback. If we kick the same import off on hover instead, the
 * chunk is usually already in the cache by the time they click, and the
 * fallback never appears at all.
 *
 * The import() promise is cached by the browser and by the bundler runtime,
 * so calling preload() ten times still only downloads the chunk once, and
 * React.lazy reuses that very same promise when it eventually renders.
 */
export const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};
