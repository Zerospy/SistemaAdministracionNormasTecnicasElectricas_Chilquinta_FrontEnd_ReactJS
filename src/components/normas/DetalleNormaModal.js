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
import pdf from 'assets/img/pdf.png';
import cad from 'assets/img/cad.png';
import {Link} from 'react-router-dom';
import {saveAs} from 'file-saver';

class DetalleNormaModal extends React.Component {
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
              width: 900
          }
      ];

      this.state = {
          pagination: {
              PageIndex: 1,
              RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
          },
          columnDefs: columnDefs,
          normaInfo: {},
          loadingInformation: false
      };
  }

  getNorma(norma) {
      this.normaService.getById(norma.id).then(response => {
          const data = response.data;

          this.setState({
              normaInfo: data,
              loadingInformation: false
          });
      });
  }

  downloadPdf = () => {
      const {id, codNorma, urlPdf, estado} = this.props.norma;

      if (estado !== null && estado.id === 3) {
          saveAs(
              urlPdf,
              `${codNorma}-${this.state.normaInfo.pdfFileName}`
          );
      } else {
          this.normaService.downloadNormaFile(id, 'pdf').then(response => {
              saveAs(
                  new Blob([response.data.file]),
                  `${codNorma}-${this.state.normaInfo.pdfFileName}`
              );
          });
      }
  };

  downloadCad = () => {
      const {id, codNorma, urlCad, estado} = this.props.norma;

      if (estado !== null && estado.id === 3) {
          saveAs(
              urlCad,
              `${codNorma}-${this.state.normaInfo.cadFileName}`
          );
      } else {
          this.normaService.downloadNormaFile(id, 'cad').then(response => {
              saveAs(
                  new Blob([response.data]),
                  `${codNorma}-${this.state.normaInfo.cadFileName}`
              );
          });
      }
  };

  componentDidUpdate(prevProps) {
      if (
          this.props !== null &&
      this.props.norma !== null &&
      this.props.norma !== prevProps.norma
      ) {
          this.setState({
              normaInfo: {}
          });
          this.getNorma(this.props.norma);
      }
  }

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

      const normaDesc = JSON.stringify(this.props.norma, ['id']);

      return (
          <Container>
              <Modal isOpen={isOpen} size="lg">
                  <ModalHeader toggle={toggle}>
                      <FormattedMessage id="component.normas.title.detalles" />
                  </ModalHeader>
                  <ModalBody>
                      <Row>
                          <Col size="12">
                              <PanelComponent
                                  title={`${this.props.intl.formatMessage({
                                      id: 'component.vernormas.CodNorma.Modal'
                                  })}`}
                              >
                                  <h5>{normaid}</h5>
                              </PanelComponent>
                              <PanelComponent
                                  title={`${this.props.intl.formatMessage({
                                      id: 'component.vernormas.title.Modal'
                                  })}`}
                              >
                                  <h5>{normaname}</h5>
                              </PanelComponent>

                              <PanelComponent
                                  title={`${this.props.intl.formatMessage({
                                      id: 'component.vernormas.descripcion.Modal'
                                  })}`}
                              >
                                  <h5>{normadesc}</h5>
                              </PanelComponent>
                              <PanelComponent
                                  title={`${this.props.intl.formatMessage({
                                      id: 'component.vernormas.fp.Modal'
                                  })}`}
                              >
                                  <h5>{normafecha.substring(0, 10)}</h5>
                              </PanelComponent>
                              {this.props.enabled ? (
                                  <PanelComponent
                                      title={`${this.props.intl.formatMessage({
                                          id: 'component.vernormas.descarga.Modal'
                                      })}`}
                                  >
                                      <h5>
                                          {' '}
                                          <td onClick={this.downloadPdf}>
                                              {' '}
                                              <img
                                                  style={{
                                                      width: 70,
                                                      height: 70,
                                                      cursor: 'pointer',
                                                      marginRight: '8px'
                                                  }}
                                                  title="Descargar Pdf de la norma"
                                                  src={pdf}
                                              ></img>
                                          </td>{' '}
                                          <td onClick={this.downloadCad}>
                                              {' '}
                                              <img
                                                  style={{width: 70, height: 70, cursor: 'pointer'}}
                                                  src={cad}
                                                  title="Descargar Cad de la norma"
                                              ></img>
                                          </td>{' '}
                                      </h5>
                                  </PanelComponent>
                              ) : null}
                          </Col>
                      </Row>
                      <Row>
                          <Col size="9"></Col>
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
    enabled: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
