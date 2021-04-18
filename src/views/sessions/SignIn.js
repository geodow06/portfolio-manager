import React, { Component } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { loginWithUsernameAndPassword } from "redux/actions/LoginActions";
import { setAccountData } from "redux/actions/AccountActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Button, Card, Grid, CircularProgress, withStyles } from "@material-ui/core";
import dreamerImage from "assets/images/dreamer.svg";
import { logoutUser } from "redux/actions/UserActions";

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

    handleSubmit = event => {
        this.props.loginWithUsernameAndPassword({ ...this.state });
        // this.props.setAccountData({ ...this.state });
    };

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
                                                    disabled={this.props.login.loading}
                                                    type="submit"
                                                >
                                                Sign In
                                                </Button>
                                                {this.props.login.loading && (
                                                    <CircularProgress
                                                        size={24}
                                                        className={classes.buttonProgress}
                                                    />   
                                                )}
                                            </div>
                                        </div>
                                    </ValidatorForm>
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
    login: PropTypes.object.isRequired,
    loginWithUsernameAndPassword: PropTypes.func.isRequired,
    setAccountData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = dispatch => ({
    loginWithUsernameAndPassword: state => dispatch(loginWithUsernameAndPassword({...state})),
    setAccountData: () => dispatch(setAccountData())

});


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn)));