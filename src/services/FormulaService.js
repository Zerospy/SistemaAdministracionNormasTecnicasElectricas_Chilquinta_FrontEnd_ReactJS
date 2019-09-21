import axios from 'axios';

export default class FormulaService {
  getRequests = params =>
      axios.get('/formulas/GetSolicitudes', {
          params: params
      });

  getRequestsById = id =>
      axios.get(`/formulas/GetSolicitudById?NroMuestra=${id}`);

  getFormulas = params =>
      axios.get('/formulas/GetFormulas', {
          params: params
      });

  getFormulaById = params =>
      axios.get('/formulas/GetFormulasById', {
          params: params
      });

  explodeFormulaById = params =>
      axios.get('/formulas/ExplodeFormulaById', {
          params: params
      });

  saveFormula = params => axios.post('/formulas/SaveFormulas', params);

  getFamily = () => axios.get('/formulas/GetFamilia');

  getSubFamily = () => axios.get('/formulas/GetSubFamilia');

  delComment = params => axios.post('/formulas/DeleteObservaciones', params);        

  //axios.delete('/formulas/DeleteObservaciones?IdTrial=${params.IdTrial}&Observacion=${params.Observacion}');

  officializeFormula = params => axios.post('/formulas/Oficializar', params)

  validateIFRA = params => axios.post('/formulas/ValidateIFRA', params);

  checkZero = params => axios.post('/formulas/CheckZero', params);

}
