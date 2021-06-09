import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { initAuthFromCallbackURI } from "redux/actions/AuthActions";

function mapStateToProps (state) {
    return { auth: state.auth }
  }
  function mapDispatchToProps (dispatch) {
    return {
      initAuthFromCallbackURI: href => dispatch(initAuthFromCallbackURI(href))
    }
  }
  
  /**
    Callback route used after a successful Cognito sign-in. The window URL will contain the code we can
    use to get a Cognito session, which includes JWT tokens etc
   */
  class Callback extends Component {
    // If a Cognito auth code is in the URL (could be a hash or query component), init the new session
    componentDidMount () {
      if (this.props.location.hash || this.props.location.search) {
        console.log("callback")
        this.props.initAuthFromCallbackURI(window.location.href)
      }
    }
  
    render () {
      // If there's no auth code in the URL or we're now logged into, redirect to the root page
      if ((!this.props.location.hash && !this.props.location.search) || this.props.auth.isAuthenticated) {
        return <Redirect to="/" />
      }
      
  
      return (
        <div>
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Callback)