
import HeaderComponent from 'components/commons/HeaderComponent';
import { NormasContext } from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import { Col, Row, Input, Btn } from 'mdbreact';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import { toast } from 'react-toastify';
import { MDBCard, MDBCardTitle, MDBCardText, MDBFileInput, MDBInput, MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import GridUsuarios from 'components/normas/GridUsuarios';
import { ExcelRenderer } from "react-excel-renderer";
import { Table, Button, Popconfirm, Icon, Upload } from "antd";
import Moment from 'moment';
import LoadingComponent from 'components/commons/base/LoadingComponent';

class administracionNormasInternacionales extends React.Component {

    showSettings(event) {
        event.preventDefault();
    }
    state = {
        modal: false
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    constructor(props) {
        super(props);

        this.normaService = new NormaService();

        this.state = {
           
            columnDefs: [
         
            ],
            defaultColDef: {
                width: 100,
                headerCheckboxSelection: isFirstColumn,
                checkboxSelection: isFirstColumn,
                resizable: true
            },
            rowSelection: "multiple",
            rowData: [],
            isLoading: false
        };
    }
    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
          return;
        }
        const isExcel =
          file[0].type === "application/vnd.ms-excel" ||
          file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
          errorMessage = "Solo puedes subir Excel!";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
          errorMessage = "El archivo debe ser inferior a 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
      }
      fileHandler = fileList => {
        console.log("fileList", fileList)
        let fileObj = fileList
        if (!fileObj) {
          this.setState({
            errorMessage: "No hay archivo subido!",
          })
          return false
        }
        console.log("fileObj.type:", fileObj.type)
        if (
          !(
            fileObj.type === "application/vnd.ms-excel" ||
            fileObj.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          )
        ) {
          this.setState({
            errorMessage: "Formato Desconocido, solo debe subir Excel",
          })
          return false
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if (err) {
            console.log(err)
          } else {
            let newRows = []
            resp.rows.slice(1).map((row, index) => {
              if (row && row !== "undefined") {
                newRows.push({
                  /* id: index, */
                  codNorma: row[0],
                  nombreIngles: row[2],
                  nombre: row[1],
                  tipo_norma: 'INTERNACIONAL',
                })
              }
            })
            if (newRows.length === 0) {
              this.setState({
                errorMessage: "No data found in file!",
              })
              return false
            } else {
              this.setState({
                cols: resp.cols,
                rows: newRows,
                errorMessage: null,
              })
            }
          }
        })
        return false
      }
      

      handleSubmit = async () => {
        console.log("submitting: ", this.state.rows)
        //submit to API
        //if successful, banigate and clear the data
        this.setState({ rows: [] })
        const data = this.state.rows;
        console.log(JSON.stringify(data));
       
        const params = [this.state.rows];
        
        // normas.map((rowData, i) =>   ) 
                    console.log(params);
         
        const normaId = this.props.normaId;


        this.setState({
          isLoading: true
      });
        this.normaService.normaInternacional(data)
            .then(response => {
                const data = response.data;

                data.createdAt = new Moment(data.createdAt).format(
                    Constantes.DATETIME_FORMAT
                );
                this.setState({
                  isLoading: false
              });
                toast.success(
                  `${this.props.intl.formatMessage({
                      id: 'component.normasInternacionales.succes'
                  })}`
              );
              window.location.reload();
            },() => {
              this.setState({
                isLoading: false
            });
              toast.error(
                  `${this.props.intl.formatMessage({
                      id: 'component.normasInternacionales.error'
                  })}`
              );
  
              this.setState({
                  savingNorma: false
              });
          });   
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

 
           
    
    

    onQuickFilterChanged() {
        this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
    }


    render() {
    
 
        return (
            
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
                                id: 'component.normasInternacionales.administracion'
                            })}`}
                        >
                            <Col size="12">
                                     <h1>Importar componente Excel</h1>
                                <label> Seleccione Archivo excel de norma internacional</label>
<div>
  <Upload
    name="file"
    beforeUpload={this.fileHandler}
    onRemove={() => this.setState({ rows: [] })}
    multiple={false}
  >
    <Button>
      <Icon type="upload" /> Click para subir Excel
    </Button>

  </Upload>
  <Button
          onClick={this.handleSubmit }
          size="large"
          type="primary"
          style={{ marginBottom: 16, marginLeft: 10 }}
        >
            <LoadingComponent loading={this.state.isLoading} />
          Enviar
        </Button>
</div>
                          
                            </Col>
                        </PanelComponent>
                    </Col>
                </Row>
            </NormasContext.Provider>
        );
    }
}
function isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}


export default injectIntl(administracionNormasInternacionales);

administracionNormasInternacionales.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
