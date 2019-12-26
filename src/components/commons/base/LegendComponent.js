import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fa } from 'mdbreact';
import { FormattedMessage } from 'react-intl';

export default class LegendComponent extends React.Component {

  render() {
    const { className } = this.props;
    const { legend } = this.props;
    const { icon } = this.props;
    const classes = classNames('ban-component', className);

    return (
      <div className={classes}>
        <span>
          <Fa className={icon} />
          <FormattedMessage id={legend} />
        </span>
      </div>
    );
  }
}

LegendComponent.propTypes = {
  className: PropTypes.string,
  legend: PropTypes.string,
  icon: PropTypes.string
};
