import CoinbaseWebSocket from "utils/CoinbaseWebSocket";

class PricesService {

    constructor() {
        this.coinbaseConnection = null
    }
    
    // Open Websocket to get live coinbase data
    getLiveCoinbaseTickerData = (productIds = null) => {
        this.coinbaseConnection = new CoinbaseWebSocket("ticker", productIds)
        this.coinbaseConnection.connect();
        
        // while (!connection.isOpen() || connection.connectionFailed()) {

        // }
        // setTimeout(() => this.logPrices(connection), 1000);
       

        
    }

    logPrices = async (connection) => {
        
        while (this.coinbaseConnection.tickerPrices.length < 2 && !this.coinbaseConnection.connectionFailed()) {
            console.log(this.coinbaseConnection.getTickerPrices());
            this.coinbaseConnection.close();
        }
    }

    getAccountAssetPrices = accountData => {
        
        const productIds = [ "BTC-USD","LINK-USD","XLM-USD", "GTH-USD"];
        accountData.assets
                        .map((asset) => {
                            return productIds.push(`${asset.ticker}-USD`)
        })
    }
}

export default new PricesService();