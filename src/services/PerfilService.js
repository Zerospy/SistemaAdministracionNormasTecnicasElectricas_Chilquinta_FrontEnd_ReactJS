import axios from 'axios';

export default class PerfilService {
  get = () => axios.get('/perfil/');
}
