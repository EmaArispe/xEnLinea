class Board extends Figure{
    
    constructor(posX,posY,fill,context,width,hight){
        super(posX,posY,fill,context);
        this.width = width;
        this.hight = hight;
        let lockers = [];
    }

    loadLockers(){ 
       this.lockers = Array.from({ length: n }, (_, rowIndex) => 
        Array.from({ length: m }, (_, colIndex) => 
            new Locker(colIndex, rowIndex, true, width, height)
        ));
    }

    draw(){
        super.draw();
        this.context.fillRect(this.posX,this.posY,this.width,this.hight);
    }



}