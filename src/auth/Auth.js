import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "appContext";
import { PropTypes } from "prop-types";
import { push } from "connected-react-router";
import authService from "services/authService";
import { setUser } from "redux/actions/UserActions";
import { redirectTo } from "utils";

class Auth extends Component {
    constructor(props, context) {
        super(props);
        let { routes } = context;

        this.state = {
            routes
        };
    }

    // On component mount run authentication check
    componentDidMount() {
        this.checkJwtAuth();
    }

    // Check route boolean attributes
    isRouteAttribute = (attributeName) => {
        const { location } = this.props;
        const { pathname } = location;
        const matched = this.state.routes.find(r => r.path === pathname);
        return matched && matched[`${attributeName}`] ? true : false;
    }

    checkJwtAuth = () => {
        // If the route has the callback attribute do nothing
        if(this.isRouteAttribute("callback")) {
            return;
        }
        // Attempt to login with session token by passing null token
        authService.loginWithCognitoSession(null).then(user => {
            if (user) {
                this.props.setUser(user);
                // If authenticated and the current page is the signin
                // page redirect to dashboard
                if(this.isRouteAttribute("signin")) {
                    redirectTo(this.props, "/");
                }
            } else {
                redirectTo(this.props, "/session/signin");
            }
        }).catch(error => {
            console.log(error);
            redirectTo(this.props, "/session/signin");
        });
    }
    
    render() {
        const { children } = this.props;
        return <Fragment>{ children }</Fragment>;
    }
}

Auth.propTypes = {
    setUser: PropTypes.func.isRequired
};

Auth.contextType = AppContext;

const mapStateToProps = state => ({});

const mapDispatchToProp = dispatch => ({
    pushTo: url => dispatch(push(url)),
    setUser: user => dispatch(setUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(Auth));