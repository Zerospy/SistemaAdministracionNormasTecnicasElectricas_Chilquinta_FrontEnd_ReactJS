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
import {FormattedMessage, injectIntl} from 'react-intl';
import PanelComponent from 'components/commons/panels/PanelComponent';
import InputSwitch from 'components/commons/base/InputSwitch';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import Constantes from 'Constantes';
import NormaService from 'services/NormaService';
import {toast} from 'react-toastify';
import pdf from 'assets/img/pdf.png';
import cad from 'assets/img/cad.png';
import {Link} from 'react-router-dom';

class EditUserModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingInformation: false,
            name: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            avatar: '',
            enabled: false,
            admin: false,
            user: null
        };
    }

    componentDidUpdate(prevProps) {
        if (
            this.props !== null &&
      this.props.user !== null &&
      this.props.user !== prevProps.user
        ) {
            /**
                administrador: false
                apellidos: "Steffens Aburto"
                clave: "cf9e7ac87e8a11e68b98b093d21625d0"
                claveTextoPlano: null
                email: "steffen@chilquinta.cl"
                estado: 1
                fullName: "Enrique Steffens Aburto"
                id: 1
                nombres: "Enrique"
                timestamp: null
                urlAvatar: null
                usuario: "esteffen"
             */
            const {data} = this.props.user;
            this.setState({
                id: data.id,
                name: data.nombres,
                lastName: data.apellidos,
                username: data.usuario,
                password: '',
                email: data.email,
                avatar: data.urlAvatar,
                enabled: data.estado,
                admin: data.administrador
            });
        }
    }

    render() {
        const {toggle, isOpen} = this.props;

        return (
            <Container>
                <Modal isOpen={isOpen} size="lg">
                    <ModalHeader toggle={toggle}>
            Agregar/Modificar Información de usuario
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <MDBInput
                                    label="Nombres"
                                    value={this.state.name}
                                    onChange={event => {
                                        this.setState({name: event.target.value});
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBInput
                                    label="Apellidos"
                                    value={this.state.lastName}
                                    onChange={event => {
                                        this.setState({lastName: event.target.value});
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBInput
                                    label="Usuario"
                                    value={this.state.username}
                                    onChange={event => {
                                        this.setState({username: event.target.value});
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBInput
                                    label="Clave"
                                    value={this.state.password}
                                    onChange={event => {
                                        this.setState({password: event.target.value});
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
                                        this.setState({email: event.target.value});
                                    }}
                                />
                            </Col>
                            <Col>
                                <MDBFileInput
                                    btnTitle={'Cargar'}
                                    textFieldTitle={'Imagen Avantar'}
                                    btnColor={'primary'}
                                    value={this.state.avatar}
                                    onChange={event => {
                                        this.setState({avatar: event.target.value});
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
                                            this.setState({enabled: event.target.checked});
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
                                            this.setState({admin: event.target.checked});
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default injectIntl(EditUserModal);

EditUserModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    intl: PropTypes.any,
    user: PropTypes.any
};
