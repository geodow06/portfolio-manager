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
import SideNavbar from "PortfolioLayout/SharedComponents/SideNavbar";

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
            [`${settings.activeLayout} theme-${theme.palette.type} flex`]: true,
            "topbar-fixed": settings.topbar.fixed
        };
        return (
            <AppContext.Consumer>
                {({ routes }) => (
                    <div className={classList(layoutClasses)}>
                        {settings.sideNavbar.show && <SideNavbar/>}

                        <div className="content-wrap position-relative">
                            {/* Allow optional stationairy fixed topbar when page scrollable */}
                            {settings.topbar.show && settings.topbar.fixed && (
                                <Topbar className="elevation-z8"/>
                            )}
                            
                            
                            <Scrollbar className="scrollable-content">
                                { settings.topbar.show && !settings.topbar.fixed && <Topbar/> }
                                <div className="content">{renderRoutes(routes)}</div>
                                <div className="my-auto" />
                                { settings.footer.show && !settings.footer.fixed && <Footer/> }
                            </Scrollbar>
                            
                            {/* Allow optional stationairy fixed topbar when page scrollable */}
                            {settings.footer.show && settings.footer.fixed && <Footer />}
                        </div>
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