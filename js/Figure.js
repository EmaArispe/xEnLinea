class Figure{

    constructor(posX,posY,fill,context){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.startPosX = posX;
        this.startPosY = posY;

    }

    getPosition(){
        return { x: this.getPosX(),
                 y: this.getPosY()
        };
    }

    getPosY(){return this.posY;}
    
    getPosX(){return this.posX;}
    
    setPosY(newY){this.posY = newY;}
    
    setPosX(newX){this.posX = newX;}
    
    //devuelven posicion donde se inicia la figura.
    getStartPosX(){return this.startPosX;}

    getStartPosY(){return this.startPosY;}
    
    getFill(){return this.fill;}

    setFill(fill){this.fill=fill;}

    draw(){
        this.context.fillStyle = this.fill;
    }

}