import axios from 'axios';

export default class NormaService {
  get = () => axios.get('/norma/');
  getById = id => axios.get(`/norma/${id}`);
  publish = id => axios.post(`/norma/publish/${id}`);
  post = (normaId, descripcion) =>
      axios.post(`/norma/${normaId}`, descripcion);
  downloadNormaFile = (normaId, fileType) => axios.get(`/norma/${normaId}/${fileType}`);
  uploadNormaFile = (normaId, fileType) => axios.post(`/norma/${normaId}/${fileType}`);
}


