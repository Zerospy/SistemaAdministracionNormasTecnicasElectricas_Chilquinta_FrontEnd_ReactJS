import {
    Button,
    Col,
    Container,
    Fa,
    Input,
    Row,
    Modal,
    ModalHeader,
    ModalBody
} from 'mdbreact';
import React from 'react';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import PanelComponent from 'components/commons/panels/PanelComponent';
import Constantes from 'Constantes';
import HeaderComponent from 'components/commons/HeaderComponent';
import FormulaService from 'services/FormulaService';
import * as Util from 'commons/Util.js';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {WORK_AREAS} from 'components/home/constants/WorkAreas';
import LegendComponent from 'components/commons/base/LegendComponent';
import MaterialBannedComponent from "components/commons/DataGrid/MaterialBannedComponent";

class FormulaComponent extends React.Component {
    constructor(props) {
        super(props);

        const columnDefs = [];

        columnDefs.push(
            {
                checkboxSelection: true,
                suppressSorting: true,
                suppressMenu: true,
                suppressFilter: true,
                pinned: true,
                headerName: '#',
                width: 40
            },
            { 
                headerName:'',
                field: "MpBanned",
                cellRenderer: "MaterialBannedComponent",
                cellRendererParams: {
                    type: 0
                  },
                width: 50
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.code'
                })}`,
                field: 'CodFormula',
                width: 85
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.formulaName'
                })}`,
                field: 'NombreFormula',
                width: 340
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.version'
                })}`,
                field: 'NumVersion',
                type: 'numeric',
                width: 85
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.quantity'
                })}`,
                field: 'CantidadBase',
                type: 'numeric',
                width: 100
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.performance'
                })}`,
                field: 'Rendimiento',
                type: 'numeric',
                width: 85
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.cretedAt'
                })}`,
                field: 'FechaCreacion',
                type: 'date',
                width: 105
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.updatedAt'
                })}`,
                field: 'FechaActualizacion',
                type: 'date',
                width: 105
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.approvalStage'
                })}`,
                field: 'AprobacionStr',
                width: 140
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.validity'
                })}`,
                field: 'EstadoStr',
                width: 100
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.allergen'
                })}`,
                field: 'Alergeno',
                width: 100
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.cost'
                })}`,
                field: 'CostoUSD',
                type: 'numeric',
                width: 110
            },
            {
                headerName: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.detail.datagrid.col.detail'
                })}`,
                field: 'CodFormula',
                cellRenderer: 'DetailButtonGridRenderer',
                onClick: rowData => {
                    const {CodFormula, NumVersion} = rowData;
                    this.setState(
                        {
                            modalDetFormula: !this.state.modalDetFormula
                        },
                        () => {
                            this.setState({
                                loadingFormulaInformation: true
                            });

                            this.formulaService
                                .getFormulaById({
                                    codformula: CodFormula,
                                    numversion: NumVersion
                                })
                                .then(
                                    response => {
                                        const data = response.data;
                                        if (data) {
                                            const formulaData = this.state.formulaData;
                                            formulaData.rows = data;

                                            this.setState({
                                                formulaData: formulaData,
                                                loadingFormulaInformation: false
                                            });
                                        } else {
                                            this.setState({
                                                loadingFormulaInformation: false,
                                                modalDetFormula: !this.state.modalDetFormula
                                            });
                                        }
                                    },
                                    () => {
                                        this.setState({
                                            loadingFormulaInformation: false,
                                            modalDetFormula: !this.state.modalDetFormula
                                        });
                                    }
                                );
                        }
                    );
                },
                width: 100
            }
        );

        this.formulaTypeOptions = [
            {
                label: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.search.select.experimental'
                })}`,
                value: 'EXPERIMENTAL'
            },
            {
                label: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.search.select.official'
                })}`,
                value: 'OFICIAL'
            }
        ];

        this.formulaCompositionOptions = [
            {
                label: `${this.props.intl.formatMessage({
                    id:
            'modal.formula.panel.search.select.formulaComposition.finishedProduct'
                })}`,
                value: 'PT'
            },
            {
                label: `${this.props.intl.formatMessage({
                    id: 'modal.formula.panel.search.select.formulaComposition.dilution'
                })}`,
                value: 'DI'
            }
        ];

        this.workAreas = WORK_AREAS;

        this.state = {
            nroMuestra: null,
            nombreCliente: null,
            id: parseInt(Math.random() * 1000000, 10),
            pagination: {
                PageIndex: 1,
                RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            columnDefs: columnDefs,
            rowData: [],
            codigoFormula: '',
            nombreFormula: '',
            familiaFormula: '',
            formulaType: this.formulaTypeOptions[1],
            formulaComposition: this.formulaCompositionOptions[0],
            workArea: this.workAreas[1],
            filter: {
                codigoFormula: null,
                nombreFormula: null,
                familiaFormula: null,
                formulaType: this.formulaTypeOptions[1],
                formulaComposition: this.formulaCompositionOptions[0],
                workArea: this.workAreas[1]
            },
            selectedRows: [],
            modalDetFormula: false,
            loadingFormulaInformation: false,
            formulaData: {
                columns: [
                    '',
                    `${this.props.intl.formatMessage({
                        id: 'modal.trial.detail.datagrid.code'
                    })}`,
                    `${this.props.intl.formatMessage({
                        id: 'modal.trial.detail.datagrid.name'
                    })}`,
                    `${this.props.intl.formatMessage({
                        id: 'modal.trial.detail.datagrid.quantity'
                    })}`
                ],
                rows: []
            },
            isCompositionFilterDisabled: false,
            isLoading: false
        };

        this.formulaService = new FormulaService();
    }

    searchFormulas() {
        const codigoFormula = this.state.filter.codigoFormula;
        const nombreFormula = this.state.filter.nombreFormula;
        const familiaFormula = this.state.filter.familiaFormula;
        const formulaType = this.state.filter.formulaType;
        const workArea = this.state.filter.workArea;
        const formulaComposition = this.state.filter.formulaComposition;

        let formulaTypeParam = null;
        let workAreaParam = null;
        let formulaCompositionParam = null;

        if (formulaType && formulaType.value) {
            formulaTypeParam = formulaType.value === 'EXPERIMENTAL' ? 'E' : 'O';
        }

        if (workArea && workArea.value) {
            workAreaParam = workArea.value;
        }

        if (formulaComposition && formulaComposition.value) {
            formulaCompositionParam = formulaComposition.value;
        }

        this.setState({
            isLoading: true
        });

        this.formulaService
            .getFormulas({
                PageIndex: this.state.pagination.PageIndex,
                RowsPerPage: this.state.pagination.RowsPerPage,
                CodFormula:
          codigoFormula !== null && codigoFormula !== '' ? codigoFormula : null,
                NombreFormula:
          nombreFormula !== null && nombreFormula !== '' ? nombreFormula : null,
                FamiliaFormula:
          familiaFormula !== null && familiaFormula !== ''
              ? familiaFormula
              : null,
                TipoFormula: formulaTypeParam,
                AreaTrabajo: workAreaParam,
                ComposicionFormula: formulaCompositionParam
            })
            .then(
                response => {
                    this.setState({
                        isLoading: false
                    });

                    if (response && response.status === 200) {
                        const formulas = response.data.Formulas;
                        const pagination = response.data.Pagination;

                        if (formulas && formulas.length > 0) {
                            formulas.forEach(formula => {
                                formula.FechaCreacion = formula.FechaCreacion
                                    ? Util.formatDateWithPattern(
                                        formula.FechaCreacion,
                                        Constantes.DATETIME_CRAMER_FORMAT,
                                        Constantes.DATE_FORMAT
                                    )
                                    : '---';
                                formula.FechaActualizacion = formula.FechaActualizacion
                                    ? Util.formatDateWithPattern(
                                        formula.FechaActualizacion,
                                        Constantes.DATETIME_CRAMER_FORMAT,
                                        Constantes.DATE_FORMAT
                                    )
                                    : '---';

                                formula.CostoUSD = formula.CostoUSD
                                    ? Util.numberFormat(
                                        formula.CostoUSD,
                                        Constantes.DECIMAL_FORMAT
                                    )
                                    : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);

                                formula.EstadoStr =
                  formula.Estado === 'V'
                      ? `${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.validity.true'
                      })}`
                      : `${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.validity.false'
                      })}`;
                                formula.AprobacionStr =
                  formula.NumVersion === '0'
                      ? `${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.formulaType.experimental'
                      })}`
                      : `${this.props.intl.formatMessage({
                          id: 'trial.trialDetail.formulaType.official'
                      })}`;
                            });
                        }

                        this.setState({
                            pagination: {
                                PageIndex: pagination.PageIndex,
                                RowsPerPage: pagination.RowsPerPage,
                                TotalPages: pagination.TotalPages,
                                TotalRows: pagination.TotalRows
                            },
                            rowData: formulas
                        });
                    }
                },
                () => {
                    this.setState({
                        isLoading: false
                    });
                }
            );
    }

  handleClickBtnSearch = () => {
      this.setState(
          {
              pagination: {
                  ...this.state.pagination,
                  PageIndex: 1,
                  RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
              },
              filter: {
                  codigoFormula: this.state.codigoFormula,
                  nombreFormula: this.state.nombreFormula,
                  familiaFormula: this.state.familiaFormula,
                  formulaType: this.state.formulaType,
                  workArea: this.state.workArea,
                  formulaComposition: this.state.formulaComposition
              }
          },
          () => {
              this.searchFormulas();
          }
      );
  };

  componentDidMount() {}

  onRowSelection(selectedRows) {
      const onSelect =
      this.props.onSelect && typeof this.props.onSelect === 'function'
          ? this.props.onSelect
          : null;

      if (onSelect !== null) {
          onSelect(selectedRows);
      }
  }

  toggleModalDetFormula = () => {
      if (!this.state.loadingFormulaInformation) {
          this.setState({
              modalDetFormula: !this.state.modalDetFormula
          });
      }
  };

  render() {
      return (
          <Container fluid={true}>
              <Modal
                  isOpen={this.state.modalDetFormula}
                  toggle={this.toggleModalDetFormula}
                  className="px-3"
                  size="lg"
              >
                  <ModalHeader
                      toggle={
                          !this.state.loadingFormulaInformation
                              ? this.toggleModalDetFormula
                              : null
                      }
                  >
                      <FormattedMessage id="modal.formula.detail.title" />
                  </ModalHeader>
                  <ModalBody>
                      <Row className="d-flex justify-content-center">
                          <Col className="col-12 text-center">
                              {this.state.loadingFormulaInformation ? (
                                  <span>
                                      <Fa icon="spinner" className="fa-spin" />{' '}
                                      <FormattedMessage id="component.messages.loading" />
                                  </span>
                              ) : (
                                  <table className="table table-stripped">
                                      <thead>
                                          <tr>
                                              {this.state.formulaData.columns.map(column => (
                                                  <th className="text-left" key={column}>
                                                      {column}
                                                  </th>
                                              ))}
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {this.state.formulaData.rows.map(row => (
                                              <tr key={row.CodComponente}>
                                                  <td className="text-left"><MaterialBannedComponent data={row} type={row.TipoComponente === 'MATERIAS PRIMAS' ? 1 : 0}/></td>
                                                  <td className="text-left">{row.CodComponente}</td>
                                                  <td className="text-left">{row.NombreComponente}</td>
                                                  <td className="text-right">
                                                      {Util.numberFormat(row.CantidadUtilizada)}
                                                  </td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              )}
                          </Col>
                      </Row>
                  </ModalBody>
              </Modal>

              {!this.props.isFormSelector ? <HeaderComponent /> : null}
              <Row className="my-1">
                  <Col>
                      <PanelComponent
                          title={`${this.props.intl.formatMessage({
                              id: 'modal.formula.panel.search.title'
                          })}`}
                      >
                          <Row>
                              <Col className="col-md-2">
                                  <Input
                                      label="Código"
                                      size="md"
                                      onChange={event => {
                                          let value = event.target.value;
                                          value = value.replace(/\D/gi, '');
                                          this.setState({
                                              codigoFormula: value
                                          });
                                      }}
                                      value={this.state.codigoFormula}
                                      onKeyPress={event => {
                                          const keyCode = event.which || event.keyCode;

                                          if (keyCode === 13) {
                                              this.handleClickBtnSearch();
                                          }
                                      }}
                                  />
                              </Col>
                              <Col className="col-md-2">
                                  <Input
                                      label={`${this.props.intl.formatMessage({
                                          id: 'modal.formula.panel.search.input.formulaName'
                                      })}`}
                                      size="sm"
                                      onChange={event => {
                                          const value = event.target.value;
                                          this.setState({
                                              nombreFormula: value
                                          });
                                      }}
                                      value={this.state.nombreFormula}
                                      onKeyPress={event => {
                                          const keyCode = event.which || event.keyCode;

                                          if (keyCode === 13) {
                                              this.handleClickBtnSearch();
                                          }
                                      }}
                                  />
                              </Col>
                              <Col>
                                  <label>
                                      <FormattedMessage id="modal.formula.panel.search.select.label" />
                                  </label>
                                  <Select
                                      className="select-custom select-custom-mh-150"
                                      placeholder={`${this.props.intl.formatMessage({
                                          id: 'modal.formula.panel.search.select.default'
                                      })}`}
                                      isClearable={true}
                                      value={this.state.formulaType}
                                      onChange={item => {
                                          this.setState(
                                              {
                                                  formulaType: item
                                              },
                                              () => {
                                                  if (item && item.value === 'EXPERIMENTAL') {
                                                      this.setState({
                                                          formulaComposition: null,
                                                          isCompositionFilterDisabled: true
                                                      });
                                                  } else {
                                                      this.setState({
                                                          isCompositionFilterDisabled: false
                                                      });
                                                  }
                                              }
                                          );
                                      }}
                                      options={this.formulaTypeOptions}
                                  />
                              </Col>
                              <Col>
                                  <label>
                                      <FormattedMessage id="modal.formula.panel.search.select.workArea" />
                                  </label>
                                  <Select
                                      className="select-custom select-custom-mh-150"
                                      placeholder={`${this.props.intl.formatMessage({
                                          id: 'modal.formula.panel.search.select.default'
                                      })}`}
                                      isClearable={true}
                                      value={this.state.workArea}
                                      onChange={item => {
                                          this.setState({
                                              workArea: item
                                          });
                                      }}
                                      options={this.workAreas}
                                  />
                              </Col>
                              <Col>
                                  <label>
                                      <FormattedMessage id="modal.formula.panel.search.select.formulaComposition.label" />
                                  </label>
                                  <Select
                                      isDisabled={this.state.isCompositionFilterDisabled}
                                      className="select-custom select-custom-mh-150"
                                      placeholder={`${this.props.intl.formatMessage({
                                          id: 'modal.formula.panel.search.select.default'
                                      })}`}
                                      isClearable={true}
                                      value={this.state.formulaComposition}
                                      onChange={item => {
                                          this.setState({
                                              formulaComposition: item
                                          });
                                      }}
                                      options={this.formulaCompositionOptions}
                                  />
                              </Col>
                              <Col className="d-flex justify-content-end p-3">
                                  <Button
                                      size="sm"
                                      color="primary"
                                      onClick={this.handleClickBtnSearch}
                                      disabled={this.state.isLoading}
                                  >
                                      <FormattedMessage id="modal.formula.panel.search.button.search" />
                                  </Button>
                              </Col>
                          </Row>
                      </PanelComponent>
                  </Col>
              </Row>

              <Row className="my-2">
                  <Col>
                      <PanelComponent
                          title={`${this.props.intl.formatMessage({
                              id: 'modal.formula.panel.detail.title'
                          })}`}
                      >
                          <DataGridComponent
                              isLoading={this.state.isLoading}
                              classContainer="grid-container"
                              onPaginationChange={pagination => {
                                  this.setState(
                                      {
                                          pagination: pagination
                                      },
                                      () => {
                                          this.searchFormulas();
                                      }
                                  );
                              }}
                              columnDefs={this.state.columnDefs}
                              rowData={this.state.rowData}
                              pagination={this.state.pagination}
                              rowSelection={'single'}
                              onRowSelection={this.onRowSelection.bind(this)}
                              enableColResize={true}
                          />
                            <LegendComponent icon="fa-ban" legend={"legend.ban.form.mp"}/>
                            <LegendComponent icon="fa-font" legend={"legend.alergen.formula"}/>
                      </PanelComponent>
                  </Col>
              </Row>
          </Container>
      );
  }
}

export default injectIntl(FormulaComponent);

FormulaComponent.propTypes = {
    onSelect: PropTypes.func,
    intl: PropTypes.any,
    isFormSelector: PropTypes.bool
};
