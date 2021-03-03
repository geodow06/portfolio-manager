import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { loginWithUsernameAndPassword } from "redux/actions/LoginActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Button } from "@material-ui/core";
class SignIn extends Component {

    state = {
        username: "",
        password: ""
    }

    handleChange = event => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        this.props.loginWithUsernameAndPassword({ ...this.state })
        // TODO
    };

    render() {
        let { username, password } = this.state;
        return(
            <div>
                {this.state.username}
                {this.state.password}
                <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                    <TextValidator
                        label="Username"
                        // variable="outlined"
                        name="username"
                        type="username"
                        onChange={this.handleChange}
                        value={username}
                        validators={["required"]}
                        errorMessages={[
                            "username is required",
                            "username is not valid"
                        ]}
                    />
                    <TextValidator 
                        label="Password"
                        // variable="outlined"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                        validators={["required"]}
                        errorMessages={[
                            "password is required",
                            "password is not valid"
                        ]}
                    />
                    <Button
                        disabled={this.props.login.loading}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

SignIn.propTypes = {
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps,{ loginWithUsernameAndPassword })(SignIn)