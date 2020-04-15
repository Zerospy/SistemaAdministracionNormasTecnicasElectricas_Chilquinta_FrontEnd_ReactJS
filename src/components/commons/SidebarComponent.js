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

        this.loginService = new LoginService();
        this.sessionInformation = this.loginService.getSessionInformation();
    }

    // Slide out buttons event handlers
    handleToggleClick() {
        this.setState({
            toggleState: !this.state.toggleState
        });
    }

    handleToggle = (OpenSideBar) => {

        if (OpenSideBar === true ) {
        this.setState({
            OpenSideBar: true
        });
    }else{

        this.setState({
            OpenSideBar: false
        });

    }
}
  

  redirectTo = link => {
      this.props.history.push(link);
  };
  componentDidMount() {
    this.handleToggle();
  
}
  render() {
      const menuButton = (
          <a
              href="#!"
              className="text-black-50"
              OnStart={this.handleToggle} 
              onClick={this.handleToggleClick}
              key="sideNavToggle"
          >
              <Fa icon="bars" size="2x" />
          </a>
      );
      const className = this.props.className;
        const {toggleState} = this.state;
              return (
          <div className={className}>
              <div className="text-center">{menuButton}</div>
              <SideNav
                    /*   hidden   */
                  hidden
                  triggerOpening={this.state.toggleState}
                  breakWidth={1600}
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
                          
                          >
                              <Fa icon="cubes" />
                              <FormattedMessage id="component.normas.title" />
                          </SideNavLink>

                          {this.sessionInformation.admin ? <SideNavLink
                              to="CrearNorma"
                       
                          >
                              <Fa icon="plus" />
                              <FormattedMessage id="component.normas.crear" />
                          </SideNavLink> : null}

                          
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
                         
                          >
                              <Fa icon="passport" />
                              <FormattedMessage id="component.normasInternacionales" />
                          </SideNavLink>
                          {this.sessionInformation.admin ?  <SideNavLink
                              to="administracionNormasInternacionales"
                          
                          >
                              <Fa icon="cloud-upload-alt" />
                              <FormattedMessage id="component.normasInternacionales.administracion" />
                          </SideNavLink> : []}
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
                        
                          >
                              <Fa icon="network-wired" />
                              <FormattedMessage id="menu.workflow.item" />
                          </SideNavLink>
                      </SideNavCat>


                      <SideNavCat
                          id="Documentos"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.documentos'
                          })}`}
                          icon="folder"
                          startOpen={true}
                      >
                          <SideNavLink
                              to="/documentosComponent"
                         
                          >
                              <Fa icon="book" />
                              <FormattedMessage id="menu.documentos.item" />
                          </SideNavLink>
                          {this.sessionInformation.admin ? <SideNavLink
                              to="/subirDocumento"
                           
                          >
                              <Fa icon="arrow-circle-up" />
                              <FormattedMessage id="menu.documentos.subir" />
                          </SideNavLink> : []}
                      </SideNavCat>

                      {this.sessionInformation.admin ? <SideNavCat
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
                      </SideNavCat> : []}

                      <SideNavCat
                          id="manuales"
                          name={`${this.props.intl.formatMessage({
                              id: 'menu.manuales'
                          })}`}
                          icon="book"
                      >         
                          <SideNavLink
                           
                          onClick={()=> {   
                            window.location.href = 'http://shpprd/sites/normas/Documentos%20compartidos/Manual%20de%20usuario%20normal.pdf'; 

                          }}
                          >
                              <Fa icon="book-open" />
                              <FormattedMessage id="menu.manual.user" />
                          </SideNavLink>
                          {this.sessionInformation.admin ?
                          <SideNavLink
                              onClick={()=> {   
                                window.location.href = 'http://shpprd/sites/normas/Documentos%20compartidos/Manual%20de%20usuario%20administrador.pdf'; 

                              }} 
                          > 
                              <Fa icon="book-open" />
                              <FormattedMessage id="menu.manual.admin" />
                          </SideNavLink>  : []}
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
                                  this.props.history.push(this.props.match.url)
                                
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
