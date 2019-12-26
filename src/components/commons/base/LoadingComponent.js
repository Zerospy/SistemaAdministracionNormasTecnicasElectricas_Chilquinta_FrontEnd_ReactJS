import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Fa} from 'mdbreact';

export default class LoadingComponent extends React.Component {
    componentDidMount() {}

    render() {
        const classes = classNames({
            'loading-component': true,
            'no-background': this.props.noBackground || false,
            show: this.props.loading || false
        });

        return (
            <div className={classes}>
                <div className="loading-message">
                    <Fa icon="spinner" className="fa-spin" /> Cargando...
                </div>
            </div>
        );
    }
}

LoadingComponent.propTypes = {
    loading: PropTypes.bool,
    noBackground: PropTypes.bool
};
