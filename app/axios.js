import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vynd-5222f.firebaseio.com/'
});

export default instance;
