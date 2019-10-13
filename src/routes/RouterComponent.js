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

        /* if (
            token === null &&
      this.props.history.location.pathname !== '/dashboard'
        ) {
            // this.props.history.push('/dashboard');
        }
*/
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        if (token) {
                            return <Redirect to="/dashboard" />;
                        }
                        return <Redirect to="/dashboard" />;
                    }}
                />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/dashboard" component={DashboardComponent} />
                <Route exact path="/workflow" component={WorkflowComponent} />
                <Route component={NotFoundComponent} />
            </Switch>
        );
    }
}

RouterComponent.propTypes = {
    history: PropTypes.any
};

export default withRouter(RouterComponent);
