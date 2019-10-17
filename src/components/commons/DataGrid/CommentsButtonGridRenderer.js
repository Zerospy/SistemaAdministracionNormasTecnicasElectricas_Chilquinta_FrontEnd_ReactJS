import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class CommentsButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {data} = this.props;

        return (
            <Button
                disabled={data === null || data.estado.id === 3}
                color="info"
                className="btn-grid"
                onClick={onClick.bind(this, data)}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.comments'
                })}`}
            >
                <Fa icon="comment" />
            </Button>
        );
    }
}

export default injectIntl(CommentsButtonGridRenderer);

CommentsButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
