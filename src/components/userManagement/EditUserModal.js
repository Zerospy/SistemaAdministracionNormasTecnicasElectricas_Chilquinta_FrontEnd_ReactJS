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
import NormaService from 'services/NormaService';
import {toast} from 'react-toastify';
import pdf from 'assets/img/pdf.png';
import cad from 'assets/img/cad.png';
import {Link} from 'react-router-dom';
import {saveAs} from 'file-saver';

class EditUserModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingInformation: false
        };
    }

    componentDidUpdate(prevProps) {
        if (
            this.props !== null &&
      this.props.user !== null &&
      this.props.user !== prevProps.user
        ) {
        }
    }

    render() {
        const {toggle, isOpen} = this.props;

        return (
            <Container>
                <Modal isOpen={isOpen} size="lg">
                    <ModalHeader toggle={toggle}>
            Agregar/Modificar Información de usuario
                    </ModalHeader>
                    <ModalBody></ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default injectIntl(EditUserModal);

EditUserModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
    intl: PropTypes.any,
    user: PropTypes.any
};
