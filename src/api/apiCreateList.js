import { BASE_URL } from './constants';

const apiCreateList = async (name) => {
  const url = `${BASE_URL}/lists`;
  const method = 'POST';
  const body = JSON.stringify({ Name: name });
  const res = await fetch(url, { method, body });
  const data = await res.json();
  return data.Id;
};

export default apiCreateList;
