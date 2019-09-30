import HeaderComponent from 'components/commons/HeaderComponent';
import {WorkflowContext} from 'components/workflow/WorkflowContext';
import {Col, Row} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';

class WorkflowComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        const columnDefs = [];
        columnDefs.push(
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.id'
                })}`,
                field: 'Id',
                width: 70
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.name'
                })}`,
                field: 'Name',
                width: 120
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.datagrid.comments'
                })}`,
                field: 'Comments',
                width: 140
            },
        );

        this.state = {
            pagination: {
                PageIndex: 1,
                RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            columnDefs: columnDefs,
            rowData: [],
            loadingInformation: false
        };
    }

    render() {
        return (
            <WorkflowContext.Provider value={this}>
                <HeaderComponent />
                <Row>
                    <Col>
                        <FormattedMessage id="component.workflow.title" />
                    </Col>
                </Row>
                <Row>
                    <PanelComponent
                        title={`${this.props.intl.formatMessage({
                            id: 'materials.panel.materialList.title'
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
                </Row>
            </WorkflowContext.Provider>
        );
    }
}

export default injectIntl(WorkflowComponent);

WorkflowComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
