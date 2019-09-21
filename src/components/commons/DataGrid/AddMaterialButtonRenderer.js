import React, { Component } from "react";
import { Button, Fa } from "mdbreact";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

class AddMaterialButtonRenderer extends Component {
  render() {
    const { onClick } = this.props.colDef;
    const { data } = this.props;
    return (
      <Button
        color={data.isSelected === true ? 'danger' : 'default'}
        className="btn-grid"
        onClick={onClick.bind(this, data)}
        title={`${this.props.intl.formatMessage({
          id: "dashboard.label.addComponents"
        })}`}
      >
        <Fa icon={data.isSelected === true ? 'times' : 'plus'} />
      </Button>
    );
  }
}

export default injectIntl(AddMaterialButtonRenderer);

AddMaterialButtonRenderer.propTypes = {
  context: PropTypes.object,
  node: PropTypes.object,
  colDef: PropTypes.object,
  data: PropTypes.any,
  intl: PropTypes.any
};
