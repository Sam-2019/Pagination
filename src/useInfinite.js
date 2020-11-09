import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  const isScrolling = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, [isScrolling]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [callback, isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
