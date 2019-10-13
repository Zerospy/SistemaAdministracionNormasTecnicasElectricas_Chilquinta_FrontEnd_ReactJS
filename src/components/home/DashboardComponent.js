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
