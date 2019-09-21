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
import TrialService from 'services/TrialService';
import * as Util from 'commons/Util.js';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import LegendComponent from 'components/commons/base/LegendComponent';
import MaterialBannedComponent from 'components/commons/DataGrid/MaterialBannedComponent';

class PersonalLibraryImportComponent extends React.Component {
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
        width: 50
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
        width: 160
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'trial.panel.datagrid.col.trialName'
        })}`,
        field: 'NombreTrial',
        width: 200
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
          id: 'trial.panel.datagrid.col.sample'
        })}`,
        field: 'IdSolicitud',
        width: 90
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'trial.panel.datagrid.col.codExp'
        })}`,
        field: 'CodigoExperimental',
        width: 120
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
          id: 'trial.panel.datagrid.col.trialCost'
        })}`,
        field: 'GastoTrial',
        width: 105
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'trial.panel.datagrid.col.cost'
        })}`,
        field: 'CostoUSD',
        width: 110
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
          id: 'trial.panel.datagrid.col.delegate'
        })}`,
        field: 'NombreDelegado',
        width: 100,
        suppressFilter: true
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'trial.panel.datagrid.col.detail'
        })}`,
        field: 'CodFormula',
        cellRenderer: 'DetailButtonGridRenderer',
        onClick: row => {
          this.setState(
            {
              modalDetFormula: !this.state.modalDetFormula
            },
            () => {
              this.setState({
                loadingFormulaInformation: true
              });
              this.trialService.getById(row.IdTrial).then(
                response => {
                  const data = response.data[0].Materials;
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
      nombreFormula: '',
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
      selectedRows: [],
      modalDetFormula: false,
      loadingFormulaInformation: false,
      isLoadingGrid: false,
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
      }
    };

    this.trialService = new TrialService();
  }

  searchFormulas() {
    const IdSolicitud = this.state.filter.IdSolicitud;
    const FechaCreacion = this.state.filter.FechaCreacion;
    const nombreFormula = this.state.filter.nombreFormula;
    const codTrial = this.state.filter.codTrial;
    const nombreTrial = this.state.filter.nombreTrial;
    const nombreDelegado = this.state.filter.nombreDelegado;
    const myFormulas = this.state.filter.myFormulas;

    this.setState({
      isLoadingGrid: true
    });

    this.trialService
      .get({
        PageIndex: this.state.pagination.PageIndex,
        RowsPerPage: this.state.pagination.RowsPerPage,
        IdSolicitud:
          IdSolicitud !== null && IdSolicitud !== '' ? IdSolicitud : null,
        FechaCreacion:
          FechaCreacion !== null && FechaCreacion !== '' ? FechaCreacion : null,
        NombreFormula:
          nombreFormula !== null && nombreFormula !== '' ? nombreFormula : null,
        NombreTrial:
          nombreTrial !== null && nombreTrial !== '' ? nombreTrial : null,
        CodTrial: codTrial !== null && codTrial !== '' ? codTrial : null,
        NombreDelegado:
          nombreDelegado !== null && nombreDelegado !== ''
            ? nombreDelegado
            : null,
        UserFlag: myFormulas
      })
      .then(
        response => {
          if (response && response.status === 200) {
            const trialS = response.data.Trials;
            const pagination = response.data.Pagination;

            if (trialS && trialS.length > 0) {
              trialS.forEach(trial => {
                trial.FechaCreacion = trial.FechaCreacion
                  ? Util.formatDateWithPattern(
                      trial.FechaCreacion,
                      Constantes.DATETIME_CRAMER_FORMAT,
                      Constantes.DATE_FORMAT
                    )
                  : '---';

                trial.CodigoExperimental = !trial.CodigoExperimental
                  ? '---'
                  : trial.CodigoExperimental;

                trial.IdSolicitud = !trial.IdSolicitud
                  ? '---'
                  : trial.IdSolicitud;
              });
            }

            this.setState({
              isLoadingGrid: false,
              pagination: {
                PageIndex: pagination.PageIndex,
                RowsPerPage: pagination.RowsPerPage,
                TotalPages: pagination.TotalPages,
                TotalRows: pagination.TotalRows
              },
              rowData: trialS
            });
          }
        },
        () => {
          this.setState({
            isLoadingGrid: false
          });
        }
      );
  }

  handleClickBtnSearch = () => {
    if (this.state.isLoadingGrid) {
      return;
    }
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          PageIndex: 1,
          RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
        },
        filter: {
          IdSolicitud: this.state.IdSolicitud,
          nombreFormula: this.state.nombreFormula,
          nombreDelegado: this.state.nombreDelegado,
          nombreTrial: this.state.nombreTrial,
          codTrial: this.state.codTrial,
          FechaCreacion: this.state.FechaCreacion,
          myFormulas: this.state.myFormulas
        }
      },
      () => {
        this.searchFormulas();
      }
    );
  };

  componentDidMount() {
    this.handleClickBtnSearch();
  }

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
            <FormattedMessage id="modal.trial.detail.title" />
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
                          <td className="text-left">
                            <MaterialBannedComponent type={row.TipoComponente === 'MATERIAL' ? 1 : 2} data={row} />
                          </td>
                          <td className="text-left">{row.CodMaterial}</td>
                          <td className="text-left">{row.Material}</td>
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
                id: 'trial.panel.search.title'
              })}`}
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
              title={`${this.props.intl.formatMessage({
                id: 'trial.panel.trialList.title'
              })}`}
            >
              <DataGridComponent
                isLoading={this.state.isLoadingGrid}
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
              <LegendComponent icon="fa-ban" legend={'legend.ban.form.mp'} />
              <LegendComponent icon="alergen-free" legend={'legend.alergen.al.free'} />
            </PanelComponent>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default injectIntl(PersonalLibraryImportComponent);

PersonalLibraryImportComponent.propTypes = {
  onSelect: PropTypes.func,
  intl: PropTypes.any,
  isFormSelector: PropTypes.bool
};
