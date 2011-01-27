function Sprite(image, position, velocity) {
    this.image = image;
    this.posX = position[0];
    this.posY = position[1];
    this.speedX = velocity[0];
    this.speedY = velocity[1];
    this.update = function () {
        this.posX += this.speedX;
        this.posY += this.speedY;
    };
    this.draw = function (drawingContext) {
        drawingContext.drawImage(this.image, this.posX, this.posY);
    };
}
