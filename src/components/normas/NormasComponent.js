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
import { toast } from 'react-toastify';
import DetalleEditarNormaModal from './DetalleEditarNormaModal';


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
                        modalComments: true
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
            },
        ];

        this.state = {
            pagination: {
                PageIndex: 1,
                RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            columnDefs: columnDefs,
            rowData: [],
            loadingInformation: false,
            modalComments: false,
            modalEdit: false,
            loadingComments: false,
            selectedNorma: null,
            quickFilter: ''
        };
    }

    searchNormas() {
        this.setState({
            loadingInformation: true
        });

        this.normaService.get().then(
            response => {
                this.setState({
                    rowData: response !== null ? response.data : [],
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
                    isOpen={this.state.modalComments}
                    toggle={() => {
                        this.setState({
                            modalComments: !this.state.modalComments
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
                                    <MDBBtn onClick={this.toggle}
                                        size="sm"

                                    >

                                        <Fa icon="plus" />
                                    </MDBBtn>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Crear Norma</MDBModalHeader>
                                        <MDBModalBody>

                                            <div className="form-group">
                                                <label htmlFor="formGroupExampleInput">Codigo de Norma</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formGroupExampleInput"
                                                    defaultValue= ''
                                                    onChange={this.handleChange}
                                                />

                                                <label htmlFor="formGroupExampleInput">Nombre Norma</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formGroupExampleInput"
                                                    defaultValue=''
                                                    onChange={this.handleChange}
                                                />

                                                <label htmlFor="formGroupExampleInput">Descripcion Norma</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formGroupExampleInput"
                                                    defaultValue=''
                                                   
                                                    onChange=
                                                    {event => {
                                                        this.setState({
                                                            normadesc: event.target.value
                                                        });
                                                    }}
                                                    onKeyPress={event => {
                                                        if (event.key === 'Enter') {
                                                            this.saveNorma();
                                                        }
                                                    }}


                                                    readOnly={this.state.savingNorma}
                                                />
                                                <label>PDF</label>
                                                <MDBFileInput />
                                                <label>CAD</label>
                                                <MDBFileInput />
                                            </div>



                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}> Cerrar </MDBBtn>
                                            <MDBBtn color="primary" onClick={this.toggle}
                                                disabled={this.props.publishing}> Enviar a workflow</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </Col>
                            </Row>

                            <DataGridComponent
                                isLoading={this.state.loadingInformation}
                                classContainer="grid-container"
                                onPaginationChange={pagination => {
                                    this.setState(
                                        {
                                            pagination: pagination
                                        },
                                        () => {
                                            // search workflows
                                        }
                                    );
                                }}
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}
                                pagination={this.state.pagination}
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
