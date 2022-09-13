import { useState } from "react";

const useLocalStorage = <I>(key: string, initialValue: I) => {
  const [storedData, setStoredData] = useState(() => {
    const data = JSON.parse(window.localStorage.getItem(key) as string);

    return data || initialValue;
  });

  const setValue = (value: string) => {
    setStoredData(value);

    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedData, setValue];
};

export default useLocalStorage;
