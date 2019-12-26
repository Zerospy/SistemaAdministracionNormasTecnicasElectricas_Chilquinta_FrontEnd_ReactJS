import React from 'react';
import * as PropTypes from 'prop-types';
import { Fa } from 'mdbreact';
import { injectIntl } from 'react-intl';
import LoginService, { Permisos } from 'services/LoginService';

// Header component to be used as default for all the columns.
class HeaderGroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.columnGroup
      .getOriginalColumnGroup()
      .addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    this.state = {
      expanded: null
    };
    // PROFILE SETTINGS
    const loginService = new LoginService();
    this.profile = {
      btnGuardar: loginService.checkPermission(Permisos.DashboardGuardar)
    };
  }

  componentDidMount() {
    this.onExpandChanged();
  }

  render() {
    const { columnGroup } = this.props;
    const colGroupDef = columnGroup.originalColumnGroup.colGroupDef;
    const { savingInformation, columnIdentifier, onClose, onEdit, onSave, unsaved } = colGroupDef;
    return (
      <div>
        <div className="custom-header-label">
          <span>{this.props.displayName}</span>

          <div className="header-buttons">
          {this.profile.btnGuardar
            ?(<Fa
              title={`${this.props.intl.formatMessage({
                id: 'dashboard.dataGrid.col.trialInfo.save'
              })}`}
              icon={savingInformation ? "spinner" : "save"}
              className={savingInformation ? "fa-spin" : (unsaved ? "save-icon-red cursor-pointer header-trial-icon" : "cursor-pointer header-trial-icon")}
              onClick={
                onSave &&
                typeof onSave === 'function' &&
                columnIdentifier !== null
                && !savingInformation
                  ? onSave.bind(this, columnIdentifier)
                  : null
              }
            />) :null
          }
            <Fa
              title={`${this.props.intl.formatMessage({
                id: 'dashboard.dataGrid.col.trialInfo.edit'
              })}`}
              icon="edit"
              className="cursor-pointer header-trial-icon"
              onClick={
                onEdit &&
                typeof onEdit === 'function' &&
                columnIdentifier !== null
                  ? onEdit.bind(this, columnIdentifier)
                  : null
              }
            />

            <Fa
              title={`${this.props.intl.formatMessage({
                id: 'dashboard.dataGrid.col.trialInfo.close'
              })}`}
              icon="times"
              className="cursor-pointer header-trial-icon"
              onClick={
                onClose &&
                typeof onClose === 'function' &&
                columnIdentifier !== null
                  ? onClose.bind(this, columnIdentifier)
                  : null
              }
            />
          </div>
        </div>
      </div>
    );
  }

  expandOrCollapse() {
    if (typeof this.props.setExpanded === 'function') {
      this.props.setExpanded(!this.state.expanded);
    }
  }

  onExpandChanged() {
    this.setState({
      expanded: this.props.columnGroup.getOriginalColumnGroup().isExpanded()
    });
  }
}

export default injectIntl(HeaderGroupComponent);

// the grid will always pass in one props called 'params',
// which is the grid passing you the params for the cellRenderer.
// this piece is optional. the grid will always pass the 'params'
// props, so little need for adding this validation meta-data.
HeaderGroupComponent.propTypes = {
  params: PropTypes.object,
  displayName: PropTypes.any,
  columnGroup: PropTypes.any,
  setExpanded: PropTypes.any,
  intl: PropTypes.any
};
