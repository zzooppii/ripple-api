const RippleAPI = require('ripple-lib').RippleAPI;

// const api = new RippleAPI({
//     server: 'wss://s1.ripple.com' // Public rippled server
// });
const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' })

api.connect().then(() => {
    /* begin custom code ------------------------------------ */
    // const myAddress = 'rDPaopXbNASxTSDGTj4z15D1dUuxnEfkyQ';
    const myAddress = 'rnGaFYk3iYsnfpCXedmXgJvThhFrXpLjYc';

    console.log('getting account info for', myAddress);
    return api.getAccountInfo(myAddress);

}).then(info => {
    console.log(info);
    console.log('getAccountInfo done');

    /* end custom code -------------------------------------- */
}).then(() => {
    return api.disconnect();
}).then(() => {
    console.log('done and disconnected.');
}).catch(console.error);