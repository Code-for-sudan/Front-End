import { useState, useEffect } from 'react';

function useKeyboardStatus() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const screenHeight = window.innerHeight;

  useEffect(() => {
    const handleResize = () => {
      const heightDiff = screenHeight - window.visualViewport.height;
      setKeyboardOpen(heightDiff > 200); // adjust threshold as needed
      
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screenHeight]);

  return keyboardOpen;
}
export default useKeyboardStatus;