import axios from 'axios';

export async function fetchPost(query, pageNumber, resultsAmount) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '37918988-e3d1c8b61b1090de1ebde83c0';

  const resp = await axios.get(`${BASE_URL}`, {
    params: {
      key: `${API_KEY}`,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${pageNumber}`,
      per_page: `${resultsAmount}`,
    },
  });
  return resp.data;
}
