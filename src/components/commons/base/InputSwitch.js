import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class InputSwitch extends React.Component {
    componentDidMount() {}

    render() {
        const {className} = this.props;
        const classes = classNames('switch', className);
        const {leftText, rightText, title, value, onChange} = this.props;

        return (
            <div className={classes}>
                <div>
                    <small>{title}</small>
                </div>
                <label>
                    {leftText}
                    <input
                        disabled={this.props.disabled}
                        checked={value}
                        onChange={onChange}
                        type="checkbox"
                    />
                    <span className="lever" />
                    {rightText}
                </label>
            </div>
        );
    }
}

InputSwitch.propTypes = {
    className: PropTypes.string,
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    title: PropTypes.any,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

InputSwitch.defaultProps = {
    checked: false
};

export {InputSwitch as MDBSwitch};
