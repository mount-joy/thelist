import config from './config';

const getItems = async (listId) => {
  const url = `${config.BASE_URL}/lists/${listId}/items`;
  const method = 'GET';
  const res = await fetch(url, { method });
  const data = await res.json();
  return data.map((item) => ({
    id: item.Id,
    text: item.Name,
  }));
};

export default getItems;
