var width, height;

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
    var canvas = document.getElementById("gameCanvas");
    var gContext = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    // get image objects ready
    var imageNames = ["bob"];
    var imageDict = loadImages(imageNames);
    // make sprites
    var spriteDict = new Array();
    spriteDict["bob"] = new Sprite(imageDict["bob"], 60, 60);
    // register event handlers

    // initiate game loop
    window.setInterval(updateGame, 20, spriteDict, gContext);
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
function updateGame(spriteDict, gContext) {
    for (var name in spriteDict) {
        spriteDict[name].update();
    }
    drawGame(spriteDict, gContext);
}

// Draw everything.
function drawGame(spriteDict, gContext) {
    gContext.fillRect(0, 0, width, height);
    for (var name in spriteDict) {
        spriteDict[name].draw(gContext);
    }
}
