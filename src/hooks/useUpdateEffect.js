import { useEffect, useRef } from 'react';

const useUpdateEffect = (fn, deps) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      fn();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};

export default useUpdateEffect;
