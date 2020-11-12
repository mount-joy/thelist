import { useEffect, useState } from 'react';
import { get, set } from 'idb-keyval';

import apiCreateList from '../api/apiCreateList';

const IDB_KEY = 'list-id';

const useListId = () => {
  const [id, setId] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const val = await get(IDB_KEY);
      if (val != null && mounted) {
        setId(val);
      } else {
        if (!mounted) return;
        const listId = await apiCreateList('Shopping List');
        if (!mounted) return;
        set(IDB_KEY, listId);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return id;
};

export default useListId;
