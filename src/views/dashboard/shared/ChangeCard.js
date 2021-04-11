import React, { Component } from "react";
import { Card } from "@material-ui/core";

class ChangeCard extends Component {
    render() {
        return(
            <Card className="stats-card p-sm-24 bg-paper" elevation={6}>
                <div className="card-title ml-12">
                    24 Hour Change
                </div>
                <div className={this.props.change.day.percentage > 0 ? "change-green" : "change-red"}>
                    {this.props.change.day.percentage}%
                </div>
            </Card>
        );
    }
}

export default ChangeCard;