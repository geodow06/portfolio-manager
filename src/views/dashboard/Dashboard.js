import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import StatsCards from "views/dashboard/shared/StatsCards";
import AssetTableCard from "./shared/AssetTableCard";
import BreakdownChartCard from "./shared/BreakdownChartCard";

// Dummy account service response data
const account = {
    total:{
        fiatValue: {usd:"1,320,091"},
        changes: {
            availableOptions: ["day", "hour"],
            day:{timeFrame: "24h", text: "24 Hour Change", percentage: "+30", fiatValue: "+103"},
            hour:{timeFrame: "1h", text: "One Hour Change", percentage: "-1", fiatValue: "-3"}
        },
        numberOfOwnedAssets: "3"
    },
    assets: [
        { 
            name: "Bitcoin",
            ticker: "BTC",
            balance: { 
                fiat: "$1.00",
                amount: "1.00"
            },
            allocation: "10",
            color: "#F2A900"
        },
        { 
            name: "Stellar Lumens",
            ticker: "XLM",
            balance: { 
                fiat: "$2.00",
                amount: "1.00"
            },
            allocation: "20",
            color: "#2a2a2a"
        },
        { 
            name: "Gather",
            ticker: "GTH",
            balance: { 
                fiat: "$7.00",
                amount: "1.00"
            },
            allocation: "70",
            color: "#6610f2"
        },
        {
            name: "Chainlink",
            ticker: "LINK",
            balance: {
                fiat: "$0.00",
                amount: "0.00"
            },
            allocation: "0",
            color: "#007bff"
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

                        <StatsCards balance={account.total.fiatValue.usd} changes={account.total.changes} theme={theme}/>

                        <AssetTableCard assets={account.assets}/>

                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <BreakdownChartCard account={account} theme={theme}/>
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