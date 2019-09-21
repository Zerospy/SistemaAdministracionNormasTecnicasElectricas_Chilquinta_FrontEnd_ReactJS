import React, {Component} from 'react';
import {Button, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

class GenerateExpButtonGridRenderer extends Component {
    render() {
        const {onClick} = this.props.colDef;
        const {data} = this.props;

        return (
            <div
                title={
                    data.ValidacionIFRA !== true
                        ? `${this.props.intl.formatMessage({
                            id: 'component.dataGrid.genExperimentalHint'
                        })}`
                        : `${this.props.intl.formatMessage({
                            id: 'component.dataGrid.genExperimental'
                        })}`
                }
            >
                <Button
                    disabled={data.ValidacionIFRA !== true}
                    color="success"
                    className="btn-grid"
                    onClick={onClick.bind(this, data)}
                >
                    <Fa icon="cogs" />
                </Button>
            </div>
        );
    }
}

export default injectIntl(GenerateExpButtonGridRenderer);

GenerateExpButtonGridRenderer.propTypes = {
    context: PropTypes.object,
    node: PropTypes.object,
    colDef: PropTypes.object,
    data: PropTypes.any,
    intl: PropTypes.any
};
