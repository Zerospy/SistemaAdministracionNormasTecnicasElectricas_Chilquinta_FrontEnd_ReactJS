import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class ValidateIfraButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {data} = this.props;

        return (
            <Button
                color="default"
                className="btn-grid"
                onClick={onClick.bind(this, data)}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.validateIfra'
                })}`}
            >
                <Fa icon="check-double" />
            </Button>
        );
    }
}

export default injectIntl(ValidateIfraButtonGridRenderer);

ValidateIfraButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
