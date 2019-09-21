import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Row,
    Col
} from 'mdbreact';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';

class VerificationCodeModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saveVerificationCode: ''
        };
    }

  saveVerificationCode = () => {
      const {toggle, onSave} = this.props;

      if (typeof onSave === 'function') {
          const {saveVerificationCode} = this.state;
          onSave(saveVerificationCode);

          if (typeof toggle === 'function') {
              this.setState(
                  {
                      saveVerificationCode: ''
                  },
                  () => {
                      toggle();
                  }
              );
          }
      }
  };

  componentDidUpdate() {}

  render() {
      const {toggle, isOpen, onSave} = this.props;

      return (
          <Container>
              <Modal isOpen={isOpen} centered>
                  <ModalHeader toggle={toggle}>
                      <FormattedMessage id="login.verificationModal.title" />
                  </ModalHeader>
                  <ModalBody>
                      <Col className="alert alert-success">
                          <FormattedMessage id="login.verificationModal.hint" />
                      </Col>
                      <Row>
                          <Col className="col-12 m-auto">
                              <Input
                                  className="span-3"
                                  autoFocus={true}
                                  label={`${this.props.intl.formatMessage({
                                      id: 'login.message.verificationInput'
                                  })}`}
                                  maxLength="12"
                                  value={this.state.saveVerificationCode}
                                  onChange={event => {
                                      let value = event.target.value;

                                      value = value.replace(/[^A-z0-9\-/|]*/gi, '');

                                      this.setState({
                                          saveVerificationCode: value
                                      });
                                  }}
                                  onKeyPress={event => {
                                      const keyCode = event.which || event.keyCode;

                                      if (keyCode === 13 && typeof onSave === 'function') {
                                          this.saveVerificationCode();
                                      }
                                  }}
                              />
                          </Col>
                      </Row>
                      <Row>
                          <Col className="d-flex justify-content-end">
                              <Button color="cancel" onClick={toggle}>
                                  {' '}
                                  <FormattedMessage id="login.verificationModal.btn.cancel" />
                              </Button>
                              <Button
                                  disabled={
                                      !this.state.saveVerificationCode ||
                    (this.state.saveVerificationCode &&
                      this.state.saveVerificationCode.length < 6)
                                  }
                                  onClick={() => {
                                      this.saveVerificationCode();
                                  }}
                              >
                                  {' '}
                                  <FormattedMessage id="login.verificationModal.btn.save" />
                              </Button>
                          </Col>
                      </Row>
                  </ModalBody>
              </Modal>
          </Container>
      );
  }
}

export default injectIntl(VerificationCodeModal);

VerificationCodeModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    isOpen: PropTypes.bool,
    intl: PropTypes.any
};
