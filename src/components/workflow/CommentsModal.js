import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Fa,
    Row,
    Col
} from 'mdbreact';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import Constantes from 'Constantes';
import CommentsService from 'services/CommentsService';

class CommentsModal extends React.Component {
    constructor(props) {
        super(props);

        this.commentService = new CommentsService();

        const columnDefs = [
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.modal.grid.comment'
                })}`,
                field: 'observacion',
                width: 420
            },
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.workflow.modal.grid.user'
                })}`,
                field: 'usuarioEntity.usuario',
                width: 140
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
            loadingComments: false
        };
    }

    getComments(norma) {
        this.setState({
            modalComments: true,
            loadingComments: true
        });

        this.commentService.get(norma.id).then(response => {
            const data = response.data;

            this.setState({
                rowData: data
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (
            this.props !== null &&
      this.props.norma !== null &&
      this.props.norma !== prevProps.norma
        ) {
            this.setState({
                rowData: []
            });
            this.getComments(this.props.norma);
        }
    }

    render() {
        const {toggle, isOpen, onSave} = this.props;

        return (
            <Container>
                <Modal isOpen={isOpen} size="lg">
                    <ModalHeader toggle={toggle}>
                        <FormattedMessage id="component.workflow.modal.title" />
                    </ModalHeader>
                    <ModalBody>
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
                                        enableColResize={true}
                                    />
                                </PanelComponent>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="9">
                                <Input
                                    value={this.state.newComment}
                                    onChange={event => {
                                        this.setState({
                                            newComment: event.target.value
                                        });
                                    }}
                                />
                            </Col>
                            <Col size="3">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        const {rowData} = this.state;

                                        const newItem = {
                                            id: 0,
                                            normaId: this.props.norma.id,
                                            observacion: this.state.newComment,
                                            createdAt: null,
                                            updatedAt: null,
                                            user: {
                                                id: 1,
                                                nombres: 'Enrique',
                                                apellidos: 'Steffens Aburto',
                                                usuario: 'esteffen',
                                                clave: 'cf9e7ac87e8a11e68b98b093d21625d0',
                                                estado: 1,
                                                timestamp: null,
                                                email: 'steffen@chilquinta.cl',
                                                claveTextoPlano: null
                                            }
                                        };

                                        this.setState(
                                            {
                                                rowData: [...rowData, newItem]
                                            },
                                            () => {
                                                this.setState({
                                                    newComment: ''
                                                });
                                            }
                                        );
                                    }}
                                >
                                    <Fa icon="plus" />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Button color="cancel" onClick={toggle}>
                                    {' '}
                                    <FormattedMessage id="app.general.btn.cancel" />
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (typeof onSave === 'function') {
                                            onSave();
                                        }
                                    }}
                                >
                                    {' '}
                                    <FormattedMessage id="component.workflow.modal.btn.save" />
                                </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default injectIntl(CommentsModal);

CommentsModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    isOpen: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
