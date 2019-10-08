import HeaderComponent from 'components/commons/HeaderComponent';
import {WorkflowContext} from 'components/workflow/WorkflowContext';
import {Col, Row} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import {MDBDataTable} from 'mdbreact';
import NormaService from 'services/NormaService';

class WorkflowComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.normaService = new NormaService();

        const data = {
            columns: [
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.id'
                    })}`,
                    field: 'id',
                    sort: 'asc',
                    width: 80
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.codNorma'
                    })}`,
                    field: 'codNorma',
                    sort: 'asc',
                    width: 80
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.nombre'
                    })}`,
                    field: 'nombre',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.descripcion'
                    })}`,
                    field: 'descripcion',
                    sort: 'asc',
                    width: 120
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.estado'
                    })}`,
                    field: 'estado',
                    sort: 'asc',
                    width: 110
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.fecha'
                    })}`,
                    field: 'fecha',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.tipoTabla'
                    })}`,
                    field: 'tipoTabla',
                    sort: 'asc',
                    width: 80
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.urlPdf'
                    })}`,
                    field: 'urlPdf',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: `${props.intl.formatMessage({
                        id: 'component.workflow.datagrid.urlCad'
                    })}`,
                    field: 'urlCad',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows: []
        };

        this.state = {
            pagination: {
                PageIndex: 1,
                RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            data: data,
            loadingInformation: false
        };
    }

    componentDidMount() {
        this.normaService.get().then(response => {
            const rowsState = this.state.data;
            rowsState.rows = response !== null ? response.data : [];
            this.setState({
                data: rowsState
            });
        });
    }

    render() {
        return (
            <WorkflowContext.Provider value={this}>
                <HeaderComponent />
                <br />
                <Row>
                    <Col size="12">
                        <PanelComponent
                            title={`${this.props.intl.formatMessage({
                                id: 'component.workflow.title'
                            })}`}
                        >
                            <MDBDataTable
                                striped
                                hover
                                data={this.state.data}
                            />
                        </PanelComponent>
                    </Col>

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
