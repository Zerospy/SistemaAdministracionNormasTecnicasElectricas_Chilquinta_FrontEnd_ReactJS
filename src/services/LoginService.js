import axios from 'axios';

export default class LoginService {
  authenticate = (username, password, verificationCode) =>
      axios.post('login/authenticate', {
          Username: username,
          Password: password,
          VerificationCode: verificationCode
      });

  createSessionInformation = sessionInformation => {
      sessionStorage.setItem(
          'sessionInformation',
          JSON.stringify(sessionInformation)
      );
  };

  getSessionInformation = () => {
      const sessionInformation = sessionStorage.getItem('sessionInformation');

      return sessionInformation !== null ? JSON.parse(sessionInformation) : null;
  };

  checkPermission = permissionToCheck => {
      const sesisonInformation = this.getSessionInformation();

      if (
          sesisonInformation !== null &&
      sesisonInformation.Permisos &&
      sesisonInformation.Permisos.length > 0
      ) {
          const hasAccess = sesisonInformation.Permisos.some(
              permission => permission.Codigo === permissionToCheck
          );

          return hasAccess;
      }
      return false;
  };

  logOut = () => {
      sessionStorage.removeItem('sessionInformation');
  };
}

export const Permisos = {
    Dashboard: 'DASHBOARD',
    DashboardGuardar: 'DASHBOARD#GUARDAR',
    DashboardIfra: 'DASHBOARD#IFRA',
    DashboardOficializar: 'DASHBOARD#OFICIALIZAR',
    Solicitudes: 'SOLICITUDES',
    DashboardSolicitud: 'DASHBOARD#SOLICITUD'
};
