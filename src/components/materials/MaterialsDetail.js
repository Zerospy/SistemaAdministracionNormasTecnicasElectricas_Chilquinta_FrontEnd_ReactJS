import React from 'react';
import {Modal, ModalHeader, ModalBody, Fa, Row, Col} from 'mdbreact';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import MaterialBannedComponent from "components/commons/DataGrid/MaterialBannedComponent";

class MaterialsDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                `${this.props.intl.formatMessage({
                    id: 'modal.materials.selected.codSun'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'modal.materials.selected.name'
                })}`,
                `${this.props.intl.formatMessage({
                    id: 'modal.materials.selected.price'
                })}`
            ]
        };
    }

    render() {
        const {
            isOpen,
            toggleModal,
            isLoadingInformation,
            formulaData
        } = this.props;

        return (
            <Modal isOpen={isOpen} toggle={toggleModal} className="px-3" size="lg">
                <ModalHeader toggle={!isLoadingInformation ? toggleModal : null}>
                    <FormattedMessage id="modal.materials.selected.title" />
                </ModalHeader>
                <ModalBody>
                    <Row className="d-flex justify-content-center">
                        <Col className="col-12 text-center">
                            {isLoadingInformation ? (
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
                                        {formulaData.map(row => (
                                            <tr key={row.CodSun}>
                                                <td className="text-left"><MaterialBannedComponent type={0} data={row}/></td>
                                                <td className="text-left">{row.CodSun}</td>
                                                <td className="text-left">{row.Materia}</td>
                                                <td className="text-right">{row.CostoUSD}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        );
    }
}

export default injectIntl(MaterialsDetail);

MaterialsDetail.propTypes = {
    intl: PropTypes.any,
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    formulaData: PropTypes.any,
    isLoadingInformation: PropTypes.bool
};
