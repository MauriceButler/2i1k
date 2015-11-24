var braintree = require('braintree'),
    gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: 'xxxxxx',
        publicKey: 'xxxxxxxx',
        privateKey: 'xxxxxxxxxxx'
    }),
    state = require('^state'),
    items = [
        null,
        '400.00',
        '5000.00',
        '400000.00'
    ];

function buy(key){
    gateway.transaction.sale(
        {
            amount: items[key],
            paymentMethodNonce: 'fake-valid-nonce',
            options: {
                submitForSettlement: true
            }
        },
        function(error, result) {
            if(error){
                return console.log(error);
            }

            if(result && result.success) {
                state['p' + (state.buyer + 1) + 'Score'] += parseInt(key) * 10;
                state.mode = 'play';
                state.transactionInfo = 'Transaction ID: ' + result.transaction.id;
                setTimeout(function(){
                    state.transactionInfo = '';
                }, 2000);
            }
        }
    );
}

module.exports = {
    buy: buy
};