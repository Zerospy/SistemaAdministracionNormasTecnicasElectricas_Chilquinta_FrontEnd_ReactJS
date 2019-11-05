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
import GridUsuarios from 'components/normas/GridUsuarios';

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
            
                <Route component={NotFoundComponent} />
            </Switch>
        );
    }
}

RouterComponent.propTypes = {
    history: PropTypes.any
};

export default withRouter(RouterComponent);
