window.addEventListener("onLoad", initGame, false);

// Required setup before running any game logic.
function initGame() {
    // get image objects ready
    var imageNames = ["bob"];
    var imageDict = loadImages(imageNames);
    // make sprites
    var spriteList = new Array();
    var bob = new Sprite(imageDict["bob"], 60, 60);
    spriteList.push(bob);
    // register event handlers
    // initiate game loop
    var updateHandler = new function () {
        this.handleEvent = updateGame;
    }
    setInterval(updateHandler, 20, spriteList);
}

// Take an array of image names; load them from images/ (assuming .png type).
// Return an associative array of Image objects with keys given by image names.
function loadImages(imageNames) {
    var imageDict = new Array();
    for (name in imageNames) {
        var someImage = new Image();
        someImage.src = "images/" + name + ".png";
        imageDict[name] = someImage;
    }
    return imageDict;
}

// Main loop body.
function updateGame() {
    drawGame();
}

// Draw everything.
function drawGame(sprites) {

}
