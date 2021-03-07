import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { matchRoutes } from "react-router-config";
import AppContext from "appContext";
import {
    setLayoutSettings,
    setDefaultSettings
} from "redux/actions/LayoutActions";
import { isEqual, merge } from "lodash";
import { GeodowLoadable } from "geodow";

class PortfolioLayout extends Component {
    constructor(props, context) {
        super(props);
        this.appContext = context;

        this.updateSettingsFromRouter();
    }

    // If path changes update settings based on new pathname
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
          this.updateSettingsFromRouter();
        }
    }

    // Update layout settings in redux state based on pathname
    updateSettingsFromRouter() {
        const { routes } = this.appContext;
        const matched = matchRoutes(routes, this.props.location.pathname)[0];
        let { defaultSettings, settings, setLayoutSettings } = this.props;
    
        if (matched && matched.route.settings) {
          // ROUTE HAS SETTINGS
          const updatedSettings = merge({}, settings, matched.route.settings);
          if (!isEqual(settings, updatedSettings)) {
            setLayoutSettings(updatedSettings);
          }
        } else if (!isEqual(settings, defaultSettings)) {
          setLayoutSettings(defaultSettings);
        }
      }

    render() {
        const Layout = GeodowLoadable({
            loader: () => import("./Layout/Layout")
        });
        
        return <Layout {...this.props}/>
    }
}

const mapStateToProps = state => ({
    setLayoutSettings: PropTypes.func.isRequired,
    setDefaultSettings: PropTypes.func.isRequired,
    settings: state.layout.settings,
    defaultSettings: state.layout.defaultSettings
});

PortfolioLayout.contextType = AppContext;

export default withRouter(
    connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(PortfolioLayout)
)