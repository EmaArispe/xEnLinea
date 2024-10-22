class LokerReceptor extends Locker{

    constructor(posX,posY,fill,context,isEmpty,width,height,columnPos){
        super(posX,posY,fill,context,isEmpty,width,height);
        this.columnPos = columnPos;
    }

    draw(){
        //this.fill="#FFFF00";
        super.draw();
    }


    //
    isPointInsided(x, y) {
        return (x >= this.posX +5 && x <= this.posX +5 + this.width) &&
               (y >= this.posY +5 && y <= this.posY + 5 + this.height);
    }

    getColumn(){
        return this.columnPos;
    }




}