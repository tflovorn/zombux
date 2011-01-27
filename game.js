// global constants
var kBulletWait = 5;            // roll over gBulletWaitCount when it gets here

// globals
var gCanvas, gDrawingContext;   // game canvas and its 2d context
var gCursorPosition;            // [X, Y] position of mouse cursor
var gImageDict;                 // images we need to render sprites
var gSpriteDict;                // every sprite to be updated/drawn
var gGunFiring;                 // shooting bullets now?
var gBulletWaitCount;           // spawn a bullet when it's 0
var gBulletNumber;              // how many bullets have been shot?

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
    var imageNames = ["bob", "bullet"];
    gImageDict = loadImages(imageNames);
    // make sprites
    gSpriteDict = new Array();
    gSpriteDict["bob"] = new Sprite(gImageDict["bob"], [60, 60], 1);
    // prepare logic
    gBulletWaitCount = 0;
    gBulletNumber = 0;
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
    // Spawn a bullet every kBulletWait frames, if we're firing.
    if (gGunFiring && (gBulletWaitCount == 0)) {
        var position = [gSpriteDict["bob"].position[0],
                        gSpriteDict["bob"].position[1]];
        var bullet = new Sprite(gImageDict["bullet"], position, 3);
        bullet.moveTarget = [gCursorPosition[0], gCursorPosition[1]];
        var name = "bullet" + gBulletNumber;
        gSpriteDict[name] = bullet;
        gBulletNumber += 1;
    }
    gBulletWaitCount = (gBulletWaitCount + 1) % kBulletWait;
    // Update all sprites.
    for (var name in gSpriteDict) {
        gSpriteDict[name].update();
    }
    // Do all drawing.
    drawGame();
}

// Draw everything.
function drawGame() {
    // background
    gDrawingContext.fillRect(0, 0, gCanvas.width, gCanvas.height);
    // sprites
    for (var name in gSpriteDict) {
        gSpriteDict[name].draw(gDrawingContext);
    }
    // reticle around cursor
    if (gCursorPosition != undefined) {
        gDrawingContext.beginPath();
        gDrawingContext.arc(gCursorPosition[0], gCursorPosition[1], 10, 0,
                            Math.PI * 2, false);
        gDrawingContext.closePath();
        gDrawingContext.strokeStyle = "#fff";
        gDrawingContext.stroke();
    }
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
    gSpriteDict["bob"].moveTarget = position;
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
