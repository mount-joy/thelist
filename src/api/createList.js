import config from './config';

const createList = async (name) => {
  const url = `${config.BASE_URL}/lists`;
  const method = 'POST';
  const body = JSON.stringify({ Name: name });
  const headers = config.HEADERS;
  const res = await fetch(url, { method, body, headers });
  const data = await res.json();
  return data.Id;
};

export default createList;
