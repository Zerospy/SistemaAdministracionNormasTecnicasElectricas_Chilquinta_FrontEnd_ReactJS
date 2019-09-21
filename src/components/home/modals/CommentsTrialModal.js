import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'mdbreact';
import {DashboardContext} from 'components/home/DashboardContext';
import CommentsTrialComponent from 'components/home/CommentsTrialComponent';
import {FormattedMessage, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';

class CommentsTrialModal extends React.Component {
    render() {
        return (
            <DashboardContext.Consumer>
                {dashboardContext => (
                    <Modal
                        isOpen={dashboardContext.state.modalComments}
                        className="px-3"
                        size="lg"
                    >
                        <ModalHeader toggle={dashboardContext.toggleModalComments}>
                            <FormattedMessage id="modal.trial.comments.title" />
                        </ModalHeader>
                        <ModalBody>
                            <CommentsTrialComponent
                                onChange={dashboardContext.handleAddComments}
                                getTrialID={dashboardContext.getTrialID}
                                getCommentsActiveTrial={dashboardContext.getCommentsActiveTrial}
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

export default injectIntl(CommentsTrialModal);

CommentsTrialModal.propTypes = {
    intl: PropTypes.any
};
