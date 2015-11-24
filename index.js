require('rooty')('./');

var logicLoop = require('^logicLoop'),
    renderLoop = require('^renderLoop'),
    bindings = require('^bindings'),
    settings = require('^settings');

bindings.bindKeyboard();
bindings.bindMidi();

setInterval(logicLoop, settings.logicFrameRate);
setInterval(renderLoop, settings.renderFrameRate);
