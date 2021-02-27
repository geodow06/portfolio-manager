import { increase, decrease } from "redux/actions/count";
import { connect } from "react-redux";

function Home({ number, increase, decrease }){
    return(
        <div>
            Welcome home
            <div>
            Some state changes:
            {number}
            <button onClick={() => increase(1)}>Increase</button>
            <button onClick={() => decrease(1)}>Decrease</button>
            </div>
        </div>
    );
}

export default connect(
    state => ({ number: state.count.number }),
    { increase, decrease }
  )(Home)