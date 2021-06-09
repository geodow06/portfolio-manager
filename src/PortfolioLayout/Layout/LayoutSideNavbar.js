import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { 
    MuiThemeProvider,
    withStyles,
    MenuItem, 
    Icon,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SideNav from "portfolioLayout/SharedComponents/SideNav";
import SideNavTheme from "portfolioLayout/Theme/SideNavTheme";
import { setLayoutSettings } from "redux/actions/LayoutActions";
import { clearSession } from "redux/actions/SessionActions";
import Brand from "portfolioLayout/SharedComponents/Brand";
import GeodowMenu from "geodow/components/GeodowMenu";

const styles = theme => ({});

class LayoutSideNavbar extends Component {
    render() {
        let { theme, settings } = this.props;
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
                                <GeodowMenu> 
                                    <MenuItem 
                                        onClick={() => this.props.clearSession()}
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
                                </GeodowMenu>
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
    clearSession: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.layout.settings
});

const mapDispatchToProps = dispatch => ({
    setLayoutSettings: () => dispatch(setLayoutSettings()),
    clearSession: () => dispatch(clearSession()),
})

export default withStyles(styles, {withTheme: true})(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(LayoutSideNavbar)
        )
    );