import { useState, useEffect } from "react";

function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      setViewportHeight(vh);
    };

    // Initial call to set viewport height
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewportHeight;
}

export default useViewportHeight;
