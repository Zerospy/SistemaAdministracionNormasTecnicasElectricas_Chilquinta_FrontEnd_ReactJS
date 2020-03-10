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
      const {toggle, isOpen, onSave, norma} = this.props;

      const canPublish = norma !== null && norma.estado && norma.estado.id !== 3 && this.sessionInformation.admin === true;

      return (
          <Container>
              <Modal isOpen={isOpen} size="lg" centered>
                  <ModalHeader toggle={toggle}>
                      <FormattedMessage id="component.workflow.modal.title" />
                  </ModalHeader>
                  <ModalBody>
                      <Row>
                          <Col size="12">
                              <div className="container">
                                  <div
                                      className="chat-window"
                                      id="chat_window_1"
                                      style={{marginLeft: '10px'}}
                                  >
                                      <div className="panel panel-default">
                                          <div className="panel-body msg_container_base">
                                              {this.state.rowData.map(comment =>
                                                  comment.isCurrentUserComment ? (
                                                      <div className="row msg_container base_sent">
                                                          <div className="col-md-10 col-xs-10">
                                                              <div className="messages msg_sent">
                                                                  <p>{comment.usuarioEntity.fullName} </p>
                                                                  <p>{comment.observacion}</p>

                                                                  <time dateTime={comment.createdAt}>
                                                                      {comment.createdAt}
                                                                  </time>
                                                                  {console.log(comment.data)}

                                                              </div>
                                                          </div>
                                                          <div className="col-md-2 col-xs-2 avatar">
                                                              <img
                                                                  src={AvatarImage}
                                                                  className=" img-responsive "
                                                              />
                                                          </div>
                                                      </div>
                                                  ) : (
                                                      <div className="row msg_container base_receive">
                                                          <div className="col-md-2 col-xs-2 avatar">
                                                              <img
                                                                  src={AvatarImage}
                                                                  className=" img-responsive "
                                                              />
                                                          </div>
                                                          <div className="col-md-10 col-xs-10">
                                                              <div className="messages msg_receive">
                                                              <p>{comment.usuarioEntity.fullName} </p>
                                                                  <p>{comment.observacion}</p>
                                                                  <time dateTime={comment.createdAt}>
                                                                      {comment.createdAt}
                                                                      
                                                                  </time>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  )
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </Col>
                      </Row>
                      <Row>
                          <Col className="mt-3 ml-4">
                              <div className="input-group">
                                  <div className="input-group-prepend">
                                      <span className="input-group-text" id="basic-addon">
                                          <i className="fa fa-comment prefix"></i>
                                      </span>
                                  </div>
                                  <input
                                      className="form-control"
                                      placeholder={`${this.props.intl.formatMessage({
                                          id: 'component.normas.modal.input.placeholder'
                                      })}`}
                                      autoFocus="true"
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

                                  <Button
                                      disabled={this.state.savingComment}
                                      color="primary"
                                      onClick={this.saveComment}
                                  >
                                      {this.state.savingComment ? (
                                          <Fa icon="spinner" className="fa-1x fa-spin" />
                                      ) : (
                                          <FormattedMessage id="component.normas.modal.btn.send" />
                                      )}
                                  </Button>
                              </div>
                          </Col>
                      </Row>
                  </ModalBody>
                  <ModalFooter>
                      <Row>
                          <Col className="d-flex justify-content-end">
                              <Button
                                  color="info"
                                  onClick={toggle}
                                  disabled={this.props.publishing}
                              >
                                  {' '}
                                  <FormattedMessage id="app.general.btn.cancel" />
                              </Button>
                              
                                {canPublish ? (  
                                  <Button
                                      disabled={this.props.publishing}
                                      onClick={() => {
                                          if (typeof onSave === 'function') {
                                              onSave(this.props.norma);
                                          }
                                      }}
                                  >
                                      {this.props.publishing ? (
                                          <Fa icon="spinner" className="fa-1x fa-spin" />
                                      ) : (
                                          <FormattedMessage id="component.workflow.modal.btn.save" />
                                      )}
                                  </Button>
                              ) : null}    

                          </Col>
                      </Row>
                  </ModalFooter>
              </Modal>
          </Container>
      );
  }
}

export default injectIntl(CommentsModal);

CommentsModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    onSaveComment: PropTypes.func,
    isOpen: PropTypes.bool,
    publishing: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
