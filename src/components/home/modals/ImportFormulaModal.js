import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Fa,
  Row,
  Col,
  Button
} from 'mdbreact';
import classNames from 'classnames';
import FormulaComponent from 'components/formulas/FormulaComponent';
import { DashboardContext } from 'components/home/DashboardContext';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

class ImportFormulaModal extends React.Component {
  render() {
    return (
      <DashboardContext.Consumer>
        {dashboardContext => {
          const {
            formulaToImport,
            loadingFormulaInformation
          } = dashboardContext.state;
          const emptyFormulaToImport =
            !formulaToImport || loadingFormulaInformation;

          const isFormulaExperimental =
            formulaToImport && formulaToImport.NumVersion === '0';

          this.toggleModalOfficialize = dashboardContext.toggleModalOfficialize;
          return (
            <Modal
              isOpen={dashboardContext.state.modalImportFormula}
              className="px-3"
              size="fluid"
            >
              <ModalHeader toggle={dashboardContext.toggleModalImportFormula}>
                <FormattedMessage id="modal.formula.title" />
              </ModalHeader>
              <ModalBody>
                <FormulaComponent
                  isFormSelector
                  onSelect={formula => {
                    dashboardContext.setState({
                      formulaToImportLvl: '1',
                      formulaToImport: formula && formula[0] ? formula[0] : null
                    });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Row>
                  <Col>
                    <Button
                      disabled={emptyFormulaToImport}
                      onClick={dashboardContext.handleImportFormula}
                      className="float-right btn-import"
                    >
                      {!dashboardContext.state.loadingFormulaInformation ? (
                        <FormattedMessage id="modal.formula.footer.button.accept" />
                      ) : (
                        <Fa icon="spinner" className="fa-spin" />
                      )}
                    </Button>
                    <div className="float-right btn-lvl">
                      <label className="pr-3">
                        <FormattedMessage id="modal.formula.footer.label.level" />
                      </label>
                      <div
                        className="btn-group mr-2"
                        role="group"
                        aria-label="First group"
                      >
                        <Button
                          disabled={
                            emptyFormulaToImport || isFormulaExperimental
                          }
                          color="primary"
                          className={classNames({
                            'rounded-left': true,
                            active:
                              dashboardContext.state.formulaToImportLvl === '0'
                          })}
                          onClick={() => {
                            dashboardContext.setState({
                              formulaToImportLvl: '0'
                            });
                          }}
                        >
                          0
                        </Button>
                        <Button
                          disabled={emptyFormulaToImport}
                          color="primary"
                          className={classNames({
                            active:
                              dashboardContext.state.formulaToImportLvl === '1'
                          })}
                          onClick={() => {
                            dashboardContext.setState({
                              formulaToImportLvl: '1'
                            });
                          }}
                        >
                          1
                        </Button>
                        <Button
                          disabled={emptyFormulaToImport}
                          color="primary"
                          className={classNames({
                            'rounded-right': true,
                            active:
                              dashboardContext.state.formulaToImportLvl === 'N'
                          })}
                          onClick={() => {
                            dashboardContext.setState({
                              formulaToImportLvl: 'N'
                            });
                          }}
                        >
                          N
                        </Button>
                      </div>
                    </div>
                    <Button
                      color="cancel"
                      className="float-right btn-import"
                      onClick={dashboardContext.toggleModalImportFormula}
                    >
                      <FormattedMessage id="modal.formula.footer.button.cancel" />
                    </Button>
                  </Col>
                </Row>
              </ModalFooter>
            </Modal>
          );
        }}
      </DashboardContext.Consumer>
    );
  }
}

export default injectIntl(ImportFormulaModal);

ImportFormulaModal.propTypes = {
  intl: PropTypes.any
};
