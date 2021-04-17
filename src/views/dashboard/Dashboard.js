import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import StatsCards from "views/dashboard/shared/StatsCards";
import AssetTableCard from "./shared/AssetTableCard";
import BreakdownChartCard from "./shared/BreakdownChartCard";

class Dashboard extends Component {

    componentDidMount = () => {
        this.priceWebSocket();
    }

    priceWebSocket = () => {
        console.log("Websocket")
        let socket = new WebSocket("wss://ws-feed.pro.coinbase.com");
        let subscribe = {
            type: "subscribe",
            product_ids: [
                "ETH-USD",
                "ETH-EUR"
            ],
            channels: [
                "level2",
                "heartbeat",
                {
                    name: "ticker",
                    product_ids: [
                        "ETH-BTC",
                        "ETH-USD"
                    ]
                }
            ]
        }

        socket.onopen = function(e) {
            console.log("[open] Connection established");
            console.log("Sending to server");
            socket.send(JSON.stringify(subscribe));
        };

        socket.onmessage = function(event) {
            console.log(`[message] Data received from server: ${event.data}`);
        };
          
        socket.onclose = function(event) {
        
            if (event.wasClean) {
              console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log('[close] Connection died');
            }
        };

        socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        };

        setTimeout(10000)
        socket.close(1000, "Work complete");

    }

    render() {
        let { theme, account } = this.props;
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
    user: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    account: state.account
});


export default withStyles({}, {withTheme: true})(withRouter(connect(mapStateToProps, {})(Dashboard)));