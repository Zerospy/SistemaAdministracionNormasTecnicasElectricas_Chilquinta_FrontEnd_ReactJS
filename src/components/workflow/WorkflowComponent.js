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
import {toast} from 'react-toastify';
import Moment from 'moment';

class WorkflowComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.normaService = new NormaService();

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
                <CommentsModal
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalComments}
                    publishing={this.state.publishing}
                    toggle={() => {
                        this.setState({
                            modalComments: !this.state.modalComments
                        });
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
