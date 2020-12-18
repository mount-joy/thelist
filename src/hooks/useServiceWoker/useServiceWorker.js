import { useEffect, useState } from 'react';

import * as serviceWorker from '../../serviceWorker';

const useServiceWorker = () => {
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    serviceWorker.register({
      onUpdate: setRegistration,
    });
  }, []);

  const updateServiceWorker = () => {
    const { waiting } = registration;

    if (waiting) {
      waiting.postMessage({ type: 'SKIP_WAITING' });
      waiting.addEventListener('statechange', (e) => {
        if (e.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return [registration != null, updateServiceWorker];
};

export default useServiceWorker;
