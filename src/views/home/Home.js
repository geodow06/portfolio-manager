import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increase, decrease } from "redux/actions/count"
import { logoutUser } from "redux/actions/UserActions";
import React, { Component } from 'react'

class Home extends Component {

    render() {
        console.log(this.props.login.success)
        return (
            <div>
                Welcome home
                <div>
                    Some state changes:
                    { this.props.number }
                    { this.props.user.token }
                    <button onClick={() => this.props.increase(1)}>Increase</button>
                    <button onClick={() => this.props.decrease(1)}>Decrease</button>
                    <button onClick={() => this.props.logoutUser()}>Log out</button>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
    login: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    number: state.count.number,
    login: state.login,
    user: state.user
});

export default connect(mapStateToProps, {increase, decrease, logoutUser})(Home);