import React, { Component } from "react";
import { Icon, MuiThemeProvider, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { MenuItem } from "@material-ui/core";
import userImage from "assets/images/rogers.jpg";
import { logout } from "redux/actions/AuthActions";
import GeodowMenu from "geodow/components/GeodowMenu";

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.primary.main
    }
});

class Topbar extends Component {
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
                            {/* TODO styling */}
                            <div>{this.props.user.username}</div>         
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
                                        onClick={() => this.props.logout()}
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
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.layout.settings,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default withStyles(styles, { withTheme: true })(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(Topbar)
    )
);