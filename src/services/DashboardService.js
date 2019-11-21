import axios from 'axios';

export default class DashboardService {
  get = () => axios.get('/dashboard/info');
}
