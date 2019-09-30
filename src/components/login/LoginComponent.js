import React from 'react';
import {Container, Fa} from 'mdbreact';
import LoginService from 'services/LoginService';
import logo from 'assets/logo.png';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {toast} from 'react-toastify';
import {GeneralContext} from 'GeneralContext';
import {FormattedMessage, injectIntl} from 'react-intl';
import VerificationCodeModal from 'components/login/VerificationCodeModal';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.countries = [
            {
                label: 'Chile',
                value: 'chile'
            },
            {
                label: 'Brasil',
                value: 'brasil'
            }
        ];

        this.state = {
            username: '',
            password: '',
            lang: null,
            loading: false,
            modalVerificationCode: false
        };

        this.usernameInputRef = React.createRef();
        this.passwordInputRef = React.createRef();

        this.loginService = new LoginService();
    }

  redirectHome = () => {
      this.props.history.push('/dashboard');
  };

  login = () => {
      const username = this.state.username;
      const password = this.state.password;

      if (!username || !password) {
          toast.info(
              `${this.props.intl.formatMessage({
                  id: 'login.message.emptyData'
              })}`
          );
          this.usernameInputRef.current.focus();
          return;
      }

      this.setState({
          loading: true
      });

      this.loginService.authenticate(username, password).then(
          response => {
              this.setState({
                  loading: false
              });

              if (response && response.status && response.status === 200) {
                  this.setState({
                      modalVerificationCode: true
                  });
              } else {
                  toast.error(
                      `${this.props.intl.formatMessage({
                          id: 'login.message.invalidUser'
                      })}`
                  );
                  this.usernameInputRef.current.focus();
              }
          },
          () => {
              this.setState({
                  loading: false
              });
              this.usernameInputRef.current.focus();
              toast.error(
                  `${this.props.intl.formatMessage({
                      id: 'login.message.invalidUser'
                  })}`
              );
          }
      );
  };

  render() {
      if (sessionStorage.length > 0 && sessionStorage.getItem('jwt') !== null) {
          this.redirectHome();
      }

      return (
          <GeneralContext.Consumer>
              {generalContext => {
                  const selectedLang = generalContext.getSelectedLang();
                  let selectedCountry = {};

                  if (selectedLang.lang === 'es') {
                      selectedCountry = this.countries[0];
                  } else if (selectedLang.lang === 'en') {
                      selectedCountry = this.countries[1];
                  } else {
                      selectedCountry = this.countries[0];
                  }

                  return (
                      <React.Fragment>
                          <VerificationCodeModal
                              toggle={() => {
                                  this.setState({
                                      modalVerificationCode: !this.state.modalVerificationCode
                                  });
                              }}
                              isOpen={this.state.modalVerificationCode}
                              onSave={verificationCode => {
                                  if (!verificationCode) {
                                      toast.error(
                                          `${this.props.intl.formatMessage({
                                              id: 'login.message.emptyVerificationCode'
                                          })}`
                                      );
                                      return;
                                  }

                                  this.setState({
                                      loading: true
                                  });

                                  const username = this.state.username;
                                  const password = this.state.password;

                                  this.loginService
                                      .authenticate(username, password, verificationCode)
                                      .then(
                                          response => {
                                              this.setState({
                                                  loading: false
                                              });

                                              if (
                                                  response &&
                          response.status &&
                          response.status === 200
                                              ) {
                                                  const sessionInformacion = response.data;

                                                  toast.success(
                                                      `${this.props.intl.formatMessage({
                                                          id: 'login.message.success'
                                                      })} ${sessionInformacion.NombreApellido}`
                                                  );

                                                  this.loginService.createSessionInformation(
                                                      sessionInformacion
                                                  );

                                                  this.props.history.push('/dashboard');
                                              } else {
                                                  toast.info(
                                                      `${this.props.intl.formatMessage({
                                                          id: 'login.message.invalidVerificationCode'
                                                      })}`
                                                  );

                                                  this.setState({
                                                      loading: false
                                                  });
                                              }
                                          },
                                          () => {
                                              toast.info(
                                                  `${this.props.intl.formatMessage({
                                                      id: 'login.message.invalidVerificationCode'
                                                  })}`
                                              );

                                              this.setState({
                                                  loading: false
                                              });
                                          }
                                      );
                              }}
                          />
                          <Container fluid={true} className="background-login-form h-100">
                              <div className="page-header">
                                  <div className="offset-10 col-2">
                                      <img src={logo} alt="Cramer" className="page-logo" />
                                  </div>
                              </div>

                              <div className="row justify-content-center align-items-center">
                                  <div className="card">
                                      <div className="card-header">
                                          <FormattedMessage id="login.formTitle" />
                                      </div>
                                      <div className="card-body">
                                          <div className="input-group mb-3">
                                              <div className="input-group-prepend">
                                                  <span className="input-group-text">
                                                      <i className="fas fa-user" />
                                                  </span>
                                              </div>
                                              <FormattedMessage id="login.username">
                                                  {placeholder => (
                                                      <input
                                                          disabled={this.state.loading}
                                                          type="text"
                                                          autoFocus={true}
                                                          className="form-control"
                                                          placeholder={placeholder}
                                                          ref={this.usernameInputRef}
                                                          onChange={event => {
                                                              this.setState({
                                                                  username: event.target.value
                                                              });
                                                          }}
                                                          onKeyPress={event => {
                                                              const keyCode = event.which || event.keyCode;

                                                              if (keyCode === 13) {
                                                                  this.passwordInputRef.current.focus();
                                                              }
                                                          }}
                                                      />
                                                  )}
                                              </FormattedMessage>
                                          </div>
                                          <div className="input-group mb-3">
                                              <div className="input-group-prepend">
                                                  <span className="input-group-text">
                                                      <i className="fas fa-key" />
                                                  </span>
                                              </div>
                                              <FormattedMessage id="login.password">
                                                  {placeholder => (
                                                      <input
                                                          ref={this.passwordInputRef}
                                                          disabled={this.state.loading}
                                                          type="password"
                                                          className="form-control"
                                                          placeholder={placeholder}
                                                          onChange={event => {
                                                              this.setState({
                                                                  password: event.target.value
                                                              });
                                                          }}
                                                          onKeyPress={event => {
                                                              const keyCode = event.which || event.keyCode;

                                                              if (keyCode === 13) {
                                                                  this.login();
                                                              }
                                                          }}
                                                      />
                                                  )}
                                              </FormattedMessage>
                                          </div>
                                          <FormattedMessage id="login.language">
                                              {placeholder => (
                                                  <Select
                                                      isDisabled={this.state.loading}
                                                      className="mb-3"
                                                      placeholder={placeholder}
                                                      value={selectedCountry}
                                                      onChange={lang => {
                                                          this.setState(
                                                              {
                                                                  lang: lang
                                                              },
                                                              () => {
                                                                  generalContext.onChangeCountry(lang.value);
                                                              }
                                                          );
                                                      }}
                                                      options={this.countries}
                                                  />
                                              )}
                                          </FormattedMessage>
                                          <button
                                              disabled={this.state.loading}
                                              className="btn btn-primary btn-block"
                                              onClick={this.login}
                                          >
                                              {!this.state.loading ? (
                                                  <FormattedMessage id="login.btnLogin" />
                                              ) : (
                                                  <Fa icon="spinner" className="fa-spin" />
                                              )}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </Container>
                      </React.Fragment>
                  );
              }}
          </GeneralContext.Consumer>
      );
  }
}

export default injectIntl(LoginComponent);

LoginComponent.propTypes = {
    history: PropTypes.any,
    intl: PropTypes.any
};