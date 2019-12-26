import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class RemoveButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {rowIndex, node} = this.props;

        return (
            <Button
                color="danger"
                className="btn-grid"
                onClick={onClick.bind(this, node, rowIndex)}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.deleteTrial'
                })}`}
            >
                <Fa icon="times" />
            </Button>
        );
    }
}

export default injectIntl(RemoveButtonGridRenderer);

RemoveButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    rowIndex: PropTypes.any,
    intl: PropTypes.any
};
