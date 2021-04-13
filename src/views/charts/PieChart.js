import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";
import { ECHART_DEFAULT_COLOR_PALETTE }  from "constants.js";

const PieChart = ({data, theme, usePreferredColors=true, customRadius=["100%"], customLabel}) => {
    
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
            // position:"inside",
            position: function (pos, params, dom, rect, size) {
                // Tooltip will move to closest corner of chart
                let position = {
                    ...(pos[0] > size.viewSize[0] / 2 ? { right: 5 } : { left: 5 }),
                    ...(pos[1] < size.viewSize[1] / 2 ? { top: 20 } : { bottom: 5 })
                };
                return position
                // return position;
            },
            formatter: "{b}: ({d}%)"
        },
        series: [
            {
                type: "pie",
                radius: customRadius,
                center: ["50%", "50%"],
                color: colorPalette,
                data: removeEmptyData(),
                avoidLabelOverlap: true,
                labelLine: {
                    normal: {
                      show: false
                    }
                },
                label : customLabel,
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