/* eslint-disable no-console */
import { BASE_URL } from './constants';

const apiGetItems = async (listId) => {
  const url = `${BASE_URL}/lists/${listId}/items`;
  const method = 'GET';
  const res = await fetch(url, { method });
  const data = await res.json();
  return data.map((item) => ({
    id: item.Id,
    text: item.Item,
  }));
};

export default apiGetItems;
