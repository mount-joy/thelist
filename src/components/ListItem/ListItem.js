import React, { useEffect, useRef, useState } from 'react';

const ListItem = ({
  itemKey, text, actions, keypressHandler, testId,
}) => {
  const [value, setValue] = useState(text);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { // don't run on first mount
      mounted.current = true;
      return () => {}; // no need for cleanup
    }

    const timeout = setTimeout(() => { // debounce changes
      actions.updateItemByKey(value, itemKey);
    }, 800);

    return () => clearTimeout(timeout);
  }, [value, itemKey]);

  return (
    <input
      type="text"
      id={itemKey}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={keypressHandler}
      data-testid={testId}
    />
  );
};

export default ListItem;
