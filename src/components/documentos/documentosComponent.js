import HeaderComponent from 'components/commons/HeaderComponent';
import { NormasContext } from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import {
    Col,
    Row,
    Input,
    Fa,
    Button,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBModal,
    MDBBtn,
    MDBFileInput
} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import UserService from 'services/UserService';
import { toast } from 'react-toastify';
import { MDBSelect } from 'mdbreact';
import Moment from 'moment';
import { saveAs } from 'file-saver';
import LoginService from 'services/LoginService';
import Downloadclic from 'components/documentos/downloadclic';
import DetallePerfilService from 'services/DetallePerfilService';


class NormasComponent extends React.Component {
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
        this.userService = new UserService();
        this.detallePerfilService = new DetallePerfilService();

        this.loginService = new LoginService();
        this.sessionInformation = this.loginService.getSessionInformation();

        const columnDefs = [
            {
                headerName: `${props.intl.formatMessage({
                    id: 'menu.documentos.categoria'
                })}`,
                field: 'codNorma',
                width: 300
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
                field: 'fecha',
                width: 150
            },
            {
                headerName: 'Descargar',
                field: 'id',
                cellRenderer: 'DownloadButtonGrid',
                onClick: norma => {
                    this.setState({
                        selectedNorma: norma,
                        downloadclic: true
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
            modalDownload: false,
            modalCommentRequest: false,
            loadingDetalles: false,
            quickFilter: '',
            codigoNorma: '',
            nombreNorma: '',
            normadescripcion: '',
            normaId: '',
            selectedNorma: null,
            downloadclic: false,
            usersOptions: [],
            selectedUsers: [],
            estado: {
                descripcion: 'En Revisión',
                id: 0
            },
            estadoNorma: '',
            fecha: {
                fecha: ''
            },
            perfil: null,
            namePerfil: ''
        };
    }

    getUsuarios = () => {
        this.userService.getUsers().then(
            response => {
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
            },
            () => {
                toast.info('Ocurrió un problema al consultar los usuarios');
            }
        );
    };

    onChangeCodigo = e => {
        this.setState({
            codigoNorma: e.target.value
        });
    };
    onChangeNombre = e => {
        this.setState({
            nombreNorma: e.target.value
        });
    };
    onChangeDescripcion = e => {
        this.setState({
            normadescripcion: e.target.value
        });
    };

    searchNormas = () => {
        this.setState({
            loadingInformation: true
        });

        console.log(this.sessionInformation);

        this.normaService.getDocumentos().then(
            response => {
                if (response.data && response.data.length > 0) {
                    response.data.forEach(item => {
                        item.fecha = new Moment(item.fecha).format(
                            Constantes.DATETIME_FORMAT
                        );
                    });
                }
                if (response.data !== null && !this.sessionInformation.admin) {
                    this.detallePerfilService.getByIdUsuario(this.sessionInformation.id).then(resp => {
                        this.state.perfil = resp.data.perfilId;
                        let name = '';
                        let codName = '';
                        if (this.state.perfil !== 1012) {
                            if (this.state.perfil === 9) {
                                name = 'Subestaciones de poder';
                                codName = 9;
                                response.data = response.data.filter(item => item.codNorma === name)
                            } else if (this.state.perfil === 10) {
                                name = 'Distribucion';
                                codName = 10;
                                response.data = response.data.filter(item => item.codNorma === name)
                            } else if (this.state.perfil === 11) {
                                name = 'Lineas de Transmision';
                                codName = 11;
                                response.data = response.data.filter(item => item.codNorma === name)
                            } else if (this.state.perfil === 1009) {
                                name = 'Lineas de Transmision';
                                codName = 1009;
                                response.data = response.data.filter(item => item.codNorma !== name)
                            } else if (this.state.perfil === 1010) {
                                name = 'Distribucion';
                                codName = 1010;
                                response.data = response.data.filter(item => item.codNorma !== name)
                            } else if (this.state.perfil === 1011) {
                                name = 'Subestaciones de poder';
                                response.data = response.data.filter(item => item.codNorma !== name)
                            }
                        }

                        this.state.namePerfil = name;
                        this.setState({
                            rowData: response !== null ? response.data : [],
                            loadingInformation: false
                        });
                    });
                } else if (response.data !== null && this.sessionInformation.admin) {

                    this.setState({
                        rowData: response !== null ? response.data : [],
                        loadingInformation: false
                    });
                }
            },
            () => {
                toast.info(
                    `${this.props.intl.formatMessage({
                        id: 'menu.documentos.title'
                    })}`
                );

                this.setState({
                    loadingInformation: false
                });
            }
        );
    };

    searchPerfil(idUser, data) {
        this.detallePerfilService.getByIdUsuario(idUser).then(response => {
            this.state.perfil = response.data.perfilId;
            let name = '';
            if (this.state.perfil === 9) {
                name = 'Subestaciones de poder';
            } else if (this.state.perfil === 10) {
                name = 'Distribucion';
            } else if (this.state.perfil === 11) {
                name = 'Lineas de Transmision';
            }

            this.state.namePerfil = name;
            data = data.filter(item => item.codNorma === this.state.namePerfil)
            console.log(this.state.namePerfil);
        });
    }
    getNorma(norma) {
        this.normaService.get(norma).then(res => {
            const data = res.data;

            this.setState({
                idData: res.data !== null ? res.data : []
            });
        });
    }

    downloadCad = () => {
        const { id, codNorma } = this.props.norma;
        this.normaService.downloadNormaFile(id, 'cad').then(response => {
            saveAs(
                new Blob([response.data]),
                `${codNorma}-${this.props.norma.cadFileName}`
            );
        });
    };

    componentDidMount() {
        this.searchNormas();
        this.getUsuarios();
    }

    render() {
        const idData = this.state.idData;
        const { norma } = this.props;

        return (
            <NormasContext.Provider value={this}>
                <Downloadclic
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalDownload}
                    toggle={() => {
                        this.setState({
                            modalDownload: !this.state.modalDetalle
                        });
                    }}
                />

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
        );
    }
}

export default injectIntl(NormasComponent);

NormasComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
