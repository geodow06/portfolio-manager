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
            balance: "$1.00 1 BTC",
            allocation: "10%"
        },
        { 
            name: "Stellar Lumens",
            balance: "$2.00 1 XLM",
            allocation: "20%"
        },
        { 
            name: "Gather",
            balance: "$7 1 GTH",
            allocation: "70%"
        },
    ];

    return(
        <Card elevation={6} className="px-24 pt-20 py-16 mb-24">
            <div className="card-title ml-12">Your Assets</div>
            <div>
                <Table className="asset-table">
                    <TableHead>
                        <TableCell colSpan={3}>Asset</TableCell>
                        <TableCell colSpan={3}>Balance</TableCell>
                        <TableCell colSpan={1}>Allocation</TableCell>
                    </TableHead>
                    <TableBody>
                        {assetList.map((asset, index) => 
                            <TableRow key={index}>
                                <TableCell colSpan={3}>{asset.name}</TableCell>
                                <TableCell colSpan={3}>{asset.balance}</TableCell>
                                <TableCell colSpan={1}>{asset.allocation}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default AssetTableCard;