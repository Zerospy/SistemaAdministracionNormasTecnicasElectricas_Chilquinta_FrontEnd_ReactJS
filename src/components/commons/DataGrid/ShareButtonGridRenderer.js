import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class ShareButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {node} = this.props;
        const {data} = node;
        return (
            <Button
                color={!data.Compartido ? 'primary' : 'success'}
                className="btn-grid"
                onClick={onClick.bind(this, node)}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.shareTrial'
                })}`}
            >
                <Fa icon="users" />
            </Button>
        );
    }
}
export default injectIntl(ShareButtonGridRenderer);

ShareButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
