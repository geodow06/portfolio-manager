import React from "react";
import { 
    Card, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody 
} from "@material-ui/core";

const AssetTableCard = () => {

    // TODO get portfolio assets from API
    const assetList = [
        { 
            name: "Bitcoin",
            balance: { 
                fiat: "$1.00",
                amount: "1.00 BTC"
            },
            allocation: "10"
        },
        { 
            name: "Stellar Lumens",
            balance: { 
                fiat: "$2.00",
                amount: "1.00 XLM"
            },
            allocation: "20"
        },
        { 
            name: "Gather",
            balance: { 
                fiat: "$7.00",
                amount: "1.00 GTH"
            },
            allocation: "70"
        },
        {
            name: "Chainlink",
            balance: {
                fiat: "$0.00",
                amount: "0.00 LINK"
            },
            allocation: "0"
        }
    ];

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
                        {assetList
                            .sort((a,b) => parseInt(b.allocation) - parseInt(a.allocation))
                                .map((asset, index) => 
                            <TableRow key={index}>
                                <TableCell colSpan={3}>{asset.name}</TableCell>
                                <TableCell colSpan={3}>
                                    <span>{asset.balance.fiat}</span>
                                    <span className="text-muted ml-12">{asset.balance.amount}</span>
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