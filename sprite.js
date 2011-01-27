function Sprite(image, initX, initY) {
    this.image = image;
    this.posX = initX;
    this.posY = initY;
    this.update = function () {

    };
    this.draw = function (gDrawingContext) {
        gDrawingContext.drawImage(this.image, this.posX, this.posY);
    };
}
