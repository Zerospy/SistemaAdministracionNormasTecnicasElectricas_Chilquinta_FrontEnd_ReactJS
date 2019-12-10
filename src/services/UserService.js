import axios from 'axios';

export default class UserService {
  getUsers = () => axios.get('/usuario/');
  saveUser = user => axios.post('/usuario/', user);
  uploadUserAvatar = (userID, formData) =>
      axios.post(`/uploadAvatar/${userID}`, formData);
}
