var keypress = require('keypress'),
    midi = require('midi'),
    input = new midi.input(),
    settings = require('^settings'),
    state = require('^state'),
    sounds = require('^sounds'),
    purchacing = require('^purchacing'),
    ctx = require('axel');

function playBindings(key){
    switch (key) {
        case 'space':
            sounds.play('mozart');
        break;
        case '`':
            setPurchace(0);
        break;
        case '0':
            setPurchace(1);
        break;
        case 'q':
        case 48:
            firePew({x: settings.turretPositions[0].x, y: settings.turretPositions[0].y}, 1);
        break;
        case 'w':
        case 50:
            firePew({x: settings.turretPositions[1].x, y: settings.turretPositions[1].y}, 1);
        break;
        case 'e':
        case 52:
            firePew({x: settings.turretPositions[2].x, y: settings.turretPositions[2].y}, 1);
        break;
        case 'r':
        case 53:
            firePew({x: settings.turretPositions[3].x, y: settings.turretPositions[3].y}, 1);
        break;
        case 't':
        case 55:
            firePew({x: settings.turretPositions[4].x, y: settings.turretPositions[4].y}, 1);
        break;
        case 'y':
        case 65:
            firePew({x: settings.turretPositions[0].x + settings.boardWidth, y: settings.turretPositions[0].y}, -1);
        break;
        case 'u':
        case 67:
            firePew({x: settings.turretPositions[1].x + settings.boardWidth, y: settings.turretPositions[1].y}, -1);
        break;
        case 'i':
        case 69:
            firePew({x: settings.turretPositions[2].x + settings.boardWidth, y: settings.turretPositions[2].y}, -1);
        break;
        case 'o':
        case 71:
            firePew({x: settings.turretPositions[3].x + settings.boardWidth, y: settings.turretPositions[3].y}, -1);
        break;
        case 'p':
        case 72:
            firePew({x: settings.turretPositions[4].x + settings.boardWidth, y: settings.turretPositions[4].y}, -1);
        break;
    }
}

function purchaceBindings(key){
    switch (key) {
        case '1':
            purchacing.buy(key);
        break;
        case '2':
            purchacing.buy(key);
        break;
        case '3':
            purchacing.buy(key);
        break;
        default:
            state.mode = 'play';
        break;
    }
}

function enterCCBindings(key){
    if(state.ccDetails[state.buyer].cc.length < 16){
        state.ccDetails[state.buyer].cc += key;
        return;
    }

    if(state.ccDetails[state.buyer].expiry.length < 4){
        state.ccDetails[state.buyer].expiry += key;
        return;
    }

    state.mode = 'purchace';
}

function keyBindings(key){
    if(state.mode === 'play'){
        playBindings(key);
        return;
    }

    if(state.mode === 'purchace'){
        purchaceBindings(key);
        return;
    }

    if(state.mode === 'enterCC'){
        enterCCBindings(key);
        return;
    }
}

function setPurchace(player){
    state.buyer = player;
    state.mode = state.ccDetails[player].cc.length === 16 ? 'purchace' : 'enterCC';
}

function bindKeyboard(){
    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
        if (key){
            if (key.ctrl && key.name === 'c') {
                ctx.bg(0,0,0);
                ctx.cursor.restore();
                process.exit();
            }
        }

        keyBindings(ch);
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

function bindMidi(){
    try {
        input.openPort(1);

        input.on('message', function(deltaTime, message) {
            if(message[0] === 144){
                keyBindings(message[1]);
            }
        });

        // input.ignoreTypes(false, false, false);

        process.on('exit', function(){
            input.closePort();
        });
    } catch(e){}
}

function firePew(position, direction){
    if(state.pews.length >= settings.maxPews){
        return;
    }

    if(direction > 0){
        state.p1Score -= 1;
    } else {
        state.p2Score -= 1;
    }

    state.pews.push({
        position: position,
        direction: direction
    });

    sounds.play('pew');
}

module.exports = {
    bindKeyboard: bindKeyboard,
    bindMidi: bindMidi
};