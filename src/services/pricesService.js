import CoinbaseWebSocket from "utils/CoinbaseWebSocket";

class PricesService {

    print = () => {
        console.log("hello")
    }
    
    // Open Websocket to get live coinbase data
    getLiveCoinbaseTickerData = async (productIds = null) => {
        const connection = new CoinbaseWebSocket("ticker", productIds)
        connection.connect();
        
        // while (!connection.isOpen() || connection.connectionFailed()) {

        // }
        setTimeout(() => this.logPrices(connection), 1000);
       

        connection.close();
    }

    logPrices = async (connection) => {
        
        while (connection.tickerPrices.length < 2 && !connection.connectionFailed()) {
            console.log(connection.getTickerPrices());
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