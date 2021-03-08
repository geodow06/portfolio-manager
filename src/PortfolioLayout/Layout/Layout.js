import AppContext from "appContext";
import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { classList } from "utils";
import { PropTypes } from "prop-types";
import Scrollbar from "react-perfect-scrollbar";
import Footer from "PortfolioLayout/SharedComponents/Footer";
import Topbar from "PortfolioLayout/SharedComponents/Topbar";

const styles = theme => {
    return {
        layout: {
            backgroundColor: theme.palette.background.default
        }
    };
};

class Layout extends Component {
    render() {
        let { settings, classes, theme } = this.props;
        
        let layoutClasses = {
            [classes.layout]: true,
            [`${settings.activeLayout} theme-${theme.palette.type} flex`]: true
        };
        console.log(settings.topbar)
        return (
            <AppContext.Consumer>
                {({ routes }) => (
                    <div className={classList(layoutClasses)}>
                        <Scrollbar className="content-wrap position-relative">
                            <div className="scrollable-content">
                                { settings.topbar.show && <Topbar/> }
                                <div className="content">{renderRoutes(routes)}</div>
                                <div className="my-auto" />
                                { settings.footer.show && <Footer/> }
                            </div>
                        </Scrollbar>
                    </div>
                )}
            </AppContext.Consumer>
        );
    }
}

Layout.propTypes = {
    settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps)(Layout)
);