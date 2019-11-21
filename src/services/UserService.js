import axios from 'axios';

export default class UserService {
  get = params => axios.get('/users/GetUsers', {
      params: params
  });

  getUsers = () => axios.get('/usuario/');
 

}
