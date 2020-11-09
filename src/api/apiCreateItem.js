import { BASE_URL } from './constants';

const apiCreateItem = async (listId, name) => {
  const url = `${BASE_URL}/lists/${listId}/items`;
  const method = 'POST';
  const body = JSON.stringify({ Name: name });
  const res = await fetch(url, { method, body });
  const data = await res.json();
  return data.Id;
};

export default apiCreateItem;
