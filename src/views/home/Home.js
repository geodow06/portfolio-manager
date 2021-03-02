import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increase, decrease } from "redux/actions/count"
import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div>
                Welcome home
                <div>
                    Some state changes:
                    { this.props.number }
                    <button onClick={() => this.props.increase(1)}>Increase</button>
                    <button onClick={() => this.props.decrease(1)}>Decrease</button>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    number: state.count.number
});

export default connect(mapStateToProps, {increase, decrease})(Home);