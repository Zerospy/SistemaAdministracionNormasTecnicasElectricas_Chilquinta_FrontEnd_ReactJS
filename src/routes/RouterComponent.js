import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Redirect from 'react-router-dom/es/Redirect';
import HttpServiceConfig from 'services/HttpServiceConfig';
import NotFoundComponent from 'components/commons/NotFoundComponent';
import DashboardComponent from 'components/home/DashboardComponent';
import MaterialComponent from 'components/materials/MaterialComponent';
import RequestsComponent from 'components/formulas/RequestsComponent';
import FormulaComponent from 'components/formulas/FormulaComponent';
import PersonalLibrary from 'components/personalLibrary/PersonalLibrary';
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
                <Route exact path="/materials" component={MaterialComponent} />
                <Route exact path="/requests" component={RequestsComponent} />
                <Route exact path="/formulas" component={FormulaComponent} />
                <Route exact path="/login" component={LoginComponent} />
                <Route exact path="/dashboard" component={DashboardComponent} />
                <Route exact path="/dashboard/:id" component={DashboardComponent} />
                <Route exact path="/personal-lib" component={PersonalLibrary} />
                <Route component={NotFoundComponent} />
            </Switch>
        );
    }
}

RouterComponent.propTypes = {
    history: PropTypes.any
};

export default withRouter(RouterComponent);
