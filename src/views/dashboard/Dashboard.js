import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Card, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import { SimpleCard } from "geodow";

class Dashboard extends Component {
    
    render() {
        let { theme } = this.props;

        return (
            <div className="dashboard m-sm-30 ">
                <SimpleCard title="dashboard"></SimpleCard>
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


export default withStyles({}, {withTheme: true})(withRouter(connect(mapStateToProps, {})(Dashboard)));