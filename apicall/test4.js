const RippleAPI = require('ripple-lib').RippleAPI; const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net:51233' // Public rippled server hosted by Ripple, Inc. 
});

api.on('error', (errorCode, errorMessage) => {
    console.log(errorCode + ': ' + errorMessage);
});
api.on('connected', () => {
    console.log('connected');
});
api.on('disconnected', (code) => {
    // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server 
    // will be 1000 if this was normal closure 
    console.log('disconnected, code:', code);
    process.exit(0);
});
api.connect().then(async () => {
    /* insert code here */
    let transaction = await api.preparePayment('rpmiqQSzDdsgJVexZkunYcxswBLCQBahgj', {
        "source": {
            "address": "rpmiqQSzDdsgJVexZkunYcxswBLCQBahgj", //출발지 주소 
            //"tag" : unsigned 32bit integer, 
            "maxAmount": {
                "value": "900",
                "currency": "XRP"
            }
        },
        "destination": {
            "address": "rDPaopXbNASxTSDGTj4z15D1dUuxnEfkyQ", //도착지 주소
            "tag": 122282491, //destination tag 
            "amount": { "value": "900", "currency": "XRP" }
        }
    });
    console.log(transaction);
    let signedTransaction = api.sign(transaction.txJSON, 'snqWiBbRbGwB1ze59b3TGefQhnhaF');
    console.log(signedTransaction);
    let submitResult = await api.submit(signedTransaction.signedTransaction);
    console.log(submitResult)
    return true;
}).then(() => {
    return api.disconnect();
}).catch(console.error);
