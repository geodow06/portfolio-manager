import Loadable from "react-loadable";
import Loading from "./Loading";

const GeodowLoadable = opts => {
    return Loadable(
      Object.assign(
        {
          loading: Loading,
          delay: 100,
          timeout: 1000
        },
        opts
      )
    );
  };

  export default GeodowLoadable;