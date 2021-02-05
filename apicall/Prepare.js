const RippleAPI = require('ripple-lib').RippleAPI;

// const api = new RippleAPI({
//     server: 'wss://s1.ripple.com' // Public rippled server
// });
const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' })

api.connect().then(() => {
    /* begin custom code ------------------------------------ */
    async function doPrepare() {
        const sender = "rnGaFYk3iYsnfpCXedmXgJvThhFrXpLjYc"
        const preparedTx = await api.prepareTransaction({
            "TransactionType": "Payment",
            "Account": sender,
            "Amount": api.xrpToDrops("22"), // Same as "Amount": "22000000"
            "Destination": "rDPaopXbNASxTSDGTj4z15D1dUuxnEfkyQ"
        }, {
            // Expire this transaction if it doesn't execute within ~5 minutes:
            "maxLedgerVersionOffset": 75
        })
        const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion
        console.log("Prepared transaction instructions:", preparedTx.txJSON)
        console.log("Transaction cost:", preparedTx.instructions.fee, "XRP")
        console.log("Transaction expires after ledger:", maxLedgerVersion)
        return preparedTx.txJSON
    }
    txJSON = JSON.stringify(doPrepare())
    console.log(txJSON)
    return txJSON
}).then(info => {
    console.log(info);
    console.log('getAccountInfo done');

    /* end custom code -------------------------------------- */
}).then(() => {
    return api.disconnect();
}).then(() => {
    console.log('done and disconnected.');
}).catch(console.error);