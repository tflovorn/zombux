// globals
var gCanvas, gDrawingContext;   // game canvas and its 2d context
var gSpriteDict;                // every sprite to be updated/drawn
var gGunFiring;                 // shooting bullets now?
var gCursorPosition;            // [X, Y] position of mouse cursor

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
    window.addEventListener("keydown", handleKeyDown, false);
    window.addEventListener("keypress", handleKeyDown, false);
    gCanvas.addEventListener("click", handleClick, false);
    gCanvas.addEventListener("mousemove", handleMouseMove, false);
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
    gDrawingContext.beginPath();
    gDrawingContext.arc(gCursorPosition[0], gCursorPosition[1], 10, 0,
                        Math.PI * 2, false);
    gDrawingContext.closePath();
    gDrawingContext.strokeStyle = "#fff";
    gDrawingContext.stroke();
}

// Key is down, do something.  Or not.
function handleKeyDown(keyEvent) {
    var keyString = getKeyValue(keyEvent);
    switch (keyString) {
        case "Q": // start firing
            gGunFiring = true;
            break;
        case "E": // stop firing
            gGunFiring = false;
            break;
    }
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

// Click to direct movement.
function handleClick(mouseEvent) {
    var position = getCursorPosition(mouseEvent);
    
}

// Point shooter towards the cursor; put a reticle around it.
function handleMouseMove(mouseEvent) {
    gCursorPosition = getCursorPosition(mouseEvent);
}

// Code pulled straight from Dive Into HTML5 (Halma)
// Unsure which browsers don't support pageX/pageY.
function getCursorPosition(mouseEvent) {
    var x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
        x = mouseEvent.pageX;
        y = mouseEvent.pageY;
    }
    else {
        x = mouseEvent.clientX + document.body.scrollLeft 
                + document.documentElement.scrollLeft;
        y = mouseEvent.clientY + document.body.scrollTop 
                + document.documentElement.scrollTop;
    }
    x -= gCanvas.offsetLeft;
    y -= gCanvas.offsetTop;
    return [x, y];
}
