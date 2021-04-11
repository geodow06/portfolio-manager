import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Card, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import StatsCards from "views/dashboard/shared/StatsCards";
import AssetTableCard from "./shared/AssetTableCard";

class Dashboard extends Component {
    
    render() {
        let { theme } = this.props;

        return (
            <div className="dashboard m-sm-30 ">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>

                        <StatsCards theme={theme}/>

                        <AssetTableCard/>

                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card elevation={6} className="px-24 py-16 mb-16">
                            <div className="card-title">Breakdown</div>
                            Pie chart here
                        </Card>
                    </Grid>
                </Grid>
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