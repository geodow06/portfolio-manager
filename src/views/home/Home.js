import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increase, decrease } from "redux/actions/countActions"
import { logoutUser } from "redux/actions/UserActions";
import React, { Component } from 'react';

class Home extends Component {

    render() {
        return (
            <div>
                Welcome home
                <div>
                    Some state changes:
                    { this.props.count }
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
    count: PropTypes.number.isRequired,
    login: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    count: state.count.number,
    login: state.login,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    increase: (number) => dispatch(increase(number)),
    decrease: (number) => dispatch(decrease(number)),
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);