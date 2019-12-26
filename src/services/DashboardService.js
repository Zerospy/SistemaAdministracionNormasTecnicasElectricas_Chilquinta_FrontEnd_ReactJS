import axios from 'axios';

export default class DashboardService {
  get = () => axios.get('/dashboard/info');
  getAllPublished = () => axios.get('/dashboard/getAllPublished');
  getAllWithFiles = () => axios.get('/dashboard/getAllWithFiles');
  getDownloaded = () => axios.get('/dashboard/getDownloaded');
  getWithComment = () => axios.get('/dashboard/getWithComment');
  getEnWorkflow = () => axios.get('/dashboard/getEnWorkflow');
  getLastComment = () => axios.get('/dashboard/getLastComment');
}
