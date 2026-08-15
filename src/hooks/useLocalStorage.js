import { useState, useEffect, useRef } from "react";

/**
 * Drop-in replacement for useState that persists to the browser's
 * localStorage. This is a real standalone HTML page (not a Claude
 * artifact sandbox), so localStorage is fully available and is the
 * right tool for "survive a refresh/crash, per-user, per-machine"
 * persistence.
 *
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(`Failed to read localStorage key "${key}":`, err);
      return initialValue;
    }
  });

  // Avoid writing back the very first render's value over itself.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to write localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
