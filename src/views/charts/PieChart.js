import React from "react";
import ReactEcharts from "echarts-for-react";

const PieChart = ({chartName, data}) => {

    const removeEmptyData = () => {
        let filteredArray = data.filter((object) => {
            return object.value !== "0"
        })

        return filteredArray;
    }

    
    const option = {
        series: [
            {
                name: chartName,
                type: "pie",
                data: removeEmptyData()
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