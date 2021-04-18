import React from "react";
import { 
    Card, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody 
} from "@material-ui/core";

const AssetTableCard = (props) => {
    let { assets, tickerPrices } = props;
    return(
        <Card elevation={6} className="pt-20 mb-24">
            <div className="card-title px-24 ml-12">Your Assets</div>
            <div>
                <Table className="asset-table">
                    <TableHead>
                        <TableCell className="px-24" colSpan={3}>Asset</TableCell>
                        <TableCell colSpan={3}>Balance</TableCell>
                        <TableCell className="px-24" align="right" colSpan={1}>Allocation</TableCell>
                    </TableHead>
                    <TableBody>
                        {assets
                            .sort((a,b) => parseInt(b.allocation) - parseInt(a.allocation))
                                .map((asset, index) => 
                            <TableRow key={index}>
                                <TableCell colSpan={3}>{asset.name}</TableCell>
                                <TableCell colSpan={3}>
                                    {tickerPrices[`${asset.ticker}-USD`]
                                        ? <span>{asset.balance.amount*tickerPrices[`${asset.ticker}-USD`]}</span>
                                        : <span>Price not available</span>
                                    }
                                    <span className="text-muted ml-12">{asset.balance.amount} {asset.ticker}</span>
                                </TableCell>
                                <TableCell className="px-24" align="right" colSpan={1}>{asset.allocation}%</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default AssetTableCard;