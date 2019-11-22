import HeaderComponent from 'components/commons/HeaderComponent';
import { NormasContext } from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import { Col, Row, Input, Fa, Button, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModal, MDBBtn, MDBFileInput } from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import UserService from 'services/UserService';
import { toast } from 'react-toastify';
import DetalleEditarNormaModal from './DetalleEditarNormaModal';
import Moment from 'moment';


class NormasComponent extends React.Component {
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
        this.userService = new UserService();

        const columnDefs = [
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.id'
                })}`,
                field: 'id',
                width: 50
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.codNorma'
                })}`,
                field: 'codNorma',
                width: 100
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.nombre'
                })}`,
                field: 'nombre',
                width: 420
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.descripcion'
                })}`,
                field: 'descripcion',
                width: 420
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.estado'
                })}`,
                field: 'estado.descripcion',
                width: 140
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.fecha'
                })}`,
                field: 'fecha',
                width: 150
            },
            {
                headerName: 'Ver',
                field: 'id',
                cellRenderer: 'DetailButtonGridRenderer',
                onClick: norma => {
                    this.setState({
                        selectedNorma: norma,
                        modalDetalle: true
                    });
                },
                editable: false,
                colId: 'id',
                width: 80
            },
            {
                headerName: 'Editar',
                field: 'id',
                cellRenderer: 'DetailButtonGridEdit',
                onClick: norma => {
                    this.setState({
                        selectedNorma: norma,
                        modalEdit: true
                    });
                },
                editable: false,
                colId: 'id',
                width: 80
            }
        ];

        this.state = {
            pagination: {
                PageIndex: 1,
                RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            columnDefs: columnDefs,
            rowData: [],
            loadingInformation: false,
            modalDetalle: false,
            modalEdit: false,
            loadingDetalles: false,
            selectedNorma: null,
            quickFilter: '',
            codigoNorma: '',
            nombreNorma: '',
            normadescripcion: '',
            estado: {
                    descripcion: 'En Revisión',
                    id: 0

            },
            estadoNorma: '',
            fecha: {  
             fecha: ''
            }
        };
    }

    getNorma(norma) {
   
        this.setState({
            modalEdit: true,
            loadingComments: true
        });

        this.normaService.get(norma.id).then(response => {
            const data = response.data;


            this.setState({
                rowData: response !== null ? response.data : [],

                loadingInformation: false

            });
        });
    }

    getUsuarios(usuario) {
   
    
        this.userService.get(usuario).then(response => {
            const data = response.data;


            this.setState({
                rowData: response !== null ? response.data : [],

                loadingInformation: false
                
            });
        });
        
    }

    
    setEstadoModel() {

    var EstadoFilterComponent = this.normaService.getFilterInstance("estado");
    var model = {
      type: "set",
      values: ['Publicada']
    };
    EstadoFilterComponent.setModel(model);
    this.gridApi.onFilterChanged();

  }

    saveNorma = () => {
        const {rowData, fecha} = this.state;
        const { onSaveNorma, norma } = this.props;
        const normaId = '1';
        console.log(normaId);
        var a = Moment().toObject();
         var b = { year: a.years, month: a.months + 1, day: a.date+1, hour: a.hours, minutes: a.minutes, seconds: a.seconds, nanos: a.milliseconds};  
         console.log(a);
        var c = b.year.toString()+"-"+b.month.toString()+"-"+b.day.toString();
        console.log(c);

        let params = {
            codNorma: this.state.codigoNorma, nombre: this.state.nombreNorma,
            descripcion: this.state.normadescripcion,
            estado: { descripcion: '' , id: '1'},  fecha: c,


            day: a.day,
            hours: a.hours,
            minutes: a.minutes,
            month: a.months + 1,
            nanos: a.nanos,
            seconds: a.seconds,
            time: a.time,
            timezoneOffset: a.timezoneOffset,
            year: a.years

        }
        




        this.normaService



            .post( params
            )
            .then(response => {
                const data = response.data;
                
                data.createdAt = new Moment(data.createdAt).format(
                    Constantes.DATETIME_FORMAT
                ); 
               
                this.setState (  
                    { }

                );
                
             
                console.log(data);
                console.log(params);
                console.log(this.state.normadescripcion);
                console.log(response);
                
            })
            toast.success(
                `${this.props.intl.formatMessage({
                    id: 'component.normas.modal.msg.success.crear'
                })}`
            );
     
    }
    publishToWorkflow = () => {
        const normaId = this.props.norma.id;

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
    searchNormas() {
        const estadoNorma = 'PUBLICADA';
        this.setState({
            loadingInformation: true
        });
       
        this.normaService.estadoNormas(estadoNorma).then(
            response => {
                this.setState({
                    rowData: response !== null ? response.data :   [],
                    loadingInformation: false
                   
                });
            },
            () => {
                toast.info(
                    `${this.props.intl.formatMessage({
                        id: 'component.norma.title'
                    })}`
                );

                this.setState({
                    loadingInformation: false
                });
            }
        );
      
    }

      

    componentDidMount() {
        this.searchNormas();
    }
  

    render() {
        return [
            
            <NormasContext.Provider value={this}>


                <DetalleNormaModal
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalDetalle}
                    toggle={() => {
                        this.setState({
                            modalDetalle: !this.state.modalDetalle
                        });
                    }}
                />


                <DetalleEditarNormaModal
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalEdit}
                    toggle={() => {
                        this.setState({
                            modalEdit: !this.state.modalEdit
                        });
                    }}
                />

                <HeaderComponent />
                <Row>
                    <Col size="12">
                        <PanelComponent
                            title={`${this.props.intl.formatMessage({
                                id: 'component.normas.title'
                            })}`}
                        >
                            <Col size="4">
                                <Input
                                    label={`${this.props.intl.formatMessage({
                                        id: 'component.normas.datagrid.search'
                                    })}`}
                                    value={this.state.quickFilter}
                                    onChange={event => {
                                        this.setState({
                                            quickFilter: event.target.value
                                        });
                                    }}
                                />
                            </Col>
                           

                            <Row>
                                <Col className="offset-10" size="2">
                                <Button
                                        size="sm"
                                        onClick={() => {
                                            this.searchNormas();
                                        }}
                                    >
                                        {' '}
                                        <Fa icon="sync" />
                                    </Button>
                                    <MDBBtn onClick={this.toggle}
                                        size="sm"
                                    >

                                        <Fa icon="plus" />
                                    </MDBBtn>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}  
                                    
                                    >
                                        <MDBModalHeader toggle={this.toggle}>Crear Norma</MDBModalHeader>
                                        <MDBModalBody>
                                            <form>
                                            <div className="form-group">
                                                <label htmlFor="formGroupExampleInput">Codigo de Norma</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formGroupExampleInput"
                                                    defaultValue={this.state.codigoNorma}
                                                    onChange={this.onChangeCodigo}
                                                />

                                                <label htmlFor="formGroupExampleInput">Nombre Norma</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formGroupExampleInput"
                                                    defaultValue={this.state.nombreNorma}
                                                    onChange={this.onChangeNombre}
                                                />

                                                <label htmlFor="formGroupExampleInput">Descripcion Norma</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formGroupExampleInput"
                                                    value={this.state.normadescripcion}
                                                    onChange={this.onChangeDescripcion}



                                                />
                                                
                                                <label>PDF</label>
                                                <MDBFileInput
                                                    getValue={files => {
                                                        this.setState({
                                                            pdfFile: files[0]
                                                        });
                                                    }}
                                                />
                                                <label>CAD</label>
                                                <MDBFileInput
                                                    getValue={files => {
                                                        this.setState({
                                                            cadFile: files[0]
                                                        });
                                                    }}
                                                />
                                            </div>
                                            </form>

                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary"  onClick={  
                                                this.toggle
                                       
                                        }  > Cerrar </MDBBtn>

                                            <Button color="primary"

                                                disabled={!this.state.nombreNorma|| !this.state.codigoNorma||!this.state.normadescripcion 
                                                    ||!this.state.pdfFile || !this.state.cadFile}
                                                color="primary"
                                                onClick={this.publishToWorkflow, this.saveNorma}
                                                                       
                                            > Enviar a workflow</Button>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </Col>
                            </Row>
                                            
                            
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

export default injectIntl(NormasComponent);

NormasComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
