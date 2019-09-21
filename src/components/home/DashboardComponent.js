import InputSwitch from 'components/commons/base/InputSwitch';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import HeaderComponent from 'components/commons/HeaderComponent';
import PanelComponent from 'components/commons/panels/PanelComponent';
import ClientDataComponent from 'components/home/ClientDataComponent';
import {
  setActiveTrial,
  getPositionActiveTrial,
  validateInputTrial,
  handleAddTrial,
  handleCellCss,
  handleCopyTrial,
  getAllTrials,
  getTrialsForSelect,
  setCompareToTrial,
  calculateTotal,
  handleSaveFormula,
  saveFormula,
  handleCloseModalZero,
  getTrialID,
  getCommentsActiveTrial,
  closeTrial,
  importTrialFromPersonalLib,
  toggleModalTrialName,
  getTrialByID,
  getColumnModified,
  getTrialTrialInformationByID,
  resetDashboard,
  toggleModalResetDashboard
} from 'components/home/TrialUtils';
import {
  toggleModalMaterials,
  handleAddMaterial,
  toggleModalImportFormula,
  toggleModalImportFormulaPersonalLib,
  handleImportFormula,
  toggleModalNormalizeFormula,
  handleNormalizeFormula,
  toggleModalComments,
  handleAddComments,
  toggleModalOfficialize,
  toggleModalValidateIFRA,
  toggleModalValidateIFRAResult,
  setIsValidIFRA,
  handleImportFormulaPersonalLib,
  handleDelMaterial
} from 'components/home/ModalsFunctions';
import { Button, Col, Row, Fa, Container, Input } from 'mdbreact';
import React from 'react';
import Select from 'react-select';
import FormulaService from 'services/FormulaService';
import TrialService from 'services/TrialService';
import LoginService, { Permisos } from 'services/LoginService';
import OfficializeFormulaModal from 'components/home/modals/OfficializeFormulaModal';
import ImportFormulaModal from 'components/home/modals/ImportFormulaModal';
import ImportFormulaPersonalLibModal from 'components/home/modals/ImportFormulaPersonalLibModal';
import NormalizeFormulaModal from 'components/home/modals/NormalizeFormulaModal';
import MaterialsModal from 'components/home/modals/MaterialsModal';
import CommentsTrialModal from 'components/home/modals/CommentsTrialModal';
import ValidateIFRAModal from 'components/home/modals/ValidateIFRAModal';
import EditTrialInfoModal from 'components/home/modals/EditTrialInfoModal';
import MaterialsZeroModal from 'components/home/modals/MaterialsZeroModal';
import { DashboardContext } from 'components/home/DashboardContext';
import DialogBox from 'components/commons/base/DialogBox';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

class DashboardComponent extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props);

    const urlParams = props.match.params;
    const requestID =
      urlParams && urlParams.id && urlParams.id > 0 ? urlParams.id : null;
    this.state = {
      rowData: [],
      isLoading: false,
      titleRequestNumber: '',
      materialsSelected: [],
      isRequestSelected: requestID !== null ? true : false,
      requestID: requestID,
      isUpdate: false,
      currentFocusUnsaved: null,
      rowDataUnsaved: null,
      trialsModalZero: [],
      columnDefs: [
        {
          headerName: '#',
          width: 80,
          valueGetter: params => {
            if (params.data && !params.data.isDataSummary) {
              return params.node.rowIndex + 1;
            }
            return null;
          }
        },
        {
          headerName: ' ',
          hide: true,
          cellRenderer: 'RemoveIconGridRenderer',
          onClick: (node, rowIndex) => {
            this.setState({
              nodeToDelete: node,
              matPositionToDelete: rowIndex,
              dialogBoxDeleteMaterial: true
            });
          },
          width: 35
        },
        {
          headerName: '',
          field: 'MpBanned',
          cellRenderer: 'MaterialBannedComponent',
          width: 50
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'dashboard.dataGrid.col.sun'
          })}`,
          field: 'CodSun',
          width: 70
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'dashboard.dataGrid.col.material'
          })}`,
          field: 'Materia',
          width: 400
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'dashboard.dataGrid.col.price'
          })}`,
          field: 'CostoUSD',
          width: 80,
          type: 'numeric',
          cellClass: 'green-cell-darker'
        }
      ],
      rowDataSummary: [
        {
          isDataSummary: true,
          CodSun: '',
          Materia: `${props.intl.formatMessage(
            {
              id: 'dashboard.dataGrid.col.expense'
            },
            {
              totalExpense: '0,00',
              expense: '0,00'
            }
          )}`,
          CostoUSD: `${props.intl.formatMessage({
            id: 'dashboard.dataGrid.col.total'
          })}`
        }
      ],
      rowClassRules: {
        'allergen-warning': function(params) {
          const allergen = params.data.Alergeno;
          return allergen === 'SI';
        }
      },
      selectedTrial: null,
      compareTo: null,
      modalMaterials: false,
      modalNormalizeFormula: false,
      modalImportFormula: false,
      modalImportFormulaPersonalLib: false,
      modalComments: false,
      modalOfficialize: false,
      modalValidateIFRA: false,
      modalValidateIFRAResult: false,
      materialTypeToImport: null,
      loadingFormulaInformation: false,
      loadingFormulaPersonalInformation: false,
      savingInformation: false,
      unsaved: false,
      formulaToImport: null,
      formulaToImportLvl: '1',
      formulaPersonalLibToImport: null,
      formulaPersonalLibToImportLvl: '0',
      isValidIFRA: false,
      formulaName: '',
      trialName: '',
      trialCost: '',
      trialCode: '',
      trialExpense: '',
      totalExpense: '',
      dialogBoxDeleteTrial: false,
      dialogBoxResetMaterials: false,
      dialogBoxDeleteMaterial: false,
      dialogBoxTrialName: false,
      dialogBoxMaterialsZero: false,
      trialIdToEdit: null,
      columnIdentifier: null,
      normalizeFormulaValue: '',
      trialsToPrint: []
    };

    this.gridOptions = {
      enableSorting: false,
      enableFilter: false,
      rowHeight: 23
    };

    this.gridSummaryOptions = {
      enableSorting: false,
      enableFilter: false
    };

    this.formulaService = new FormulaService();
    this.trialService = new TrialService();

    this.materialTypes = [
      {
        label: `${props.intl.formatMessage({
          id: 'dashboard.select.importComponent.material'
        })}`,
        value: 'MATERIAL',
        selected: true
      },
      {
        label: `${props.intl.formatMessage({
          id: 'dashboard.select.importComponent.formulaCramer'
        })}`,
        value: 'FORMULA'
      },
      {
        label: `${props.intl.formatMessage({
          id: 'dashboard.select.importComponent.formulaPersonal'
        })}`,
        value: 'FORMULA_LIB_PERSONAL'
      }
    ];

    this.trialCounter = 1;
    this.allowChangeOrderMaterials = false;
    this.gridApi = null;
    this.gridApiSummary = null;

    // PROFILE SETTINGS
    const loginService = new LoginService();
    this.profile = {
      access: loginService.checkPermission(Permisos.Dashboard),
      btnGuardar: loginService.checkPermission(Permisos.DashboardGuardar),
      btnIfra: loginService.checkPermission(Permisos.DashboardIfra)
    };

    this.setActiveTrial = setActiveTrial.bind(this);
    this.getPositionActiveTrial = getPositionActiveTrial.bind(this);
    this.validateInputTrial = validateInputTrial.bind(this);
    this.handleAddTrial = handleAddTrial;
    this.closeTrial = closeTrial.bind(this);
    this.handleCellCss = handleCellCss.bind(this);
    this.handleCopyTrial = handleCopyTrial.bind(this);
    this.getAllTrials = getAllTrials.bind(this);
    this.getTrialsForSelect = getTrialsForSelect.bind(this);
    this.setCompareToTrial = setCompareToTrial.bind(this);
    this.calculateTotal = calculateTotal.bind(this);
    this.toggleModalNormalizeFormula = toggleModalNormalizeFormula.bind(this);
    this.handleNormalizeFormula = handleNormalizeFormula.bind(this);
    this.toggleModalImportFormula = toggleModalImportFormula.bind(this);
    this.toggleModalImportFormulaPersonalLib = toggleModalImportFormulaPersonalLib.bind(
      this
    );
    this.handleImportFormula = handleImportFormula.bind(this);
    this.toggleModalMaterials = toggleModalMaterials.bind(this);
    this.handleAddMaterial = handleAddMaterial.bind(this);
    this.toggleModalComments = toggleModalComments.bind(this);
    this.handleAddComments = handleAddComments.bind(this);
    this.handleSaveFormula = handleSaveFormula.bind(this);
    this.saveFormula = saveFormula.bind(this);
    this.handleCloseModalZero = handleCloseModalZero.bind(this);
    this.getTrialID = getTrialID.bind(this);
    this.getCommentsActiveTrial = getCommentsActiveTrial.bind(this);
    this.toggleModalOfficialize = toggleModalOfficialize.bind(this);
    this.toggleModalValidateIFRA = toggleModalValidateIFRA.bind(this);
    this.toggleModalResetDashboard = toggleModalResetDashboard.bind(this);
    this.toggleModalValidateIFRAResult = toggleModalValidateIFRAResult.bind(
      this
    );
    this.setIsValidIFRA = setIsValidIFRA.bind(this);
    this.handleImportFormulaPersonalLib = handleImportFormulaPersonalLib.bind(
      this
    );
    this.handleDelMaterial = handleDelMaterial.bind(this);
    this.importTrialFromPersonalLib = importTrialFromPersonalLib.bind(this);
    this.toggleModalTrialName = toggleModalTrialName.bind(this);
    this.getTrialByID = getTrialByID.bind(this);
    this.getColumnModified = getColumnModified.bind(this);
    this.getTrialTrialInformationByID = getTrialTrialInformationByID.bind(this);
    this.resetDashboard = resetDashboard.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  onClickAddComponent = () => {
    const materialTypeToImport = this.state.materialTypeToImport;
    if (materialTypeToImport && materialTypeToImport.value === 'MATERIAL') {
      this.toggleModalMaterials();
    } else if (
      materialTypeToImport &&
      materialTypeToImport.value === 'FORMULA'
    ) {
      this.toggleModalImportFormula();
    } else if (
      materialTypeToImport &&
      materialTypeToImport.value === 'FORMULA_LIB_PERSONAL'
    ) {
      this.toggleModalImportFormulaPersonalLib();
    }
  };

  render() {
    const trialsOptions = this.getTrialsForSelect(null);

    const trialsOptionsToCompare = [];
    const selectedTrial = this.state.selectedTrial;

    trialsOptions.forEach(trial => {
      if (selectedTrial === null || trial.value !== selectedTrial.value) {
        trialsOptionsToCompare.push(trial);
      }
    });

    const emptyGrid =
      trialsOptions.length === 0 || this.state.rowData.length === 0;

    return (
      <DashboardContext.Provider value={this}>
        {/* Hidden div with print info */}

        <div className="dashboard">
          <HeaderComponent print={false} />

          {/* Dialogbox*/}
          <DialogBox
            showing={this.state.dialogBoxDeleteTrial}
            question={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.closeTrial'
            })}`}
            textAcceptButton={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.confirm'
            })}`}
            textCancelButton={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.cancel'
            })}`}
            accept={this.closeTrial}
            reject={() => {
              this.setState({
                dialogBoxDeleteTrial: false,
                trialIdToDelete: null
              });
            }}
          />

          <DialogBox
            showing={this.state.dialogBoxResetMaterials}
            question={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.resetDashboard'
            })}`}
            textAcceptButton={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.confirm'
            })}`}
            textCancelButton={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.cancel'
            })}`}
            accept={this.resetDashboard}
            reject={this.toggleModalResetDashboard}
          />

          <DialogBox
            showing={this.state.dialogBoxDeleteMaterial}
            question={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.deleteMaterial'
            })}`}
            textAcceptButton={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.confirm'
            })}`}
            textCancelButton={`${this.props.intl.formatMessage({
              id: 'dashboard.messages.cancel'
            })}`}
            accept={this.handleDelMaterial}
            reject={() => {
              this.setState({
                dialogBoxDeleteMaterial: false,
                matIdToDelete: null,
                nodeToDelete: null
              });
            }}
          />

          {/* Modal Materials Zero */}
          <MaterialsZeroModal
            isOpen={this.state.dialogBoxMaterialsZero}
            onSave={trialInformation => {
              this.saveFormula(
                trialInformation.trial,
                trialInformation.formulaObj
              );
            }}
            trialInformation={this.state.trialsModalZero}
            isClosed={trialInformation => {
              this.handleCloseModalZero(trialInformation);
            }}
          />

          {/* List of materials */}
          <MaterialsModal />

          {/* Normalize Formula */}
          <NormalizeFormulaModal />

          {/* Modal to Import*/}
          <ImportFormulaModal />

          {/* Modal to Import*/}
          <ImportFormulaPersonalLibModal />

          {/* Officialize Formula */}
          <OfficializeFormulaModal />

          {/* Add comments to active trial */}
          <CommentsTrialModal />

          {/* Validate IFRA to active trial */}
          <ValidateIFRAModal setIsValidIFRA={this.setIsValidIFRA} />

          {/* Edit trial name modal */}
          <EditTrialInfoModal
            toggle={this.toggleModalTrialName}
            isOpen={this.state.dialogBoxTrialName}
            onSave={trialInformation => {
              const trial = this.getTrialByID(this.state.trialIdToEdit);
              if (
                trial.trialName !== trialInformation.trialName ||
                trial.headerName !== trialInformation.trialCode ||
                trial.formulaName !== trialInformation.formulaName ||
                trial.trialCost !== trialInformation.trialCost ||
                trial.requestID !== trialInformation.requestCode
              ) {
                this.getColumnModified(trial.columnIdentifier);
              }
              trial.trialName = trialInformation.trialName || '';
              trial.headerName = trialInformation.trialCode;
              trial.formulaName = trialInformation.formulaName;
              trial.trialCost = trialInformation.trialCost;
              trial.requestID = trialInformation.requestCode
                ? trialInformation.requestCode
                : null;
              this.setState(
                {
                  trialCode: `${trialInformation.trialCode}`,
                  trialName: `${trialInformation.trialName}`,
                  formulaName: `${trialInformation.formulaName}`,
                  trialCost: `${trialInformation.trialCost}`,
                  columnDefs: this.state.columnDefs,
                  requestID: trialInformation.requestCode
                    ? trialInformation.requestCode
                    : null,
                  isUpdate: trialInformation.requestCode ? true : false,
                  isRequestSelected: trialInformation.requestCode ? true : false
                },
                () => {
                  this.calculateTotal();
                }
              );
            }}
            trialInformation={this.getTrialTrialInformationByID(
              this.state.trialIdToEdit
            )}
          />

          <Container className="noPrint" fluid={true}>
            {/* General info */}
            {this.state.isRequestSelected && this.state.requestID ? (
              <PanelComponent
                title={`${this.props.intl.formatMessage({
                  id: 'dashboard.clientData.panel.title'
                })}`}
                titleID={this.state.requestID}
              >
                <ClientDataComponent
                  isRequestSelected={this.state.isRequestSelected}
                  requestID={this.state.requestID}
                  isUpdate={this.state.isUpdate}
                  isReady={() => {
                    this.setState({
                      isUpdate: false
                    });
                  }}
                />
              </PanelComponent>
            ) : null}
          </Container>
          <Container className="noPrint" fluid={true}>
            {/* Dashboard actions */}
            <Row className="my-2">
              <Col className="col-12">
                {
                  this.profile.btnIfra ? (
                  <Button
                    size="md"
                    color="cyan"
                    disabled={
                      emptyGrid || this.getTrialID() === null ? true : false
                    }
                    onClick={this.toggleModalValidateIFRA}
                  >
                    <Fa icon="lock" />{' '}
                    <FormattedMessage id="dashboard.button.ifra" />
                  </Button>
                  ) : null
                }
                {
                  //this.state.isRequestSelected ? (
                  <Button
                    size="md"
                    color="cyan"
                    disabled={
                      emptyGrid || this.getTrialID() === null
                        ? true
                        : false || !this.state.isValidIFRA
                    }
                    onClick={this.toggleModalOfficialize}
                  >
                    <Fa icon="check" />{' '}
                    <FormattedMessage id="dashboard.button.officialize" />
                  </Button>
                  //) : null
                }
{/* 
                <Button
                  size="md"
                  color="cyan"
                  disabled={emptyGrid || this.state.trialsToPrint.length === 0}
                  className={
                    emptyGrid || this.state.trialsToPrint.length === 0
                      ? ''
                      : 'trial-print'
                  }
                >
                  <Fa icon="print" />{' '}
                  <FormattedMessage id="dashboard.button.print" />
                </Button> */}

                <div className="d-inline-block col-3">
                  {/* <Select
                    isDisabled={emptyGrid}
                    placeholder={`${this.props.intl.formatMessage({
                      id: 'dashboard.select.trial.print'
                    })}`}
                    isMulti={true}
                    value={this.state.trialsToPrint}
                    onChange={item => {
                      this.setState({
                        trialsToPrint: item
                      });
                    }}
                    options={
                      trialsOptions && trialsOptions.length > 0
                        ? trialsOptions
                        : []
                    }
                  /> */}
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="noPrint" fluid={true}>
            {/* Grid */}

            <PanelComponent
              title={<FormattedMessage id="dashboard.panel.title" />}
              className="mb-2"
            >
              <Row className="pb-1">
                <Col className="col-2">
                  <FormattedMessage id="dashboard.field.formulaName">
                    {text => (
                      <Input
                        readOnly={true}
                        label={text}
                        value={this.state.formulaName}
                        onChange={item => {
                          this.setState({
                            formulaName: item.target.value
                          });
                        }}
                      />
                    )}
                  </FormattedMessage>
                </Col>

                <Col className="col-2">
                  <FormattedMessage id="dashboard.field.trialName">
                    {text => (
                      <Input
                        readOnly={true}
                        label={text}
                        value={this.state.trialName}
                        onChange={item => {
                          this.setState({
                            trialName: item.target.value
                          });
                        }}
                      />
                    )}
                  </FormattedMessage>
                </Col>

                <Col className="col-1">
                  <InputSwitch
                    onChange={event => {
                      this.allowChangeOrderMaterials = event.target.checked;

                      const columnDefs = this.state.columnDefs;

                      columnDefs[0].rowDrag = this.allowChangeOrderMaterials;
                      columnDefs[1].hide = !this.allowChangeOrderMaterials;

                      this.setState({
                        columnDefs: columnDefs
                      });
                    }}
                    title={
                      <FormattedMessage id="dashboard.field.editMaterials" />
                    }
                    value={this.allowChangeOrderMaterials}
                  />
                </Col>

                <Col className="col-4 btn-group-add-components">
                  <span>
                    <FormattedMessage id="dashboard.label.addComponents" />
                  </span>
                  <div className="btn-group">
                    <Button
                      color="primary"
                      size="sm"
                      className="rounded-left"
                      onClick={() => {
                        this.setState(
                          {
                            materialTypeToImport: this.materialTypes[0]
                          },
                          () => {
                            this.onClickAddComponent();
                          }
                        );
                      }}
                    >
                      {this.materialTypes[0].label}
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        this.setState(
                          {
                            materialTypeToImport: this.materialTypes[1]
                          },
                          () => {
                            this.onClickAddComponent();
                          }
                        );
                      }}
                    >
                      {this.materialTypes[1].label}
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      className="rounded-right"
                      onClick={() => {
                        this.setState(
                          {
                            materialTypeToImport: this.materialTypes[2]
                          },
                          () => {
                            this.onClickAddComponent();
                          }
                        );
                      }}
                    >
                      {this.materialTypes[2].label}
                    </Button>
                  </div>
                </Col>

                <Col className="col-3 row">
                  <div className="col">
                    <small className="d-inline-block">
                      <FormattedMessage id="dashboard.label.selectedTrial" />
                    </small>
                    <Select
                      className="select-green select-custom"
                      classNamePrefix="select-green"
                      isDisabled={emptyGrid}
                      placeholder={`${this.props.intl.formatMessage({
                        id: 'dashboard.select.trial.select'
                      })}`}
                      value={this.state.selectedTrial}
                      onChange={item => {
                        const currentSelectedTrial = this.state.selectedTrial;
                        if (
                          item &&
                          item.value &&
                          item.value !== currentSelectedTrial.value
                        ) {
                          this.setState({
                            compareTo: null
                          });
                          this.setActiveTrial(item);
                        }
                      }}
                      options={
                        trialsOptions && trialsOptions.length > 0
                          ? trialsOptions
                          : []
                      }
                    />
                  </div>
                  <div className="col">
                    <small className="d-inline-block">
                      <FormattedMessage id="dashboard.label.compareTrial" />
                    </small>
                    <Select
                      className="select-blue select-custom"
                      classNamePrefix="select-blue"
                      isDisabled={
                        trialsOptionsToCompare === null ||
                        trialsOptionsToCompare.length === 0
                      }
                      placeholder={`${this.props.intl.formatMessage({
                        id: 'dashboard.select.trial.select'
                      })}`}
                      value={this.state.compareTo}
                      isClearable={true}
                      onChange={item => {
                        this.setState(
                          {
                            compareTo: item
                          },
                          () => {
                            if (item !== null) {
                              this.setCompareToTrial(item);
                            }
                          }
                        );
                      }}
                      options={
                        trialsOptionsToCompare &&
                        trialsOptionsToCompare.length > 0
                          ? trialsOptionsToCompare
                          : []
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-right tabGrid">
                  <Button
                    className="btnSimple"
                    color="primary"
                    size="sm"
                    onClick={() =>
                      new Promise(
                        this.handleAddTrial.bind(
                          this,
                          null,
                          null,
                          this.state.requestID,
                          false,
                          false
                        )
                      )
                    }
                  >
                    <Fa icon="plus" />{' '}
                    <FormattedMessage id="dashboard.button.addTrial" />
                  </Button>

                  <Button
                    className="btnSimple"
                    color="primary"
                    size="sm"
                    onClick={() => new Promise(this.handleCopyTrial)}
                  >
                    <Fa icon="copy" />{' '}
                    <FormattedMessage id="dashboard.button.dupTrial" />
                  </Button>

                  <Button
                    className="btnSimple"
                    disabled={emptyGrid}
                    color="primary"
                    size="sm"
                    onClick={this.toggleModalNormalizeFormula}
                  >
                    <Fa icon="calculator" />{' '}
                    <FormattedMessage id="dashboard.button.normalize" />
                  </Button>

                  <Button
                    className="btnSimple"
                    color="primary"
                    onClick={this.toggleModalResetDashboard}
                    size="sm"
                    disabled={this.state.savingInformation || emptyGrid}
                  >
                    <Fa icon="redo" />{' '}
                    <FormattedMessage id="dashboard.button.reset" />
                  </Button>

                  <Button
                    className="btnSimple"
                    disabled={emptyGrid}
                    color="primary"
                    size="sm"
                    onClick={this.toggleModalComments}
                    title={'Agregar observaciones al tríal activo'}
                  >
                    <Fa icon="comment" />{' '}
                    <FormattedMessage id="dashboard.button.addObs" />
                  </Button>
                </Col>
              </Row>
              <Row className="h-100">
                <DataGridComponent
                  classContainer="grid-container"
                  isLoading={this.state.isLoading}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  forceLoadColumns={true}
                  onGridLoad={params => {
                    this.gridApi = params.api;

                    this.importTrialFromPersonalLib();
                  }}
                  onCellValueChanged={data => {
                    if (data.newValue !== data.oldValue) {
                      this.calculateTotal(data.colDef.columnIdentifier);
                    } else {
                      this.calculateTotal();
                    }
                  }}
                  onRowDragEnd={params => {
                    const rowsToDisplay = params.node.rowModel.rowsToDisplay;
                    const rowData = [];

                    rowsToDisplay.forEach(node => {
                      rowData.push(node.data);
                    });

                    this.setState({
                      rowData: rowData
                    });
                  }}
                  rowClassRules={this.state.rowClassRules}
                  gridOptions={this.gridOptions}
                />
              </Row>
              <Row>
                <DataGridComponent
                  classContainer="grid-footer"
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowDataSummary}
                  forceLoadColumns={true}
                  onGridLoad={params => {
                    this.gridApiSummary = params.api;
                  }}
                  headerHeight="0"
                  rowStyle={{ fontWeight: 'bold' }}
                  gridOptions={this.gridSummaryOptions}
                />
              </Row>
            </PanelComponent>
          </Container>
        </div>
      </DashboardContext.Provider>
    );
  }
}

export default injectIntl(DashboardComponent);

DashboardComponent.propTypes = {
  match: PropTypes.any,
  location: PropTypes.object,
  intl: PropTypes.any
};
