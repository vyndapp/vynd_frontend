import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://5bfd217e.ngrok.io/'
});

export default instance;
