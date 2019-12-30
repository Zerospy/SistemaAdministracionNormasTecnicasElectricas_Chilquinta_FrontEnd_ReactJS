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
import { MDBSelect } from "mdbreact";
import Moment from 'moment';
import {saveAs} from 'file-saver';
import LoginService from 'services/LoginService';


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
                    id: 'menu.documentos.categoria'
                })}`,
                field: 'codNorma',
                width: 100
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.nombre'
                })}`,
                field: 'nombre',
                width: 300
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.descripcion'
                })}`,
                field: 'descripcion',
                width: 300
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.datagrid.fecha'
                })}`,
                field: 'fechaStr',
                width: 150
            },
            {
                headerName: 'Descargar',
                field: 'id',
                cellRenderer: 'DownloadButtonGrid',
                onClick: norma => {
                    this.setState({
                        selectedNorma: norma,
                        modalDetalle: true
                    });
                },
                editable: false,
                colId: 'id',
                width: 150
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
   
  searchNormas = () => {
    this.setState({
      loadingInformation: true
    });

    this.normaService.getDocumentos().then(
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


         
          


                <HeaderComponent />
                <Row>
                    <Col size="12">
                        <PanelComponent
                            title={`${this.props.intl.formatMessage({
                                id: 'menu.documentos.title'
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
                                   
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}

                                    >
                                        <MDBModalHeader toggle={this.toggle}>Crear Norma</MDBModalHeader>
                                        <MDBModalBody>

                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="formGroupExampleInput">Categoria de documento</label>
                                                
                                                      <MDBSelect
                                                       options={this.state.options}
                                                       selected="1"
                                                       label="Seleccione una categoria"
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

                                  
                                                    <br/>
                                                    <label>PDF</label>
                                                    <MDBFileInput
                                                        getValue={files => {
                                                            this.setState({
                                                                pdfFile: files[0]
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
                                                    || !this.state.pdfFile || !this.state.cadFile}
                                                color="primary"
                                                onClick={this.publishToWorkflow}

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
