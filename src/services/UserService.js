import axios from 'axios';

export default class UserService {
  getUsers = () => axios.get('/usuario/');
}
