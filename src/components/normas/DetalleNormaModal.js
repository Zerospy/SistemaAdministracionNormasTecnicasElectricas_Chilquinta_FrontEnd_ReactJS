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
import NormaService from 'services/NormaService';
import {toast} from 'react-toastify';

class DetalleNormaModal extends React.Component {
    constructor(props) {
        super(props);

        this.NormaService = new NormaService();

        const columnDefs = [
            {
                headerName: `${props.intl.formatMessage({
                    id: 'component.normas.title.name'
                })}`,
                field: 'nombre',
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

    getNorma(norma) {
        this.setState({
            modalComments: true,
            loadingComments: true
        });

        this.NormaService.get(norma.id).then(response => {
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

      this.NormaService
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
          this.getNorma(this.props.norma);
      }
  }

  render() {
      const {toggle, isOpen, onSave, norma} = this.props;

      const canPublish = norma !== null && norma.estado.id !== 3;

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
                
                      </Row>
                      <Row>
                          <Col className="d-flex justify-content-end">
                              <Button
                                  color="cancel"
                                  onClick={toggle}
                                  disabled={this.props.publishing}
                              >
                                  {' '}
                                  <FormattedMessage id="app.general.btn.cancel" />
                              </Button>

                          </Col>
                      </Row>
                  </ModalBody>
              </Modal>
          </Container>
      );
  }
}

export default injectIntl(DetalleNormaModal);

DetalleNormaModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    isOpen: PropTypes.bool,
    publishing: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
