import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";

class NotFound extends Component {
  
  render() {
    return (
      <div className="flex flex-center flex-middle w-100 h-100vh">
        <div className="flex flex-column flex-center flex-middle" style={{ maxWidth: "320px" }}>
          Page not found
          <Button
            className="capitalize"
            variant="contained"
            color="primary"
            onClick={() => this.props.pushTo({pathname: "/"})}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  pushTo: PropTypes.func.isRequired
};

const mapDispatchToProp = dispatch => ({
  pushTo: url => dispatch(push(url)),
});

export default withRouter(connect(null,mapDispatchToProp)(NotFound));