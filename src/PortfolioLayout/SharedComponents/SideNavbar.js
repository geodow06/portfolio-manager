import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const styles = theme => ({});

class SideNavbar extends Component {


    render() {
        return(
            <div>Navbar</div>
        );
    }
}

SideNavbar.propTypes = {
    settings: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.layout.settings
});

export default withStyles(styles, {withTheme: true})(
        withRouter(connect(mapStateToProps)(SideNavbar))
);