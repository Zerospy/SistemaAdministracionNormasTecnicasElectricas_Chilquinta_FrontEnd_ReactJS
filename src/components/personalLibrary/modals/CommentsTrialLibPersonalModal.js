import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'mdbreact';
import {DashboardContext} from 'components/home/DashboardContext';
import CommentsTrialLibPersonal from 'components/personalLibrary/modals/CommentsTrialLibPersonal';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';

class CommentsTrialLibPersonalModal extends React.Component {
    render() {
        return (
            <DashboardContext.Consumer>
                {dashboardContext => (
                    <Modal
                        isOpen={dashboardContext.state.modalComments}
                        toggle={dashboardContext.toggleModalComments}
                        className="px-3"
                        size="lg"
                    >
                        <ModalHeader toggle={dashboardContext.toggleModalComments}>
                            <FormattedMessage id="modal.trial.comments.title" />
                        </ModalHeader>
                        <ModalBody>
                            <CommentsTrialLibPersonal
                                getTrialID={dashboardContext.getTrialID}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="cancel"
                                onClick={dashboardContext.toggleModalComments}
                            >
                                <FormattedMessage id="modal.trial.comments.footer.button.cancel" />
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </DashboardContext.Consumer>
        );
    }
}

export default injectIntl(CommentsTrialLibPersonalModal);

CommentsTrialLibPersonalModal.propTypes = {
    intl: PropTypes.any
};
