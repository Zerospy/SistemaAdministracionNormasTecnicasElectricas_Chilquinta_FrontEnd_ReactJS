import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class DetailAlergenButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {data} = this.props;
        const classes = data.AlergenoIFRA ? 'btn-grid' : 'd-none';
        return (
            <Button
                color="primary"
                className={classes}
                onClick={onClick ? onClick.bind(this, data) : null}
                title={`${this.props.intl.formatMessage({
                    id: 'component.dataGrid.detail'
                })}`}
            >
                <Fa icon="list-ul" />
            </Button>
        );
    }
}

export default injectIntl(DetailAlergenButtonGridRenderer);

DetailAlergenButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
