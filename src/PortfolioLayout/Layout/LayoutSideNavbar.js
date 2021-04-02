import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { 
    MuiThemeProvider,
    withStyles, 
    Menu, 
    MenuItem, 
    Icon,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SideNav from "PortfolioLayout/SharedComponents/SideNav";
import SideNavTheme from "PortfolioLayout/Theme/SideNavTheme";
import { setLayoutSettings, setDefaultSettings } from "redux/actions/LayoutActions";
import { logoutUser } from "redux/actions/UserActions";
import Brand from "PortfolioLayout/SharedComponents/Brand";

const styles = theme => ({});

class LayoutSideNavbar extends Component {
    // TODO extract Menu to seperate component
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({anchorEl: event.currentTarget, open: Boolean(event.currentTarget)});
    }
    
    render() {
        let { theme, settings } = this.props;
        let { anchorEl, open } = this.state;
        const sideNavTheme = 
            settings.themes[settings.sideNavbar.theme] || theme;
        return(
            <MuiThemeProvider theme={sideNavTheme} >
                <SideNavTheme theme={sideNavTheme} settings={settings}/>
                <div className="sidenav">
                    <div className="sidenav__hold">
                        {(<Fragment>
                            <Brand />
                            <div className="mt-12"></div>
                            <SideNav >
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
                                    <MenuItem className="flex flex-middle" style={{ minWidth: 185 }}>
                                        <Icon> home </Icon>
                                        <span className="pl-16"> Home </span>
                                    </MenuItem>
                                    <MenuItem className="flex flex-middle" style={{ minWidth: 185 }}>
                                        <Icon> settings </Icon>
                                        <span className="pl-16"> Account Setting </span>
                                    </MenuItem>
                                </Menu>
                            </SideNav>
                        </Fragment>)}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

LayoutSideNavbar.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    setDefaultSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withStyles(styles, {withTheme: true})(
    withRouter(
        connect(mapStateToProps, { 
        setLayoutSettings, setDefaultSettings, logoutUser
    })(LayoutSideNavbar))
);