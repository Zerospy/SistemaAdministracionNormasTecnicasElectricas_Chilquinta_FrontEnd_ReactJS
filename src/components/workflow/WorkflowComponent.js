/* eslint-disable react/jsx-key */
import HeaderComponent from 'components/commons/HeaderComponent';
import {WorkflowContext} from 'components/workflow/WorkflowContext';
import CommentsModal from 'components/workflow/CommentsModal';
import {Col, Row, Input, Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import LoginService from 'services/LoginService';
import {toast} from 'react-toastify';
import Moment from 'moment';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import DetalleEditarNormaModal from 'components/normas/DetalleEditarNormaModal';
import DardebajaModal from 'components/normas/DardebajaModal';
class WorkflowComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.gridApi = null;

        this.normaService = new NormaService();

        this.loginService = new LoginService();
        this.sessionInformation = this.loginService.getSessionInformation();

        const columnDefs = [
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.codNorma'
                })}`,
                field: 'codNorma',
                width: 120
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.nombre'
                })}`,
                field: 'nombre',
                width: 380
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.descripcion'
                })}`,
                field: 'descripcion',
                width: 360
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.estado'
                })}`,
                field: 'estado.descripcion',
                width: 140
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.fecha'
                })}`,
                field: 'fecha',
                width: 180
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
                    id: 'component.workflow.datagrid.actions'
                })}`,
                field: 'id',
                cellRenderer: 'CommentsButtonGridRenderer',
                onClick: norma => {
                    this.setState({
                        selectedNorma: norma,
                        modalComments: true
                    });
                },
                editable: false,
                colId: 'id',
                width: 50
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
            loadingInformation: false,
            modalComments: false,
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
                        id: 'component.workflow.title'
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
            <WorkflowContext.Provider value={this}>
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

                <CommentsModal
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalComments && this.sessionInformation.admin}
                    publishing={this.state.publishing}
                    toggle={() => {
                        this.setState({
                            modalComments: !this.state.modalComments
                        });
                    }}
                    onSaveComment={norma => {
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

                        this.normaService.publish(norma.id).then(
                            () => {
                                this.setState(
                                    {
                                        publishing: false,
                                        modalComments: false
                                    },
                                    () => {
                                        this.searchNormas();
                                    }
                                );
                                toast.success(
                                    `${this.props.intl.formatMessage({
                                        id: 'component.workflow.modal.msg.success'
                                    })}`
                                );
                            },
                            () => {
                                this.setState({
                                    publishing: false,
                                    modalComments: false
                                });

                                toast.error(
                                    `${this.props.intl.formatMessage({
                                        id: 'component.workflow.modal.msg.error'
                                    })}`
                                );
                            }
                        );
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
                                id: 'component.workflow.title'
                            })}`}
                        >
                            <Row>
                                <Col size="4">
                                    <Input
                                        size="sm"
                                        label={`${this.props.intl.formatMessage({
                                            id: 'component.workflow.datagrid.search'
                                        })}`}
                                        value={this.state.quickFilter}
                                        onChange={event => {
                                            this.setState({
                                                quickFilter: event.target.value
                                            });
                                        }}
                                    />
                                </Col>

                                <Col className="offset-6" size="2">
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            this.searchNormas();
                                        }}
                                    >
                                        {' '}
                                        <Fa icon="sync" />
                                    </Button>
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
                                onGridLoad={params => {
                                    this.gridApi = params.api;
                                }}
                            />
                        </PanelComponent>
                    </Col>
                </Row>
            </WorkflowContext.Provider>
        ];
    }
}

export default injectIntl(WorkflowComponent);

WorkflowComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
