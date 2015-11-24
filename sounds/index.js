var Player = require('player'),
    sounds = {
        pew: new Player(['./sounds/pew.mp3']).on('error', function(){}),
        gameOver: new Player(['./sounds/gameOver.mp3']).on('error', function(){}),
        mozart: new Player(['./sounds/mozart.mp3']).on('error', function(){}),
        addLove: new Player(['./sounds/addLove.mp3']).on('error', function(){}),
    };

function play(soundName){
    sounds[soundName].play();
}

module.exports = {
    play: play
};