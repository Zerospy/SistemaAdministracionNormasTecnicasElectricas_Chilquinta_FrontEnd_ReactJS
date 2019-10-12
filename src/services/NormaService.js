import axios from 'axios';

export default class NormaService {
  get = params => axios.get('/norma/', {
      params: params
  });
}
