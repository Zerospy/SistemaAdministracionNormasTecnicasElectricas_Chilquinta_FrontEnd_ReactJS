import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Input,
    MDBInput,
    MDBFileInput,
    Fa,
    Row,
    Col
} from 'mdbreact';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import PanelComponent from 'components/commons/panels/PanelComponent';
import InputSwitch from 'components/commons/base/InputSwitch';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import Constantes from 'Constantes';
import NormaService from 'services/NormaService';
import { toast } from 'react-toastify';
import pdf from 'assets/img/pdf.png';
import cad from 'assets/img/cad.png';
import { Link } from 'react-router-dom';
import UserService from 'services/UserService';
import DetallePerfilService from 'services/DetallePerfilService';
import PerfilService from 'services/PerfilService';

class EditUserModal extends React.Component {
    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.detallePerfilService = new DetallePerfilService();
        this.perfilService = new PerfilService();

        this.state = {
            name: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            avatar: '',
            enabled: false,
            admin: false,
            user: null,
            perfil: null,
            perfila: false,
            perfilb: false,
            perfilc: false,
            idPerfil: null,
            categorias: null
        };
        this.obtenerCategorias();
    }

    saveAvatarUser = () => {
        const formData = new FormData();
        formData.append('file', this.state.avatar);

        return this.userService.uploadUserAvatar(this.state.id, formData);
    };

    saveUserInformation = () => {
        this.selectCategory();
        const userToSave = {
            id: this.state.id,
            nombres: this.state.name,
            apellidos: this.state.lastName,
            administrador: this.state.admin,
            clave: this.state.password ? this.state.password : null,
            email: this.state.email,
            estado: this.state.enabled,
            usuario: this.state.username,
            perfil: this.state.perfil,
            idPerfil: this.state.idPerfil
        };

        this.setState({
            saving: true
        });

        this.userService.saveUser(userToSave).then(
            response => {
                if (this.state.id === undefined) {
                    this.setState({
                        id: response.data.id
                    });
                }

                if (
                    this.state.avatar !== null &&
                    this.state.avatar !== '' &&
                    this.state.avatar !== undefined
                ) {
                    this.saveAvatarUser().then(
                        () => {
                            this.setState(
                                {
                                    saving: false
                                },
                                () => {
                                    toast.success('El usuario se guardó correctamente');
                                    this.props.toggle();
                                    this.props.searchUsers();
                                }
                            );
                        },
                        response => {
                            console.error(response);
                            toast.error('Ocurrió un problema al guardar la información');
                            this.setState({
                                saving: false
                            });
                        }
                    );
                } else {
                    this.setState(
                        {
                            saving: false
                        },
                        () => {
                            toast.success('El usuario se guardó correctamente');
                            this.props.toggle();
                            this.props.searchUsers();
                        }
                    );
                }
            },
            errorResponse => {
                this.setState({
                    saving: false
                });
                toast.error(errorResponse);
            }
        );
    };

    componentDidUpdate(prevProps) {
        if (
            this.props !== null &&
            this.props.user !== null &&
            this.props.user !== prevProps.user
        ) {
            const { data } = this.props.user;

            if (!data.administrador) {
                this.searchPerfil(data.id);
            }
            this.setState({
                saving: false,
                id: data.id,
                name: data.nombres,
                lastName: data.apellidos,
                username: data.usuario,
                password: '',
                email: data.email,
                avatar: data.urlAvatar,
                enabled: data.estado,
                admin: data.administrador,
                perfil: this.state.perfil
            });
        }
    }

    searchPerfil(idUser) {
        this.detallePerfilService.getByIdUsuario(idUser).then(response => {
            if (response.data !== null) {
                const perfil = response.data.perfilId;
                this.state.idPerfil = response.data.id;
                this.selectCategoryLoad(perfil);
            }
        });
    }

    obtenerCategorias() {
        this.perfilService.get().then(
            resp => {
                if (resp.data !== null) {
                    this.setState({
                        categorias: resp.data
                    })
                }
            }
        );
    }

    selectCategoryLoad(cat) {
        let categoria = '';
        if (cat && this.state.categorias) {
            this.state.categorias.forEach(elem => {
                if (elem.id === cat) {
                    categoria = elem.perfil
                }
            });

            if (categoria === 'Subestaciones de poder') {
                this.setState({
                    perfila: true,
                });
            } else if (categoria === 'Distribucion') {
                this.setState({
                    perfilb: true,
                });
            } else if (categoria === 'Lineas de Transmision') {
                this.setState({
                    perfilc: true,
                });
            } else if (categoria === 'categoria 1 y 2') {
                this.setState({
                    perfila: true,
                    perfilb: true
                });
            } else if (categoria === 'categoria 1 y 3') {
                this.setState({
                    perfila: true,
                    perfilc: true
                });
            } else if (categoria === 'categoria 2 y 3') {
                this.setState({
                    perfilb: true,
                    perfilc: true
                });
            } else if (categoria === 'todas las categorias') {
                this.setState({
                    perfila: true,
                    perfilb: true,
                    perfilc: true
                });
            }
        } else {
            this.setState({
                perfila: false,
                perfilb: false,
                perfilc: false,
            });
        }
        this.state.perfil = categoria;
        console.log(this.state.perfil);
    }

    selectCategory() {
        let categoria = null;
        let categoriasFiltradas = null;

        if (this.state.perfila && !this.state.perfilb && !this.state.perfilc) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'Subestaciones de poder');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        } else if (this.state.perfilb && !this.state.perfila && !this.state.perfilc) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'Distribucion');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        } else if (this.state.perfilc && !this.state.perfila && !this.state.perfilb) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'Lineas de Transmision');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        } else if (this.state.perfila && this.state.perfilb && !this.state.perfilc) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'categoria 1 y 2');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        } else if (this.state.perfila && this.state.perfilc && !this.state.perfilb) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'categoria 1 y 3');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        } else if (this.state.perfilb && this.state.perfilc && !this.state.perfila) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'categoria 2 y 3');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        } else if (this.state.perfila && this.state.perfilb && this.state.perfilc) {
            categoriasFiltradas = this.state.categorias.filter(item => item.perfil === 'todas las categorias');
            categoriasFiltradas.forEach(element => {
                categoria = element.id;
            });
        }
        if (categoria) {
            this.state.perfil = categoria;
        }
    }

    render() {
        const { toggle, isOpen } = this.props;

        return (
            <Container>
                <Modal isOpen={isOpen} size="lg" centered>
                    <ModalHeader toggle={toggle}>
                        Modificar Información de usuario
                  </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <MDBInput
                                    label="Nombres"
                                    value={this.state.name}
                                    onChange={event => {
                                        this.setState({ name: event.target.value });
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBInput
                                    label="Apellidos"
                                    value={this.state.lastName}
                                    onChange={event => {
                                        this.setState({ lastName: event.target.value });
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBInput
                                    label="Usuario"
                                    value={this.state.username}
                                    onChange={event => {
                                        this.setState({ username: event.target.value });
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBInput
                                    label="Clave"
                                    value={this.state.password}
                                    onChange={event => {
                                        this.setState({ password: event.target.value });
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MDBInput
                                    label="Email"
                                    value={this.state.email}
                                    onChange={event => {
                                        this.setState({ email: event.target.value });
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBFileInput
                                    btnTitle={'Cargar'}
                                    textFieldTitle={'Imagen Avantar'}
                                    btnColor={'primary'}
                                    getValue={file => {
                                        const inputFile = file[0];

                                        if (
                                            inputFile !== undefined &&
                                            (inputFile.type === 'image/png' ||
                                                inputFile.type === 'image/jpeg')
                                        ) {
                                            this.setState({ avatar: inputFile });
                                        } else {
                                            toast.info('Solo se admiten los formatos PNG y JPEG');
                                            this.setState({ avatar: '' });
                                        }
                                    }}
                                    accept="image/png, image/jpeg"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div>
                                    <label>Activo</label>
                                    <InputSwitch
                                        rightText="Sí"
                                        leftText="No"
                                        value={this.state.enabled}
                                        onChange={event => {
                                            this.setState({ enabled: event.target.checked });
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <label>Administrador</label>
                                    <InputSwitch
                                        rightText="Sí"
                                        leftText="No"
                                        value={this.state.admin}
                                        onChange={event => {
                                            this.setState({ admin: event.target.checked });
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {!this.state.admin ? (
                            <Row >
                                <Col>
                                    <div>
                                        <label>Subestaciones de poder</label>
                                        <InputSwitch
                                            rightText="Sí"
                                            leftText="No"
                                            value={this.state.perfila}
                                            onChange={event => {
                                                this.setState({ perfila: event.target.checked });
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label>Distribucion</label>
                                        <InputSwitch
                                            rightText="Sí"
                                            leftText="No"
                                            value={this.state.perfilb}
                                            onChange={event => {
                                                this.setState({ perfilb: event.target.checked });
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label>Lineas de Transmision</label>
                                        <InputSwitch
                                            rightText="Sí"
                                            leftText="No"
                                            value={this.state.perfilc}
                                            onChange={event => {
                                                this.setState({ perfilc: event.target.checked });
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ) : null}
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Button
                                    color="info"
                                    onClick={toggle}
                                    disabled={this.state.saving}
                                >
                                    {' '}
                                    <FormattedMessage id="app.general.btn.cancel" />
                                </Button>
                                <Button
                                    disabled={this.state.saving}
                                    onClick={this.saveUserInformation}
                                >
                                    {this.state.saving ? (
                                        <Fa icon="spinner" className="fa-1x fa-spin" />
                                    ) : (
                                            <FormattedMessage id="app.general.btn.save" />
                                        )}
                                </Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default injectIntl(EditUserModal);

EditUserModal.propTypes = {
    toggle: PropTypes.func,
    searchUsers: PropTypes.func,
    isOpen: PropTypes.bool,
    intl: PropTypes.any,
    user: PropTypes.any
};
