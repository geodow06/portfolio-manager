import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { setAccountData } from "redux/actions/AccountActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Button, Card, Grid, CircularProgress, withStyles } from "@material-ui/core";
import dreamerImage from "assets/images/dreamer.svg";
import cognitoImage from "assets/images/cognito.png"
import { loginWithUsernameAndPassword, attemptOAuthAuthentication } from "redux/actions/AuthActions";

const styles = theme => ({
    wrapper: {
      position: "relative"
    },
  
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
});

class SignIn extends Component {

    state = {
        username: "",
        password: ""
    };

    handleChange = event => {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = () => {
        this.props.loginWithUsernameAndPassword({ ...this.state });
    };

    handleOnClick = event => {
        this.props.attemptOAuthAuthentication("cognito");
    }

    render() {
        let { username, password } = this.state;
        let { classes } = this.props;
        return(
            <div className="signup flex flex-center w-100 h-100vh">
                <div className="p-8">
                    <Card className="signup-card position-relative y-center">
                        <Grid container>
                            <Grid item lg={5} md={5} sm={5} xs={12}>
                                <div className="p-32 flex flex-center flex-middle h-100">
                                    <img src={dreamerImage} alt="fgd" />
                                </div>
                            </Grid>
                            <Grid item lg={7} md={7} sm={7} xs={12}>
                                <div className="p-36 h-100 bg-light-gray position-relative">
                                    <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                                        <TextValidator
                                            className="mb-24 w-100"
                                            label="Username"
                                            variable="outlined"
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
                                            className="mb-16 w-100"
                                            label="Password"
                                            variable="outlined"
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
                                        <div className="flex flex-middle mb-8">
                                            <div className={classes.wrapper}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={this.props.auth.loading}
                                                    type="submit"
                                                >
                                                Sign In
                                                </Button>
                                                {this.props.auth.loading && (
                                                    <CircularProgress
                                                        size={24}
                                                        className={classes.buttonProgress}
                                                    />   
                                                )}
                                            </div>
                                        </div>
                                    </ValidatorForm>
                                    {/* TODO - Implement OAuth provider list component to render each provider image */}
                                    <div className={classes.wrapper}>
                                        <div className="flex flex-middle mt-24">
                                            Or log in with a provider
                                            <Button 
                                                    disabled={this.props.auth.loading}
                                                    onClick={this.handleOnClick}
                                                    type="onClick">
                                                    <img src={cognitoImage} className="size-36" alt="fgd" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    loginWithUsernameAndPassword: PropTypes.func.isRequired,
    setAccountData: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    attemptAuthentication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    loginWithUsernameAndPassword: state => dispatch(loginWithUsernameAndPassword({...state})),
    attemptOAuthAuthentication: (provider) => dispatch(attemptOAuthAuthentication(provider)),
    setAccountData: () => dispatch(setAccountData())
});


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn)));