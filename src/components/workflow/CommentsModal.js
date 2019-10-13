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
import {toast} from 'react-toastify';

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

            this.setState({
                rowData: data
            });
        });
    }

  saveComment = () => {
      const {rowData} = this.state;
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
                                  autofocus="true"
                                  readOnly={this.state.savingComment}
                                  value={this.state.newComment}
                                  onChange={event => {
                                      this.setState({
                                          newComment: event.target.value
                                      });
                                  }}
                                  onKeyPress={event => {
                                      if (event.key === 'Enter') {
                                          this.saveComment();
                                      }
                                  }}
                                  maxLength="255"
                              />
                          </Col>
                          <Col size="3">
                              <Button
                                  disabled={this.state.savingComment}
                                  color="primary"
                                  onClick={this.saveComment}
                              >
                                  {this.state.savingComment ? (
                                      <Fa icon="spinner" className="fa-1x fa-spin" />
                                  ) : (
                                      <Fa icon="plus" />
                                  )}
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
                                          onSave(this.props.norma);
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
