import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Redirect from 'react-router-dom/es/Redirect';
import HttpServiceConfig from 'services/HttpServiceConfig';
import NotFoundComponent from 'components/commons/NotFoundComponent';
import DashboardComponent from 'components/home/DashboardComponent';
import WorkflowComponent from 'components/workflow/WorkflowComponent';
import LoginComponent from 'components/login/LoginComponent';
import PropTypes from 'prop-types';
import LoginService from 'services/LoginService';
import NormasComponent from 'components/normas/NormasComponent';
import CrearNormaComponent from 'components/normas/CrearNormaComponent';
import normasInternacionales from 'components/normasInternacionales/normasInternacionales';
import administracionNormasInternacionales from 'components/normasInternacionales/administracionNormasInternacionales';
import UserComponent from 'components/userManagement/UserComponent';
import GridUsuarios from 'components/normas/GridUsuarios';
import documentosComponent from '../components/documentos/documentosComponent';
import subirDocumento from '../components/documentos/subirDocumento';

class RouterComponent extends React.Component {
    constructor(props) {
        super(props);

        const httpServConfig = new HttpServiceConfig();

        this.state = {};

        httpServConfig.setBaseUrl(process.env.REACT_APP_API_URL);
        httpServConfig.addRequestsInterceptors();

        this.LoginService = new LoginService();
    }

    componentDidMount() {}

    render() {
        const token = this.LoginService.getSessionInformation();

        if (token === null && this.props.history.location.pathname !== '/login') {
            this.props.history.push('/login');
        }

        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        if (token) {
                            return <Redirect to="/dashboard" />;
                        }
                        return <Redirect to="/login" />;
                    }}
                />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/dashboard" component={DashboardComponent} />
                <Route exact path="/workflow" component={WorkflowComponent} />
                <Route exact path="/normas" component={NormasComponent} />
                <Route exact path="/CrearNorma" component={CrearNormaComponent} />
                <Route
                    exact
                    path="/normasInternacionales"
                    component={normasInternacionales}
                />
                <Route
                    exact
                    path="/administracionNormasInternacionales"
                    component={administracionNormasInternacionales}
                />
                   <Route
                    exact
                    path="/documentosComponent"
                    component={documentosComponent}
                />
                   <Route
                    exact
                    path="/subirDocumento"
                    component={subirDocumento}
                />
                <Route exact path="/users-management" component={UserComponent} />
                <Route component={NotFoundComponent} />
            </Switch>
        );
    }
}

RouterComponent.propTypes = {
    history: PropTypes.any
};

export default withRouter(RouterComponent);
