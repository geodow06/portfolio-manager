import localStorageService from "./localStorageService";

class AccountService {
    
    // Mock account data response
    account = {
        total:{
            fiatValue: {usd:"1,320,091"},
            changes: {
                availableOptions: ["day", "hour"],
                day:{timeFrame: "24h", text: "24 Hour Change", percentage: "+30", fiatValue: "+103"},
                hour:{timeFrame: "1h", text: "One Hour Change", percentage: "-1", fiatValue: "-3"}
            },
            numberOfOwnedAssets: "3"
        },
        assets: [
            { 
                name: "Bitcoin",
                ticker: "BTC",
                balance: { 
                    fiat: "$1.00",
                    amount: "2.00"
                },
                allocation: "10",
                color: "#F2A900"
            },
            { 
                name: "Stellar Lumens",
                ticker: "XLM",
                balance: { 
                    fiat: "$2.00",
                    amount: "2.00"
                },
                allocation: "20",
                color: "#2a2a2a"
            },
            { 
                name: "Gather",
                ticker: "GTH",
                balance: { 
                    fiat: "$7.00",
                    amount: "7.00"
                },
                allocation: "70",
                color: "#6610f2"
            },
            {
                name: "Chainlink",
                ticker: "LINK",
                balance: {
                    fiat: "$0.00",
                    amount: "0.00"
                },
                allocation: "0",
                color: "#007bff"
            }
        ]
    };

    getAccountData = () => {
        let sessionData = localStorageService.getItem("data");
        
        // TODO - add API call
        return sessionData ? sessionData : this.account
    };

    getCoinbaseProductIds = () => {
        // Filter for empty values
        // Then map each non zero asset to coinbase friendly ticker
        // TODO Based on user preferred currency
        const productIds = this.account.assets.filter((asset) => {
            return parseFloat(asset.balance.amount);
        }).map((asset) => {
            return `${asset.ticker}-USD`;
        })
        return productIds;
    }

    // Set Session Account Data in local storage to persist through refresh 
    setSessionAccountData = data => {
        localStorageService.setItem("data", data);
    };

    // Remove Session Account Data from local storage
    removeSessionAccountData = () => {
        localStorage.removeItem("data")
    };
}

export default new AccountService();