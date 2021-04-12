import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";
import { ECHART_DEFAULT_COLOR_PALETTE }  from "constants.js";

const PieChart = ({chartName, data, theme, usePreferredColors=true}) => {
    
    const removeEmptyData = () => {
        let filteredArray = data.filter((object) => {
            return object.value !== "0"
        })

        return filteredArray;
    }

    const assignColors = () => {
        // If object has a preferred color add to color array 
        // else assign color from default palette
        return data.map((object) => {
            return object.color ? object.color : assignFromDefaultPalette()
        })
    }

    let i = 0;
    const assignFromDefaultPalette = () => {
        // Iterate through palette to reduce liklehood of adjacent colors
        i++;
        return ECHART_DEFAULT_COLOR_PALETTE[i%9];
    }

    const colorPalette = usePreferredColors ? assignColors() : ECHART_DEFAULT_COLOR_PALETTE

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
                color: colorPalette,
                data: removeEmptyData(),
                labelLine: {
                    normal: {
                      show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                      shadowBlur: 5,
                      shadowOffsetX: 2,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    }

    return (
        <ReactEcharts className="pie-chart"
            option={option}
        />
    );
}

export default withStyles({}, { withTheme: true })(PieChart);