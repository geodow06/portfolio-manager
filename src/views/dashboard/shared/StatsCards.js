import React from "react";
import { Grid, Card } from "@material-ui/core";

const StatsCards = ({theme}) => {
    return (
        <Grid container spacing={3} className="mb-24">
            <Grid item xs={12} md={6}>
                <Card className="stats-card p-sm-24 bg-paper" elevation={6}>
                    <div className="card-title ml-12">
                        Portfolio Balance
                    </div>
                    <div>
                        amount
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
            <Card className="stats-card p-sm-24 bg-paper" elevation={6}>
                <div className="card-title ml-12">
                    24 Hour Change
                </div>
                <div>
                    amount
                </div>
                </Card>
            </Grid>
        </Grid>
      
    );
};

export default StatsCards;