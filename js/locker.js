class Locker extends Figure {
    constructor(posX,posY,fill,context,isEmpty,width,hight){
        super(posX,posY,fill,context);
        this.isEmpty = isEmpty;
        this.width = width;
        this.hight = hight;   
    }

    draw(){
        super.draw();
        this.fill = "#000000"
        this.context.fillRect(this.posX,this.posY,this.width,this.hight);
    }    


    getPosX(){return this.posX;}
    getPosY(){return this.posY;}
    getisEmpty(){return this.isEmpty;}
    getHigth(){return this.width;}
    getWidth(){return this.hight;}

    setIsEmpty(isEmpty){this.isEmpty = isEmpty;}
}