import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const http = axios.create({
  baseURL: `${BASE_URL}/api/expenses`,
  timeout: 15000,
});

export const fetchAllSpends = () => http.get('/').then((r) => r.data);
export const fetchOneSpend = (id) => http.get(`/${id}`).then((r) => r.data);
export const createSpend = (body) => http.post('/', body).then((r) => r.data);
export const updateSpend = (id, body) => http.put(`/${id}`, body).then((r) => r.data);
export const deleteSpend = (id) => http.delete(`/${id}`).then((r) => r.data);

// Turn any axios error into a short message for a toast.
export function oopsText(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.code === 'ERR_NETWORK' || err?.code === 'ECONNABORTED') {
    return 'Cannot reach the server. Is the backend running?';
  }
  return err?.message || 'Something went wrong';
}
