class LokerReceptor extends Locker{

    constructor(posX,posY,fill,context,isEmpty,width,height,columnPos){
        super(posX,posY,fill,context,isEmpty,width,height);
        this.columnPos = columnPos;
    }

    draw(){
        this.fill="#FFFF00";
        super.draw();
    }


    //
    isPointInsided(x, y) {
        return (x >= this.posX && x <= this.posX + this.width) &&
               (y >= this.posY && y <= this.posY + this.height);
    }

    getColumn(){
        return this.columnPos;
    }




}