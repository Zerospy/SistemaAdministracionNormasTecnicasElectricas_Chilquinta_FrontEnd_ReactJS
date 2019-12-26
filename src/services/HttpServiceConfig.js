import axios from 'axios';
import LoginService from 'services/LoginService';

export default class HttpServiceConfig {
    constructor(config) {
        if (config) {
            if (config.jwt) {
                this.jwt = config.jwt;
            }

            if (config.apiUrl) {
                this.apiUrl = config.apiUrl;
            }
        }

        this.LoginService = new LoginService();
    }

    setBaseUrl(baseUrl) {
        axios.defaults.baseURL = baseUrl;
    }

    addRequestsInterceptors() {
    // Add a request interceptor
        axios.interceptors.request.use(
            config => {
                const sessionInformation = this.LoginService.getSessionInformation();

                if (sessionInformation && sessionInformation.jwttoken) {
                    config.headers = {
                        Authorization: `Bearer ${sessionInformation.jwttoken}`
                    };
                }

                return config;
            },
            error => {
                console.error('error', error);
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        axios.interceptors.response.use(
            response => response,
            error => {
                const response = error.response;
                console.debug(error);

                /*  if (
                    (response && response.status && response.status === 403) ||
          error.message === 'Network Error'
                ) {
                    // this.LoginService.logOut();
                    // window.location = '/login';
                }
*/
                return Promise.reject(error);
            }
        );
    }
}
