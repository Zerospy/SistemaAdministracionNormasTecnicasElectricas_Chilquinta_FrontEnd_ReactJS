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
import DashboardService from 'services/DashboardService';
import {toast} from 'react-toastify';
import AvatarImage from 'assets/img/avatar.jpg';
import Moment from 'moment';

class DashboardModal extends React.Component {
    constructor(props) {
        super(props);

        this.dashboardService = new DashboardService();

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
            newComment: ''
        };
    }

  getNormas = modalType => {
      this.setState({loadingInformation: true});

      if (modalType == 0) {
          this.dashboardService.getDownloaded().then(response => {

            if (response.data && response.data.length > 0) {
                response.data.forEach(item => {
                    item.fecha = new Moment(item.fecha).format(
                        Constantes.DATETIME_FORMAT
                    );
                });
            }

              const {data} = response;
              this.setState({
                  rowData: data ? response.data : [],
                  loadingInformation: false
              });
          });
      } else if (modalType == 1) {
          this.dashboardService.getAllWithFiles().then(response => {

            if (response.data && response.data.length > 0) {
                response.data.forEach(item => {
                    item.fecha = new Moment(item.fecha).format(
                        Constantes.DATETIME_FORMAT
                    );
                });
            }

              const {data} = response;
              this.setState({
                  rowData: data ? response.data : [],
                  loadingInformation: false
              });
          });
      } else if (modalType == 2) {
          this.dashboardService.getEnWorkflow().then(response => {

            if (response.data && response.data.length > 0) {
                response.data.forEach(item => {
                    item.fecha = new Moment(item.fecha).format(
                        Constantes.DATETIME_FORMAT
                    );
                });
            }

              const {data} = response;
              this.setState({
                  rowData: data ? response.data : [],
                  loadingInformation: false
              });
          });
      } else if (modalType == 3) {
          this.dashboardService.getAllPublished().then(response => {

            if (response.data && response.data.length > 0) {
                response.data.forEach(item => {
                    item.fecha = new Moment(item.fecha).format(
                        Constantes.DATETIME_FORMAT
                    );
                });
            }
              const {data} = response;
              this.setState({
                  rowData: data ? response.data : [],
                  loadingInformation: false
              });
          });
      } else if (modalType == 4) {
          this.dashboardService.getWithComment().then(response => {

            if (response.data && response.data.length > 0) {
                response.data.forEach(item => {
                    item.fecha = new Moment(item.fecha).format(
                        Constantes.DATETIME_FORMAT
                    );
                });
            }
              const {data} = response;
              this.setState({
                  rowData: data ? response.data : [],
                  loadingInformation: false
              });
          });
      }
  };

  componentDidUpdate(prevProps) {
      if (
          this.props !== null &&
      this.props.modalType !== null &&
      this.props.modalType !== prevProps.modalType
      ) {
          this.setState({
              rowData: []
          });
          this.getNormas(this.props.modalType);
      }
  }

  render() {
      const {toggle, isOpen} = this.props;

      return (
          <Container>
              <Modal isOpen={isOpen} size="lg" className="modal-xl">
                  <ModalHeader toggle={toggle}>{this.props.title}</ModalHeader>
                  <ModalBody>
                      <DataGridComponent
                          isLoading={this.state.loadingInformation}
                          loadingNoBackground={true}
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
    isOpen: PropTypes.bool,
    intl: PropTypes.any,
    norma: PropTypes.any,
    title: PropTypes.string,
    modalType: PropTypes.any
};
