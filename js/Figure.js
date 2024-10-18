class Figure{

    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
    }

    setFill(fill){this.fill = fill;}

    getPosition(){
        return { x: this.getPosX(),
                 y: this.getPosY()
        };
    }

    getPosY(){return this.posX;}
    getPosX(){return this.posY;}
    setPosY(newY){this.posY = newY;}
    setPosX(newX){this.posX = newX;}
    getFill(){return this.fill;}

    draw(){
        this.context.fillStyle = this.fill;
    }

}