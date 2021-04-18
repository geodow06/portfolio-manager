import React, { Component } from "react";
import { Card, Select, MenuItem } from "@material-ui/core";

class ChangeCard extends Component {

    constructor(props) {
        super(props);

        this.state= {
            selectedOption: "day"
        }
    }

    handleChange = (event) => {
        this.setState({selectedOption: event.target.value});
    };

    render() {

        const {changes} = this.props;
        const { selectedOption } = this.state;

        return(
            <Card className="stats-card p-sm-24 bg-paper" elevation={6}>
                <div className="card-title ml-12">
                    Porftolio Change
                </div>
                <div className="mx-auto"></div>
                <div className={changes[selectedOption].percentage > 0 ? "change-green" : "change-red"}>
                    {changes[selectedOption].percentage}%
                </div>
                <Select 
                    value={changes[selectedOption].timeFrame}
                    onChange={this.handleChange}
                >
                    {changes.availableOptions.map((option, index) => 
                        <MenuItem key={index} value={option}>{changes[option].timeFrame}</MenuItem>
                    )}
                </Select>
            </Card>
        );
    }
}

export default ChangeCard;