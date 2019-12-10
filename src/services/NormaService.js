import axios from 'axios';

export default class NormaService {
  get = () => axios.get('/norma/');
  getInternational = () => axios.get('/norma/internacional/all');
  getById = id => axios.get(`/norma/${id}`);
  publish = id => axios.post(`/norma/publish/${id}`);

  getFilter = (id, estado) => axios.get(`/norma/${estado}`);

  post = params => axios.post('/norma/', params);

  updateNorma = (id, params) => axios.post(`/norma/updateNorma/${id}`, params);

  dardeBaja = id => axios.post(`/norma/dardebaja/${id}`);
  estadoNormas = estadoNorma => axios.get(`/norma/findByStatus/${estadoNorma}`);

  downloadNormaFile = (normaId, fileType) =>
      axios.get(`/norma-files/download/${normaId}/${fileType}`, null, {
          responseType: 'arraybuffer'
      });

  uploadNormaFile = (normaId, fileType, formData) =>
      axios.post(`/norma-files/upload/${normaId}/${fileType}`, formData);
}
