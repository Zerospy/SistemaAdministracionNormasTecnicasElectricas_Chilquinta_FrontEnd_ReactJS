import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Input
} from 'mdbreact';
import { DashboardContext } from 'components/home/DashboardContext';
import Select from 'react-select';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class NormalizeFormulaModal extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <DashboardContext.Consumer>
        {dashboardContext => (
          <Modal
            isOpen={dashboardContext.state.modalNormalizeFormula}
            className="px-3"
          >
            <ModalHeader toggle={dashboardContext.toggleModalNormalizeFormula}>
              <FormattedMessage id="modal.trial.normalize.title" />
            </ModalHeader>
            <ModalBody>
              <Row className="d-flex justify-content-center">
                <Col className="col-9 grey-text">
                  <Select
                    placeholder={`${this.props.intl.formatMessage({
                      id: 'modal.trial.normalize.select.placeHolder'
                    })}`}
                    value={dashboardContext.state.normalizationUnit}
                    onChange={item => {
                      dashboardContext.setState({
                        normalizationUnit: item,
                        normalizeFormulaValue: ''
                      });
                    }}
                    options={[
                      {
                        label: `${this.props.intl.formatMessage({
                          id: 'modal.trial.normalize.select.grams'
                        })}`,
                        value: 'grams'
                      },
                      {
                        label: `${this.props.intl.formatMessage({
                          id: 'modal.trial.normalize.select.percent'
                        })}`,
                        value: 'percent'
                      }
                    ]}
                  />

                  <Input
                    label={`${this.props.intl.formatMessage({
                      id: 'modal.trial.normalize.input.placeHolder'
                    })}`}
                    disabled={!dashboardContext.state.normalizationUnit}
                    icon="calculator"
                    type="text"
                    value={dashboardContext.state.normalizeFormulaValue}
                    maxLength={
                      dashboardContext.state.normalizationUnit &&
                      dashboardContext.state.normalizationUnit.value ===
                        'percent'
                        ? 2
                        : 5
                    }
                    onChange={event => {
                      let value = event.target.value;
                      value = value.replace(/\D/gi, '');
                      value = parseInt(value, 10) > 0 ? value : '';

                      dashboardContext.setState({
                        normalizeFormulaValue: value
                      });
                    }}
                    onKeyPress={event => {
                      const keyCode = event.which || event.keyCode;

                      if (
                        keyCode === 13 &&
                        dashboardContext.state.normalizationUnit &&
                        dashboardContext.state.normalizeFormulaValue
                      ) {
                        dashboardContext.handleNormalizeFormula();
                      }
                    }}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                color="cancel"
                onClick={dashboardContext.toggleModalNormalizeFormula}
              >
                <FormattedMessage id="modal.trial.normalize.button.cancel" />
              </Button>
              <Button
                disabled={
                  !dashboardContext.state.normalizationUnit ||
                  !dashboardContext.state.normalizeFormulaValue
                }
                onClick={dashboardContext.handleNormalizeFormula}
              >
                <FormattedMessage id="modal.trial.normalize.button.accept" />
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </DashboardContext.Consumer>
    );
  }
}

export default injectIntl(NormalizeFormulaModal);

NormalizeFormulaModal.propTypes = {
  intl: PropTypes.any
};
