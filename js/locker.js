class Locker {
    constructor(posX,posY,isEmpty,width,hight){
        this.posX = posX;
        this.posY = posY;
        this.isEmpty = isEmpty;
        this.width = width;
        this.hight = hight;
    }

    getPosX(){return this.posX;}
    getPosY(){return this.posY;}
    getisEmpty(){return this.isEmpty;}
    getHigth(){return this.width;}
    getWidth(){return this.hight;}

    setIsEmpty(isEmpty){this.isEmpty = isEmpty;}
}