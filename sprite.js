var gFrictionCoeff = 0.1;

function Sprite(image, position, velocity) {
    this.image = image;
    this.posX = position[0];
    this.posY = position[1];
    this.speedX = velocity[0];
    this.speedY = velocity[1];
    // Advance to position for next frame.
    this.update = function () {
        this.speedX -= this.speedX * gFrictionCoeff;
        this.speedY -= this.speedY * gFrictionCoeff;
        this.posX += this.speedX;
        this.posY += this.speedY;
    };
    // Accelerate in the direction of the given vector.
    this.accelerate = function (accelX, accelY) {
        this.speedX += accelX;
        this.speedY += accelY;
    };
    this.draw = function (drawingContext) {
        drawingContext.drawImage(this.image, this.posX, this.posY);
    };
}
