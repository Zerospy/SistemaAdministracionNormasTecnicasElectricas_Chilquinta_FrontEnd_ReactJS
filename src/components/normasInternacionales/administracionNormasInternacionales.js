
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

            errorMessage:null ,
            rowSelection: "multiple",
            rowData: [],
            isLoading: false
        };
    }


    handleSave = row => {
      const newData = [...this.state.rows]
      const index = newData.findIndex(item => row.key === item.key)
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        ...row,
      })
      this.setState({ rows: newData })
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
          errorMessage = "You can only upload Excel file!";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
          errorMessage = "File must be smaller than 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
      }


      fileHandler = fileList => {
        console.log("fileList", fileList)
        
        let fileObj =  fileList.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      console.log("resp:",resp , fileObj);

      if (err) {
        console.log(err)
      } else {
        let newRows = []
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              id: index,
              codNorma: row[0],
              nombreIngles: row[2],
              nombre: row[1],
              tipo_norma: 'INTERNACIONAL',
            })
          }
        })
        console.log(JSON.stringify(newRows));
        
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
    }
    
    )
  
        if (!fileObj) {
          this.setState({
            errorMessage: "No file uploaded!",
          });
          return false;
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
            errorMessage: "Unknown file format. Only Excel files are uploaded!",
          })
          return false;
        }
      }



     
      

      handleSubmit = async () => {
        console.log("submitting: ", this.state.rows)
        //submit to API

        const params = this.state.rows;

        this.normaService.normaInternacional(params)
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
          this.setState({ rows: [] })
      

       
       
        const params = [this.state.rows];
          
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
        //if successful, banigate and clear the data
        
        
        // normas.map((rowData, i) =>   ) 
                    console.log(params);
         
        const normaId = this.props.normaId;


        this.setState({
          isLoading: true
      });
      console.log(JSON.stringify(params));
      
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
           
                <HeaderComponent />
                <Row>
                    <Col size="12">
                        <PanelComponent
                            title={`${this.props.intl.formatMessage({
                                id: 'component.normasInternacionales.administracion'
                            })}`}
                        >
                          
                            <Col size="4">
                                     <h1>Importar componente Excel</h1>
                                <label> Seleccione Archivo excel de norma internacional</label>
     <div>
 
 
  <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />

  <Button
          onClick={this.handleSubmit }
          size="large"
          type="primary"
          style={{ marginBottom: 16, marginLeft: 10 }}
          
        >
              <Icon type="send"></Icon>
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
