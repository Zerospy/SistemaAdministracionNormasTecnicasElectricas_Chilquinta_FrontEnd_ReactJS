import HeaderComponent from 'components/commons/HeaderComponent';
import {WorkflowContext} from 'components/workflow/WorkflowContext';
import {Col, Row} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

class WorkflowComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <WorkflowContext.Provider value={this}>
                <HeaderComponent />
                <Row>
                    <Col>
                        <FormattedMessage id="component.workflow.title" />
                    </Col>
                </Row>
            </WorkflowContext.Provider>
        );
    }
}

export default injectIntl(WorkflowComponent);

WorkflowComponent.propTypes = {
    match: PropTypes.any,
    location: PropTypes.object,
    intl: PropTypes.any
};
