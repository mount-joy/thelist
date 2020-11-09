import { BASE_URL } from './constants';

const apiDeleteItem = async (listId, itemId) => {
  const url = `${BASE_URL}/lists/${listId}/items/${itemId}`;
  const method = 'DELETE';
  const res = await fetch(url, { method });
  return res.json();
};

export default apiDeleteItem;
