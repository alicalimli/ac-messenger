import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedData, setStoredData] = useState(() => {
    const data = window.localStorage.getItem(key);

    return data || initialValue;
  });

  const setValue = (value) => {
    setStoredData(value);

    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedData, setValue];
};

export default useLocalStorage;
