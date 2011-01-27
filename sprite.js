// Don't move if position is within gMoveThreshold of moveTarget.
// (to eliminate jittering after moving somewhere)
var gMoveThreshold = 2;

function Sprite(image, initPosition, initSpeed) {
    this.image = image;
    this.position = initPosition;
    this.speed = initSpeed;
    // Advance to position for next frame.
    this.update = function () {
        // only move if we know where to go
        if (this.moveTarget != undefined) {
            // vector from position to moveTarget
            direction = [this.moveTarget[0] - this.position[0],
                         this.moveTarget[1] - this.position[1]];
            normDirection = Math.sqrt(Math.pow(direction[0], 2)
                                    + Math.pow(direction[1], 2));
            if (normDirection > gMoveThreshold) {
                // velocity points toward moveTarget and has norm = speed
                velocity = [this.speed * direction[0] / normDirection,
                            this.speed * direction[1] / normDirection];
                this.position[0] += velocity[0];
                this.position[1] += velocity[1];
            }
        }
    };
    // Draw the sprite on the given drawingContext.
    this.draw = function (drawingContext) {
        drawingContext.drawImage(this.image, this.position[0], 
                                 this.position[1]);
    };
}
