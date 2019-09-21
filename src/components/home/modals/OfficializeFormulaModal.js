import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'mdbreact';
import {DashboardContext} from 'components/home/DashboardContext';
import OfficializeFormulaComponent from 'components/home/OfficializeFormulaComponent';
import {FormattedMessage, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

class OfficializeFormulaModal extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <DashboardContext.Consumer>
                {dashboardContext => (
                    <Modal
                        isOpen={dashboardContext.state.modalOfficialize}
                        className="px-3"
                        size="lg"
                    >
                        <ModalHeader
                            toggle={() => {
                                dashboardContext.setState({
                                    modalOfficialize: false
                                });
                            }}
                        >
                            <FormattedMessage id="modal.trial.officialize.title" />
                        </ModalHeader>
                        <ModalBody>
                            <DashboardContext.Provider value={dashboardContext}>
                                <OfficializeFormulaComponent
                                    trialID={dashboardContext.getTrialID()}
                                />
                            </DashboardContext.Provider>
                        </ModalBody>
                    </Modal>
                )}
            </DashboardContext.Consumer>
        );
    }
}

export default injectIntl(OfficializeFormulaModal);

OfficializeFormulaModal.propTypes = {
    intl: PropTypes.any
};
