import {Row} from 'mdbreact';
import React from 'react';
import logo from 'assets/logo.png';
import SidebarComponent from 'components/commons/SidebarComponent';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class HeaderComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: <FormattedMessage id="app.title" />
        };
    }

    render() {
        return (
            <Row
                className={classNames({
                    'header-top': true,
                    'danger-color': true,
                    noPrint: this.props.print === false
                })}
            >
                <SidebarComponent
                    className={classNames({
                        'col-1 text-center mt-3': true,
                        noPrint: this.props.print === false
                    })}
                />
                <div className="col-10 page-title mt-3">
                    <h4 className="text-center white-text mt-2">
                        {this.state.pageTitle}
                    </h4>
                </div>
                <div className="col-1" />
            </Row>
        );
    }
}

export default HeaderComponent;

HeaderComponent.propTypes = {
    print: PropTypes.bool
};

HeaderComponent.defaultProps = {
    print: true
};
