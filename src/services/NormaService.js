import axios from 'axios';

export default class NormaService {
  get = () => axios.get('/norma/');
  getById = id => axios.get(`/norma/${id}`);
  publish = id => axios.post(`/norma/publish/${id}`);

  getFilter = (id, estado) => axios.get(`/norma/${estado}`);

  post = ( params ) => axios.post(`/norma/`, 
  params);

  /*
  postNorma = (normaId, params) => axios.post(`/norma/${normaId}`, 
  params);
*/

    estadoNormas = (estadoNorma) => axios.get(`/norma/findByStatus/${estadoNorma}`); 


    downloadNormaFile = (normaId, fileType) =>
      axios.post(`/norma-files/download/${normaId}/${fileType}`, null, {responseType: 'arraybuffer'});


    uploadNormaFile = (normaId, fileType, formData) =>
      axios.post(`/norma-files/upload/${normaId}/${fileType}`, formData);



}
