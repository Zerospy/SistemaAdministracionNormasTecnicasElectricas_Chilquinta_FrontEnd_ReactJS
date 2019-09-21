import React from 'react';
import {Button, Modal, ModalBody, Row, Col, Fa} from 'mdbreact';
import PropTypes from 'prop-types';

export default class DialogBoxImportFormula extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadLastVersion: false
        };
    }

  close = () => {
      const {onClose} = this.props;
      if (typeof onClose === 'function') {
          onClose();
      }
  };

  render() {
      const question = this.props.question;
      const textImportSelectedButton = this.props.textImportSelectedButton;
      const textImportNewButton = this.props.textImportNewButton;
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
                          <Col className="col-7 mt-3 h5">{question}</Col>
                          <Col className="col-5">
                              <Button
                                  disabled={this.state.loadLastVersion}
                                  color="info"
                                  className="ml-3"
                                  onClick={this.props.cancel}
                              >
                                  {textCancelButton}
                              </Button>
                              <Button
                                  disabled={this.state.loadLastVersion}
                                  color="success"
                                  className="ml-3"
                                  onClick={this.props.oldVersion}
                              >
                                  {textImportSelectedButton}
                              </Button>
                              <Button
                                  disabled={this.state.loadLastVersion}
                                  color="success"
                                  className="ml-3"
                                  onClick={() => {
                                      this.setState({
                                          loadLastVersion: true
                                      });

                                      this.props.newVersion();
                                  }}
                              >
                                  {this.state.loadLastVersion ? (
                                      <Fa icon="spinner" className="fa-spin" />
                                  ) : (
                                      textImportNewButton
                                  )}
                              </Button>
                          </Col>
                      </Row>
                  </ModalBody>
              </Modal>
          </React.Fragment>
      );
  }
}

DialogBoxImportFormula.propTypes = {
    question: PropTypes.string,
    textImportSelectedButton: PropTypes.string,
    textImportNewButton: PropTypes.string,
    textCancelButton: PropTypes.string,
    showing: PropTypes.bool,
    cancel: PropTypes.func,
    oldVersion: PropTypes.func,
    newVersion: PropTypes.func,
    onClose: PropTypes.func
};
