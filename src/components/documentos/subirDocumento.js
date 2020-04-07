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
import UserService from 'services/UserService';
import { toast } from 'react-toastify';
import { Table, Popconfirm, Icon, Upload } from "antd";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBFileInput,
    MDBInput,
    MDBBtn,
    Fa,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
import GridUsuarios from 'components/normas/GridUsuarios';
import Moment from 'moment';
import Select from 'react-select';

class subirDocumento extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }
    state = {
        modal: false,
    };
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    constructor(props) {
        super(props);
        this.onUploadPDF = this.onUploadPDF.bind(this);
        this.normaService = new NormaService();
        this.userService = new UserService();

        this.state = {
            documento: "Ningun documento cargado..",
            pdfFile: '',
            cadFile: '',
            codigoNorma: '',
            nombreNorma: '',
            normaDescripcion: '',
            estado: {
                descripcion: 'En Revisión',
                id: 0
            },
            usersOptions: [],
            selectedUsers: [],

        };

    }
    getNorma(norma) {
        this.normaService.get(norma).then(res => {
            const data = res.data;

            this.setState({
                idData: res.data !== null ? res.data : []
            });
        });
    }

    reload = () => {
        window.location.reload(true);
        /* this.props.history.push('/CrearNorma'); */
    }

    publishToDocumentos = async () => {
        const normaId = '';

        const a = Moment().toObject();
        const b = {
            year: a.years,
            month: a.months + 1,
            day: a.date,
            hour: a.hours,
            minutes: a.minutes,
            seconds: a.seconds,
            nanos: a.milliseconds
        };
        if (b.day < 10) {
            b.day = `0${b.day}`;
        }

        if (b.month < 10) {
            b.month = `0${b.month}`;
        }
        const c = `${b.year.toString()}-${b.month.toString()}-${b.day.toString()}`;

        const params = {
            codNorma: this.state.codigoNorma,
            nombre: this.state.nombreNorma,
            descripcion: this.state.normadescripcion,
            estado: { descripcion: '', id: '1' },
            fecha: c,
            tipoNorma: 'DOCUMENTO'
        };
        this.normaService.post(params).then(response => {
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

            this.setState({

                normaId: response.data.id
            });
            console.log(normaId);

            this.setState({
                savingNorma: true
            });
            this.normaService
                .uploadNormaFile(response.data.id, 'pdf', formData)
                .then(result => {

                    formData = new FormData();
                    formData.append('file', this.state.cadFile);

                    this.setState({
                        savingNorma: false
                    });
                    toast.success(
                        `${this.props.intl.formatMessage({
                            id: 'component.normas.modal.btn.exitoDocumento'
                        })}`
                    );

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
    onUploadPDF(e) {

        this.setState({
            pdfFile: e.target.files[0]
        })
        this.setState({
            documento: "Documento cargado",

        })

    }


    componentDidMount() {

    }

    render() {
        return (
            <NormasContext.Provider value={this}>
                <HeaderComponent />
                <Row>
                    <Col size="12">
                        <PanelComponent
                            title={`${this.props.intl.formatMessage({
                                id: 'menu.documentos.subir'
                            })}`}
                            centered
                        >
                            <Col size="4">
                                <MDBContainer centered>
                                    <MDBCard
                                        className="card-body"
                                        style={{
                                            width: '60rem',
                                            marginTop: '1rem',
                                            marginLeft: '6rem'
                                        }}
                                    >
                                        <form>
                                            <div>
                                                <select className="browser-default custom-select"
                                                    value={this.state.nombreNorma} onChange={this.onChangeNombre}>
                                                    >
                                                <option> Seleccione una categoria</option>
                                                    <option nombreNorma="Subestaciones de poder">Subestaciones de poder</option>
                                                    <option nombreNorma="Distribucion" >Distribucion</option>
                                                    <option nombreNorma="Lineas de transmision" >Lineas de transmision</option>
                                                </select>
                                            </div>
                                            <br />

                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Nombre documento"
                                                prepend="Default"
                                                onChange={this.onChangeCodigo}
                                            />
                                            <MDBInput
                                                type="textarea"
                                                label="Descripcion del documento"
                                                rows="5"
                                                onChange={this.onChangeDescripcion}
                                            />
                                            <br />
                                            <label>Subir Documento</label>
                                              {/*
                                            <MDBFileInput
                                                label="Seleccione un documento para cargar"
                                                getValue={files => {
                                                    this.setState({
                                                        pdfFile: files[0]
                                                    });
                                                }}

                                            > </MDBFileInput>

                                          Nuevo Input*/}

                                            <div>


                                                <label for="choose_file"><span id="file_name" className="btn btn-default" >Seleccione un documento</span>
                                                {this.state.documento}
                                                    <input type="file" name="choose_file" id="choose_file"
                                                        onChange={this.onUploadPDF}
                                                        style={{ width: '0px' }} />
                                                </label>


                                            </div>
                                            {/*Nuevo Input*/}


                                            <Col className="offset-9" size="4">
                                                <Button
                                                    disabled={this.state.savingNorma ||
                                                        !this.state.nombreNorma ||
                                                        !this.state.normadescripcion ||
                                                        !this.state.pdfFile
                                                    }
                                                    variant="primary"
                                                    onClick={this.publishToDocumentos}
                                                >

                                                    {this.state.savingNorma ? (
                                                        <Fa icon="spinner" className="fa-1x fa-spin" />
                                                    ) : (
                                                            <FormattedMessage id="component.normas.modal.btn.cargarDocto" />
                                                        )}


                                                </Button> {' '}
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


export default injectIntl(subirDocumento);

subirDocumento.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
