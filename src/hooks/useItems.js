import { useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';

export const IDB_KEY = 'items';

const useItems = () => {
  const [items, setItems] = useState([]);

  const setValue = (newValue) => {
    setItems(newValue);
    return set(IDB_KEY, newValue);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        setItems(val);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return [items, setValue];
};

export default useItems;
