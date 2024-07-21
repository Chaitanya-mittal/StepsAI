import { useEffect, useState } from "react";

function useLocalStorage() {
  const [data, setData] = useState(() => {
    const ifexists = localStorage.getItem("doctor");
    return ifexists ? JSON.parse(ifexists) : null;
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("doctor", JSON.stringify(data));
    }
    return () => localStorage.removeItem("doctor");
  }, [data]);
  return { data, setData };
}

export default useLocalStorage;
