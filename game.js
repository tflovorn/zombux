// globals
var gCanvas, gDrawingContext, gSpriteDict;

// Run initGame() after the page finishes loading.
window.addEventListener("load", initGame, false);

// Required setup before running any game logic.
function initGame() {
    // test for canvas support
    if (!document.createElement('canvas').getContext) {
        alert("Canvas support not detected. Quitting.");
        return;
    }
    // get drawing context from main canvas
    gCanvas = document.getElementById("gameCanvas");
    gDrawingContext = gCanvas.getContext("2d");
    // get image objects ready
    var imageNames = ["bob"];
    var imageDict = loadImages(imageNames);
    // make sprites
    gSpriteDict = new Array();
    gSpriteDict["bob"] = new Sprite(imageDict["bob"], [60, 60], [0, 0]);
    // register event handlers
    window.addEventListener("keyDown", handleKeyDown, true);
    window.addEventListener("keyPress", handleKeyDown, true);
    window.addEventListener("keyUp", handleKeyUp, true);
    gCanvas.addEventListener("click", handleClick, true);
    // initiate game loop
    window.setInterval(updateGame, 20);
}

// Take an array of image names; load them from images/ (assuming .png type).
// Return an associative array of Image objects with keys given by image names.
function loadImages(imageNames) {
    var imageDict = new Array();
    for (var i = 0; i < imageNames.length; i++) {
        var someImage = new Image();
        someImage.src = "images/" + imageNames[i] + ".png";
        imageDict[imageNames[i]] = someImage;
    }
    return imageDict;
}

// Main game loop body.
function updateGame() {
    for (var name in gSpriteDict) {
        gSpriteDict[name].update();
    }
    drawGame();
}

// Draw everything.
function drawGame() {
    gDrawingContext.fillRect(0, 0, gCanvas.width, gCanvas.height);
    for (var name in gSpriteDict) {
        gSpriteDict[name].draw(gDrawingContext);
    }
}

// Key is down, do something.  Or not.
function handleKeyDown(keyEvent) {
    var keyString = getKeyValue(keyEvent);
    switch (keyString) {
        case "W": // move up
            gSpriteDict["bob"].accelerate(0, -1);
            break;
        case "S": // move down
            gSpriteDict["bob"].accelerate(0, 1);
            break;
        case "A": // move left
            gSpriteDict["bob"].accelerate(-1, 0);
            break;
        case "D": // move right
            gSpriteDict["bob"].accelerate(1, 0);
            break;
    }
}

// Friction means we don't need to decelerate on keyUp.
// Known bug in Ubuntu Opera 10.5/11: keyup repeatedly fires.
function handleKeyUp(keyEvent) {
//    alert("keyup");
}

// Extract the string corresponding to the key pressed.
function getKeyValue(keyEvent) {
    var keyCode;
    // IE support
    if (event.which == undefined) {
        keyCode = keyEvent.keyCode;
    }
    // everyone else
    else {
        keyCode = keyEvent.which;
    }
    return String.fromCharCode(keyCode);
}

// Click for shooting.
function handleClick(clickEvent) {
    var position = getCursorPosition(clickEvent);
//    alert(position[0] + ' ' + position[1]);
}

// Code pulled straight from Dive Into HTML5 (Halma)
// Unsure which browsers don't support pageX/pageY.
function getCursorPosition(clickEvent) {
    var x, y;
    if (clickEvent.pageX != undefined && clickEvent.pageY != undefined) {
        x = clickEvent.pageX;
        y = clickEvent.pageY;
    }
    else {
        x = clickEvent.clientX + document.body.scrollLeft 
                + document.documentElement.scrollLeft;
        y = clickEvent.clientY + document.body.scrollTop 
                + document.documentElement.scrollTop;
    }
    x -= gCanvas.offsetLeft;
    y -= gCanvas.offsetTop;
    return [x, y];
}
