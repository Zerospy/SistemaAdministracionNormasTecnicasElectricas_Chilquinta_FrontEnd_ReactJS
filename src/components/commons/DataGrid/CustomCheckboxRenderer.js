import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CustomCheckboxRenderer extends Component {
    render() {
        let onClick = this.props.colDef.onClick;
        const {node} = this.props;

        let children = null;

        if (onClick !== null && typeof onClick === 'function') {
            onClick = onClick.bind(this, node);
        }

        if (!node.selectable) {
            children = <span className="ag-icon ag-icon-checkbox-indeterminate" />;
        } else if (node.selected) {
            children = <span className="ag-icon ag-icon-checkbox-checked" />;
        } else {
            children = <span className="ag-icon ag-icon-checkbox-unchecked" />;
        }

        return (
            <span className="ag-selection-checkbox" onClick={onClick}>
                {children}
            </span>
        );
    }
}

CustomCheckboxRenderer.propTypes = {
    node: PropTypes.object,
    colDef: PropTypes.object
};
