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
import { FormattedMessage } from 'react-intl';
import PersonalLibraryImportComponent from 'components/personalLibrary/PersonalLibraryImportComponent';
import { DashboardContext } from 'components/home/DashboardContext';

export default class ImportFormulaPersonalLibModal extends React.Component {
  render() {
    return (
      <DashboardContext.Consumer>
        {dashboardContext => {
          const emptyFormulaToImport =
            !dashboardContext.state.formulaPersonalLibToImport ||
            dashboardContext.state.loadingFormulaPersonalInformation;

          this.toggleModalOfficialize = dashboardContext.toggleModalOfficialize;
          return (
            <Modal
              isOpen={dashboardContext.state.modalImportFormulaPersonalLib}
              toggle={dashboardContext.toggleModalImportFormulaPersonalLib}
              className="px-3"
              size="fluid"
            >
              <ModalHeader
                toggle={dashboardContext.toggleModalImportFormulaPersonalLib}
              >
                Importar fórmula librería personal
              </ModalHeader>
              <ModalBody>
                <PersonalLibraryImportComponent
                  isFormSelector
                  onSelect={formula => {
                    dashboardContext.setState({
                      formulaPersonalLibToImport:
                        formula && formula[0] ? formula[0] : null
                    });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Row>
                  <Col>
                    <Button
                      className="float-right btn-import"
                      disabled={emptyFormulaToImport}
                      onClick={dashboardContext.handleImportFormulaPersonalLib}
                    >
                      {!dashboardContext.state
                        .loadingFormulaPersonalInformation ? (
                        'Importar'
                      ) : (
                        <Fa icon="spinner" className="fa-spin" />
                      )}
                    </Button>

                    <div className="float-right btn-lvl">
                      <label className="pr-3">
                        <FormattedMessage id="modal.formulaPersonalLib.footer.label.level" />
                      </label>
                      <div
                        className="btn-group mr-2"
                        role="group"
                        aria-label="First group"
                      >
                        <Button
                          disabled={emptyFormulaToImport}
                          color="primary"
                          className={classNames({
                            'rounded-left': true,
                            active:
                              dashboardContext.state
                                .formulaPersonalLibToImportLvl === '0'
                          })}
                          onClick={() => {
                            dashboardContext.setState({
                              formulaPersonalLibToImportLvl: '0'
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
                              dashboardContext.state
                                .formulaPersonalLibToImportLvl === '1'
                          })}
                          onClick={() => {
                            dashboardContext.setState({
                              formulaPersonalLibToImportLvl: '1'
                            });
                          }}
                        >
                          1
                        </Button>
                      </div>
                    </div>
                    <Button
                      color="cancel"
                      className="float-right btn-import"
                      onClick={
                        dashboardContext.toggleModalImportFormulaPersonalLib
                      }
                    >
                      <FormattedMessage id="modal.trial.edit.button.cancel" />
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
