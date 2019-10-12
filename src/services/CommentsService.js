import axios from 'axios';

export default class CommentsService {
  get = normaId => axios.get(`/observacionnorma/getByIdNorma/${normaId}`);
}
