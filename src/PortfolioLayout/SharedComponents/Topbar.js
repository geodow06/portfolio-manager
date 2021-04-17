import React, { Component } from "react";
import { Icon, MuiThemeProvider, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { MenuItem } from "@material-ui/core";
import userImage from "assets/images/rogers.jpg";
import { logoutUser } from "redux/actions/UserActions";
import GeodowMenu from "geodow/components/GeodowMenu";

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.primary.main
    }
});

class Topbar extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false
        }
    }

    render() {
        let { theme, settings, className } = this.props;
        const topbarTheme = settings.themes[settings.topbar.theme] || theme;
        return(
            <MuiThemeProvider theme={topbarTheme}>
                <div className="topbar">
                    <div
                        className={`topbar-hold ${className}`}
                        style={Object.assign({}, { backgroundColor: topbarTheme.palette.primary.main })}>
                        <div className="flex flex-space-between flex-middle h-100">
                            <span className="m-auto"></span>             
                            <div className="flex flex-middle">
                                <GeodowMenu
                                    menuButton = {
                                        <img
                                            className="mx-8 text-middle circular-image-small cursor-pointer"
                                            src={userImage}
                                            alt="user"
                                        />
                                    }
                                >    
                                    <MenuItem 
                                        onClick={() => this.props.logoutUser()}
                                        className="flex flex-middle"
                                        style={{ minWidth: 185 }}>
                                            <Icon> power_settings_new </Icon>
                                            <span className="pl-16"> Logout </span>
                                    </MenuItem>
                                </GeodowMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

Topbar.propTypes = {
    settings: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    settings: state.layout.settings
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
})

export default withStyles(styles, { withTheme: true })(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(Topbar)
    )
);