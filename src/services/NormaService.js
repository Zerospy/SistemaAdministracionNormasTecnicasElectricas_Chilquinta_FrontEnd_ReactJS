import axios from "axios";

export default class NormaService {
  get = params =>
    axios.get("/norma/", {
      params: params
    });
  publish = id => axios.post(`/norma/publish/${id}`);
}
