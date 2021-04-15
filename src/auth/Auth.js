import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "redux/actions/UserActions";
import { setAccountData } from "redux/actions/AccountActions"
import authService from "services/authService";
import { push } from "connected-react-router";

class Auth extends Component {

    componentDidMount() {
        this.checkAuth();
    }

    checkAccountData = () => {
        try {
            this.props.setAccountData()
        }
        catch(error) {
            console.log(error);
            // Upon failure redirect to signin
            this.props.pushTo({pathname: "/session/signin"})
        }
    }

    checkAuth = () => {
        try {
            let user = authService.loginWithToken();
            // When succesfully authenticated 
            // set Account data from local storage or API
            this.checkAccountData();
            // Add authenticated user to state
            this.props.setUser(user);
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
    setUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    setAccountData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = dispatch => ({
    pushTo: url => dispatch(push(url)),
    setUser: user => dispatch(setUserData(user)),
    setAccountData: () => dispatch(setAccountData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);