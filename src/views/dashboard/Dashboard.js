import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "redux/actions/UserActions";
import React, { Component } from 'react';
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    

    render() {
        return (
            <div>
                Welcome home
                <div>
                    <button onClick={() => this.props.logoutUser()}>Log out</button>
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