import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "appContext";
import { push } from "connected-react-router";

class AuthGuard extends Component {

    // AuthGuard component restricts access
    // based on user roles
    constructor(props, context) {
        super(props);
        let { routes } = context;

        this.state = {
            authenticated: false,
            routes
        };
    }

    componentDidMount() {
        // If not authenticated redirect
        if (!this.state.authenticated) {
            this.redirectRoute(this.props);
        }
    }

    componentDidUpdate() {
        // If not authenticated redirect
        if (!this.state.authenticated) {
            this.redirectRoute(this.props);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Only update component if user privelage
        // changes based on route access level
        return nextState.authenticated !== this.state.authenticated;
    }

    static getDerivedStateFromProps(props, state) {
        // Update authenticated state variable based on current
        // route and user role privaleges
        const { location, user } = props;
        const { pathname } = location;
        const matched = state.routes.find(r => r.path === pathname);
        // TODO fix authentication bug
        // For now return true
        const authenticated = true;
            // matched && matched.auth && matched.auth.length
            //     // Check matched routes auth Array contains
            //     // Users access role
            //     ? matched.auth.includes(user.role)
            //     : true;
        return {
            authenticated
        };
    }

    redirectRoute(props) {
        // If user role does not allow access to route
        // Redirect to signin view
        const { location } = props;
        const { pathname } = location;
    
        this.props.pushTo({
            pathname: "/session/signin",
            state: { redirectUrl: pathname }    
        })
      }

      render() {
        let { children } = this.props;
        const { authenticated } = this.state;
        return authenticated ? <Fragment>{children}</Fragment> : null;
      }
}

AuthGuard.contextType = AppContext;

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProp = dispatch => ({
    pushTo: url => dispatch(push(url)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AuthGuard));