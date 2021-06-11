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
            authorized: false,
            routes
        };
    }

    componentDidMount() {
        // If not authorized redirect
        if (!this.state.authorized) {
            this.redirectRoute(this.props);
        }
    }

    componentDidUpdate() {
        // If not authorized redirect
        if (!this.state.authorized) {
            this.redirectRoute(this.props);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Only update component if user privelage
        // changes based on route access level
        return nextState.authorized !== this.state.authorized;
    }

    static getDerivedStateFromProps(props, state) {
        // Update authorized state variable based on current
        // route and user role privaleges
        const { location, user } = props;
        const { pathname } = location;
        const matched = state.routes.find(r => r.path === pathname);
        const authorized = matched && matched.auth && matched.auth.length
                // Check matched routes auth Array contains
                // Users access role
                ? matched.auth.includes(user.role)
                : true;
        return {
            authorized
        };
    }

    redirectRoute(props) {
        // If user role does not allow access to route
        // Redirect to signin view
        props.pushTo({
            pathname: "/session/signin",
        })
    }

    render() {
        let { children } = this.props;
        const { authorized } = this.state;
        return authorized ? <Fragment>{children}</Fragment> : null;
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