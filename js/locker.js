class Locker extends Figure {
    constructor(posX,posY,fill,context,isEmpty,width,height){
        super(posX,posY,fill,context);
        this.isEmpty = isEmpty;
        this.width = width;
        this.height = height;   
    }

    draw(){
        super.draw();   
        this.context.fillRect(this.posX,this.posY,this.width,this.height);
        this.context.lineWidth=1;
        this.context.strokeStyle = '#000000'; // Color del borde negro
        this.context.strokeRect(this.posX, this.posY, this.width, this.height);
    }    


    getPosX(){return this.posX;}
    getPosY(){return this.posY;}
    getisEmpty(){return this.isEmpty;}
    getHigth(){return this.width;}
    getWidth(){return this.height;}

    setIsEmpty(isEmpty){this.isEmpty = isEmpty;}
}