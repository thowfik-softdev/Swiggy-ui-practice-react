import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  // navigator.onLine is the browser's own answer, so we start with the truth
  // instead of assuming true and being wrong for anyone who loads while offline
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    // Named functions, NOT inline arrows. removeEventListener matches by
    // reference, so an identical-looking arrow in the cleanup would be a
    // different object and would remove nothing.
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // window outlives this component, so React will not clean these up for us.
    // Without this, every mount adds two more listeners that never go away.
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { onlineStatus };
};
