import config from './config';

const updateItem = async (listId, itemId, name) => {
  const url = `${config.BASE_URL}/lists/${listId}/items/${itemId}`;
  const method = 'PATCH';
  const body = JSON.stringify({ Name: name });
  const headers = config.HEADERS;
  const res = await fetch(url, { method, body, headers });
  const data = await res.json();
  return data.Id;
};

export default updateItem;
