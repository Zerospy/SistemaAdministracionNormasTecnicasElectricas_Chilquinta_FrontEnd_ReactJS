import InputSwitch from 'components/commons/base/InputSwitch';
import {
    Button,
    Col,
    Fa,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'mdbreact';
import React from 'react';
import Select from 'react-select';
import {toast} from 'react-toastify';
import TrialService from 'services/TrialService';
import UserService from 'services/UserService';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';

class ShareTrialLibPersonalModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            publicTrial: false,
            listOfSelectedUsers: [],
            generalListOfUsers: [],
            loading: false
        };

        this.trialService = new TrialService();
        this.userService = new UserService();
    }

  shareTrial = () => {
      const trial = this.props.trialIdToShare;
      const {publicTrial, listOfSelectedUsers} = this.state;
      const usersToShare = [];

      if (listOfSelectedUsers && listOfSelectedUsers.length > 0) {
          listOfSelectedUsers.forEach(user => {
              usersToShare.push(user.value);
          });
      }

      this.setState({
          loading: true
      });

      this.trialService
          .shareTrial({
              IdTrial: trial,
              RutUsuario: usersToShare,
              Todos: publicTrial
          })
          .then(
              () => {
                  toast.success(
                      `${this.props.intl.formatMessage({
                          id: 'modal.shareTrial.message.save.success'
                      })}`
                  );

                  this.setState(
                      {
                          loading: false,
                          publicTrial: false,
                          listOfSelectedUsers: []
                      },
                      () => {
                          this.props.shareTrial();
                      }
                  );
              },
              () => {
                  toast.error(
                      `${this.props.intl.formatMessage({
                          id: 'modal.shareTrial.message.save.error'
                      })}`
                  );

                  this.setState(
                      {
                          loading: false,
                          publicTrial: false,
                          listOfSelectedUsers: []
                      },
                      () => {
                          this.props.shareTrial();
                      }
                  );
              }
          );
      this.toggleModalShareTrial();
  };

  toggleModalShareTrial = () => {
      this.setState(
          {
              loading: false,
              publicTrial: false,
              listOfSelectedUsers: []
          },
          () => {
              this.props.toggleModalShareTrial();
          }
      );
  };

  componentDidMount() {
      this.userService.get().then(response => {
          const data = response.data;

          if (data !== null && data.length > 0) {
              const users = this.state.generalListOfUsers;

              data.forEach(user => {
                  users.push({
                      value: user.Rut,
                      label: user.Nombre
                  });
              });

              this.setState({
                  generalListOfUsers: users
              });
          }
      });
  }

  componentDidUpdate(prevProps) {
      if (
          this.props.trialIdToShare &&
      this.props.trialIdToShare !== prevProps.trialIdToShare
      ) {
          const trial = this.props.trialIdToShare;

          this.trialService.sharedUserByTrial(trial).then(
              response => {
                  const data = response.data;
                  const listOfSelectedUsers = [];

                  if (data && data.Users && data.Users.length > 0) {
                      data.Users.forEach(user =>
                          listOfSelectedUsers.push({
                              value: user.RutUsuario,
                              label: user.NombreUsuario
                          })
                      );
                  }

                  this.setState({
                      publicTrial:
              data && data.SharedTrial && data.SharedTrial === true
                  ? true
                  : false,
                      listOfSelectedUsers
                  });
              },
              () => {
                  console.error('Ocurrió un error al obtener la información');
              }
          );
      }
  }

  render() {
      return (
          <Modal
              isOpen={this.props.modalShareTrial}
              toggle={this.toggleModalShareTrial}
              className="px-3"
          >
              <ModalHeader toggle={this.toggleModalShareTrial}>
                  <FormattedMessage id="modal.shareTrial.title" />
              </ModalHeader>
              <ModalBody>
                  <Row>
                      <Col className="mb-3">
                          <InputSwitch
                              leftText={'No'}
                              rightText={'Sí'}
                              onChange={event => {
                                  const checked = event.target.checked;

                                  this.setState(
                                      {
                                          publicTrial: checked
                                      },
                                      () => {
                                          if (checked) {
                                              this.setState({
                                                  listOfSelectedUsers: []
                                              });
                                          }
                                      }
                                  );
                              }}
                              value={this.state.publicTrial}
                              title={`${this.props.intl.formatMessage({
                                  id: 'modal.shareTrial.switch.label'
                              })}`}
                          />
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <small>
                              <FormattedMessage id="modal.shareTrial.select.label" />
                          </small>
                          <Select
                              isDisabled={this.state.publicTrial}
                              isMulti
                              placeholder={`${this.props.intl.formatMessage({
                                  id: 'modal.shareTrial.select.placeHolder'
                              })}`}
                              isClearable={true}
                              value={this.state.listOfSelectedUsers}
                              onChange={item => {
                                  this.setState({
                                      listOfSelectedUsers: item
                                  });
                              }}
                              options={this.state.generalListOfUsers}
                          />
                      </Col>
                  </Row>
              </ModalBody>
              <ModalFooter>
                  <Button color="cancel" onClick={this.toggleModalShareTrial}>
                      <FormattedMessage id="modal.shareTrial.footer.cancel" />
                  </Button>
                  <Button
                      disabled={this.state.loading}
                      onClick={this.shareTrial}
                  >
                      {this.state.loading ? (
                          <span>
                              <Fa icon="spinner" className="fa-spin" />{' '}
                              <FormattedMessage id="component.messages.loading" />
                          </span>
                      ) : (
                          <FormattedMessage id="modal.shareTrial.footer.success" />
                      )}
                  </Button>
              </ModalFooter>
          </Modal>
      );
  }
}

export default injectIntl(ShareTrialLibPersonalModal);

ShareTrialLibPersonalModal.propTypes = {
    idTrial: PropTypes.any,
    intl: PropTypes.any,
    modalShareTrial: PropTypes.bool,
    toggleModalShareTrial: PropTypes.func,
    shareTrial: PropTypes.func,
    trialIdToShare: PropTypes.any
};
