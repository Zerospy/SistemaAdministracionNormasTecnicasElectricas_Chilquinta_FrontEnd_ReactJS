import axios from 'axios';

export default class DetallePerfilService {
  getByIdUsuario = idUsuario => axios.get(`/detalleperfil/getByIdUsuario/${idUsuario}`);
}
