import { useState, useEffect } from "react";

/**
 * 防抖
 * @param value
 * @param delay 多少ms后执行
 */
export default function useDebounce(value: any, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}
