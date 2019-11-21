
import HeaderComponent from 'components/commons/HeaderComponent';
import { NormasContext } from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import { Col, Row, Input, Btn } from 'mdbreact';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import { toast } from 'react-toastify';
import { MDBCard, MDBCardTitle, MDBCardText, MDBFileInput, MDBInput, MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import GridUsuarios from 'components/normas/GridUsuarios';

class normasInternacionales extends React.Component {

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

        this.state = {
            columnDefs: [],
            defaultColDef: {
                width: 100,
                headerCheckboxSelection: isFirstColumn,
                checkboxSelection: isFirstColumn,
                resizable: true
            },
            rowSelection: "multiple",
            rowData: []
        };
    }



    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        const httpRequest = new XMLHttpRequest();
        const updateData = data => {
            this.setState({ rowData: data });
        };


        httpRequest.open(
            "GET",
            "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
        );
        httpRequest.send();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                updateData(JSON.parse(httpRequest.responseText));
            }
        };
    };

    saveComment = () => {
        const { rowData } = this.state;
        const normaId = this.props.norma.id;

        this.setState({
            savingComment: true
        });

        this.commentService
            .post(normaId, {
                comment: this.state.newComment
            })
            .then(
                response => {
                    const data = response.data;

                    this.setState(
                        {
                            rowData: [...rowData, data],
                            savingComment: false
                        },
                        () => {
                            this.setState({
                                newComment: ''
                            });
                        }
                    );
                },
                () => {
                    toast.error(
                        `${this.props.intl.formatMessage({
                            id: 'component.normas.modal.comment.error'
                        })}`
                    );

                    this.setState({
                        savingComment: false
                    });
                }
            );
    };

    onQuickFilterChanged() {
        this.gridApi.setQuickFilter(document.getElementById("quickFilter").value);
    }


    render() {
        return (
            <NormasContext.Provider value={this}>
                <convocarModal
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
                                id: 'component.CrearNormas.title'
                            })}`}
                        >
                          
                         

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
            </NormasContext.Provider>
        );
    }
}
function isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}


export default injectIntl(normasInternacionales);

normasInternacionales.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
