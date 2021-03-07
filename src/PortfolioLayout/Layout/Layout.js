import AppContext from "appContext";
import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { classList } from "utils";
import { PropTypes } from "prop-types";
import Scrollbar from "react-perfect-scrollbar";

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

        return (
            <AppContext.Consumer>
                {({ routes }) => (
                    <div className={classList(layoutClasses)}>
                        <div className="content-wrap position-relative">
                            <Scrollbar className="scrollable-content">
                                <div className="content">{renderRoutes(routes)}</div>
                                <div className="my-auto" />
                            </Scrollbar>
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