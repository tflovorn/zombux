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
    gSpriteDict["bob"] = new Sprite(imageDict["bob"], [60, 60], [1, 2]);
    // register event handlers
    gCanvas.addEventListener("keydown", handleKeyDown, false);
    gCanvas.addEventListener("keyup", handleKeyUp, false);
    gCanvas.addEventListener("click", handleClick, false);
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

function handleKeyDown(keyEvent) {

}

function handleKeyUp(keyEvent) {

}

function handleClick(clickEvent) {
    var position = getCursorPosition(clickEvent);
    alert(position[0] + ' ' + position[1]);
}

// Code pulled straight from Dive Into HTML5 (Halma)
// Unsure which browsers don't support pageX/pageY.
function getCursorPosition(clickEvent) {
    var x, y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft 
                + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop 
                + document.documentElement.scrollTop;
    }
    x -= gCanvas.offsetLeft;
    y -= gCanvas.offsetTop;
    return [x, y];
}
