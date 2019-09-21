import { Button, Col, Container, Fa, Input, Row } from 'mdbreact';
import React from 'react';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import PanelComponent from 'components/commons/panels/PanelComponent';
import Constantes from 'Constantes';
import HeaderComponent from 'components/commons/HeaderComponent';
import TrialService from 'services/TrialService';
import FormulaService from 'services/FormulaService';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import OfficializeFormulaModal from 'components/home/modals/OfficializeFormulaModal';
import ValidateIFRAModal from 'components/home/modals/ValidateIFRAModal';
import CommentsTrialLibPersonalModal from 'components/personalLibrary/modals/CommentsTrialLibPersonalModal';
import ShareTrialLibPersonalModal from 'components/personalLibrary/modals/ShareTrialLibPersonalModal';
import { DashboardContext } from 'components/home/DashboardContext';
import LoadingComponent from 'components/commons/base/LoadingComponent';
import DialogBox from 'components/commons/base/DialogBox';
import DialogBoxImportFormula from 'components/personalLibrary/modals/DialogBoxImportFormula';
import FormulaDetail from 'components/personalLibrary/modals/FormulaDetail';
import PersonalLibDetail from 'components/personalLibrary/modals/PersonalLibDetail';
import {
  getTrialID,
  onClickAddFormula,
  onClickDetailTrial,
  onClickValidateIFRA,
  onClickGenExp,
  onClickAddComments,
  onClickDeleteTrial,
  onShareTrial,
  searchTrials,
  handleClickBtnSearch,
  onRowClicked,
  toggleModalPersonalLibDetail,
  toggleModalDetFormula,
  toggleModalValidateIFRA,
  toggleModalOfficialize,
  toggleModalValidateIFRAResult,
  setIsValidIFRA,
  toggleModalComments,
  saveTrialDetails,
  importOnDashboard,
  toggleDialogBoxImportOldTrial,
  redirectToImport,
  getItemByKey,
  toggleModalShareTrial
} from 'components/personalLibrary/PersonalLibFunctions';
import Select from 'react-select';
import { FormattedMessage, injectIntl } from 'react-intl';
import LegendComponent from 'components/commons/base/LegendComponent';

class PersonalLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nroMuestra: null,
      nombreCliente: null,
      selectedFormula: [],
      modalSelectedFormula: false,
      id: parseInt(Math.random() * 1000000, 10),
      pagination: {
        PageIndex: 1,
        RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
      },
      columnDefs: [
        {
          cellRenderer: 'AddMaterialButtonRenderer',
          onClick: onClickAddFormula.bind(this),
          suppressSorting: true,
          suppressMenu: true,
          suppressFilter: true,
          headerName: '#',
          width: 55
        },
        {
          headerName: '',
          field: 'MpBanned',
          cellRenderer: 'MaterialBannedComponent',
          cellRendererParams: {
            type: 2
          },
          width: 50
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.trialCode'
          })}`,
          field: 'CodigoTrial',
          width: 130
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.trialName'
          })}`,
          field: 'NombreTrial',
          width: 280
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.sample'
          })}`,
          field: 'IdSolicitud',
          width: 90
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.createdAt'
          })}`,
          field: 'FechaCreacion',
          type: 'date',
          width: 110
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.delegate'
          })}`,
          field: 'NombreDelegado',
          width: 100,
          suppressFilter: true
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.formulaName'
          })}`,
          field: 'NombreFormula',
          width: 200
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.codExp'
          })}`,
          field: 'CodigoExperimental',
          width: 140
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.trialCost'
          })}`,
          field: 'GastoTrial',
          width: 70
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.cost'
          })}`,
          field: 'CostoUSD',
          width: 80
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.country'
          })}`,
          field: 'Pais',
          width: 65
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.detail'
          })}`,
          field: 'CodFormula',
          cellRenderer: 'DetailButtonGridRenderer',
          onClick: onClickDetailTrial.bind(this),
          width: 80,
          suppressFilter: true
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.ifra'
          })}`,
          field: 'CodFormula',
          cellRenderer: 'ValidateIfraButtonGridRenderer',
          onClick: onClickValidateIFRA.bind(this),
          width: 60,
          suppressFilter: true
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.obs'
          })}`,
          field: 'CodFormula',
          cellRenderer: 'CommentsButtonGridRenderer',
          onClick: onClickAddComments.bind(this),
          width: 70,
          suppressFilter: true
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.genExperimental'
          })}`,
          field: 'CodFormula',
          cellRenderer: 'GenerateExpButtonGridRenderer',
          onClick: onClickGenExp.bind(this),
          width: 75,
          suppressFilter: true
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.delete'
          })}`,
          cellRenderer: 'RemoveButtonGridRenderer',
          onClick: onClickDeleteTrial.bind(this),
          width: 75,
          suppressFilter: true
        },
        {
          headerName: `${props.intl.formatMessage({
            id: 'trial.panel.datagrid.col.share'
          })}`,
          cellRenderer: 'ShareButtonGridRenderer',
          onClick: onShareTrial.bind(this),
          width: 75,
          suppressFilter: true
        }
      ],
      rowData: [],
      nombreFormula: '',
      codTrial: '',
      nombreTrial: '',
      nombreDelegado: '',
      myFormulas: true,
      filter: {
        nombreFormula: '',
        codTrial: '',
        nombreTrial: '',
        nombreDelegado: '',
        myFormulas: true
      },
      defaultColDef: {
        enableValue: true,
        enableRowGroup: true,
        enablePivot: true
      },
      modalDetFormula: false,
      loadingFormulaInformation: false,
      loadingDetFormulaInformation: false,
      formulaData: {
        rows: []
      },
      modalOfficialize: false,
      modalValidateIFRA: false,
      modalValidateIFRAResult: false,
      modalComments: false,
      /* Details formula */
      detIdTrial: '',
      detCodFormula: '',
      detNameFormula: '',
      detNameTrial: '',
      detVersionFormula: '',
      detTriangleTop: '',
      detTriangleMiddle: '',
      detTriangleBottom: '',
      detFamilyCategory: '',
      detFamilySubCategory: '',
      detFamilySubSubCategory: '',
      detObservations: [],
      dialogBoxDeleteTrial: false,
      dialogBoxImportOldTrial: false,
      trialIdToDelete: null,
      isLoading: false,
      isImportingFormula: false,
      categoryFamilyList: [],
      categorySubFamilyList: [],
      modalShareTrial: false
    };

    this.getTrialID = getTrialID.bind(this);
    this.searchTrials = searchTrials.bind(this);
    this.handleClickBtnSearch = handleClickBtnSearch.bind(this);
    this.onRowClicked = onRowClicked.bind(this);
    this.toggleModalPersonalLibDetail = toggleModalPersonalLibDetail.bind(this);
    this.toggleModalDetFormula = toggleModalDetFormula.bind(this);
    this.toggleModalValidateIFRA = toggleModalValidateIFRA.bind(this);
    this.toggleModalOfficialize = toggleModalOfficialize.bind(this);
    this.toggleModalValidateIFRAResult = toggleModalValidateIFRAResult.bind(
      this
    );
    this.setIsValidIFRA = setIsValidIFRA.bind(this);
    this.toggleModalComments = toggleModalComments.bind(this);
    this.saveTrialDetails = saveTrialDetails.bind(this);
    this.importOnDashboard = importOnDashboard.bind(this);
    this.redirectToImport = redirectToImport.bind(this);
    this.toggleDialogBoxImportOldTrial = toggleDialogBoxImportOldTrial.bind(
      this
    );
    this.getItemByKey = getItemByKey.bind(this);
    this.toggleModalShareTrial = toggleModalShareTrial.bind(this);

    this.trialService = new TrialService();
    this.formulaService = new FormulaService();
  }

  componentDidMount() {
    this.formulaService.getFamily().then(
      response => {
        const data = response.data;

        if (data !== null && data.length > 0) {
          const categoryFamilyList = [];

          data.forEach(item => {
            categoryFamilyList.push({
              label: item.Descripcion,
              value: item.Codigo
            });
          });

          this.setState({
            categoryFamilyList
          });
        }
      },
      response => {
        console.error(response);
      }
    );

    this.formulaService.getSubFamily().then(
      response => {
        const data = response.data;

        if (data !== null && data.length > 0) {
          const categorySubFamilyList = [];

          data.forEach(item => {
            categorySubFamilyList.push({
              label: item.Descripcion,
              value: item.Codigo
            });
          });

          this.setState({
            categorySubFamilyList
          });
        }
      },
      response => {
        console.error(response);
      }
    );

    this.handleClickBtnSearch();
  }

  render() {
    return (
      <DashboardContext.Provider value={this}>
        <PersonalLibDetail
          isOpen={this.state.modalSelectedFormula}
          toggle={this.toggleModalPersonalLibDetail}
        />
        {/* Dialogbox confirm delete*/}
        <DialogBox
          showing={this.state.dialogBoxDeleteTrial}
          question={`${this.props.intl.formatMessage({
            id: 'dashboard.messages.deleteTrial'
          })}`}
          textAcceptButton={`${this.props.intl.formatMessage({
            id: 'dashboard.messages.confirm'
          })}`}
          textCancelButton={`${this.props.intl.formatMessage({
            id: 'dashboard.messages.cancel'
          })}`}
          accept={() => {
            const trialID = this.state.trialIdToDelete;

            this.trialService.removeTrial(trialID).then(
              () => {
                this.searchTrials();
                toast.success(
                  `${this.props.intl.formatMessage({
                    id: 'dashboard.messages.successsDeleteTrial'
                  })}`
                );
              },
              error => {
                const { response } = error;
                if (response && response.status === 412) {
                  toast.error(
                    `${this.props.intl.formatMessage({
                      id: 'dashboard.messages.deleteTrialNotAllowed'
                    })}`
                  );
                }
                console.error('Ocurrió un error al eliminar el trial');
              }
            );

            this.setState({
              dialogBoxDeleteTrial: false,
              trialIdToDelete: null
            });
          }}
          reject={() => {
            this.setState({
              dialogBoxDeleteTrial: false,
              trialIdToDelete: null
            });
          }}
        />

        {/* Dialogbox confirm import*/}
        <DialogBoxImportFormula
          showing={this.state.dialogBoxImportOldTrial}
          question={
            'Estas intentando importar una versión anterior de la fórmula. ¿Que versión deseas importar?'
          }
          textImportSelectedButton={'Versión seleccionada'}
          textImportNewButton={'Última versión'}
          textCancelButton={'Cancelar'}
          oldVersion={() => {
            const selectedRows = this.state.selectedFormula;

            const trialInformation = selectedRows[0];
            const idSolicitud = trialInformation.IdSolicitud;
            const idTrial = trialInformation.IdTrial;
            const numVersion = trialInformation.NumVersion;

            this.redirectToImport({
              idSolicitud,
              idTrial,
              importFormulaIdCodFormula: null,
              numVersion,
              oldVersion: true
            });
          }}
          newVersion={() => {
            const {
              importFormulaIdSolicitud,
              importFormulaIdTrial,
              importFormulaNombreFormula,
              importFormulaIdCodFormula,
              importFormulaLastVersion
            } = this.state;

            this.redirectToImport({
              idSolicitud: importFormulaIdSolicitud,
              idTrial: importFormulaIdTrial,
              nombreFormulaToImport: importFormulaNombreFormula,
              codFormulaToImport: importFormulaIdCodFormula,
              versionToImport: importFormulaLastVersion,
              oldVersion: false
            });
          }}
          cancel={() => {
            this.toggleDialogBoxImportOldTrial();
          }}
        />

        <Container fluid={true}>
          {/* Formula detail */}
          <FormulaDetail />

          {/* Officialize Formula */}
          <OfficializeFormulaModal />

          {/* Validate IFRA to active trial */}
          <ValidateIFRAModal setIsValidIFRA={this.setIsValidIFRA} />

          {/* Add comments to active trial */}
          <CommentsTrialLibPersonalModal />

          {/* Add comments to active trial */}
          <ShareTrialLibPersonalModal
            trialIdToShare={this.state.trialIdToShare}
            modalShareTrial={this.state.modalShareTrial}
            toggleModalShareTrial={() => {
              this.setState(
                {
                  modalShareTrial: false,
                  trialIdToShare: null
                },
                () => {
                  this.toggleModalShareTrial();
                }
              );
            }}
            shareTrial={() => {
              this.setState(
                {
                  modalShareTrial: false,
                  trialIdToShare: null
                },
                () => {
                  this.handleClickBtnSearch();
                }
              );
            }}
          />

          {!this.props.isFormSelector ? <HeaderComponent /> : null}
          <Row className="my-1">
            <Col>
              <PanelComponent
                title={<FormattedMessage id="trial.panel.search.title" />}
              >
                <Row>
                  <Col className="col-md-1">
                    <FormattedMessage id="trial.panel.input.trialCode">
                      {text => (
                        <Input
                          label={text}
                          size="sm"
                          onChange={event => {
                            const value = event.target.value;
                            this.setState({
                              codTrial: value
                            });
                          }}
                          onKeyPress={event => {
                            const keyCode = event.which || event.keyCode;

                            if (keyCode === 13) {
                              this.handleClickBtnSearch();
                            }
                          }}
                          value={this.state.codTrial}
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="col-md-2">
                    <FormattedMessage id="trial.panel.input.trialName">
                      {text => (
                        <Input
                          label={text}
                          size="sm"
                          onChange={event => {
                            const value = event.target.value;
                            this.setState({
                              nombreTrial: value
                            });
                          }}
                          onKeyPress={event => {
                            const keyCode = event.which || event.keyCode;

                            if (keyCode === 13) {
                              this.handleClickBtnSearch();
                            }
                          }}
                          value={this.state.nombreTrial}
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="col-md-1">
                    <FormattedMessage id="trial.panel.input.solicitud">
                      {text => (
                        <Input
                          label={text}
                          size="sm"
                          onChange={event => {
                            const value = event.target.value;
                            this.setState({
                              IdSolicitud: value
                            });
                          }}
                          onKeyPress={event => {
                            const keyCode = event.which || event.keyCode;

                            if (keyCode === 13) {
                              this.handleClickBtnSearch();
                            }
                          }}
                          value={this.state.IdSolicitud}
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="col-md-2">
                    <FormattedMessage id="trial.panel.input.created">
                      {text => (
                        <Input
                          label={text}
                          size="sm"
                          onChange={event => {
                            const value = event.target.value;
                            this.setState({
                              FechaCreacion: value
                            });
                          }}
                          onKeyPress={event => {
                            const keyCode = event.which || event.keyCode;

                            if (keyCode === 13) {
                              this.handleClickBtnSearch();
                            }
                          }}
                          value={this.state.FechaCreacion}
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="col-md-1">
                    <FormattedMessage id="trial.panel.input.delegate">
                      {text => (
                        <Input
                          label={text}
                          size="sm"
                          onKeyPress={event => {
                            const keyCode = event.which || event.keyCode;

                            if (keyCode === 13) {
                              this.handleClickBtnSearch();
                            }
                          }}
                          onChange={event => {
                            const value = event.target.value;
                            this.setState({
                              nombreDelegado: value
                            });
                          }}
                          value={this.state.nombreDelegado}
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="col-md-2">
                    <FormattedMessage id="trial.panel.input.formulaName">
                      {text => (
                        <Input
                          label={text}
                          size="sm"
                          onChange={event => {
                            const value = event.target.value;
                            this.setState({
                              nombreFormula: value
                            });
                          }}
                          onKeyPress={event => {
                            const keyCode = event.which || event.keyCode;

                            if (keyCode === 13) {
                              this.handleClickBtnSearch();
                            }
                          }}
                          value={this.state.nombreFormula}
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="col-md-1">
                    <FormattedMessage id="trial.panel.input.myFormulas">
                      {text => (
                        <Input
                          id="myFormulas"
                          label={text}
                          type="checkbox"
                          checked={this.state.myFormulas}
                          onChange={() =>
                            new Promise(() => {
                              this.setState({
                                myFormulas: !this.state.myFormulas
                              });
                            })
                          }
                        />
                      )}
                    </FormattedMessage>
                  </Col>
                  <Col className="d-flex justify-content-end p-3">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={this.handleClickBtnSearch}
                      disabled={this.state.isLoading}
                    >
                      <FormattedMessage id="trial.panel.input.search" />
                    </Button>
                  </Col>
                </Row>
              </PanelComponent>
            </Col>
          </Row>

          <Row className="my-2">
            <Col>
              <PanelComponent
                title={<FormattedMessage id="trial.panel.trialList.title" />}
              >
                <Row className="d-flex justify-content-end mr-3">
                  <Button
                    size="sm"
                    disabled={this.state.selectedFormula.length === 0}
                    className="float-right my-3"
                    color="primary"
                    onClick={() => {
                      this.toggleModalPersonalLibDetail();
                    }}
                  >
                    <FormattedMessage id="modal.personalLib.button.selectedMaterials" />
                    {'  '}
                    <h6 className="d-inline-block ml-1">
                      <span className="badge badge-light">
                        {this.state.selectedFormula.length}
                      </span>
                    </h6>
                  </Button>

                  <Button
                    size="sm"
                    disabled={
                      !this.state.selectedFormula ||
                      this.state.selectedFormula.length === 0
                    }
                    className="float-right my-3"
                    onClick={this.importOnDashboard}
                  >
                    {!this.state.isImportingFormula ? (
                      <span>
                        <FormattedMessage id="trial.panel.input.openTrial" />
                      </span>
                    ) : (
                      <Fa icon="spinner" className="fa-spin" />
                    )}
                  </Button>
                </Row>

                <DataGridComponent
                  isLoading={this.state.isLoading}
                  classContainer="grid-container"
                  onGridLoad={params => {
                    this.gridApi = params.api;
                  }}
                  onPaginationChange={pagination => {
                    this.setState(
                      {
                        pagination: pagination
                      },
                      () => {
                        this.searchTrials();
                      }
                    );
                  }}
                  animateRows={true}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  pagination={this.state.pagination}
                  rowSelection={'single'}
                  enableColResize={true}
                  onRowClicked={this.onRowClicked}
                />
                <LegendComponent icon="fa-ban" legend={'legend.ban.form.mp'} />
                <LegendComponent
                  icon="alergen-free"
                  legend={'legend.alergen.al.free'}
                />
              </PanelComponent>
            </Col>
          </Row>
          <Row className="mt-2 mb-5">
            <Col>
              <PanelComponent
                title={<FormattedMessage id="trial.panel.trialDetail.title" />}
              >
                <React.Fragment>
                  <LoadingComponent
                    loading={this.state.loadingDetFormulaInformation}
                  />
                  <Row>
                    <Col className="col-3">
                      <Input
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.panel.datagrid.col.trialCode'
                        })}`}
                        readOnly={true}
                        value={this.state.detCodFormula}
                        onChange={item => {
                          this.setState({
                            detCodFormula: item.target.value
                          });
                        }}
                      />
                    </Col>
                    <Col className="col-3">
                      <Input
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.panel.datagrid.col.formulaName'
                        })}`}
                        value={this.state.detNameFormula}
                        onChange={item => {
                          this.setState({
                            detNameFormula: item.target.value
                          });
                        }}
                      />
                    </Col>
                    <Col className="col-3">
                      <Input
                        readOnly={true}
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.formulaName'
                        })}`}
                        value={this.state.detNameTrial}
                        onChange={item => {
                          this.setState({
                            detNameTrial: item.target.value
                          });
                        }}
                      />
                    </Col>
                    <Col className="col-3">
                      <Input
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.version'
                        })}`}
                        readOnly={true}
                        value={this.state.detVersionFormula}
                        onChange={item => {
                          this.setState({
                            detVersionFormula: item.target.value
                          });
                        }}
                      />
                    </Col>
                    <Col />
                  </Row>

                  <Row>
                    <Col className="col-3">
                      <label>
                        <FormattedMessage id="trial.trialDetail.catFamily.title" />
                      </label>
                      <Select
                        className="select-custom select-custom-mh-150"
                        placeholder={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.catFamily.placeholder'
                        })}`}
                        value={this.state.detFamilyCategory}
                        onChange={item => {
                          this.setState({
                            detFamilyCategory: item
                          });
                        }}
                        options={this.state.categoryFamilyList}
                      />
                    </Col>
                    <Col className="col-3">
                      <label>
                        <FormattedMessage id="trial.trialDetail.subCatFamily.title" />
                      </label>
                      <Select
                        className="select-custom select-custom-mh-150"
                        isDisabled={this.state.detFamilyCategory === null}
                        placeholder={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.subCatFamily.placeholder'
                        })}`}
                        value={this.state.detFamilySubCategory}
                        onChange={item => {
                          this.setState({
                            detFamilySubCategory: item
                          });
                        }}
                        options={this.state.categorySubFamilyList}
                      />
                    </Col>
                    <Col className="col-3">
                      <Input
                        type="text"
                        disabled={
                          this.state.categoryFamily === null ||
                          this.state.subCategoryFamily === null
                        }
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.subSubCatFamily'
                        })}`}
                        value={this.state.detFamilySubSubCategory}
                        onChange={item => {
                          this.setState({
                            detFamilySubSubCategory: item.target.value
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-3">
                      <Input
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.triangle.top'
                        })}`}
                        value={this.state.detTriangleTop}
                        onChange={item => {
                          this.setState({
                            detTriangleTop: item.target.value
                          });
                        }}
                      />
                    </Col>
                    <Col className="col-3">
                      <Input
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.triangle.middle'
                        })}`}
                        value={this.state.detTriangleMiddle}
                        onChange={item => {
                          this.setState({
                            detTriangleMiddle: item.target.value
                          });
                        }}
                      />
                    </Col>
                    <Col className="col-3">
                      <Input
                        label={`${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.triangle.bottom'
                        })}`}
                        value={this.state.detTriangleBottom}
                        onChange={item => {
                          this.setState({
                            detTriangleBottom: item.target.value
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="d-flex justify-content-end mr-3">
                    <Button
                      size="md"
                      disabled={
                        !this.state.detIdTrial ||
                        this.state.loadingDetFormulaInformation
                      }
                      onClick={this.saveTrialDetails}
                    >
                      <FormattedMessage id="trial.panel.button.save" />
                    </Button>
                  </Row>
                </React.Fragment>
              </PanelComponent>
            </Col>
          </Row>
        </Container>
      </DashboardContext.Provider>
    );
  }
}

export default injectIntl(PersonalLibrary);

PersonalLibrary.propTypes = {
  onSelect: PropTypes.func,
  history: PropTypes.any,
  isFormSelector: PropTypes.any,
  intl: PropTypes.any
};
