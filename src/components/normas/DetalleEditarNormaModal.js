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
    Col,
    MDBFileInput
} from 'mdbreact';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import PanelComponent from 'components/commons/panels/PanelComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import Constantes from 'Constantes';
import NormaService from 'services/NormaService';
import UserService from 'services/UserService';
import {toast} from 'react-toastify';
import pdf from 'assets/img/pdf.png';
import cad from 'assets/img/cad.png';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import LoadingComponent from 'components/commons/base/LoadingComponent';
import LoginService from 'services/LoginService';
import Moment from 'moment';


class DetalleEditarNormaModal extends React.Component {
  state = {
      id: null
  };
  constructor(props) {
      super(props);

      this.normaService = new NormaService();
      this.userService = new UserService();
      this.onUploadPDF = this.onUploadPDF.bind(this);
      this.onUploadCAD = this.onUploadCAD.bind(this);
      this.loginService = new LoginService();
      this.sessionInformation = this.loginService.getSessionInformation();

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
        documentoPDF: "Ningun documento cargado..",
        documentoCAD: "Ningun documento cargado..",    
        pdfFile: '',
        cadFile: '',
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
          normadescripcion: '',
          usersOptions: [],
          selectedUsers: []
      };

      this.handleChange = this.handleChange.bind(this);
  }

  getNorma(norma) {
      this.setState({
          modalEdit: true
      });

      this.normaService.getById(norma.id).then(response => {
          const data = response.data;

          data.usersToComment.forEach(user => {
              user.value = user.id;
              user.label = `${user.usuarioRecibeEntity.nombres} ${user.usuarioRecibeEntity.apellidos}`;
          });

          this.setState({
              selectedUsers: data.usersToComment,
              loadingInformation: false
          });
      });
  }

  getUsuarios = () => {
      this.setState({
          loadingInformation: true
      });

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
                  loadingInformation: false,
                  usersOptions: response !== null ? data : []
              });
          },
          () => {
              this.setState({
                  loadingInformation: false
              });
              toast.info('Ocurrió un problema al consultar los usuarios');
          }
      );
  };
  onUploadCAD(x) {

    this.setState({
        cadFile:x.target.files[0]
    })
    this.setState({
        documentoCAD: "Documento CAD cargado",

    })

}
onUploadPDF(e) {

    this.setState({
        pdfFile: e.target.files[0]
    })
    this.setState({
        documentoPDF: "Documento PDF cargado",

    })

}

  saveNorma = () => {
    const {onSaveNorma, norma} = this.props;
    const normaId = this.props.norma.id;
    const codNorma = this.props.norma.codNorma;

    if (this.state.codigoNorma === '' || this.state.codigoNorma === null) {
        this.state.codigoNorma = JSON.stringify(this.props.norma, ['codNorma'])
            .split('{"codNorma":"')
            .join('');
        this.state.codigoNorma = this.state.codigoNorma.split('"}').join('');
    }
    if (this.state.nombreNorma === '' || this.state.nombreNorma === null) {
        this.state.nombreNorma = JSON.stringify(this.props.norma, ['nombre'])
            .split('{"nombre":"')
            .join('');
        this.state.nombreNorma = this.state.nombreNorma.split('"}').join('');
    }
    if (
        this.state.normadescripcion === '' ||
    this.state.normadescripcion === null
    ) {
        this.state.normadescripcion = JSON.stringify(this.props.norma, [
            'descripcion'
        ])
            .split('{"descripcion":"')
            .join('');
        this.state.normadescripcion = this.state.normadescripcion
            .split('"}')
            .join('');
    }
    const params = {
        codNorma: this.state.codigoNorma,
        nombre: this.state.nombreNorma,
        descripcion: this.state.normadescripcion
    };



    this.setState({
        savingNorma: true
    });

    this.normaService.modificarCamposNorma(normaId, params).then(
        response => {
          this.setState({
              savingNorma: false
          });
            toast.success(
              `${this.props.intl.formatMessage({
                  id: 'component.normas.modal.edit.success'
              })}`
          );

          this.props.toggle();

        },
        () => {
            this.setState({
                savingNorma: false
            });
            toast.error(
                `${this.props.intl.formatMessage({
                    id: 'component.normas.modal.edit.error'
                })}`
            );
        }
    );

                                };

  publishToWorkflow = () => {
      const id = this.props.norma.id;
      const normaId = this.props.norma.id;




      if (this.state.codigoNorma === '' || this.state.codigoNorma === null) {
        this.state.codigoNorma = JSON.stringify(this.props.norma, ['codNorma'])
            .split('{"codNorma":"')
            .join('');
        this.state.codigoNorma = this.state.codigoNorma.split('"}').join('');
    }
    if (this.state.nombreNorma === '' || this.state.nombreNorma === null) {
        this.state.nombreNorma = JSON.stringify(this.props.norma, ['nombre'])
            .split('{"nombre":"')
            .join('');
        this.state.nombreNorma = this.state.nombreNorma.split('"}').join('');
    }
    if (
        this.state.normadescripcion === '' ||
    this.state.normadescripcion === null
    ) {
        this.state.normadescripcion = JSON.stringify(this.props.norma, [
            'descripcion'
        ])
            .split('{"descripcion":"')
            .join('');
        this.state.normadescripcion = this.state.normadescripcion
            .split('"}')
            .join('');
    }



      const params = {
          codNorma: this.state.codigoNorma,
          nombre: this.state.nombreNorma,
          descripcion: this.state.normadescripcion
      };

      let formData = new FormData();
      formData.append('file', this.state.pdfFile);
         /*Insertado 09-03-2020 */
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
             /*Insertado 09-03-2020 */ 

      if (
          this.state.pdfFile.size != 0 &&
     this.state.pdfFile.size != null &&  
      this.state.cadFile.size != 0   &&
     this.state.cadFile.size != null
      ) {
          this.setState({
              savingNorma: true
          });
          this.normaService.updateNorma(normaId, params).then(response => {
          this.normaService
              .uploadNormaFile(normaId, 'pdf', formData)
              .then(result => {
                  formData = new FormData();
                  formData.append('file', this.state.cadFile);

                  this.normaService
                      .uploadNormaFile(normaId, 'cad', formData)
                      .then(result => {
                          this.setState({
                              savingNorma: false
                          });
 
                          toast.success(
                              `${this.props.intl.formatMessage({
                                  id: 'component.normas.modal.edit.success'
                              })}`
                          );
                       
                          this.props.toggle();
                      }),
                  () => {
                      toast.error(
                          `${this.props.intl.formatMessage({
                              id: 'component.normas.modal.edit.error'
                          })}`
                      );

                      this.setState({
                          savingNorma: false
                      });
                  };
              });
          });
         } else {
          toast.error(
              `${this.props.intl.formatMessage({
                  id: 'component.normas.modal.error.upload'
              })}`
          );
      }
         
  };

  componentDidMount() {
      this.getUsuarios();
    
  }

  componentDidUpdate(prevProps) {
      if (
          this.props !== null &&
      this.props.norma !== null &&
      this.props.norma !== prevProps.norma
      ) {
          this.getNorma(this.props.norma);
          
      }
  }
  handleChange(event) {
      this.setState({value: event.target.value});
  }

  onChangeDescripcion = f => {
      this.setState({
          normadescripcion: f.target.value
      });
  };
  onChangeCodNorma = e => {
      this.setState({
          codigoNorma: e.target.value
      });
  };
  onChangeNombreNorma = g => {
      this.setState({
          nombreNorma: g.target.value
      });
  };
  render() {
      const {toggle, isOpen, onSave, norma} = this.props;

      const normaid0 = JSON.stringify(this.props.norma, ['codNorma'])
          .split('{"codNorma":"')
          .join('');
      const codigoNorma = normaid0.split('"}').join('');

      const normaname0 = JSON.stringify(this.props.norma, ['nombre'])
          .split('{"nombre":"')
          .join('');
      const nombreNorma = normaname0.split('"}').join('');

      const normadesc0 = JSON.stringify(this.props.norma, ['descripcion'])
          .split('{"descripcion":"')
          .join('');
      const normadescripcion = normadesc0.split('"}').join('');

      const normafecha0 = JSON.stringify(this.props.norma, ['fecha'])
          .split('{"fecha":"')
          .join('');
      const normafecha = normafecha0.split('"}').join('');

      const normaDesc = JSON.stringify(this.props.norma, ['id']);

      const canPublish = norma !== null && norma.estado && norma.estado.id !== 3;

      const codEstadoNorma = norma !== null && norma.estado && norma.estado.id === 3;

      return (
          <Container>
              <Modal isOpen={isOpen} size="lg" centered>
                  <ModalHeader toggle={toggle}>
                      <FormattedMessage id="component.normas.title.EditModal" />
                  </ModalHeader>
                  <ModalBody>
                      <LoadingComponent
                          loading={this.state.loadingInformation}
                          noBackground={true}
                      />
                      <Row>
                          <Col size="12">
                              <form>
                                  <div className="form-group">
                                      <label htmlFor="formGroupExampleInput">
                      Codigo de Norma
                                      </label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="formGroupExampleInput"
                                          defaultValue={codigoNorma}
                                          onChange={this.onChangeCodNorma}
                                          disabled={codEstadoNorma}
                                      />

                                      <label htmlFor="formGroupExampleInput">Nombre Norma</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="formGroupExampleInput"
                                          defaultValue={nombreNorma}
                                          onChange={this.onChangeNombreNorma}
                                      />

                                      <label htmlFor="formGroupExampleInput">
                      Descripcion Norma
                                      </label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="formGroupExampleInput"
                                          defaultValue={normadescripcion}
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

                       {/*           <label>PDF</label>
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
                                      />*/}     


<label for="choose_file1"><span id="file_name1" className="btn btn-default">Seleccione un documento PDF</span>
{this.state.documentoPDF}
    <input type="file" name="choose_file1" id="choose_file1" 
        onChange={this.onUploadPDF}
        style={{ width: '0px' }} />
</label>


<label for="choose_file"><span id="file_name" className="btn btn-info" >Seleccione un documento CAD</span>
{this.state.documentoCAD}
    <input type="file" name="choose_file" id="choose_file"
        onChange={this.onUploadCAD}
        style={{ width: '0px' }} />
</label>


                                  </div>
                              </form>
                          </Col>
                      </Row>
                      <Row>
                          <Col size="9"></Col>
                      </Row>
                      <Row>
                          <Col className="d-flex justify-content-end">

                                {/*  Boton que envia PDF y CAD  */}
                                {!this.props.publish ? (
                              <Button
                                  disabled={
                    this.state.savingNorma || !this.state.pdfFile && !this.state.cadFile
                                   }
                                  color="primary"
                                  onClick={this.publishToWorkflow}
                              >
                                  {this.state.savingNorma ? (
                                      <Fa icon="spinner" className="fa-1x fa-spin" />
                                  ) : (
                                      <FormattedMessage id="component.normas.modal.btn.editWorkflow" />
                                  )}
                              </Button>
                                ) : null}

                                    {/*  Boton que solo modifica campos  */}
                                    {!this.props.publish ? (
                              <Button
                                  disabled={this.state.savingNorma }
                                  color="primary"
                                  onClick={this.saveNorma}
                              >
                                  {this.state.savingNorma ? (
                                      <Fa icon="spinner" className="fa-1x fa-spin" />
                                  ) : (
                                      <FormattedMessage id="component.normas.modal.btn.edit" />
                                  )}
                              </Button>
                              ) : null}
                              {/*  Boton para publicar norma desde comentarios  */}
                              {canPublish && this.sessionInformation.admin && this.props.publish ? (
                                    <Button
                                        disabled={this.props.publishing && !this.sessionInformation.admin && this.state.savingNorma || !this.state.pdfFile && !this.state.cadFile}
                                        onClick={() => {
                                            if (typeof onSave === 'function') {
                                                onSave(this.props.norma);
                                            }
                                        }}
                                    >
                                        {this.props.publishing ? (
                                            <Fa icon="spinner" className="fa-1x fa-spin" />
                                        ) : (
                                                <FormattedMessage id="app.general.btn.save" />
                                            )}
                                    </Button>
                                ) : null}
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

export default injectIntl(DetalleEditarNormaModal);

DetalleEditarNormaModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    isOpen: PropTypes.bool,
    publishing: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
