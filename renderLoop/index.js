var ctx = require('axel'),
    settings = require('^settings'),
    state = require('^state'),
    imageMaps = require('^imageMaps');

function renderImageMap(x, y, map){
    function drawRow(rowNumber, rowData){
        for (var i = 0; i < rowData.length; i++) {
            if(!rowData[i]){
                // ctx.scrub(x + i, y + rowNumber, 1, 1);
            } else {
                ctx.bg(settings.colours[rowData[i]].r, settings.colours[rowData[i]].g, settings.colours[rowData[i]].b);
                ctx.point(x + i, y + rowNumber);
            }
        }
    }

    for (var i = 0; i < map.length; i++) {
        drawRow(i, map[i]);
    }
}

function drawPews(){
    ctx.bg(255,255,255);

    for (var i = 0; i < state.pews.length; i++) {
        var pew = state.pews[i];
        renderImageMap(pew.position.x, pew.position.y, imageMaps.heart);
    }
}

function drawBear(bear){
    bear.danceStep = !bear.danceStep;

    renderImageMap(
        bear.position.x,
        bear.position.y + settings.bearMargin,
        bear.danceStep ? imageMaps.bearDance1 : imageMaps.bearDance2
    );
}

function drawBears(){
    for (var i = 0; i < state.bears.length; i++) {
        drawBear(state.bears[i]);
    }
}

function drawTurrets(){
    ctx.bg(102, 205, 170);

    for (var i = 0; i < settings.turretPositions.length; i++) {
        var position = settings.turretPositions[i];
        ctx.point(position.x, position.y);
    }
}

function drawBoard(){
    ctx.bg(255,255,0);
    ctx.fg(0,0,0);
    ctx.text((settings.boardWidth / 2) - 10 , 2, '2 IDIOTS 1 KEYBOARD');

    ctx.text(10 , 2, 'LOVE: ' + state.p1Score);
    ctx.text(settings.boardWidth - 20 , 2, 'LOVE: ' + state.p2Score);
}

function drawEndGame(){
    ctx.bg(255,0,0);
    ctx.fg(0,0,0);

    ctx.text((settings.boardWidth / 2) - 10 , (settings.boardHeight / 2) - 2, 'NO MORE LOVE TO GIVE');
    ctx.text((settings.boardWidth / 2) - 8 , (settings.boardHeight / 2) + 2, 'WINNER: Player ' + state.winner);

    ctx.text(10 , 2, 'SCORE: ' + state.p1Score);
    ctx.text(settings.boardWidth - 20 , 2, 'SCORE: ' + state.p2Score);
}

function drawPaymentLogo(){
    renderImageMap(
        2,
        2,
        imageMaps.payPal
    );
}

function drawBb8(){
    renderImageMap(
        (settings.boardWidth / 2) - imageMaps.bb8[0].length,
        settings.boardHeight - imageMaps.bb8.length,
        imageMaps.bb8
    );
}

function drawBuyMenu(){
    ctx.bg(0,0,0);
    ctx.fg(255, 255, 255);
    ctx.text(25 , 4, '  BUY LOVE YOU SOME MORE LOVE ');
    ctx.text(25 , 6, '  1: BUY NEW PHONE  $400  ');
    ctx.text(25 , 8, '  2: BUY PONY  $5,000  ');
    ctx.text(25 , 10, '  3: BUY CONVERTABLE  $400,000  ');
    ctx.text(25 , 12, '  4: BUY BB-8™ DROID BY SPHERO  $PRICELESS');
}

function createHash(numbers){
    var targetLength = 16,
        visibleChars = 4,
        result = '';

    for (var i = 0; i < numbers.length; i++) {
        if(result.length < targetLength - visibleChars){
            result += '*';
        } else {
            result += numbers[i];
        }
    }

    return result;
}

function drawEnterCCInstructions(){
    var cc = state.ccDetails[state.buyer].cc || '';

    ctx.text(25 , 4, '  PLAYER ' + (state.buyer + 1) + '  ');
    ctx.text(25 , 6, '  ENTER YOU CREDIT CARD NUMBER  ');
    ctx.text(25 , 8, '  ' + createHash(cc) + '  ');
}

function drawEnterExpiryInstructions(){
    var expiry = state.ccDetails[state.buyer].expiry || '';

    ctx.text(25 , 10, '  ENTER YOUR EXPIRY  ');
    ctx.text(25 , 12, '  ' + expiry.substr(0,2) + ' / ' + expiry.substr(2,2) + '  ');
}

module.exports = function(){
    ctx.clear();

    if(state.mode === 'play'){
        drawBoard();
        drawBears();
        drawTurrets();
        drawPews();
    }

    if(state.mode === 'endGame'){
        drawEndGame();
    }

    if(state.mode === 'purchace'){
        drawPaymentLogo();
        drawBuyMenu();
        drawBb8();
    }

    if(state.mode === 'enterCC'){
        drawPaymentLogo();
        ctx.bg(0,0,0);
        ctx.fg(255, 255, 255);

        drawEnterCCInstructions();

        if(state.ccDetails[state.buyer].cc.length === 16){
            drawEnterExpiryInstructions();
        }

        drawBb8();
    }

    ctx.bg(0, 255, 0);
    ctx.fg(0, 0, 0);
    ctx.text(settings.boardWidth / 2 - 20 , settings.boardHeight / 2, '' + state.transactionInfo);

    ctx.text(settings.boardWidth / 2 - 20 , settings.boardHeight - 2, '' + state.debugText);

    ctx.cursor.restore();
};

module.exports.ctx = ctx;