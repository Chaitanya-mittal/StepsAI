import { useRef, useEffect } from "react";

function useDetectClickOutside(handler) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true); // capturing phase
  }, []);
  return { ref };
}

export default useDetectClickOutside;
