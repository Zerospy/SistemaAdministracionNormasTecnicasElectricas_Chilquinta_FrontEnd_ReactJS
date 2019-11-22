import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
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
import {toast} from 'react-toastify';
import AvatarImage from 'assets/img/avatar.jpg';
import Moment from 'moment';

class DashboardModal extends React.Component {
    constructor(props) {
        super(props);

        this.commentService = new CommentsService();

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
            loadingComments: false,
            savingComment: false,
            newComment: ''
        };
    }

    getComments(norma) {
        this.setState({
            modalComments: true,
            loadingComments: true
        });

        this.commentService.get(norma.id).then(response => {
            const data = response.data;

            response.data.forEach(item => {
                item.createdAt = new Moment(item.fecha).format(
                    Constantes.DATETIME_FORMAT
                );
            });

            this.setState({
                rowData: data
            });
        });
    }

  saveComment = () => {
      const {rowData} = this.state;
      const normaId = this.props.norma.id;
      const {onSaveComment, norma} = this.props;

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

                  data.createdAt = new Moment(data.createdAt).format(
                      Constantes.DATETIME_FORMAT
                  );

                  onSaveComment(norma);
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
      const {toggle, isOpen, norma} = this.props;

      return (
          <Container>
              <Modal isOpen={isOpen} size="lg">
                  <ModalHeader toggle={toggle}>{this.props.title}</ModalHeader>
                  <ModalBody>
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
                  </ModalBody>
                  <ModalFooter>
                      <Row>
                          <Col className="d-flex justify-content-end">
                              <Button color="info" onClick={toggle}>
                                  {' '}
                                  <FormattedMessage id="app.general.btn.cancel" />
                              </Button>
                          </Col>
                      </Row>
                  </ModalFooter>
              </Modal>
          </Container>
      );
  }
}

export default injectIntl(DashboardModal);

DashboardModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    onSaveComment: PropTypes.func,
    isOpen: PropTypes.bool,
    publishing: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any,
    title: PropTypes.string
};
