import { useEffect, useState } from "react";

/**
 * Returns a copy of `value` that only catches up after `delay` ms
 * have passed without `value` changing.
 *
 * Every change restarts the timer, so while the user is still typing
 * the returned value stays put. It only updates once they pause.
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    // Cleanup. React runs this BEFORE the next run of the effect, and again
    // when the component unmounts. That is what cancels the previous timer,
    // and it is the whole trick behind debouncing.
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};
