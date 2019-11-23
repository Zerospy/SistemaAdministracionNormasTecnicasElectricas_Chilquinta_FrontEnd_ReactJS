import {
    Col,
    Row,
    Fa,
    Input,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle
} from 'mdbreact';
import React from 'react';
import {DashboardContext} from 'components/home/DashboardContext';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import HeaderComponent from 'components/commons/HeaderComponent';
import CountUp from 'react-countup';
import DashboardService from 'services/DashboardService';
import PanelComponent from 'components/commons/panels/PanelComponent';
import LoadingComponent from 'components/commons/base/LoadingComponent';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import {toast} from 'react-toastify';
import Moment from 'moment';
import DashboardModal from 'components/home/DashboardModal';
import Constantes from 'Constantes';

class DashboardComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.dashboardService = new DashboardService();

        const columnDefs = [
            {
                headerName: 'Cliente',
                field: 'codNorma',
                width: 120
            },
            {
                headerName: 'Orden N°',
                field: 'nombre',
                width: 380
            },
            {
                headerName: 'Solicitada',
                field: 'descripcion',
                width: 360
            }

        ];

        this.modalTitles = ['Normas descargadas', 'Documentos subidos', 'Normas en workflow', 'Normas publicadas', 'Normas comentadas'];

        this.state = {
            normasQuantity: 0,
            normasDownloaded: 0,
            filesQuantity: 0,
            normasWorkFlow: 0,
            cantidadNormasPublicadas: 0,
            cantidadNormasComentadas: 0,
            startPoint: 0,
            duration: 3,
            isLoading: false,
            modalNormas: false,
            titleModalNormas: '',
            modalType: null,
            rowData: [],
            columnDefs: columnDefs,
            lastComments: []
        };
    }

    displayModalNormas = (modalType) => {
        this.setState({
            modalNormas: true,
            titleModalNormas: this.modalTitles[modalType],
            modalType: modalType            
        });
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        this.dashboardService.getLastComment().then(response => {
            this.setState({
                lastComments: response.data
            })
        });

        this.dashboardService.get().then(response => {
            console.log(response);

            const {
                cantidadArchivos,
                cantidadNormas,
                cantidadNormasComentadas,
                cantidadNormasDescargadas,
                cantidadNormasPublicadas,
                cantidadNormasEnWorkflow
            } = response.data;

            this.setState({
                normasQuantity: cantidadNormas,
                normasDownloaded: cantidadNormasDescargadas,
                filesQuantity: cantidadArchivos,
                normasWorkFlow: cantidadNormasEnWorkflow,
                cantidadNormasPublicadas: cantidadNormasPublicadas,
                cantidadNormasComentadas: cantidadNormasComentadas
            });

            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        return (
            <DashboardContext.Provider value={this}>
                {/* Hidden div with print info */}
                <DashboardModal
                    title={this.state.titleModalNormas}
                    norma={this.state.selectedNorma}
                    isOpen={this.state.modalNormas}
                    toggle={() => {
                        this.setState({
                            modalNormas: !this.state.modalNormas
                        });
                    }}
                    modalType={this.state.modalType}

                />
                <div className="dashboard">
                    <HeaderComponent print={false} />
                    <LoadingComponent loading={this.state.isLoading} />
                    <div className="page-content-wrapper">
                        <div className="page-content-wrapper-inner">
                            <div className="content-viewport">
                                <div className="row">
                                    <div className="col-12 m-3">
                                        <h4>Dashboard</h4>
                                        <p className="text-gray">Bienvenido</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 m-2">
                                        <PanelComponent title={'Resumen de actividades'}>
                                            <div className="row">
                                                <div className="col-2">
                                                    <MDBCard
                                                        border="primary"
                                                        className="m-2 dashboard-card"
                                                        style={{maxWidth: '18rem'}}
                                                    >
                                                        <MDBCardBody className="text-primary">
                                                            <MDBCardTitle tag="h5">
                                Normas en el sistema
                                                            </MDBCardTitle>
                                                            <MDBCardText className="text-justify">
                                                                <h2>
                                                                    <CountUp
                                                                        start={this.state.startPoint}
                                                                        end={this.state.normasQuantity}
                                                                        duration={this.state.duration}
                                                                    />
                                                                </h2>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                                <div className="col-2">
                                                    <MDBCard
                                                        border="primary"
                                                        className="m-2 dashboard-card"
                                                        style={{maxWidth: '18rem'}}
                                                    >
                                                        <MDBCardBody className="text-primary">
                                                            <MDBCardTitle tag="h5">
                                Normas descargadas
                                                            </MDBCardTitle>
                                                            <MDBCardText className="text-justify">
                                                                <h2>
                                                                    <a onClick={this.displayModalNormas.bind(this, 0)}>
                                                                    <CountUp
                                                                        start={this.state.startPoint}
                                                                        end={this.state.normasDownloaded}
                                                                        duration={this.state.duration}
                                                                    />
                                                                    </a>
                                                                   
                                                                </h2>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                                <div className="col-2">
                                                    <MDBCard
                                                        border="primary"
                                                        className="m-2 dashboard-card"
                                                        style={{maxWidth: '18rem'}}
                                                    >
                                                        <MDBCardBody className="text-primary">
                                                            <MDBCardTitle tag="h5">
                                Documentos subidos
                                                            </MDBCardTitle>
                                                            <MDBCardText className="text-justify">
                                                                <h2>
                                                                <a onClick={this.displayModalNormas.bind(this, 1)}>
                                                                    <CountUp
                                                                        start={this.state.startPoint}
                                                                        end={this.state.filesQuantity}
                                                                        duration={this.state.duration}
                                                                    />
                                                                </a>
                                                                </h2>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                                <div className="col-2">
                                                    <MDBCard
                                                        border="primary"
                                                        className="m-2 dashboard-card"
                                                        style={{maxWidth: '18rem'}}
                                                    >
                                                        <MDBCardBody className="text-primary">
                                                            <MDBCardTitle tag="h5">
                                Normas en workflow
                                                            </MDBCardTitle>
                                                            <MDBCardText className="text-justify">
                                                                <h2>
                                                                <a onClick={this.displayModalNormas.bind(this, 2)}>
                                                                    <CountUp
                                                                        start={this.state.startPoint}
                                                                        end={this.state.normasWorkFlow}
                                                                        duration={this.state.duration}
                                                                    />
                                                                    </a>
                                                                </h2>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                                <div className="col-2">
                                                    <MDBCard
                                                        border="primary"
                                                        className="m-2 dashboard-card"
                                                        style={{maxWidth: '18rem'}}
                                                    >
                                                        <MDBCardBody className="text-primary">
                                                            <MDBCardTitle tag="h5">
                                Normas Publicadas
                                                            </MDBCardTitle>
                                                            <MDBCardText className="text-justify">
                                                                <h2>
                                                                <a onClick={this.displayModalNormas.bind(this, 3)}>
                                                                    <CountUp
                                                                        start={this.state.startPoint}
                                                                        end={this.state.cantidadNormasPublicadas}
                                                                        duration={this.state.duration}
                                                                    />
                                                                </a>
                                                                </h2>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                                <div className="col-2">
                                                    <MDBCard
                                                        border="primary"
                                                        className="m-2 dashboard-card"
                                                        style={{maxWidth: '18rem'}}
                                                    >
                                                        <MDBCardBody className="text-primary">
                                                            <MDBCardTitle tag="h5">
                                Normas Comentadas
                                                            </MDBCardTitle>
                                                            <MDBCardText className="text-justify">
                                                                <h2>
                                                                <a onClick={this.displayModalNormas.bind(this, 4)}>
                                                                    <CountUp
                                                                        start={this.state.startPoint}
                                                                        end={this.state.cantidadNormasComentadas}
                                                                        duration={this.state.duration}
                                                                    />
                                                                    </a>
                                                                </h2>
                                                            </MDBCardText>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                </div>
                                            </div>
                                        </PanelComponent>
                                    </div>
                                </div>
                                <div className="row mt-3 mb-5">
                                    <div className="col-7">
                                        <PanelComponent
                                            title={'Ordenes de normas internacionales'}
                                        >
                                            <DataGridComponent
                                                isLoading={this.state.loadingInformation}
                                                classContainer="grid-container-small"
                                                columnDefs={this.state.columnDefs}
                                                rowData={this.state.rowData}
                                                pagination={true}
                                                enableColResize={true}
                                                quickFilter={this.state.quickFilter}
                                                onGridLoad={params => {
                                                    this.gridApi = params.api;
                                                }}
                                            />
                                        </PanelComponent>
                                    </div>
                                    <div className="col-5">
                                        <PanelComponent
                                            title={'Actividad workflow'}
                                        >
                                            {this.state.lastComments && this.state.lastComments.length > 0 ? <div className="vertical-timeline-wrapper p-3">
                                                <div className="timeline-vertical dashboard-timeline">
                                                    {this.state.lastComments.map(comment => <div className="activity-log">
                                                        <p className="log-name">{comment.normaEntity.codNorma} - {comment.usuarioEntity.fullName}</p>
                                                        <div className="log-details"><span className="text-primary ml-1">{comment.observacion}</span></div>
                                                        <small className="log-time">{new Moment(comment.createdAt).format(
                                                            Constantes.DATETIME_FORMAT
                                                        )}</small>
                                                    </div>)}
                                                </div>
                                            </div> : <div className="text-center"><span>Sin comentarios</span></div>}
                                        </PanelComponent>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* page content ends */}
                    </div>
                </div>
            </DashboardContext.Provider>
        );
    }
}

export default injectIntl(DashboardComponent);

DashboardComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
