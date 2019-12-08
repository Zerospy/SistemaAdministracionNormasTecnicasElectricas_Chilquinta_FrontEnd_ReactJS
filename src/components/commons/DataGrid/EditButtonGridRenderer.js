import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class EditButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {node, colDef} = this.props;
        const {data} = node;
        return (
            <Button
                disabled={data === null || !colDef.enabled}
                color={'info'}
                className="btn-grid"
                onClick={onClick.bind(this, node)}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.edit'
                })}`}
            >
                <Fa icon="edit" />
            </Button>
        );
    }
}
export default injectIntl(EditButtonGridRenderer);

EditButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
