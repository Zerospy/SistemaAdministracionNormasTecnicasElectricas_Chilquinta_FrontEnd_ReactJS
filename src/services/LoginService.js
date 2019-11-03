import axios from 'axios';

export default class LoginService {
  authenticate = (username, password, verificationCode) =>
      axios.post('login/authenticate', {
          username: username,
          password: password
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
    Dashboard: 'DASHBOARD'
};
