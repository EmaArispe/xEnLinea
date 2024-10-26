class LokerReceptor extends Locker{

    constructor(posX,posY,fill,context,isEmpty,width,height,columnPos){
        super(posX,posY,fill,context,isEmpty,width,height);
        this.columnPos = columnPos;
        this.fill= "rgba(0,0,0,0)";
    }

    draw(){
        super.draw();
    }


    //
    isPointInsided(x, y) {
        return (x >= this.posX +10 && x <= this.posX -10  + this.width) &&
               (y >= this.posY +10 && y <= this.posY -10  + this.height);
    }

    getColumn(){
        return this.columnPos;
    }

}