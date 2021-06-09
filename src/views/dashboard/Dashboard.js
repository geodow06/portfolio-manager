import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withStyles, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import BreakdownChartCard from "./shared/BreakdownChartCard";
import StatsCards from "./shared/StatsCards";
import CoinbaseWebSocket from "websocket/CoinbaseWebSocket";
import { setPrices } from "redux/actions/PriceActions";
import accountDataService from "services/accountDataService";
import GeodowLoadable from "geodow/components/geodowLoadable/GeodowLoadable";
class Dashboard extends Component {

    socket = {};

    componentDidMount = () => {
        // Get coinbase coin-currency productIds to subscribe to websocket
        const productIds = accountDataService.getCoinbaseProductIds();
        this.socket  = new CoinbaseWebSocket("ticker", productIds);
        this.socket.connect();
        // Storing snapshots of websocket to redux,
        // as opposed to having websocket reponse saved to component state,
        // makes it easier to control component updates by adding interval
        // to the redux action call
        this.interval = setInterval(() => this.props.setPrices(this.socket.getTickerPrices()), 1000);
    }

    // TODO - interval causing re-rendering even when no price data

    componentWillUnmount = () => {
        // Teardown - close websocket and clear interval on component unmount
        this.socket.close();
        clearInterval(this.interval);
    }

    render() {
        let { theme, price } = this.props;
        // TODO account total undefined when leaving and returning to page
        let account = accountDataService.getAccountData()
        const AssetTableCard = GeodowLoadable({
            loader: () => import("./shared/AssetTableCard")
        });
        
        return (
            <div className="dashboard m-sm-30 ">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <StatsCards balance={account.total.fiatValue.usd} changes={account.total.changes} theme={theme}/>

                        <AssetTableCard assets={account.assets} tickerPrices={price.prices}/>

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
    account: PropTypes.object.isRequired,
    setPrices: PropTypes.func.isRequired,
    price: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    account: state.account,
    price: state.price
});

const mapDispatchToProps = dispatch => ({
    setPrices: (prices) => dispatch(setPrices(prices))
});

export default withStyles({}, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard)));