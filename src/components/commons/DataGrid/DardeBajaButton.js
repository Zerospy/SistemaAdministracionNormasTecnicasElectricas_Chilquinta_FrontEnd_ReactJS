import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class DardeBajaButton extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {data} = this.props;

        return (
            <Button
                color="danger"
                className="btn-grid"
                onClick={onClick ? onClick.bind(this, data) : null}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.DardeBaja'
                })}`}
            >
                <Fa icon="folder-minus"/>
            </Button>
        );
    }
}

export default injectIntl(DardeBajaButton);

DardeBajaButton.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
