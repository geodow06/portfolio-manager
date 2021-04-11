import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Card, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
    
    render() {
        let { theme } = this.props;

        return (
            <div className="dashboard m-sm-30 ">
                <Grid container spacing={2}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Grid container spacing={3} className="mb-24">
                            <Grid item xs={12} md={6}>
                                <Card className="stats-card p-sm-24 bg-paper" elevation={6}>
                                    <div className="ml-12">
                                        Portfolio Balance
                                    </div>
                                    <div>
                                        amount
                                    </div>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <Card className="stats-card p-sm-24 bg-paper" elevation={6}>
                                <div className="ml-12">
                                    24 Hour Change
                                </div>
                                <div>
                                    amount
                                </div>
                                </Card>
                            </Grid>
                        </Grid>
                        <Card className="px-24 py-16 mb-16">
                            <div className="card-title">Assets</div>
                            Table Here
                        </Card>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card className="px-24 py-16 mb-16">
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