import config from './config';

const getList = async (listId) => {
  const url = `${config.BASE_URL}/lists/${listId}`;
  const method = 'GET';
  const res = await fetch(url, { method });
  const list = await res.json();
  return {
    id: list.Id,
    name: list.Name,
  };
};

export default getList;
