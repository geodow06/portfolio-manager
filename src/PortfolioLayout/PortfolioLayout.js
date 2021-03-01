import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "appContext";
import { GeodowLoadable } from "geodow";

class PortfolioLayout extends Component {
    constructor(props, context) {
        super(props);
        this.appContext = context;
    }

    render() {
        const Layout = GeodowLoadable({
            loader: () => import("./Layout/Layout")
          });
        return <Layout {...this.props}/>
    }
}

PortfolioLayout.contextType = AppContext;

export default withRouter(
    connect()(PortfolioLayout)
)