import React from "react";
import {  withStyles, Button, MuiThemeProvider } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const Footer = ({ theme, settings }) => {
    const footerTheme = settings.themes[settings.footer.theme] || theme;
    return (
        <MuiThemeProvider theme={footerTheme}>
            <Helmet>
                <style>
                    {`
                        .footer {
                            background: ${footerTheme.palette.primary.main};
                            color: ${footerTheme.palette.primary.contrastText};
                        }
                    `}
                </style>
            </Helmet>
            <div className="footer flex flex-middle">
                <div className="flex flex-middle container px-sm-30 w-100">
                    <a href="https://github.com/geodow06/portfolio-manager">
                        <Button variant="contained" color="error">Github Repo</Button>
                    </a>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

Footer.propTypes = {
    settings: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
    connect(
      mapStateToProps
    )(Footer)
);