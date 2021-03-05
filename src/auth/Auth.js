import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "redux/actions/UserActions";
import authService from "services/authService";
import { push } from "connected-react-router";

class Auth extends Component {

    componentDidMount() {
        this.checkAuth();
    }

    checkAuth = () => {
        try {
            authService.loginWithToken();
            // Upon success redirect to home
            this.props.pushTo({pathname: "/dashboard/home"})

        } catch(error) {
            console.log(error);
            // Upon failure redirect to signin
            this.props.pushTo({pathname: "/session/signin"})
        }
    }

    render() {
        const { children } = this.props;
        return <Fragment>{ children }</Fragment>;
    }
}

Auth.propTypes = {
    setUserData: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = dispatch => ({
    pushTo: url => dispatch(push(url)),
    setUserData: user => dispatch(setUserData(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);