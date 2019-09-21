import axios from 'axios';

export default class MaterialService {
  get = params => axios.get('/materials/GetMateriales', {
      params: params
  });
}
