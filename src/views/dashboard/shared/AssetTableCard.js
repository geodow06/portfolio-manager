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
    return(
        <Card elevation={6} className="px-24 pt-20 py-16 mb-24">
            <div className="card-title ml-12">Your Assets</div>
            <div>
                <Table>
                    <TableHead>
                        <TableCell>Asset</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Allocation</TableCell>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>asset name</TableCell>
                            <TableCell>balance value</TableCell>
                            <TableCell>allocation percentage</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default AssetTableCard;