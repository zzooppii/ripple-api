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
    let transactions = await api.getAccountInfo('rDPaopXbNASxTSDGTj4z15D1dUuxnEfkyQ'); 
    console.log(transactions); 
    return true; 
    }).then(() => { 
        return api.disconnect(); 
    }).catch(console.error);

