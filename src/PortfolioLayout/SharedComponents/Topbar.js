import React, { Component } from "react";
import { MuiThemeProvider, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.primary.main
    }
});

class Topbar extends Component {
    
    render() {
        let { theme, settings } = this.props;
        const topbarTheme = settings.themes[settings.topbar.theme] || theme;
        return(
            <MuiThemeProvider theme={topbarTheme}>
                <div className="topbar">
                    Topbar here
                </div>
            </MuiThemeProvider>
        );
    }
}

Topbar.propTypes = {
    settings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
    withRouter(
        connect(mapStateToProps)(Topbar)
    )
);