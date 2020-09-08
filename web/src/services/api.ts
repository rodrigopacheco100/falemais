import axios from 'axios';

const api = axios.create({
   baseURL: 'https://falemaistempo.herokuapp.com',
});

export default api;
