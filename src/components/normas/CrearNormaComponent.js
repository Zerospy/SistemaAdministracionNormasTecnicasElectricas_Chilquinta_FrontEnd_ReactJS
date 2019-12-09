
import HeaderComponent from 'components/commons/HeaderComponent';
import { NormasContext } from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import { Col, Row, Input, Button } from 'mdbreact';
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
import Moment from 'moment';
class CrearNormaComponent extends React.Component {

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

            codigoNorma: '',
            nombreNorma: '',
            normaDescripcion: '',
            estado: {
                    descripcion: 'En Revisión',
                    id: 0

            }
           
        };
    }
    getNorma(norma){

        this.normaService.get(norma)
        .then((res) => {  

          const data = res.data;
          
          this.setState({

            idData : res.data !== null ? res.data:[]

          });
          } )
      }


    publishToWorkflow = () => {
        const normaId = '721';
         

        var a = Moment().toObject();
        var b = { year: a.years, month: a.months + 1, day: a.date, hour: a.hours, minutes: a.minutes, seconds: a.seconds, nanos: a.milliseconds};  
        
        if(b.day<10) {
            b.day='0'+b.day;
                } 

            if(b.month<10) {
                        b.month='0'+b.month;
                        } 
         var c = b.year.toString()+"-"+b.month.toString()+"-"+b.day.toString();
     

       let params = {
           codNorma: this.state.codigoNorma, nombre: this.state.nombreNorma,
           descripcion: this.state.normadescripcion,
           estado: { descripcion: '' , id: '1'},  fecha: c}

        this.normaService
        .post(params)
            .then(response => {
                const data = response.data;
                
                data.createdAt = new Moment(data.createdAt).format(
                    Constantes.DATETIME_FORMAT
                ); 

            })
            toast.success(
                `${this.props.intl.formatMessage({
                    id: 'component.normas.modal.msg.success.crear'
                })}`
            );

        let formData = new FormData();
        formData.append('file', this.state.pdfFile);

        this.normaService.uploadNormaFile(normaId, 'pdf', formData).then(result => {
            formData = new FormData();
            formData.append('file', this.state.cadFile);

            this.normaService
                .uploadNormaFile(normaId, 'cad', formData)
                .then(result => {
                    toast.success(
                        `${this.props.intl.formatMessage({
                            id: 'component.normas.modal.edit.success'
                        })}`
                    );

                    this.props.toggle();
                });
        });
    };
    onChangeCodigo = (e) => {
        this.setState({
            codigoNorma: e.target.value

        })
    }   
     onChangeNombre = (e) => {
        this.setState({
            nombreNorma: e.target.value

        })
    }
    onChangeDescripcion = (e) => {
        this.setState({
            normadescripcion: e.target.value

        })
    }


    render() {
        return (
            <NormasContext.Provider value={this}>
                <HeaderComponent />
                <Row>
                    <Col size="12">
                        <PanelComponent
                            title={`${this.props.intl.formatMessage({
                                id: 'component.CrearNormas.title'
                            })}`}
                        >
                            <Col size="4">
                                <MDBContainer>

                                    <MDBCard className="card-body" style={{ width: "60rem", marginTop: "1rem", marginLeft: "6rem" }}>



                                        <form>
                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Codigo de norma"
                                                prepend="Default"
                                                onChange={this.onChangeCodigo}
                                            />


                                            <br />

                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Nombre Norma"
                                                prepend="Default"
                                                onChange={this.onChangeNombre}
                                            />
                                            <MDBInput type="textarea"
                                             label="Descripcion de la norma" 
                                             rows="5" 
                                             onChange={this.onChangeDescripcion}/>
                                            <label>PDF</label>
                                            <MDBFileInput  getValue={files => {
                                                        this.setState({
                                                            pdfFile: files[0]
                                                        });
                                                    }}/>
                                            <label>CAD</label>
                                            <MDBFileInput  getValue={files => {
                                                        this.setState({
                                                            cadFile: files[0]
                                                        });
                                                    }}/>
                                            <Col className="offset-9" size="4">
                                            <Button 
                                             disabled={!this.state.nombreNorma|| !this.state.codigoNorma||!this.state.normadescripcion 
                                                ||!this.state.pdfFile || !this.state.cadFile}
                                            color="primary"
                                            onClick={this.publishToWorkflow}
                                            > Enviar a workflow</Button>
                                            </Col>
                                        </form>
                                    </MDBCard>
                                </MDBContainer>
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


export default injectIntl(CrearNormaComponent);

CrearNormaComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
