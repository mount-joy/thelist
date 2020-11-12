import config from './config';

const apiDeleteItem = async (listId, itemId) => {
  const url = `${config.BASE_URL}/lists/${listId}/items/${itemId}`;
  const method = 'DELETE';
  const res = await fetch(url, { method });
  return res.json();
};

export default apiDeleteItem;
