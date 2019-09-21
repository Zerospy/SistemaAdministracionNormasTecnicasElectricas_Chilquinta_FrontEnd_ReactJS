import React from 'react';
import {Modal, ModalHeader, ModalBody, Fa, Row, Col} from 'mdbreact';
import {DashboardContext} from 'components/home/DashboardContext';
import * as Util from 'commons/Util.js';
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
                    id: 'modal.trial.detail.datagrid.code'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'modal.trial.detail.datagrid.name'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'modal.trial.detail.datagrid.quantity'
                })}`
            ]
        };
    }

    render() {
        return (
            <DashboardContext.Consumer>
                {dashboardContext => (
                    <Modal
                        isOpen={dashboardContext.state.modalDetFormula}
                        toggle={dashboardContext.toggleModalDetFormula}
                        className="px-3"
                        size="lg"
                    >
                        <ModalHeader
                            toggle={
                                !dashboardContext.state.loadingFormulaInformation
                                    ? dashboardContext.toggleModalDetFormula
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
                                                {dashboardContext.state.formulaData.rows.map(row => (
                                                    <tr key={row.CodMaterial}>
                                                        <td className="text-left"><MaterialBannedComponent type={row.TipoComponente === 'MATERIAL' ? 1 : 0} data={row}/></td>
                                                        <td className="text-left">{row.CodMaterial}</td>
                                                        <td className="text-left">{row.Material}</td>
                                                        <td className="text-right">
                                                            {Util.numberFormat(row.CantidadUtilizada)}
                                                        </td>
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
