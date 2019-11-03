
import HeaderComponent from 'components/commons/HeaderComponent';
import { NormasContext } from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import { Col, Row, Input } from 'mdbreact';
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

class CrearNormaComponent extends React.Component {

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
            columnDefs: [
                {
                    field: "athlete",
                    width: 150
                },
                {
                    field: "age",
                    width: 90
                },
                {
                    field: "country",
                    width: 120
                },
                {
                    field: "year",
                    width: 90
                },
                {
                    field: "date",
                    width: 110
                },
                {
                    field: "sport",
                    width: 110
                },
                {
                    field: "gold",
                    width: 100
                },
                {
                    field: "silver",
                    width: 100
                },
                {
                    field: "bronze",
                    width: 100
                },
                {
                    field: "total",
                    width: 100
                }
            ],
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
                            <Col size="4">
                                <MDBContainer>

                                    <MDBCard className="card-body" style={{ width: "60rem", marginTop: "1rem", marginLeft: "6rem" }}>



                                        <form>
                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Nombre Norma"
                                                prepend="Default"
                                            />


                                            <br />

                                            <MDBInput
                                                material
                                                containerClassName="mb-2 mt-0"
                                                label="Codigo Norma"
                                                prepend="Default"
                                            />
                                            <MDBInput type="textarea" label="Descripcion de la norma" rows="5" />
                                            <label>PDF</label>
                                            <MDBFileInput />
                                            <label>CAD</label>
                                            <MDBFileInput />

                                            <MDBBtn onClick={this.toggle}>Convocar para revision</MDBBtn>
                                            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>

                                                <MDBModalHeader toggle={this.toggle}>Seleccione a los usuarios que desea convocar a workflow</MDBModalHeader>
                                                <MDBModalBody>




                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <MDBBtn color="secondary" onClick={this.toggle}> Cerrar </MDBBtn>
                                                    <MDBBtn color="primary"  onClick={this.toggle}
                                                    disabled={this.props.publishing}  >Convocar</MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>
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
function isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}


export default injectIntl(CrearNormaComponent);

CrearNormaComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
