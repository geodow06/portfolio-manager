import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";

const PieChart = ({chartName, data, theme}) => {

    const removeEmptyData = () => {
        let filteredArray = data.filter((object) => {
            return object.value !== "0"
        })

        return filteredArray;
    }

    
    const option = {
        tooltip: {
            show: true,
            trigger: "item",
            formatter: "{b}: ({d}%)"
        },
        series: [
            {
                name: chartName,
                type: "pie",
                data: removeEmptyData(),
                labelLine: {
                    normal: {
                      show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    }

    return (
        <ReactEcharts 
            style={{ height: "200px" }}
            option={option}
        />
    );
}

export default withStyles({}, { withTheme: true })(PieChart);