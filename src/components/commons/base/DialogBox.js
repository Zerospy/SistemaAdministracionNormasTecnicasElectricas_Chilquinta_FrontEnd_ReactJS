import React from 'react';
import {Button, Modal, ModalBody, Row, Col} from 'mdbreact';
import PropTypes from 'prop-types';

export default class DialogBox extends React.Component {
  close = () => {
      const {onClose} = this.props;
      if (typeof onClose === 'function') {
          onClose();
      }
  };

  render() {
      const question = this.props.question;
      const textAcceptButton = this.props.textAcceptButton;
      const textCancelButton = this.props.textCancelButton;

      return (
          <React.Fragment>
              <Modal
                  isOpen={this.props.showing}
                  toggle={this.close}
                  frame
                  position="top"
              >
                  <ModalBody className="text-center">
                      <Row>
                          <Col className="col-8 mt-3 h5">{question}</Col>
                          <Col className="col-4">
                              <Button
                                  color="info"
                                  className="ml-3"
                                  onClick={this.props.reject}
                              >
                                  {textCancelButton}
                              </Button>
                              <Button
                                  color="success"
                                  className="ml-3"
                                  onClick={this.props.accept}
                              >
                                  {textAcceptButton}
                              </Button>
                          </Col>
                      </Row>
                  </ModalBody>
              </Modal>
          </React.Fragment>
      );
  }
}

DialogBox.defaultProps = {
    question: 'Realmente desea hacer esto?',
    textAcceptButton: 'Aceptar',
    textCancelButton: 'Cancelar'
};

DialogBox.propTypes = {
    question: PropTypes.string,
    textAcceptButton: PropTypes.string,
    textCancelButton: PropTypes.string,
    showing: PropTypes.bool,
    accept: PropTypes.func,
    reject: PropTypes.func,
    onClose: PropTypes.func
};
