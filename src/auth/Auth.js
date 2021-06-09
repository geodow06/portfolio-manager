import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "appContext";
import { PropTypes } from "prop-types";
import { push } from "connected-react-router";
import authService from "services/authService";

class AuthNew extends Component {
    constructor(props, context) {
        super(props);
        let { routes } = context;

        this.state = {
            authenticated: false,
            routes
        }
        
        this.checkJwtAuth();
    }

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
        console.log("checking auth")
        // If the route has the callback attribute do nothing
        if(this.isRouteAttribute("callback")) {
            console.log("Is callback ignore auth check")
            return;
        }
        // Attempt to login with token
        authService.loginWithTokenNew(null).then(user => {
            console.log("Success logging in with token now setting state")
            if (user) {
                this.setState({
                    authenticated: true
                })
                // If authenticated and the current page is the signin
                // page redirect to dashboard
                if(this.isRouteAttribute("signin")) {
                    this.redirectToDashboard(this.props)
                }
            } else {
                console.log("Unable to sign in")
                this.redirectToSignin(this.props)
            }
        }).catch(error => {
            console.log(error);
            this.setState({
                authenticated: false
            })
            this.redirectToSignin(this.props)
        });
    }

    // Redirect to dashboard route
    redirectToDashboard(props) {
        props.pushTo({
            pathname: "/dashboard/home",
        })
    }

    // Redirect to signin session route
    redirectToSignin(props) {
        
        props.pushTo({
            pathname: "/session/signin",
        })
    }

    render() {
        const { children } = this.props;
        return <Fragment>{ children }</Fragment>;
    }
}

AuthNew.propTypes = {
    setAccountData: PropTypes.func.isRequired,
}

AuthNew.contextType = AppContext;

const mapStateToProps = state => ({
    // user: state.user
});

const mapDispatchToProp = dispatch => ({
    pushTo: url => dispatch(push(url)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AuthNew));