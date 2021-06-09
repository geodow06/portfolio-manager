import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Scrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { navigations } from "navigations";
import GeodowVerticalNav from "geodow/components/geodowVerticalNav/GeodowVerticalNav";
import { setLayoutSettings } from "redux/actions/LayoutActions";

class Sidenav extends Component {
    state = {};

    updateSidebarMode = sideNavbarSettings => {
        let { settings, setLayoutSettings } = this.props;

        setLayoutSettings({
          ...settings,
          ...sideNavbarSettings
        });
      };
    
    renderClose = () => (
        <div
            onClick={() => this.updateSidebarMode({ mode: "close" })}
            className="sidenav__overlay"
        />
    );

    render() {
        return(
            <Fragment >
                <Scrollbar option={{suppressScrollX: true}} className="scrollable position-relative">
                    {this.props.children}
                    <GeodowVerticalNav navigation={navigations}/>
                </Scrollbar>
                {this.renderClose()}
            </Fragment>
        );
    }
}

Sidenav.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withRouter(
    connect(
        mapStateToProps,
        { setLayoutSettings }
    )(Sidenav)
);