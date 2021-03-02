import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

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
        event.preventDefault();
        // TODO
    };

    render() {
        let { username, password } = this.state;
        return(
            <div>
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
                </ValidatorForm>
            </div>
        );
    }
}

export default SignIn