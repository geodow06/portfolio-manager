import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import StatsCards from "views/dashboard/shared/StatsCards";
import AssetTableCard from "./shared/AssetTableCard";
import BreakdownChartCard from "./shared/BreakdownChartCard";
import pricesService from "services/pricesService";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinbaseData: {},
            tickerPrices: {}
        }
    }
    // socket = new WebSocket("wss://ws-feed.pro.coinbase.com")

    componentDidMount = () => {
        console.log("Dashboard Did mount")
        const productIds = [ "BTC-USD","LINK-USD","XLM-USD"];
        pricesService.getLiveCoinbaseTickerData(productIds);
        
        // let subscribe = {
        //     type: "subscribe",
        //     "channels": [{ name: "ticker", product_ids: [ "BTC-USD","LINK-USD","XLM-USD"] }]
        // };

        // this.socket.onopen = e => {
        //     console.log("[open] Connection established");
        //     console.log("Sending to server");
        //     this.socket.send(JSON.stringify(subscribe));
        // };

        // this.socket.onmessage = event => {
        //     console.log(`[message] Data received from server: ${event.data}`);
        //     const message = JSON.parse(event.data);
        //     let tickerPrice = {};
        //     if (message.price) {
        //         tickerPrice[message.product_id] = message.price;
        //     }
            
        //     this.setState({
        //         coinbaseData: message,
        //         tickerPrices: { ...this.state.tickerPrices, ...tickerPrice}
        //     });
        // };

        // this.socket.onclose = event => {
        //     if (event.wasClean) {
        //       console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        //     } else {
        //         // e.g. server process killed or network down
        //         // event.code is usually 1006 in this case
        //         console.log('[close] Connection died');
        //     }
        // };

        // this.socket.onerror = error => {
        //     console.log(`[error] ${error.message}`);
        // };
    }

    // componentWillUnmount = () => {
    //     this.socket.close(1000, "STOP")
    // }

    handleOnClick = () => {
        console.log("Attempting to stop")
        this.socket.close(1000, "STOP")
    }

    render() {
        let { tickerPrices } = this.state;
        let { theme, account } = this.props;
        let assets = account.assets;
        return (
            <div className="dashboard m-sm-30 ">
                <button onClick={this.handleOnClick}>STOP THE WEBSOCKET</button>
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <StatsCards balance={account.total.fiatValue.usd} changes={account.total.changes} theme={theme}/>

                        {tickerPrices!=={}? <AssetTableCard assets={assets} tickerPrices={tickerPrices}/>: <div>loading</div>}

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