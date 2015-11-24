var settings = require('^settings'),
    state = require('^state'),
    sounds = require('^sounds');

function updateBear(bear){
    if(bear.position.y < 0 || bear.position.y > settings.maxBearPos){
        bear.direction *= -1;
    }

    bear.position.y += (2 * bear.direction);

    bear.danceStep = !bear.danceStep;
}

function updateBears(){
    for (var i = 0; i < state.bears.length; i++) {
        updateBear(state.bears[i]);
    }
}

function checkCollisions(pew){
    if(pew.direction > 0 &&
        pew.position.x > state.bears[1].position.x &&
        pew.position.y >= state.bears[1].position.y &&
        pew.position.y <= state.bears[1].position.y + settings.bearHeight
        ){
        state.p1Score += 2;
        sounds.play('addLove');
        return true;
    }

    if(pew.direction < 0 &&
        pew.position.x < state.bears[0].position.x  &&
        pew.position.y >= state.bears[0].position.y &&
        pew.position.y <= state.bears[0].position.y + settings.bearHeight
        ){
        state.p2Score += 2;
        sounds.play('addLove');
        return true;
    }
}

function checkPewCollision(pew1, pew2){
    if(pew2 &&
        pew1.direction !== pew2.direction &&
        pew1.position.y === pew2.position.y){

        if(pew1.direction > 0 && pew1.position.x >= pew2.position.x){
            return true;
        }

        if(pew1.direction < 0 && pew1.position.x <= pew2.position.x){
            return true;
        }
    }
}

function updatePews(){
    state.pews.forEach(function(pew, index){
        pew.position.x += 15 * pew.direction;

        if(checkCollisions(pew) || pew.position.x > settings.boardWidth || pew.position.x < 0){
            state.pews.splice(index, 1);
            return;
        }

        if(checkPewCollision(pew, state.pews[index + 1])){
            state.pews.splice(index, 2);
        }
    });
}

function winner(bearIndex){
    state.mode = 'endGame';
    state.winner = bearIndex;
    sounds.play('gameOver');
}

function anyPewsInDirection(direction){
    return state.pews.some(function(pew){
        return pew.direction === direction;
    });
}
function checkEndGame(){
    if(state.p1Score <= 0 && !anyPewsInDirection(1)){
        winner(2);
        return;
    }

    if(state.p2Score <= 0 && !anyPewsInDirection(-1)){
        winner(1);
        return;
    }
}

module.exports = function(){
    if(state.mode === 'play'){
        updateBears();
        updatePews();
        checkEndGame();
    }
};