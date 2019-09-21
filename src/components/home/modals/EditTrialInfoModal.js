import React from 'react';
import InputSwitch from 'components/commons/base/InputSwitch';
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from 'mdbreact';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import RequestsComponent from 'components/formulas/RequestsComponent';
import FormulaService from 'services/FormulaService';
import LoginService, { Permisos } from 'services/LoginService';

class EditTrialInfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trialCode: '',
      trialName: '',
      formulaName: '',
      trialCost: '',
      requestCode: '',
      requestComponentClass: 'collapse',
      switchEvent: false
    };
    this.formulaService = new FormulaService();

    const loginService = new LoginService();
    this.profile = {
      btnSolicitud: loginService.checkPermission(Permisos.DashboardSolicitud)
    };
  }

  resetRequest = () => {
    this.setState({
      requestCode: ''
    });
  };

  actionSwitch = () => {
    const switchEvent = this.state.switchEvent;
    switchEvent ? this.hideRequestList() : this.showRequestList();
    this.setState({ switchEvent: !switchEvent });
  };

  isClosed = () => {
    this.hideRequestList();
    this.setState({ switchEvent: false });
  };

  handleCancel = () => {
    this.props.toggle();
    this.isClosed();
  };

  showRequestList = () => {
    this.setState({ requestComponentClass: 'animated fadeIn' });
  };

  hideRequestList = () => {
    this.setState({ requestComponentClass: 'collapse' });
  };

  saveTrialName = () => {
    const { toggle, onSave } = this.props;

    if (typeof onSave === 'function') {
      const {
        trialCode,
        trialName,
        formulaName,
        trialCost,
        requestCode
      } = this.state;

      onSave({
        trialCode,
        trialName,
        formulaName,
        trialCost,
        requestCode
      });

      this.hideRequestList();

      if (typeof toggle === 'function') {
        toggle();
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.trialInformation) !==
      JSON.stringify(prevProps.trialInformation)
    ) {
      this.setState({
        trialCode: this.props.trialInformation.trialCode,
        trialName: this.props.trialInformation.trialName,
        formulaName: this.props.trialInformation.formulaName,
        trialCost: this.props.trialInformation.trialCost,
        requestCode: this.props.trialInformation.requestCode
          ? this.props.trialInformation.requestCode
          : null
      });
      this.hideRequestList();
    }
  }

  render() {
    const { toggle, isOpen } = this.props;

    return (
      <Container>
        <Modal
          isOpen={isOpen}
          position="top"
          size="lg"
          hiddenModal={this.isClosed.bind()}
        >
          <ModalHeader toggle={toggle}>
            <FormattedMessage id="modal.trial.edit.title" />
          </ModalHeader>
          <ModalBody>
            <Row className="align-items-end">
              <Col className="col-4 form-group">
                <label>
                  <b>{`${this.props.intl.formatMessage({
                    id: 'requests.panel.filter.input.sampleNumber'
                  })}`}</b>
                </label>
                <input
                  readOnly={true}
                  className="span-3 form-control"
                  placeholder={`${this.props.intl.formatMessage({
                    id: 'requests.panel.filter.input.sampleNumber'
                  })}`}
                  value={this.state.requestCode}
                />
              </Col>
              <Col className="col-5 form-group">
                <label>
                  <b>{`${this.props.intl.formatMessage({
                    id: 'modal.trial.edit.inputCode.placeHolder'
                  })}`}</b>
                </label>
                <input
                  className="span-2 form-control"
                  autoFocus={true}
                  ref="input"
                  placeholder={`${this.props.intl.formatMessage({
                    id: 'modal.trial.edit.inputCode.placeHolder'
                  })}`}
                  maxLength={15}
                  value={this.state.trialCode}
                  onChange={event => {
                    let value = event.target.value;

                    value = value.replace(/[^A-z0-9\-/|]*/gi, '');
                    this.setState({
                      trialCode: value
                    });
                  }}
                />
              </Col>
              <Col className="col-3 form-group">
                <label>
                  <b>{`${this.props.intl.formatMessage({
                    id: 'modal.trial.edit.inputCost.placeHolder'
                  })}`}</b>
                </label>
                <input
                  type="number"
                  className="span-2 form-control"
                  placeholder={`${this.props.intl.formatMessage({
                    id: 'modal.trial.edit.inputCost.placeHolder'
                  })}`}
                  maxLength={10}
                  value={this.state.trialCost}
                  onChange={event => {
                    const value = event.target.value;

                    this.setState({
                      trialCost: value
                    });
                  }}
                />
              </Col>
            </Row>
            <Row className="align-items-end">
              <Col className="col-6 form-group">
                <label>
                  <b>{`${this.props.intl.formatMessage({
                    id: 'dashboard.field.trialName'
                  })}`}</b>
                </label>
                <input
                  className="span-3 form-control"
                  placeholder={`${this.props.intl.formatMessage({
                    id: 'dashboard.field.trialName'
                  })}`}
                  maxLength={40}
                  value={this.state.trialName}
                  onChange={event => {
                    const value = event.target.value;

                    this.setState({
                      trialName: value
                    });
                  }}
                />
              </Col>
              <Col className="col-6 form-group">
                <label>
                  <b>{`${this.props.intl.formatMessage({
                    id: 'dashboard.field.formulaName'
                  })}`}</b>
                </label>
                <input
                  className="span-3 form-control"
                  placeholder={`${this.props.intl.formatMessage({
                    id: 'dashboard.field.formulaName'
                  })}`}
                  maxLength={40}
                  value={this.state.formulaName}
                  onChange={event => {
                    const value = event.target.value;

                    this.setState({
                      formulaName: value
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
            {this.profile.btnSolicitud
                ?(
              <Col>
                <InputSwitch
                  onChange={() => {
                    this.actionSwitch();
                  }}
                  className="float-left"
                  value={this.state.switchEvent}
                  title={
                    <FormattedMessage id="modal.trial.edit.switch.requests" />
                  }
                />
                <Button
                  size="sm"
                  className="float-left desv-button"
                  color="primary"
                  onClick={() => this.resetRequest()}
                >
                  <FormattedMessage id="requests.panel.filter.input.button" />
                </Button>
                
                <Button
                  size="sm"
                  className="float-right"
                  onClick={() => {
                    this.saveTrialName();
                  }}
                >
                  <FormattedMessage id="modal.trial.edit.button.accepts" />
                </Button>
                <Button
                  size="sm"
                  className="float-right"
                  color="cancel"
                  onClick={() => {
                    this.handleCancel();
                  }}
                >
                  <FormattedMessage id="modal.trial.edit.button.cancel" />
                </Button>
              </Col>
              )
                :(              <Col>
                  
                  <Button
                    size="sm"
                    className="float-right"
                    onClick={() => {
                      this.saveTrialName();
                    }}
                  >
                    <FormattedMessage id="modal.trial.edit.button.accepts" />
                  </Button>
                  <Button
                    size="sm"
                    className="float-right"
                    color="cancel"
                    onClick={() => {
                      this.handleCancel();
                    }}
                  >
                    <FormattedMessage id="modal.trial.edit.button.cancel" />
                  </Button>
                </Col>
                )}
            </Row>
            <Row>
              <Col className={this.state.requestComponentClass}>
                <RequestsComponent
                  isModal={true}
                  selectedData={selectedData => {
                    this.setState({
                      requestCode: selectedData.NroMuestra
                        ? selectedData.NroMuestra
                        : ''
                    });
                    this.hideRequestList();
                  }}
                />
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default injectIntl(EditTrialInfoModal);

EditTrialInfoModal.propTypes = {
  intl: PropTypes.any,
  toggle: PropTypes.func,
  onSave: PropTypes.func,
  isOpen: PropTypes.bool,
  trialInformation: PropTypes.any
};
