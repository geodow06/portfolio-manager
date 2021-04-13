import React from "react";
import PieChart from "views/charts/PieChart";
import { Card } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const BreakdownChartCard = ({account, theme, usePreferredColors}) => {
    
    const generateChartData = ({assets}) => {

      const allocationData = assets.map(asset => {
          let label = createLabel(asset)
          return { name:asset.ticker, value: asset.allocation, color: asset.color, label:label }
      });

      return allocationData;
    };

    const createLabel = (asset) => {
      return {
        normal: {
          show:true,
          position:"center",
          textStyle: {
            fontSize: "14",
            fontWeight: "normal"
          },
          formatter: `Total balance\n\n$${account.total.fiatValue.usd}\n\n${account.total.numberOfOwnedAssets} Assets`
        },
        emphasis: {
          show: true,
          // TODO
          // Workaround to allow balance to show in normal state
          // whilst not showing in emphasis state
          backgroundColor:"white",
          textStyle: {
            fontSize: "15",
            fontWeight: "normal"
          },
          formatter: `${asset.name}\n\nAmount: ${asset.balance.amount}\n\nValue: ${asset.balance.fiat}`
        }
      };
    };

    return (
      <Card elevation={6} className="px-24 py-16 mb-16">
        <div className="card-title">Breakdown</div>
        <PieChart 
            chartName={"Breakdown"} 
            data={generateChartData(account)}
            theme={theme}
            customRadius={["75%","90%"]}
            usePreferredColors={true}
        />
      </Card>
    );
}

export default withStyles({}, { withTheme: true })(BreakdownChartCard);