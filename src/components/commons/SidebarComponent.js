import {Fa, SideNav, SideNavLink, SideNavNav} from 'mdbreact';
import SideNavCat from 'components/commons/base/SideNavCat';
import PropTypes from 'prop-types';
import React from 'react';
import logo from 'assets/logo.png';
import userManual from 'assets/manual/manual_usuario.pdf';
import {withRouter} from 'react-router-dom';
import LoginService from 'services/LoginService';
import {FormattedMessage, injectIntl} from 'react-intl';

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.state = {
            toggleState: false
        };
    }

    // Slide out buttons event handlers
    handleToggleClick() {
        this.setState({
            toggleState: !this.state.toggleState
        });
    }

  redirectTo = link => {
      this.props.history.push(link);
  };

  render() {
      const menuButton = (
          <a
              href="#!"
              className="text-black-50"
              onClick={this.handleToggleClick}
              key="sideNavToggle"
          >
              <Fa icon="bars" size="2x" />
          </a>
      );
      const className = this.props.className;

      return (
          <div className={className}>
              <div className="text-center">{menuButton}</div>
              <SideNav
                  hidden
                  triggerOpening={this.state.toggleState}
                  breakWidth={1300}
                  className="white-color"
              >
                  <div>
                      <img src={logo} alt="Cramer" className="page-logo" />
                  </div>
                  <SideNavNav isOpen={true}>
                      <SideNavCat
                          id="home"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.home'
                          })}`}
                          icon="home"
                          startOpen={true}
                      >
                          <SideNavLink
                              to="/dashboard"
                              onClick={() => {
                                  window.location.reaload();
                              }}
                          >
                              <Fa icon="bong" />
                              <FormattedMessage id="menu.home.dashboard" />
                          </SideNavLink>
                      </SideNavCat>

                      <SideNavCat
                          id="normas"
                          name={`${this.props.intl.formatMessage({
                              id: 'component.normas'
                          })}`}
                          icon="folder"
                          startOpen={true}
                      >
                          <SideNavLink
                              to="normas"
                              onClick={() => {
                                  window.location.reaload();
                              }}
                          >
                              <Fa icon="cubes" />
                              <FormattedMessage id="component.normas.title" />
                          </SideNavLink>

                          <SideNavLink
                              to="CrearNorma"
                              onClick={() => {
                                  window.location.reaload();
                              }}
                          >
                              <Fa icon="plus" />
                              <FormattedMessage id="component.normas.crear" />
                          </SideNavLink>
                      </SideNavCat>

                      <SideNavCat
                          id="component.normasInternacionales"
                          name={`${this.props.intl.formatMessage({
                              id: 'component.normasInternacionales'
                          })}`}
                          icon="globe"
                          startOpen={true}
                      >
                          <SideNavLink
                              to="normasInternacionales"
                              onClick={() => {
                                  window.location.reaload();
                              }}
                          >
                              <Fa icon="passport" />
                              <FormattedMessage id="component.normasInternacionales" />
                          </SideNavLink>
                          <SideNavLink
                              to="administracionNormasInternacionales"
                              onClick={() => {
                                  window.location.reaload();
                              }}
                          >
                              <Fa icon="cloud-upload-alt" />
                              <FormattedMessage id="component.normasInternacionales.administracion" />
                          </SideNavLink>
                      </SideNavCat>

                      <SideNavCat
                          id="workflow"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.workflow'
                          })}`}
                          icon="arrows-alt"
                          startOpen={true}
                      >
                          <SideNavLink
                              to="/workflow"
                              onClick={() => {
                                  window.location.reaload();
                              }}
                          >
                              <Fa icon="network-wired" />
                              <FormattedMessage id="menu.workflow.item" />
                          </SideNavLink>
                      </SideNavCat>

                      <SideNavCat
                          id="userManagement"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.user.management'
                          })}`}
                          icon="user-cog"
                      >
                          <SideNavLink to="/users-management">
                              <Fa icon="users" />
                              <FormattedMessage id="menu.user.administration" />
                          </SideNavLink>
                      </SideNavCat>

                      <SideNavCat
                          id="session"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.account'
                          })}`}
                          icon="lock"
                      >
                          <SideNavLink
                              to="/login"
                              onClick={() => {
                                  new LoginService().logOut();
                                  window.location.reaload(true);
                              }}
                          >
                              <Fa icon="sign-out-altZ" />
                              <FormattedMessage id="menu.account.logout" />
                          </SideNavLink>
                      </SideNavCat>

                      {/* <SideNavCat
                          id="ayuda"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.help'
                          })}`}
                          icon="question-circle"
                      >
                          <a href={userManual} download>
                              <Fa icon="book" />
                              <FormattedMessage id="menu.help.userManual" />
                          </a>
                      </SideNavCat> */}
                  </SideNavNav>
              </SideNav>
          </div>
      );
  }
}

export default withRouter(injectIntl(SidebarComponent));

SidebarComponent.propTypes = {
    className: PropTypes.string,
    history: PropTypes.any,
    intl: PropTypes.any
};
