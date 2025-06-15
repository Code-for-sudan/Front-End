import { useState, useEffect } from 'react';

function useKeyboardStatus() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [visualViewportHeight, setVisualViewportHeight] = useState(window.visualViewport.height);

  useEffect(() => {
    const handleResize = () => {
      const heightDiff = visualViewportHeight - window.visualViewport.height;
      setKeyboardOpen(heightDiff > 200); // adjust threshold as needed
      
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visualViewportHeight]);
  
  return keyboardOpen;
}
export default useKeyboardStatus;