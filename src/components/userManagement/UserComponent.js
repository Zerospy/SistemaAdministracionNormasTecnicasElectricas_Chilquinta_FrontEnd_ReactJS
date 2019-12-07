/* eslint-disable react/jsx-key */
import HeaderComponent from 'components/commons/HeaderComponent';
import {UserContext} from 'components/userManagement/UserContext';
import EditUserModal from 'components/userManagement/EditUserModal';
import {Col, Row, Input, Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import UserService from 'services/UserService';
import {toast} from 'react-toastify';
import Moment from 'moment';

class UserComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.gridApi = null;

        this.userService = new UserService();

        const columnDefs = [
            {
                headerName: '#',
                field: 'id',
                width: 120
            },
            {
                headerName: 'Nombres',
                field: 'nombres',
                width: 380
            },
            {
                headerName: 'Apellidos',
                field: 'apellidos',
                width: 360
            },
            {
                headerName: 'Email',
                field: 'email',
                width: 140
            },
            {
                headerName: 'Editar',
                field: 'id',
                cellRenderer: 'EditButtonGridRenderer',
                onClick: user => {
                    console.log(user);
                    this.setState({
                        selectedUser: user,
                        modalUsers: true
                    });
                },
                editable: false,
                colId: 'id',
                width: 150
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
            modalUsers: false,
            loadingUsers: false,
            selectedUser: null,
            quickFilter: ''
        };
    }

    searchUsers() {
        this.setState({
            loadingInformation: true
        });

        this.userService.getUsers().then(
            response => {
                if (response.data && response.data.length > 0) {
                    response.data.forEach(item => {});
                }

                this.setState({
                    rowData: response !== null ? response.data : [],
                    loadingInformation: false
                });
            },
            () => {
                toast.info('Ocurrió un problema al consultar los usuarios');

                this.setState({
                    loadingInformation: false
                });
            }
        );
    }

    componentDidMount() {
        this.searchUsers();
    }

    render() {
        return [
            <UserContext.Provider value={this}>
                <EditUserModal
                    user={this.state.selectedUser}
                    isOpen={this.state.modalUsers}
                    toggle={() => {
                        this.setState({
                            modalUsers: !this.state.modalUsers
                        });
                    }}
                />
                <HeaderComponent />
                <Row>
                    <Col size="12">
                        <PanelComponent title={'Listado de usuarios'}>
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
                                            this.searchUsers();
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
            </UserContext.Provider>
        ];
    }
}

export default injectIntl(UserComponent);

UserComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
