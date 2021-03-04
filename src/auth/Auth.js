import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "redux/actions/UserActions";
import localStorageService from "services/localStorageService";
import authService from "services/authService";
import history from "history.js";

class Auth extends Component {
    state = {};

    constructor(props) {
        super(props);
        console.log("constructor")
        // TODO
        // get from local storage
        this.props.setUserData(localStorageService.getItem("auth_user"));
        // check Authorization
        this.checkAuth();
    }

    checkAuth = () => {
        try {
            let user = authService.loginWithUsernameAndPassword()
            console.log("got through")
            this.props.setUserData(user);
            // Upon success redirect to home
            history.push({
                pathname: "/dashboard/home"
            });

        } catch(error) {
            console.log(error);

            // Upon failure redirect to signin page
            history.push({
                pathname: "/session/signin"
            });
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

export default connect(mapStateToProps, { setUserData })(Auth);