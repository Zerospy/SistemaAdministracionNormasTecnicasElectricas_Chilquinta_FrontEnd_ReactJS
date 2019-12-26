import React, { Component } from 'react';
import { Fa } from 'mdbreact';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class MaterialBannedComponent extends Component {
  render() {
    const { data, type } = this.props;
    let showMP = data.Prohibido ? 'fa-ban' : 'd-none';
    const sohwAlFree =
      (data.materialType &&
        !data.AlergenoIFRA &&
        data.materialType === 'FORMULA_LIB_PERSONAL') ||
      (!data.AlergenoIFRA && type === 2)
        ? 'alergen-free'
        : 'd-none';
    const showAl =
      (data.materialType &&
        data.AlergenoIFRA &&
        data.materialType === 'MATERIAL') ||
      (data.AlergenoIFRA && type === 1)
        ? 'fa-font'
        : 'd-none';
    const showAlFormula =
      (data.materialType &&
        data.AlergenoIFRA &&
        data.materialType === 'FORMULA') ||
      (data.AlergenoIFRA && type === 0)
        ? 'fa-font'
        : 'd-none';
    const classes = classNames(
      'ban-component d-flex flex-row justify-content-center align-items-center'
    );
    if (
      showMP !== 'd-none' &&
      (showAlFormula !== 'd-none' ||
        showAl !== 'd-none' ||
        sohwAlFree !== 'd-none')
    ) {
      showMP = 'fa-ban mr-ico';
    }
    return (
      <span className={classes}>
        <Fa className={showMP} />
        <Fa className={showAl} />
        <Fa className={sohwAlFree} />
        <Fa className={showAlFormula} />
      </span>
    );
  }
}

export default injectIntl(MaterialBannedComponent);

MaterialBannedComponent.propTypes = {
  context: PropTypes.object,
  node: PropTypes.object,
  data: PropTypes.any,
  type: PropTypes.any,
  intl: PropTypes.any
};
