var settings = require('^settings');

module.exports = {
    pews: [],
    bears: [
        {
            position: {
                x: settings.bearMargin,
                y: settings.bearMargin
            },
            direction: 1,
            danceStep: true
        },
        {
            position: {
                x: settings.boardWidth - (settings.bearMargin * 2) - settings.bearWidth,
                y: settings.maxBearPos
            },
            direction: -1,
            danceStep: false
        }
    ],
    p1Score: 15,
    p2Score: 15,
    debugText: '',
    transactionInfo: '',
    mode: 'play',
    winner: null,
    buyer: null,
    ccDetails: [
        {
            cc: '',
            expiry: ''
        },
        {
            cc: '',
            expiry: ''
        }
    ]
};