import HeaderComponent from 'components/commons/HeaderComponent';
import {NormasContext} from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import {Col, Row, Input, Fa, Button, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBModal, MDBBtn, MDBFileInput} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import UserService from 'services/UserService';
import {toast} from 'react-toastify';
import DetalleEditarNormaModal from './DetalleEditarNormaModal';
import CommentRequestModal from './DetalleEditarNormaModal';
import Moment from 'moment';
import {saveAs} from 'file-saver';
import DardebajaModal from './DardebajaModal';
import LoginService from 'services/LoginService';
import Select from 'react-select';

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

        this.loginService = new LoginService();
        this.sessionInformation = this.loginService.getSessionInformation();

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
                field: 'fechaStr',
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
                enabled: this.sessionInformation.admin,
                colId: 'id',
                width: 80
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.dataGrid.DardeBajaGrid'
                })}`,
                field: 'dardeBaja',
                cellRenderer: 'DardeBajaButton',
                onClick: norma => {
                    this.setState({
                        selectedNorma: norma,
                        DardebajaModal: true
                    });
                },
                editable: false,
                enabled: this.sessionInformation.admin,
                colId: 'id',
                width: 120
            }
        ];

        this.state = {
            pagination: {
                PageIndex: 1,
                RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            columnDefs: columnDefs,
            rowData: [],
            idData: [],
            loadingInformation: false,
            modalDetalle: false,
            modalEdit: false,
            modalCommentRequest: false,
            loadingDetalles: false,
            quickFilter: '',
            codigoNorma: '',
            nombreNorma: '',
            normadescripcion: '',
            normaId: '',
            selectedNorma: null,
            usersOptions: [],
            selectedUsers: [],
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

    getUsuarios= () => {
        this.userService.getUsers().then(response => {
            const data = response.data;

            if (data && data.length > 0) {
                data.forEach(user => {
                    user.label = `${user.nombres} ${user.apellidos}`;
                    user.value = user.id;
                });
            }

            this.setState({
                usersOptions: response !== null ? data : []
            });
        }, () => {
            toast.info('Ocurrió un problema al consultar los usuarios');
        });
    }

    publishToWorkflow = () => {
        const normaId = '';

        const a = Moment().toObject();
        const b = {year: a.years, month: a.months + 1, day: a.date, hour: a.hours, minutes: a.minutes, seconds: a.seconds, nanos: a.milliseconds};
        if (b.day < 10) {
            b.day = `0${b.day}`;
        }

        if (b.month < 10) {
            b.month = `0${b.month}`;
        }
        const c = `${b.year.toString()}-${b.month.toString()}-${b.day.toString()}`;


        const params = {
            codNorma: this.state.codigoNorma, nombre: this.state.nombreNorma,
            descripcion: this.state.normadescripcion,
            estado: {descripcion: '', id: '1'}, fecha: c};

        if(this.state.selectedUsers && this.state.selectedUsers.length > 0){
            params.usersToComment =  [];

            this.state.selectedUsers.forEach(user => {
                params.usersToComment.push({
                    usuarioRecibeEntity: {
                        id: user.id
                    }
                });
            });
            
        }
             if(this.state.pdfFile != null || this.state.cadFile != null){     
        if (this.state.pdfFile.size != 0 && this.state.pdfFile.size != null && this.state.cadFile.size != 0 && this.state.cadFile.size != null) {
            this.normaService.post(params)
                .then(response => {
                    const data = response.data;

                    data.createdAt = new Moment(data.createdAt).format(
                        Constantes.DATETIME_FORMAT
                    );
                    console.log(response.data);
                    console.log(response.data.id);
                    this.setState({
                        normaId: response.data.id

                    });

                    console.log(response.data.id);
                    let formData = new FormData();
                    formData.append('file', this.state.pdfFile);

                    this.normaService.uploadNormaFile(response.data.id, 'pdf', formData).then(result => {
                        formData = new FormData();
                        formData.append('file', this.state.cadFile);
                        console.log(result);   
                        this.normaService
                            .uploadNormaFile(response.data.id, 'cad', formData)
                            .then(result => {
                                console.log(result);   
                            });
                    });
                }),

            toast.success(
                `${this.props.intl.formatMessage({
                    id: 'component.normas.modal.msg.success.crear'
                })}`,
                this.toggle()
            );
        } else {
            toast.error(
                `${this.props.intl.formatMessage({
                    id: 'component.normas.modal.error.upload'
                })}`
            );
        }  
        toast.success(
            `${this.props.intl.formatMessage({
                id: 'component.normas.modal.msg.success.crear'
            })}`,
            this.toggle()
        );
            } else { 
                toast.success(
                    `${this.props.intl.formatMessage({
                        id: 'component.normas.modal.msg.success.crear'
                    })}`,
                    this.toggle()
                );
        }
    };
    onChangeCodigo = e => {
        this.setState({
            codigoNorma: e.target.value

        });
    }
    onChangeNombre = e => {
        this.setState({
            nombreNorma: e.target.value

        });
    }
    onChangeDescripcion = e => {
        this.setState({
            normadescripcion: e.target.value

        });
    }
    searchNormas() {
        const estadoNorma = 'PUBLICADA';
        const norma = '';
        this.setState({
            loadingInformation: true
        });

        this.normaService.estadoNormas(estadoNorma).then(
            response => {
                const {data} = response;

                if (data !== null && data.length > 0) {
                    data.forEach(item => {
                        item.fechaStr = new Moment(item.fecha).format(
                            Constantes.DATE_FORMAT
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
                        id: 'component.normas.title'
                    })}`
                );

                this.setState({
                    loadingInformation: false
                });
            }
        );

    }

    getNorma(norma) {
        this.normaService.get(norma)
            .then(res => {
                const data = res.data;

                this.setState({

                    idData: res.data !== null ? res.data : []

                });
            });
    }

    componentDidMount() {
        this.searchNormas();
        this.getUsuarios();
    }

    render() {
        const idData = this.state.idData;
        const {norma} = this.props;

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
                    enabled={this.sessionInformation.admin}
                />
                <DetalleEditarNormaModal
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalEdit}
                    toggle={() => {
                        this.setState({
                            modalEdit: !this.state.modalEdit

                        });
                        this.searchNormas();
                    }}  
                    
                />
 
 {this.sessionInformation.admin ?  <DardebajaModal
                    norma={this.state.selectedNorma}
                    isOpen={this.state.DardebajaModal}
                    toggle={() => {
                        this.setState({
                            DardebajaModal: !this.state.DardebajaModal
                        });
                    }}
                    /* */
                    onDarBaja={norma => {
                        console.log(norma);

                        const rowData = this.state.rowData;

                        if (rowData !== null && rowData.length > 0) {
                            this.normaService.getById(norma.id).then(
                                response => {
                                    rowData.some((item, index) => {
                                        if (item.id === norma.id) {
                                            rowData[index].estado = response.data.estado;
                                            return true;
                                        }
                                    });
                                    this.gridApi.setRowData(rowData);
                                },
                                errorResponse => {
                                    console.error(errorResponse);
                                    toast.error(
                                        `${this.props.intl.formatMessage({
                                            id: 'component.workflow.modal.msg.error'
                                        })}`
                                    );
                                }
                            );
                        }
                    }}
                    onSave={norma => {
                        this.setState({
                            publishing: true
                        });

                        this.normaService.dardeBaja(norma.id).then(
                            () => {
                                this.setState(
                                    {
                                        publishing: false,
                                        DardebajaModal: false
                                    },
                                    () => {
                                        this.searchNormas();
                                    }
                                );
                                toast.success(
                                    `${this.props.intl.formatMessage({
                                        id: 'component.modal.succes.baja'
                                    })}`
                                );
                            },
                            () => {
                                this.setState({
                                    publishing: false,
                                    DardebajaModal: false
                                });

                                toast.error(
                                    `${this.props.intl.formatMessage({
                                        id: 'component.workflow.modal.msg.error'
                                    })}`
                                );
                            }
                        );
                    }}
                    enabled={this.sessionInformation.admin}
                /> : []}

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
                                        disabled={!this.sessionInformation.admin}
                                    >

                                        <Fa icon="plus" />
                                    </MDBBtn>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered

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

                                                    <label>Usuarios que pueden comentar</label>
                                                    <Select
                                                        options = {this.state.usersOptions}
                                                        onChange = {selectedOptions => {
                                                            this.setState({
                                                                selectedUsers: selectedOptions
                                                            });
                                                        }}
                                                        value={this.state.selectedUsers}
                                                        isMulti
                                                        isSearchable
                                                        placeholder={'Listado de usuarios'}
                                                    />
                                                    <br/>
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
                                            <MDBBtn color="secondary" onClick={
                                                this.toggle

                                            } > Cerrar </MDBBtn>

                                            <Button color="primary"

                                                disabled={!this.state.nombreNorma || !this.state.codigoNorma || !this.state.normadescripcion
                                                    }
                                                color="primary"
                                                onClick={this.publishToWorkflow}

                                            >
                                              
                                                 Enviar a workflow</Button>
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
