class CoinbaseWebSocket {
        // Open Websocket to get live coinbase data
        constructor(channel, productIds) {
            this.socket = new WebSocket("wss://ws-feed.pro.coinbase.com");
            this.productIds = productIds;
            this.channel = channel;
            this.tickerPrices = {};
            this.isConnected= false;
        }

        isConnected = () => {
            return this.isConnected;
        }

        getTickerPrices = () => {
            return this.tickerPrices;
        }

        connect = () => {
            console.log("Connecting...")
            const subscribe = {
                type: "subscribe",
                "channels": [{ name: this.channel, product_ids: this.productIds }]
            };

            

            this.socket.onopen = e => {
                console.log("[open] Connection established with Coinbase");
                this.isConnected = true;
                console.log("Sending subscribe message to Coinbase server");
                this.socket.send(JSON.stringify(subscribe));
            };
    
            this.socket.onmessage = event => {
                // console.log(`[message] Data received from server: ${event.data}`);
                const message = JSON.parse(event.data);
                let tickerPrice = {};
                if (message.price) {
                    tickerPrice[message.product_id] = message.price;
                }
                
                this.setTickerPrices(tickerPrice);
            };
    
            this.socket.onclose = event => {
                if (event.wasClean) {
                    console.log(
                        `[close] Connection with Coinbase closed cleanly,
                            code=${event.code} reason=${event.reason}`
                    );
                } else {
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    console.log('[close] Connection with Coinbase died');
                }
            };
    
            this.socket.onerror = error => {
                console.log(`[error] ${error.message}`);
                this.isConnected = false;
            };
        }
        
        setTickerPrices = ( tickerPrice = {} ) => {
            this.tickerPrices = {
                ...this.tickerPrices,
                ...tickerPrice
            }
        }

        close = () => {
            this.socket.close(1000, "Close connection request");
        }
}

export default CoinbaseWebSocket;