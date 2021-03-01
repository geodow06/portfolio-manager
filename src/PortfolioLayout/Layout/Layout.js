import AppContext from "appContext";
import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { connect } from "react-redux";

class Layout extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {({ routes }) => 
                    <div>
                        <div>{renderRoutes(routes)}</div>
                    </div>
                }
            </AppContext.Consumer>
        );
    }
}

export default connect()(Layout);