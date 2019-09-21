import axios from 'axios';

export default class TrialService {
  get = params =>
    axios.get('/trials/GetTrials', {
      params: params
    });

  getById = idTrial =>
    axios.get('/trials/GetTrialDetails', {
      params: { idTrial }
    });

    getAlById = cod_sun =>
    axios.get('/materials/GetAlergenoDetail', {
      params: { cod_sun }
    });

  addComment = params => axios.post('/formulas/SaveObservaciones', params);

  removeTrial = idTrial =>
    axios.delete('/trials/DeleteTrial', {
      params: {
        IdTrial: idTrial
      }
    });

  saveTrialDetails = params => axios.post('/trials/SaveTrialDetails', params);

  shareTrial = params => axios.post('/trials/CompartirTrial', params);

  sharedUserByTrial = IdTrial =>
    axios.get('/trials/GetSharedUserByTrial', { params: { IdTrial } });
}
