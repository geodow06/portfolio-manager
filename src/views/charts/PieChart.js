import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = ({chartName, data}) => {

    const option = {
        series: [
            {
                name: chartName,
                type: "pie",
                data: data
            }
        ]
    }

    return (
        <ReactEcharts 
            style={{ height: "300px" }}
            option={option}
        />
    );
}

export default PieChart;