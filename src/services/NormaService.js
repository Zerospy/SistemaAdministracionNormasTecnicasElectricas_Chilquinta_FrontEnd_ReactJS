import axios from 'axios';

export default class NormaService {
  get = () => axios.get('/norma/');
  getById = id => axios.get(`/norma/${id}`);
  publish = id => axios.post(`/norma/publish/${id}`);
  post = (normaId, descripcion) => axios.post(`/norma/${normaId}`, descripcion);
  downloadNormaFile = (normaId, fileType) =>
      axios.post(`/norma-files/download/${normaId}/${fileType}`, null, {responseType: 'arraybuffer'});
  uploadNormaFile = (normaId, fileType, formData) =>
      axios.post(`/norma-files/upload/${normaId}/${fileType}`, formData);
}
