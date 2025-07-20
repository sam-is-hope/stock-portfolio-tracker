import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const fetchPortfolio = () => API.get('/portfolio');
