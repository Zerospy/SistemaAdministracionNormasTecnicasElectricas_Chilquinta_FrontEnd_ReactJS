import Constantes from 'Constantes';
import { Button, Col, Container, Fa, MDBCard, MDBContainer, MDBFileInput, MDBInput, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'mdbreact';
import Moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import LoginService from 'services/LoginService';
import NormaService from 'services/NormaService';
import UserService from 'services/UserService';

class EditarDocumentoModal extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.onUploadPDF = this.onUploadPDF.bind(this);
        this.normaService = new NormaService();
        this.userService = new UserService();

        this.loginService = new LoginService();
        this.sessionInformation = this.loginService.getSessionInformation();

        const columnDefs = [
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.title.name'
                })}`,
                field: 'nombre',
                width: 901
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
            modalEdit: false,
            codigoNorma: '',
            nombreNorma: '',
            normadescripcion: '',
            usersOptions: [],
            selectedUsers: [],
            documento: "Ningun documento cargado..",
            pdfFile: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }


    publishToDocumentos = async () => {
        const normaId = this.props.norma.id;
        if (this.state.codigoNorma === '' || this.state.codigoNorma === null) {
            this.state.codigoNorma = JSON.stringify(this.props.norma, ['codNorma'])
                .split('{"codNorma":"')
                .join('');
            this.state.codigoNorma = this.state.codigoNorma.split('"}').join('');
        }
        if (this.state.nombreNorma === '' || this.state.nombreNorma === null) {
            this.state.nombreNorma = JSON.stringify(this.props.norma, ['nombre'])
                .split('{"nombre":"')
                .join('');
            this.state.nombreNorma = this.state.nombreNorma.split('"}').join('');
        }
        if (
            this.state.normadescripcion === '' ||
            this.state.normadescripcion === null
        ) {
            this.state.normadescripcion = JSON.stringify(this.props.norma, [
                'descripcion'
            ])
                .split('{"descripcion":"')
                .join('');
            this.state.normadescripcion = this.state.normadescripcion
                .split('"}')
                .join('');
        }

        const params = {
            codNorma: this.state.codigoNorma,
            nombre: this.state.nombreNorma,
            descripcion: this.state.normadescripcion
        };


        this.normaService.updateNorma(normaId, params).then(response => {

            let formData = new FormData();
            formData.append('file', this.state.pdfFile);

            this.setState({
                savingNorma: true
            });
            this.normaService
                .uploadNormaFile(normaId, 'pdf', formData)
                .then(result => {
                    this.setState({
                        savingNorma: false
                    });
                    toast.success(
                        `${this.props.intl.formatMessage({
                            id: 'component.normas.modal.btn.exitoDocumento'
                        })}`
                    );
                    this.setState({
                        pdfFile: '',
                        documento: "Ningun documento cargado..",
                    });
                    this.props.toggle();
                }),
                () => {
                    toast.error(
                        `${this.props.intl.formatMessage({
                            id: 'component.normas.modal.edit.errorDocumento'
                        })}`
                    );

                    this.setState({
                        savingNorma: false
                    });
                };
        })

    };

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (
            this.props !== null &&
            this.props.norma !== null &&
            this.props.norma !== prevProps.norma
        ) {
            this.getNorma(this.props.norma);
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    onChangeDescripcion = f => {
        this.setState({
            normadescripcion: f.target.value
        });
    };
    onChangeCodNorma = e => {
        this.setState({
            codigoNorma: e.target.value
        });
    };
    onChangeNombreNorma = g => {
        this.setState({
            nombreNorma: g.target.value
        });
    };

    getNorma(norma) {
        this.setState({
            modalEdit: true
        });

        this.normaService.getById(norma.id).then(response => {
            const data = response.data;

            data.usersToComment.forEach(user => {
                user.value = user.id;
                user.label = `${user.usuarioRecibeEntity.nombres} ${user.usuarioRecibeEntity.apellidos}`;
            });
            this.setState({
                selectedUsers: data.usersToComment,
                loadingInformation: false,
                nombreNorma: data.nombre,
                normadescripcion: data.descripcion,
                codigoNorma: data.codNorma
            });
        });
    }

    onUploadPDF(e) {

        this.setState({
            pdfFile: e.target.files[0]
        })
        this.setState({
            documento: "Documento cargado",

        })

    }

    render() {
        const { toggle, isOpen, onSave, norma } = this.props;

        const normaid0 = JSON.stringify(this.props.norma, ['codNorma'])
            .split('{"codNorma":"')
            .join('');
        const codigoNorma = normaid0.split('"}').join('');

        const normaname0 = JSON.stringify(this.props.norma, ['nombre'])
            .split('{"nombre":"')
            .join('');
        const nombreNorma = normaname0.split('"}').join('');

        const normadesc0 = JSON.stringify(this.props.norma, ['descripcion'])
            .split('{"descripcion":"')
            .join('');
        const normadescripcion = normadesc0.split('"}').join('');

        const normafecha0 = JSON.stringify(this.props.norma, ['fecha'])
            .split('{"fecha":"')
            .join('');
        const normafecha = normafecha0.split('"}').join('');

        const normaDesc = JSON.stringify(this.props.norma, ['id']);




        return (
            <Container>
                <Modal isOpen={isOpen} size="lg" centered>
                    <ModalHeader toggle={toggle}>
                        <FormattedMessage id="menu.documentos.editar" />
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <MDBContainer>
                                    <MDBCard
                                        className="card-body"
                                    >
                                        <form>
                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Categoria"
                                                prepend="Default"
                                                value={codigoNorma}
                                                disabled
                                            />

                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Nombre documento"
                                                prepend="Default"
                                                value={this.state.nombreNorma}
                                                onChange={this.onChangeNombreNorma}
                                            />
                                            <MDBInput
                                                type="textarea"
                                                label="Descripcion del documento"
                                                rows="5"
                                                value={this.state.normadescripcion}
                                                onChange={this.onChangeDescripcion}
                                            />
                                            <br />
                                            <label>Subir Documento</label>
                                            <div>
                                                <label for="choose_file"><span id="file_name" className="btn btn-default" >Seleccione un documento</span>
                                                    {this.state.documento}
                                                    <input type="file" name="choose_file" id="choose_file"
                                                        onChange={this.onUploadPDF}
                                                        style={{ width: '0px' }} />
                                                </label>
                                            </div>
                                        </form>
                                    </MDBCard>
                                </MDBContainer>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Col className="offset-9" size="4">
                            <Button
                                disabled={this.state.savingNorma ||
                                    !this.state.nombreNorma ||
                                    !this.state.normadescripcion ||
                                    !this.state.pdfFile
                                }
                                color="primary"
                                onClick={this.publishToDocumentos}
                            >
                                {this.state.savingNorma ? (
                                    <Fa icon="spinner" className="fa-1x fa-spin" />
                                ) : (
                                        <FormattedMessage id="component.normas.modal.btn.cargarDocto" />
                                    )}
                                {' '}

                            </Button>
                        </Col>
                    </ModalFooter>
                </Modal>
            </Container>
        )
    }
}


export default injectIntl(EditarDocumentoModal);

EditarDocumentoModal.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
