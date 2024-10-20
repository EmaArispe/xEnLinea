class Board extends Figure{
    
    constructor(posX,posY,fill,context,width,hight){
        super(posX,posY,fill,context);
        this.width = width;
        this.hight = hight;
        let lockers = [ 
            [new Locker(0, 0,"#ff0000",context, true, 90, 90),new Locker(0, 90,"#ff0000",context, true, 90, 90),new Locker(0, 180,"#ff0000",context, true, 90, 90)],
            [new Locker(90, 0,"#ff0000",context, true, 90, 90),new Locker(90, 90,"#ff0000",context, true, 90, 90),new Locker(90, 180,"#ff0000",context, true, 90, 90)],
            [new Locker(180, 0,"#ff0000",context, true, 90, 90),new Locker(180, 90,"#ff0000",context, true, 90, 90),new Locker(180, 180,"#ff0000",context, true, 90, 90)]
        ];
        
       console.log(lockers);
    }

    draw(){//va a recibir parametro tamanio de juego
        super.draw();
        this.context.fillRect(this.posX,this.posY,this.width,this.hight);
        for (let i = 0; i < 3; i++) { // Recorre las filas
            for (let j = 0; j < 3; j++) { // Recorre las columnas
                this.lockers[i][j].draw();
            }
        }
        
    }





}