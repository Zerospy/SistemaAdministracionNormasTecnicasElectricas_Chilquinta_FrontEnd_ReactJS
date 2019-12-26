import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class RemoveIconGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {data, rowIndex, node} = this.props;

        return !data.isDataSummary ? (
            <button
                type="button"
                className="close-icon"
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.deleteTrial'
                })}`}
                onClick={onClick.bind(this, node, rowIndex)}
            >
                <i className="fas fa-trash-alt" />
            </button>
        ) : null;
    }
}

export default injectIntl(RemoveIconGridRenderer);

RemoveIconGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    rowIndex: PropTypes.any,
    intl: PropTypes.any
};
