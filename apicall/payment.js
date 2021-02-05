const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' })

api.connect().then(() => {
    /* begin custom code ------------------------------------ */
    async function payment() {
        let transcation = await api.preparePayment('rfct6fDdS9mjERh7n3byyyo9ysLDxjaAUm', {
            "source": {
                "address": "rnGaFYk3iYsnfpCXedmXgJvThhFrXpLjYc", //출발지 주소 
                //"tag" : unsigned 32bit integer, 
                "maxAmount": {
                    "value": "1", 
                    "currency": "XRP" 
                }
            },
            "destination": {
                "address": "rDPaopXbNASxTSDGTj4z15D1dUuxnEfkyQ", //도착지 주소
                "tag": 959782689, //destination tag 
                "amount": { "value": "1", "currency": "XRP" }
            }
        });
        
        console.log(transaction)
        return transcation
    }
    let abc = payment()
    console.log(abc)

}).then(info => {
    console.log(info);
    console.log('getAccountInfo done');

    /* end custom code -------------------------------------- */
}).then(() => {
    return api.disconnect();
}).then(() => {
    console.log('done and disconnected.');
}).catch(console.error);