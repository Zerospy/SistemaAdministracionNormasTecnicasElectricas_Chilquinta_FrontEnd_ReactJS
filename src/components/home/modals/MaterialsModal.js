import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'mdbreact';
import { DashboardContext } from 'components/home/DashboardContext';
import MaterialComponent from 'components/materials/MaterialComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class MaterialsModal extends React.Component {
  render() {
    return (
      <DashboardContext.Consumer>
        {dashboardContext => (
          <Modal
            isOpen={dashboardContext.state.modalMaterials}
            size="fluid"
            className="px-3"
          >
            <ModalHeader toggle={dashboardContext.toggleModalMaterials}>
              <FormattedMessage id="modal.materials.title" />
            </ModalHeader>
            <ModalBody>
              <MaterialComponent
                isMaterialSelector={true}
                onRowSelection={materials => {
                  dashboardContext.setState({
                    materialsSelected: materials
                  });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="cancel"
                onClick={dashboardContext.toggleModalMaterials}
              >
                <FormattedMessage id="modal.materials.footer.button.cancel" />
              </Button>
              <Button
                disabled={dashboardContext.state.materialsSelected.length === 0}
                onClick={dashboardContext.handleAddMaterial}
              >
                <FormattedMessage id="modal.materials.footer.button.accept" />
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </DashboardContext.Consumer>
    );
  }
}

export default injectIntl(MaterialsModal);

MaterialsModal.propTypes = {
  intl: PropTypes.any
};
