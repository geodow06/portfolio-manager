import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "redux/actions/UserActions";
import React, { Component } from 'react';
import { withStyles, Button, Card, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    
    render() {
        return (
            <div className="dashboard flex flex-center w-100 h-100vh-160">
                <div className="p-4">
                    <Card className="position-relative y-center">
                        <Grid container spacing={3}>
                            <Grid item lg={8} md={8} sm={12} xs={12}>
                                Welcome to the Dashboard
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Button onClick={() => this.props.logoutUser()}>Log out</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    login: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    login: state.login,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default withStyles({}, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));