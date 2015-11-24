var ctx = require('axel'),
    spacing = ctx.rows / 6;

module.exports = {
    logicFrameRate: 100,
    renderFrameRate: 50,
    boardWidth: ctx.cols,
    boardHeight: ctx.rows,
    bearMargin: 5,
    bearWidth: 10,
    bearHeight: 10,
    maxBearPos: ctx.rows / 2 - 2,
    colours: [
        null,
        {r: 130, g: 35, b: 10},
        {r: 230, g: 20, b: 135},
        {r: 60, g: 40, b: 10},
        {r: 255, g: 0, b: 0},
        {r: 0, g: 35, b: 160},
        {r: 0, g: 204, b: 204},
        {r: 0, g: 10, b: 80},
        {r: 255, g: 150, b: 13},
        {r: 130, g: 130, b: 130}
    ],
    maxPews: 5,
    turretPositions: [
        {x: 2, y: 4},
        {x: 2, y: spacing + 4},
        {x: 2, y: spacing * 2 + 4},
        {x: 2, y: spacing * 3 + 4},
        {x: 2, y: spacing * 4 + 4},
        {x: ctx.cols - 2, y: 4},
        {x: ctx.cols - 2, y: spacing + 4},
        {x: ctx.cols - 2, y: spacing * 2 + 4},
        {x: ctx.cols - 2, y: spacing * 3 + 4},
        {x: ctx.cols - 2, y: spacing * 4 + 4}
    ]
};