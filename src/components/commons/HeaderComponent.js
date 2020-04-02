import {Row} from 'mdbreact';
import React from 'react';
import logo from 'assets/logo.png';
import SidebarComponent from 'components/commons/SidebarComponent';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LoginService from 'services/LoginService';

class HeaderComponent extends React.Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super(props);

        this.loginService = new LoginService();
        this.sessionInformation = this.loginService.getSessionInformation();

        this.state = {
            pageTitle: <FormattedMessage id="app.title" />
        };
    }

    GetInformationSideNav(OpenSideBar){
            if(OpenSideBar === true ){

                this.state.OpenSideBar = true;
            }else{

                this.state.OpenSideBar = false;
            }


    }

    render() {
        return (
            
            <Row
                className={classNames({
                    'header-top': true,
                    'white-color': true,
                    noPrint: this.props.print === false
                })}
            >
                 
                <SidebarComponent
                    className={classNames({
                        'col-1 text-center mt-3': true,
                        noPrint: this.props.print === false
                    })}
                   OpenSideBar={this.GetInformationSideNav}
                />
                     <div class="d-flex flex-row">
                    
                <div className="col-12 page-title mt-3">
                    <h4 className="text-center text-bold mt-1">{this.state.pageTitle}</h4>
                </div>

               
                {this.sessionInformation.admin ?    <div className="col-3 page-title mt-2 ">
                     <span className="text-gray text-center user-welcome">
            Bienvenido, Administrador <span>{this.sessionInformation.fullName}</span>
                    </span>
                </div>  : <div className="col-3 page-title mt-2">
                     <span className="text-gray text-center user-welcome ">
            Bienvenido, usuario <span>{this.sessionInformation.fullName}</span>
            
                    </span>
             
                </div> }
                <div className="col-3 text-center page-logo2 mt-2">
                                      <img src={logo} alt="Cramer" />
                                  </div>
                                  </div>
            </Row> 
            
        );
    }
}

export default HeaderComponent;

HeaderComponent.propTypes = {
    print: PropTypes.bool
};

HeaderComponent.defaultProps = {
    print: true
};
