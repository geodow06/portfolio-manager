import React, { Component } from "react";
import { Icon, MuiThemeProvider, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";
import userImage from "assets/images/rogers.jpg";
import { logoutUser } from "redux/actions/UserActions";

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

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({anchorEl: event.currentTarget, open: Boolean(event.currentTarget)});
    }
    
    handleClose(event) {
        this.setState({anchorEl: event.currentTarget, open: false});
    }

    render() {
        let { theme, settings, className } = this.props;
        let { anchorEl, open } = this.state;
        const topbarTheme = settings.themes[settings.topbar.theme] || theme;
        return(
            <MuiThemeProvider theme={topbarTheme}>
                <div className="topbar">
                    <div
                        className={`topbar-hold ${className}`}
                        style={Object.assign({}, { backgroundColor: topbarTheme.palette.primary.main })}>
                        <div className="flex flex-space-between flex-middle h-100">                 
                            <div className="flex flex-middle">
                                <div
                                style={{ display: "inline-block" }}
                                aria-owns={anchorEl ? "simple-menu" : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                >
                                    <img
                                        className="mx-8 text-middle circular-image-small cursor-pointer"
                                        src={userImage}
                                        alt="user"
                                    />
                                </div>
                                <Menu 
                                    elevation={8}
                                    getContentAnchorEl={null}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={this.handleClose}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left"
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left"
                                    }}>
                                            
                                       
                                    <MenuItem 
                                        onClick={() => this.props.logoutUser()}
                                        className="flex flex-middle"
                                        style={{ minWidth: 185 }}>
                                            <Icon> power_settings_new </Icon>
                                            <span className="pl-16"> Logout </span>
                                    </MenuItem>
                                </Menu>
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