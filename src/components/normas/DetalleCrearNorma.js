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
import { Link } from 'react-router-dom';

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
            },
  
         
        ];
   
        this.state = {
            pagination: {
            PageIndex: 1,
            RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
            },
            columnDefs: columnDefs,
            rowData: [],
            loadingInformation: false,
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
    
 
  componentDidUpdate(prevProps) {
      if (
          this.props !== null &&
      this.props.norma !== null &&
      this.props.norma !== prevProps.norma
      ) {
          this.setState({
              rowData: [],
            
            
            
          });
          this.getNorma(this.props.norma);
       
      }
      
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
 
  render() {
      const {toggle, isOpen, onSave, norma } = this.props;

      var normaid0 = JSON.stringify(this.props.norma,['codNorma']).split('{"codNorma":"').join('');
      var normaid = normaid0.split('"}').join('');

      var normaname0 = JSON.stringify(this.props.norma,['nombre']).split('{"nombre":"').join('');
      var normaname = normaname0.split('"}').join('');

      var normadesc0 = JSON.stringify(this.props.norma,['descripcion']).split('{"descripcion":"').join('');
      var normadesc = normadesc0.split('"}').join('');

      var normafecha0 = JSON.stringify(this.props.norma,['fecha']).split('{"fecha":"').join('');
      var normafecha = normafecha0.split('"}').join('');
      
      var normaDesc = JSON.stringify(this.props.norma,['id']);




      
      return (
          <Container>
              <Modal isOpen={isOpen} size="lg">
                  <ModalHeader toggle={toggle}>
                      <FormattedMessage id="component.normas.title.EditModal" />
                  </ModalHeader>
                  <ModalBody>
                      <Row>
                          <Col size="12">


                          <div className="form-group">
      <label htmlFor="formGroupExampleInput">Codigo de Norma</label>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        value= {normaid}
      />

<label htmlFor="formGroupExampleInput">Nombre Norma</label>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        value= {normaname} 
        onChange={this.handleChange}

      />

<label htmlFor="formGroupExampleInput">Descripcion Norma</label>
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        value= {normadesc}
      />    



    </div>
                            
                              
                          </Col>
                      </Row>
                      <Row>
                          <Col size="9">
                          
                          </Col>
                
                      </Row>
                      <Row>
                          <Col className="d-flex justify-content-end">
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
                                          <FormattedMessage id="component.workflow.modal.btn.edit" />
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

export default injectIntl(DetalleNormaModal);

DetalleNormaModal.propTypes = {
    toggle: PropTypes.func,
    onSave: PropTypes.func,
    isOpen: PropTypes.bool,
    publishing: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any
};
