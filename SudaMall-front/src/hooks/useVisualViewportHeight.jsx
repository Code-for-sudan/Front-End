import { useState, useEffect } from "react";

export default function useVisualViewportHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      if (window.visualViewport) {
        setHeight(window.visualViewport.height);
      } else {
        setHeight(window.innerHeight);
      }
    };

    // Listen to viewport resize (keyboard open/close)
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return height;
}
