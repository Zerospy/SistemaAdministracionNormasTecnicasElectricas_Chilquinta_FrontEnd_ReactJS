import HeaderComponent from 'components/commons/HeaderComponent';
import {WorkflowContext} from 'components/workflow/WorkflowContext';
import CommentsModal from 'components/workflow/CommentsModal';
import {Col, Row} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import {toast} from 'react-toastify';

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
                    id: 'component.workflow.datagrid.id'
                })}`,
                field: 'id',
                width: 50
            },
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
                width: 420
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.descripcion'
                })}`,
                field: 'descripcion',
                width: 420
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
                headerName: '#',
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
            selectedNorma: null
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
                    toggle={() => {
                        this.setState({
                            modalComments: !this.state.modalComments
                        });
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
