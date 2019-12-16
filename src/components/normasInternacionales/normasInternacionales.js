import HeaderComponent from "components/commons/HeaderComponent";
import { NormasContext } from "components/normas/NormasContext";
import DetalleNormaModal from "components/normas/DetalleNormaModal";
import { Col, Row, Input, Btn } from "mdbreact";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Constantes from "Constantes";
import PanelComponent from "components/commons/panels/PanelComponent";
import DataGridComponent from "components/commons/DataGrid/DataGridComponent";
import NormaService from "services/NormaService";
import { toast } from "react-toastify";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBFileInput,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import Moment from "moment";

class normasInternacionales extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }
  state = {
    modal: false
  
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  constructor(props) {
    super(props);

    this.normaService = new NormaService();
    const columnDefs = [
      {
        headerName: `${props.intl.formatMessage({
          id: "component.normasInternacionales.datagrid.codigo"
        })}`,
        field: "codNorma",
        width: 200
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "component.normasInternacionales.datagrid.NombreI"
        })}`,
        field: "nombreIngles",
        width: 420
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "component.normasInternacionales.datagrid.NombreE"
        })}`,
        field: "nombre",
        width: 420
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "component.normasInternacionales.datagrid.Solicitar"
        })}`,
        cellRenderer: "DetailButtonGridEmail",
        onClick: norma => {
            this.setState({
              selectedNorma: norma

            });
                console.log(norma);
              
            
          window.location.href = `mailto:esteffens@chilquinta.cl?subject=[Solicitud]%20Norma%20Internacional%20[Especifique Norma]%20
          solicitada&body=Solicito%20Norma%20Internacional%20Codigo:%20[Especifique Codigo]
          nombre%20español:%20[Especifique norma en español]`;
        },
        field: "Solicitar",
        width: 190
      }
    ];

    this.state = {
      pagination: {
        PageIndex: 1,
        RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
      },
      columnDefs: columnDefs,
      email: "esteffens@chilquinta.cl",
      rowData: [],
      loadingInformation: false,
      normaId: "NORMA GENIAL",
      selectedNorma: null,
      codNorma: ""
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

 
  getNorma = (norma) => {
    const codNorma = this.props.norma.codNorma;
    this.normaService.get(norma.id).then(response => {
        const data = response.data;

        this.setState({
             rowData: response !== null ? response.data : [],
             loadingInformation: false,
             codNorma: response.data.codNorma
        });

        this.props.norma.map((normaSeleccionada) => {console.log(normaSeleccionada)});
       
    });
}


  searchNormas = () => {
    this.setState({
      loadingInformation: true
    });

    this.normaService.getInternational().then(
      response => {
        if (response.data && response.data.length > 0) {
          response.data.forEach(item => {
            item.fecha = new Moment(item.fecha).format(
              Constantes.DATETIME_FORMAT
            );
          });
        }

        this.setState({
          rowData: response !== null ? response.data : [],
          loadingInformation: false
        });
      },
      () => {
        toast.info(
          `${this.props.intl.formatMessage({
            id: "component.workflow.title"
          })}`
        );

        this.setState({
          loadingInformation: false
        });
      }
    );
  };

  componentDidMount() {
    this.searchNormas();
  }

  render() {
    return [
      <NormasContext.Provider value={this}>
        <convocarModal
          norma={this.state.selectedNorma}
          isOpen={this.state.modalComments}
          toggle={() => {
            this.setState({
              modalComments: !this.state.modalComments
            });
          }}
        />
        <HeaderComponent />
        <Row>
          <Col size="12">
            <PanelComponent
              title={`${this.props.intl.formatMessage({
                id: "component.CrearNormas.title"
              })}`}
            >
              <Col size="4">
                <Input
                  label={`${this.props.intl.formatMessage({
                    id: "component.normas.datagrid.search"
                  })}`}
                  value={this.state.quickFilter}
                  onChange={event => {
                    this.setState({
                      quickFilter: event.target.value
                    });
                  }}
                />
              </Col>

              <DataGridComponent
                isLoading={this.state.loadingInformation}
                classContainer="grid-container"
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                pagination={true}
                enableColResize={true}
                quickFilter={this.state.quickFilter}
              />
            </PanelComponent>
          </Col>
        </Row>
      </NormasContext.Provider>
    ];
  }
}

export default injectIntl(normasInternacionales);

normasInternacionales.propTypes = {
  match: PropTypes.any,
  location: PropTypes.object,
  intl: PropTypes.any
};
