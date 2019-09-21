import React from 'react';
import {Modal, ModalHeader, ModalBody, Fa, Row, Col} from 'mdbreact';
import {DashboardContext} from 'components/home/DashboardContext';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import MaterialBannedComponent from "components/commons/DataGrid/MaterialBannedComponent";

class FormulaDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                '',
                `${this.props.intl.formatMessage({
                    id: 'trial.panel.datagrid.col.trialCode'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'trial.panel.datagrid.col.trialName'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'trial.panel.datagrid.col.sample'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'trial.panel.datagrid.col.createdAt'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'trial.panel.datagrid.col.codExp'
                })}`
            ]
        };
    }


    render() {
        return (
            <DashboardContext.Consumer>
                {dashboardContext => (
                    <Modal
                        isOpen={dashboardContext.state.modalSelectedFormula}
                        toggle={dashboardContext.toggleModalPersonalLibDetail}
                        className="px-3"
                        size="lg"
                    >
                        <ModalHeader
                            toggle={
                                !dashboardContext.state.loadingFormulaInformation
                                    ? dashboardContext.toggleModalPersonalLibDetail
                                    : null
                            }
                        >
                            <FormattedMessage id="modal.trial.detail.title" />
                        </ModalHeader>
                        <ModalBody>
                            <Row className="d-flex justify-content-center">
                                <Col className="col-12 text-center">
                                    {dashboardContext.state.loadingFormulaInformation ? (
                                        <span>
                                            <Fa icon="spinner" className="fa-spin" />{' '}
                                            <FormattedMessage id="component.messages.loading" />
                                        </span>
                                    ) : (
                                        <table className="table table-stripped">
                                            <thead>
                                                <tr>
                                                    {this.state.columns.map(column => (
                                                        <th className="text-left" key={column}>
                                                            {column}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dashboardContext.state.selectedFormula.map(row => (
                                                    <tr key={row.IdTrial}>
                                                        <td className="text-left"><MaterialBannedComponent type={2} data={row}/></td>
                                                        <td className="text-left">{row.CodigoTrial}</td>
                                                        <td className="text-left">{row.NombreTrial}</td>
                                                        <td className="text-left">{row.IdSolicitud}</td>
                                                        <td className="text-left">{row.FechaCreacion}</td>
                                                        <td className="text-left">{row.CodigoExperimental}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                )}
            </DashboardContext.Consumer>
        );
    }
}

export default injectIntl(FormulaDetail);

FormulaDetail.propTypes = {
    intl: PropTypes.any
};
