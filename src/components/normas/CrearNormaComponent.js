import HeaderComponent from 'components/commons/HeaderComponent';
import {NormasContext} from 'components/normas/NormasContext';
import DetalleNormaModal from 'components/normas/DetalleNormaModal';
import {Col, Row, Input, Button} from 'mdbreact';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import Constantes from 'Constantes';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import NormaService from 'services/NormaService';
import UserService from 'services/UserService';
import {toast} from 'react-toastify';
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBFileInput,
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
import GridUsuarios from 'components/normas/GridUsuarios';
import Moment from 'moment';
import Select from 'react-select';

class CrearNormaComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }
  state = {
      modal: false
  };
  toggle = () => {
      this.setState({
          modal: !this.state.modal
      });
  };

  constructor(props) {
      super(props);

      this.normaService = new NormaService();
      this.userService = new UserService();

      this.state = {
          pdfFile: '',
          cadFile: '',
          codigoNorma: '',
          nombreNorma: '',
          normaDescripcion: '',
          estado: {
              descripcion: 'En Revisión',
              id: 0
          },
          usersOptions: [],
          selectedUsers: []
      };
  }
  getNorma(norma) {
      this.normaService.get(norma).then(res => {
          const data = res.data;

          this.setState({
              idData: res.data !== null ? res.data : []
          });
      });
  }

  getUsuarios = () => {
      this.userService.getUsers().then(
          response => {
              const data = response.data;

              if (data && data.length > 0) {
                  data.forEach(user => {
                      user.label = `${user.nombres} ${user.apellidos}`;
                      user.value = user.id;
                  });
              }

              this.setState({
                  usersOptions: response !== null ? data : []
              });
          },
          () => {
              toast.info('Ocurrió un problema al consultar los usuarios');
          }
      );
  };

  publishToWorkflow = () => {
      const normaId = '';

      const a = Moment().toObject();
      const b = {
          year: a.years,
          month: a.months + 1,
          day: a.date,
          hour: a.hours,
          minutes: a.minutes,
          seconds: a.seconds,
          nanos: a.milliseconds
      };
      if (b.day < 10) {
          b.day = `0${b.day}`;
      }

      if (b.month < 10) {
          b.month = `0${b.month}`;
      }
      const c = `${b.year.toString()}-${b.month.toString()}-${b.day.toString()}`;

      const params = {
          codNorma: this.state.codigoNorma,
          nombre: this.state.nombreNorma,
          descripcion: this.state.normadescripcion,
          estado: {descripcion: '', id: '1'},
          fecha: c
      };

      if (this.state.selectedUsers && this.state.selectedUsers.length > 0) {
          params.usersToComment = [];

          this.state.selectedUsers.forEach(user => {
              params.usersToComment.push({
                  usuarioRecibeEntity: {
                      id: user.id
                  }
              });
          });
      }

      this.normaService.post(params).then(response => {
          const data = response.data;

          data.createdAt = new Moment(data.createdAt).format(
              Constantes.DATETIME_FORMAT
          );
          console.log(response.data);
          console.log(response.data.id);
          this.setState({
              normaId: response.data.id
          });

          console.log(response.data.id);
          let formData = new FormData();
          formData.append('file', this.state.pdfFile);

          this.normaService
              .uploadNormaFile(response.data.id, 'pdf', formData)
              .then(result => {
                  formData = new FormData();
                  formData.append('file', this.state.cadFile);

                  this.normaService
                      .uploadNormaFile(response.data.id, 'cad', formData)
                      .then(result => {
                          toast.success(
                              `${this.props.intl.formatMessage({
                                  id: 'component.normas.modal.edit.success'
                              })}`
                          );

                      });          
                       
              });
      });

      this.setState({
          pdfFile: '',
          cadFile: '',
          codigoNorma: '',
          nombreNorma: '',
          normaDescripcion: '',
          estado: {
              descripcion: 'En Revisión',
              id: 0
          },
          usersOptions: [],
          selectedUsers: []
      });

      toast.success(
          `${this.props.intl.formatMessage({
              id: 'component.normas.modal.msg.success.crear'
          })}`
      );
  };
  onChangeCodigo = e => {
      this.setState({
          codigoNorma: e.target.value
      });
  };
  onChangeNombre = e => {
      this.setState({
          nombreNorma: e.target.value
      });
  };
  onChangeDescripcion = e => {
      this.setState({
          normadescripcion: e.target.value
      });
  };

  componentDidMount() {
      this.getUsuarios();
  }

  render() {
      return (
          <NormasContext.Provider value={this}>
              <HeaderComponent />
              <Row>
                  <Col size="12 " centered>
                      <PanelComponent
                          title={`${this.props.intl.formatMessage({
                              id: 'component.CrearNormas.title'
                          })}`}
                      >
                          <Col size="4">
                              <MDBContainer>
                                  <MDBCard
                                      className="card-body"
                                      style={{
                                          width: '60rem',
                                          marginTop: '1rem',
                                          marginLeft: '6rem'
                                      }}
                                      
                                  >
                                      <form>
                                          <MDBInput
                                              material
                                              containerClassName="mb-2 mt-0"
                                              label="Codigo de norma"
                                              prepend="Default"
                                              onChange={this.onChangeCodigo}
                                          />

                                          <br />

                                          <MDBInput
                                              material
                                              containerClassName="mb-2 mt-0"
                                              label="Nombre Norma"
                                              prepend="Default"
                                              onChange={this.onChangeNombre}
                                          />
                                          <MDBInput
                                              type="textarea"
                                              label="Descripcion de la norma"
                                              rows="5"
                                              onChange={this.onChangeDescripcion}
                                          />
                                          <label>Usuarios que pueden comentar</label>
                                          <Select
                                              options={this.state.usersOptions}
                                              onChange={selectedOptions => {
                                                  this.setState({
                                                      selectedUsers: selectedOptions
                                                  });
                                              }}
                                              value={this.state.selectedUsers}
                                              isMulti
                                              isSearchable
                                              placeholder={'Listado de usuarios'}
                                          />
                                          <br />
                                          <label>PDF</label>
                                          <MDBFileInput
                                              getValue={files => {
                                                  this.setState({
                                                      pdfFile: files[0]
                                                  });
                                              }}
                                          />
                                          <label>CAD</label>
                                          <MDBFileInput
                                              getValue={files => {
                                                  this.setState({
                                                      cadFile: files[0]
                                                  });
                                              }}
                                          />
                                          <Col className="offset-9" size="4">
                                              <Button
                                                  disabled={
                                                      !this.state.nombreNorma ||
                                                      !this.state.codigoNorma ||
                                                      !this.state.normadescripcion 
                                                  }
                                                  color="primary"
                                                  onClick={this.publishToWorkflow }

                                              >
                                                  {' '}
                                                  Enviar a workflow
                                              </Button>
                                          </Col>
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
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}

export default injectIntl(CrearNormaComponent);

CrearNormaComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
