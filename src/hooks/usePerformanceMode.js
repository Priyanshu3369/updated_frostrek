import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const getInitialPerformanceState = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const lowConcurrency =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency <= 4;

  const lowMemory =
    typeof navigator !== "undefined" &&
    typeof navigator.deviceMemory === "number" &&
    navigator.deviceMemory <= 4;

  return prefersReducedMotion || lowConcurrency || lowMemory;
};

const usePerformanceMode = () => {
  const reducedMotion = useReducedMotion();
  const [shouldReduce, setShouldReduce] = useState(getInitialPerformanceState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const listeners = ["(max-width: 768px)", "(prefers-reduced-motion: reduce)"]
      .map((query) => window.matchMedia(query))
      .filter(Boolean);

    const handleChange = () => {
      setShouldReduce(getInitialPerformanceState());
    };

    listeners.forEach((mediaQuery) => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        mediaQuery.addListener(handleChange);
      }
    });

    window.addEventListener("orientationchange", handleChange);
    window.addEventListener("resize", handleChange);

    return () => {
      listeners.forEach((mediaQuery) => {
        if (typeof mediaQuery.removeEventListener === "function") {
          mediaQuery.removeEventListener("change", handleChange);
        } else {
          mediaQuery.removeListener(handleChange);
        }
      });
      window.removeEventListener("orientationchange", handleChange);
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  return shouldReduce || reducedMotion;
};

export default usePerformanceMode;
