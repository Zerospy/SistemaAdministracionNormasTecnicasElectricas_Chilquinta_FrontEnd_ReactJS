import Constantes from 'Constantes';
import { Button, Col, Container, Fa, Modal, ModalBody, ModalHeader, Row } from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import NormaService from 'services/NormaService';

class DardebajaModal extends React.Component {
  state = {
      id: null
  };
  constructor(props) {
      super(props);

      this.normaService = new NormaService();

      const columnDefs = [
          {
              headerName: `${props.intl.formatMessage({
                  id: 'component.normas.title.name'
              })}`,
              field: 'nombre',
              width: 901
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
          modalEdit: false,
          codigoNorma: '',
          nombreNorma: '',
          normadescripcion: ''
      };

      this.handleChange = this.handleChange.bind(this);
  }

  getNorma(norma) {
      this.setState({
          modalEdit: true,
          loadingComments: true
      });

      this.normaService.get(norma.id).then(response => {
          const data = response.data;

          this.setState({
              rowData: response !== null ? response.data : [],

              loadingInformation: false
          });
      });
  }

  saveNorma = () => {
      const normaId = this.props.norma.id;
      const {onSaveNorma, norma} = this.props;
      const params = {
          codNorma: this.state.codigoNorma,
          nombre: this.state.nombreNorma,
          descripcion: this.state.normadescripcion
      };
      this.normaService.post(normaId, {params}).then(response => {
          const data = response.data;

          console.log(params);
          console.log(this.state.normadescripcion);
          console.log(response);
      });
  };


  publishToWorkflow = () => {
      const normaId = this.props.norma.id;

      let formData = new FormData();
      formData.append('file', this.state.pdfFile);

      this.normaService.uploadNormaFile(normaId, 'pdf', formData).then(result => {
          formData = new FormData();
          formData.append('file', this.state.cadFile);

          this.normaService
              .uploadNormaFile(normaId, 'cad', formData)
              .then(result => {
                  toast.success(
                      `${this.props.intl.formatMessage({
                          id: 'component.normas.modal.edit.success'
                      })}`
                  );

                  this.props.toggle();
              });
      });
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
  handleChange(event) {
      this.setState({value: event.target.value});
  }

  onChangeDescripcion = e => {
      this.setState({
          normadescripcion: e.target.value
      });
  };

  render() {
      const {toggle, isOpen, onSave, norma} = this.props;

      const normaid0 = JSON.stringify(this.props.norma, ['codNorma'])
          .split('{"codNorma":"')
          .join('');
      const normaid = normaid0.split('"}').join('');

      const normaname0 = JSON.stringify(this.props.norma, ['nombre'])
          .split('{"nombre":"')
          .join('');
      const normaname = normaname0.split('"}').join('');

      const normadesc0 = JSON.stringify(this.props.norma, ['descripcion'])
          .split('{"descripcion":"')
          .join('');
      const normadesc = normadesc0.split('"}').join('');

      const normafecha0 = JSON.stringify(this.props.norma, ['fecha'])
          .split('{"fecha":"')
          .join('');
      const normafecha = normafecha0.split('"}').join('');

      const normaNumId = JSON.stringify(this.props.norma, ['id']);

      return (
          <Container>
              <Modal isOpen={isOpen} size="lg" centered>
                  <ModalHeader toggle={toggle}>
                      <FormattedMessage id="component.dataGrid.DardeBajaGrid" />
                  </ModalHeader>
                  <ModalBody>
                      <Row>
                          <Col size="12">
                              <form>
                                  <h4>¿Desea dar de baja el siguiente documento? </h4>

                                  <h5>{normaname} </h5>

                                  <h5> Codigo : {normaid} </h5>
                              </form>
                          </Col>
                      </Row>
                      <Row>
                          <Col size="12"></Col>
                      </Row>
                      <Row>
                          <Col className="d-flex justify-content-center">
                              <Button
                                  disabled={this.state.savingNorma}
                                  color="warning"
                                  onClick={() => {
                                      if (typeof onSave === 'function') {
                                          onSave(this.props.norma);
                                      }
                                  }}
                              >
                                  {this.state.savingNorma ? (
                                      <Fa icon="spinner" className="fa-1x fa-spin" />
                                  ) : (
                                      <FormattedMessage id="component.dataGrid.DardeBajaGrid" />
                                  )}
                              </Button>

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

export default injectIntl(DardebajaModal);

DardebajaModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    isOpen: PropTypes.bool,
    publishing: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
