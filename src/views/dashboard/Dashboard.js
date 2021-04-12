import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Card, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import StatsCards from "views/dashboard/shared/StatsCards";
import AssetTableCard from "./shared/AssetTableCard";
import ReactEcharts from "echarts-for-react";

// Dummy account service response data
const account = {
    total:{
        fiatValue: "1,320,091",
        changes: {
            availableOptions: ["day", "hour"],
            day:{timeFrame: "24h", text: "24 Hour Change", percentage: "+30", fiatValue: "+103"},
            hour:{timeFrame: "1h", text: "One Hour Change", percentage: "-1", fiatValue: "-3"}
        },
    },
    assets: [
        { 
            name: "Bitcoin",
            balance: { 
                fiat: "$1.00",
                amount: "1.00 BTC"
            },
            allocation: "10"
        },
        { 
            name: "Stellar Lumens",
            balance: { 
                fiat: "$2.00",
                amount: "1.00 XLM"
            },
            allocation: "20"
        },
        { 
            name: "Gather",
            balance: { 
                fiat: "$7.00",
                amount: "1.00 GTH"
            },
            allocation: "70"
        },
        {
            name: "Chainlink",
            balance: {
                fiat: "$0.00",
                amount: "0.00 LINK"
            },
            allocation: "0"
        }
    ]
}

const option = {
    series: [
        {
            name: "Breakdown",
            type: "pie",
            data: [
                {
                  value: 70,
                  name: "GTH"
                },
                {
                  value: 20,
                  name: "XLM"
                },
                { 
                  value: 10,
                  name: "BTC" 
                }
              ],
        }
    ]
}

class Dashboard extends Component {
    
    render() {
        let { theme } = this.props;

        return (
            <div className="dashboard m-sm-30 ">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>

                        <StatsCards balance={account.total.fiatValue} changes={account.total.changes} theme={theme}/>

                        <AssetTableCard assets={account.assets}/>

                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card elevation={6} className="px-24 py-16 mb-16">
                            <div className="card-title">Breakdown</div>
                            <ReactEcharts
                                style={{ height: "200px"}}
                                option={{...option}}
                            />
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