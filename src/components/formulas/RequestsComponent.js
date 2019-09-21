import { Button, Col, Container, Input, Row } from 'mdbreact';
import React from 'react';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import PanelComponent from 'components/commons/panels/PanelComponent';
import Constantes from 'Constantes';
import HeaderComponent from 'components/commons/HeaderComponent';
import FormulaService from 'services/FormulaService';
import * as Util from 'commons/Util.js';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class RequestsComponent extends React.Component {
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
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.sampleNumber'
        })}`,
        field: 'NroMuestra',
        type: 'numeric',
        width: 110
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.createdAt'
        })}`,
        field: 'FechaIngreso',
        type: 'date',
        width: 180
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.deliveredAt'
        })}`,
        field: 'FechaEntrega',
        type: 'date',
        width: 180
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.clientName'
        })}`,
        field: 'NombreCliente',
        width: 320
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.sellerName'
        })}`,
        field: 'NombreVendedor',
        width: 180
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.delegatedName'
        })}`,
        field: 'NombreDelegado',
        width: 160
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.country'
        })}`,
        field: 'NombrePais',
        width: 140
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'requests.panel.requestsList.datagrid.stage'
        })}`,
        field: 'Etapa',
        width: 140
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
      filter: {
        nroMuestra: null,
        nombreCliente: null
      },
      selectedRows: [],
      isLoading: false
    };
  }

  searchRequests() {
    const nroMuestra = this.state.filter.nroMuestra;
    const nombreCliente = this.state.filter.nombreCliente;

    this.setState({
      isLoading: true
    });

    new FormulaService()
      .getRequests({
        PageIndex: this.state.pagination.PageIndex,
        RowsPerPage: this.state.pagination.RowsPerPage,
        NroMuestra: nroMuestra ? nroMuestra : null,
        NombreCliente: nombreCliente ? nombreCliente : null
      })
      .then(
        response => {
          this.setState({
            isLoading: false
          });

          if (response && response.status === 200) {
            const Request = response.data.Solicitudes;
            const pagination = response.data.Pagination;

            if (Request && Request.length > 0) {
              Request.forEach(formula => {
                formula.FechaIngreso = formula.FechaIngreso
                  ? Util.formatDateWithPattern(
                      formula.FechaIngreso,
                      Constantes.DATETIME_CRAMER_FORMAT,
                      Constantes.DATE_FORMAT
                    )
                  : '---';

                formula.FechaEntrega = formula.FechaEntrega
                  ? Util.formatDateWithPattern(
                      formula.FechaEntrega,
                      Constantes.DATETIME_CRAMER_FORMAT,
                      Constantes.DATE_FORMAT
                    )
                  : '---';
              });
            }

            this.setState({
              pagination: {
                PageIndex: pagination.PageIndex,
                RowsPerPage: pagination.RowsPerPage,
                TotalPages: pagination.TotalPages,
                TotalRows: pagination.TotalRows
              },
              rowData: Request
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
          nombreCliente: this.state.nombreCliente,
          nroMuestra: this.state.nroMuestra
        }
      },
      () => {
        this.searchRequests();
      }
    );
  };

  componentDidMount() {
    this.searchRequests();
  }

  onRowSelection(selectedRows) {
    this.setState({
      selectedRows: selectedRows
    });
  }

  render() {
    let {isModal, selectedData} = this.props;
    return (
      <Container fluid={true}>
        {isModal ? null : <HeaderComponent />}
        <Row className="my-1">
          <Col>
            <PanelComponent
              title={`${this.props.intl.formatMessage({
                id: 'requests.panel.filter.title'
              })}`}
              isOpen={isModal ? false : true}
            >
              <Row>
                <Col className="col-md-4">
                  <Input
                    label={`${this.props.intl.formatMessage({
                      id: 'requests.panel.filter.input.sampleNumber'
                    })}`}
                    size="sm"
                    onChange={event => {
                      let value = event.target.value;
                      value = value.replace(/\D/gi, '');
                      this.setState({
                        nroMuestra: value
                      });
                    }}
                    value={this.state.nroMuestra}
                    onKeyPress={event => {
                      const keyCode = event.which || event.keyCode;

                      if (keyCode === 13) {
                        this.handleClickBtnSearch();
                      }
                    }}
                  />
                </Col>
                <Col className="col-md-4">
                  <Input
                    label={`${this.props.intl.formatMessage({
                      id: 'requests.panel.filter.input.clientName'
                    })}`}
                    size="sm"
                    onChange={event => {
                      const value = event.target.value;
                      this.setState({
                        nombreCliente: value
                      });
                    }}
                    value={this.state.nombreCliente}
                    onKeyPress={event => {
                      const keyCode = event.which || event.keyCode;

                      if (keyCode === 13) {
                        this.handleClickBtnSearch();
                      }
                    }}
                  />
                </Col>
                <Col className="d-flex justify-content-end p-3">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={this.handleClickBtnSearch}
                    disabled={this.state.isLoading}
                  >
                    <FormattedMessage id="requests.panel.filter.button.search" />
                  </Button>
                </Col>
              </Row>
            </PanelComponent>
          </Col>
        </Row>

        <Row className="my-2">
          <Col>
            <PanelComponent title="Listado de Solicitudes">
              <DataGridComponent
                isLoading={this.state.isLoading}
                classContainer="grid-container"
                onPaginationChange={pagination => {
                  this.setState(
                    {
                      pagination: pagination
                    },
                    () => {
                      this.searchRequests();
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
            </PanelComponent>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              size="sm"
              onClick={() => {
                const request = this.state.selectedRows[0].NroMuestra;

                isModal
                  ? selectedData(this.state.selectedRows[0])
                  : this.props.history.push(`/dashboard/${request}`);
              }}
              disabled={
                this.state.selectedRows === null ||
                this.state.selectedRows.length === 0
              }
            >
              <FormattedMessage id="requests.panel.button.requestSelect" />
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default injectIntl(RequestsComponent);

RequestsComponent.defaultProps = {
  isModal: false
};

RequestsComponent.propTypes = {
  intl: PropTypes.any,
  history: PropTypes.any,
  isModal: PropTypes.bool,
  selectedData: PropTypes.any
};
