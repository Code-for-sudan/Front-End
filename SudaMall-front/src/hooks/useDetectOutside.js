import React, { useEffect } from "react";

function useDetectOutside({ ref, callback }) {
  useEffect(() => {
    // Handler to detect clicks outside the ref
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}

export default useDetectOutside;
