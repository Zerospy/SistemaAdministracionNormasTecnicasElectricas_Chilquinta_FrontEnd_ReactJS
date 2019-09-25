import {Col, Row, Fa, Input} from 'mdbreact';
import React from 'react';
import {DashboardContext} from 'components/home/DashboardContext';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import HeaderComponent from 'components/commons/HeaderComponent';

class DashboardComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.state = {
            propertyDemo: 'prop-demo'
        };
    }

    render() {
        return (
            <DashboardContext.Provider value={this}>
                {/* Hidden div with print info */}

                <div className="dashboard">
                    <HeaderComponent print={false} />
                    <Row size="4">
                        <Col size="2">
                            <p>
                                <Fa icon="user" />
                                <FormattedMessage id="demo.label" />
                            </p>
                        </Col>
                        <Col size="2">
                            <Input
                                type="text"
                                value={this.state.propertyDemo}
                                onChange={e => {
                                    this.setState({
                                        propertyDemo: e.target.value
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                    <FormattedMessage id="demo.message" />
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
