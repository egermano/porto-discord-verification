"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export function SuccessConfetti() {
  const { width, height } = useWindowSize();
  const [windowSize, setWindowSize] = useState({
    width,
    height,
  });
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnable(false);
    }, 15000); // Disable confetti after 15 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width,
        height,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width, height]);

  if (!enable) {
    return null;
  }

  return <Confetti width={width} height={height} gravity={0.05} run={enable} />;
}
