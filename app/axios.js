import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bb4ec793.ngrok.io/'
});

export default instance;
