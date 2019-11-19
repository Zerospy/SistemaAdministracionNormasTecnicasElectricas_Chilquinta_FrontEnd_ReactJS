import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Fa,
    Row,
    Col,
    MDBFileInput
} from 'mdbreact';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import Constantes from 'Constantes';
import NormaService from 'services/NormaService';
import { toast } from 'react-toastify';
import pdf from 'assets/img/pdf.png';
import cad from 'assets/img/cad.png';
import { Link } from 'react-router-dom';

class DetalleEditarNormaModal extends React.Component {
    state = {
        id: null
    };
    constructor(props) {
        super(props);

        this.normaService = new NormaService();

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
            normadescripcion: ''
            
        };

        this.handleChange = this.handleChange.bind(this);
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
    saveNorma = () => {


        const normaId = this.props.norma.id;
        const {onSaveNorma, norma} = this.props;
        let params = {
                codNorma: this.state.codigoNorma, nombre: this.state.nombreNorma,
                descripcion: this.state.normadescripcion
            }
        this.normaService
            .post(normaId, {params}
            )
            .then(response => {
                const data = response.data;
              
                  console.log(params);
                  console.log(this.state.normadescripcion);
                    console.log(response);
            })}
          

        /*
        .then(
            response => {
                const data = response.data;
              
                onSaveNorma(norma);
                this.setState(
                    {
                        rowData: [...rowData, data],
                        savingNorma: false
                    },
                    () => {
                        this.setState({
                            normaDescripcion: ''
                        });
                    }
                );
            },
            () => {
                toast.error(
                    `${this.props.intl.formatMessage({
                        id: 'component.normas.modal.edit.error'
                    })}`
                );

                this.setState({
                    savingNorma: false
                });
            }
        );
};
*/
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

        componentDidUpdate(prevProps) {
            if (
                this.props !== null &&
                this.props.norma !== null &&
                this.props.norma !== prevProps.norma
            ) {
                this.setState({
                    rowData: []
                });
                this.getNorma(this.props.norma);
            }
        }
        handleChange(event) {
            this.setState({ value: event.target.value });
        }

        onChangeDescripcion = (e) => {
            this.setState({
                normadescripcion: e.target.value

            })
        }

        render() {
            const { toggle, isOpen, onSave, norma } = this.props;

            const normaid0 = JSON.stringify(this.props.norma, ['codNorma'])
                .split('{"codNorma":"')
                .join('');
            const normaid = normaid0.split('"}').join('');

            const normaname0 = JSON.stringify(this.props.norma, ['nombre'])
                .split('{"nombre":"')
                .join('');
            const normaname = normaname0.split('"}').join('');

            const normadesc0 = JSON.stringify(this.props.norma, ['descripcion'])
                .split('{"descripcion":"')
                .join('');
            const normadesc = normadesc0.split('"}').join('');

            const normafecha0 = JSON.stringify(this.props.norma, ['fecha'])
                .split('{"fecha":"')
                .join('');
            const normafecha = normafecha0.split('"}').join('');

            const normaDesc = JSON.stringify(this.props.norma, ['id']);

            return (

                <Container>
                    <Modal isOpen={isOpen} size="lg">
                        <ModalHeader toggle={toggle}>
                            <FormattedMessage id="component.normas.title.EditModal" />
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col size="12">

                                    <form>
                                    <div className="form-group">
                                        <label htmlFor="formGroupExampleInput">Codigo de Norma</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            defaultValue={this.state.codigoNorma}
                                            onChange={this.handleChange}
                                        />

                                        <label htmlFor="formGroupExampleInput">Nombre Norma</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            defaultValue={this.state.nombreNorma}
                                            onChange={this.handleChange}
                                        />

                                        <label htmlFor="formGroupExampleInput">
                                            Descripcion Norma
                                  </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            value={this.state.normadescripcion}

                                            onChange={this.onChangeDescripcion}
                                            readOnly={this.state.savingNorma}
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
                                </Col>
                            </Row>
                            <Row>
                                <Col size="9"></Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-end">
                                    <Button
                                        disabled={!this.state.pdfFile || !this.state.cadFile}
                                        color="primary"
                                        onClick={this.publishToWorkflow, this.saveNorma}
                                    >
                                        {this.state.savingNorma ? (
                                            <Fa icon="spinner" className="fa-1x fa-spin" />
                                        ) : (
                                                <FormattedMessage id="component.normas.modal.btn.editWorkflow" />
                                            )}
                                    </Button>
                                    <Button
                                        disabled={this.state.savingNorma}
                                        color="primary"
                                        onClick={this.saveNorma}
                                    >
                                        {this.state.savingNorma ? (
                                            <Fa icon="spinner" className="fa-1x fa-spin" />
                                        ) : (
                                                <FormattedMessage id="component.normas.modal.btn.edit" />
                                            )}
                                    </Button>
                                    <Button
                                        color="cancel"
                                        onClick={toggle}
                                        disabled={this.props.publishing}
                                    >
                                        {' '}
                                        <FormattedMessage id="app.general.btn.cancel" />
                                    </Button>
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                </Container>
            );
        }
    }

    export default injectIntl(DetalleEditarNormaModal);

    DetalleEditarNormaModal.propTypes = {
        toggle: PropTypes.func,
        onSave: PropTypes.func,
        isOpen: PropTypes.bool,
        publishing: PropTypes.bool,
        intl: PropTypes.any,
        norma: PropTypes.any
    };
