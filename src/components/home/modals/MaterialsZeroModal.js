import React from 'react';
import {
  Container,
  Button,
  Modal,
  ModalBody,
  Row,
  Col
} from 'mdbreact';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class MaterialsZeroModal extends React.Component {
  saveTrialName = (formulaObj) => {
    const { onSave } = this.props;

    if (typeof onSave === 'function') {
      onSave({
        trial: this.props.trialInformation.trial,
        formulaObj: formulaObj
      });
    }
  };

  isClosed = () => {
    const { isClosed } = this.props;
    isClosed(this.props.trialInformation.columnIdentifier);
  };
  
  render() {
    const { isOpen } = this.props;

    return (
      <Container >
        <Modal isOpen={isOpen} frame position="top"> 
          <ModalBody className="text-center">
            <Row>
              <Col className="col-8 mt-3 h5">
                <FormattedMessage id="modal.trial.zero.info" />
              </Col>
              <Col className="col-4">
              <Button
                  color="cancel"
                  onClick={() => {
                    this.isClosed();
                  }}
                >
                  <FormattedMessage id="modal.trial.zero.cancel" />
                </Button>
                <Button
                  onClick={() => {
                    this.saveTrialName(this.props.trialInformation.saveFormulaObj);
                  }}
                >
                  <FormattedMessage id="modal.trial.edit.button.no" />
                </Button>
                <Button
                  onClick={() => {
                    this.saveTrialName(this.props.trialInformation.saveFormulaObjCero);
                  }}
                >
                  <FormattedMessage id="modal.trial.edit.button.yes" />
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default injectIntl(MaterialsZeroModal);

MaterialsZeroModal.propTypes = {
  intl: PropTypes.any,
  onSave: PropTypes.func,
  isOpen: PropTypes.bool,
  isClosed: PropTypes.func,
  trialInformation: PropTypes.any
};
