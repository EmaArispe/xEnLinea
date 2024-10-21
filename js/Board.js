class Board extends Figure{
    

    constructor(posX,posY,fill,context,width,height){
        console.log(posX,posY);
        super(posX,posY,fill,context);
        this.width = width;
        this.height = height;
        this.lockers = []; 
    }
    
    //creacion dinamica de lokers segun tamanioo juego
    createLokers(columns,rows){
        this.lockers=[];
        let widthLoker = this.width/columns;//tamaño lokers segun cantidad fichas
        let heightLocker = this.height/rows;
        console.log(widthLoker,heightLocker);
        let x = this.posX-widthLoker;//pos coordenadas segun tamanio fichas
        let y = this.posY-heightLocker;

        for (let i = 0; i < rows; i++) {
            this.lockers[i] = []; // Inicializamos cada fila como un arreglo
            for (let j = 0; j < columns; j++) {
              // Instanciamos un nuevo objeto para cada posición
              this.lockers[i][j] = new Locker(x+widthLoker, y+heightLocker,"#ff0000",this.context, true, widthLoker, heightLocker);
              x+=widthLoker;
            }
            x = this.posX-widthLoker;
            y+=heightLocker;
          }
          console.log(this.lockers)
    }

    /*createLokers(widthLoker,heightLocker){  QUEDA POR LAS DUDAS PARA PROBAR
        this.lockers=[
            [new Locker(this.posX+0, this.posY+0,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+0, this.posY+90,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+0, this.posY+180,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+0, this.posY+270,"#ff0000",this.context, true, widthLoker, heightLocker)],
            [new Locker(this.posX+90, this.posY+0,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+90, this.posY+90,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+90, this.posY+180,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+90, this.posY+270,"#ff0000",this.context, true, widthLoker, heightLocker)],
            [new Locker(this.posX+180, this.posY+0,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+180, this.posY+90,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+180, this.posY+180,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+180, this.posY+270,"#ff0000",this.context, true, widthLoker, heightLocker)],
            [new Locker(this.posX+270, this.posY+0,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+270, this.posY+90,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+270, this.posY+180,"#ff0000",this.context, true, widthLoker, heightLocker),new Locker(this.posX+270, this.posY+270,"#ff0000",this.context, true, widthLoker, heightLocker)]
        ];
    }*/ 
    
    draw(){//va a recibir parametro tamanio de juego
        super.draw();
        //this.context.fillRect(this.posX,this.posY,this.width,this.height);
        console.log(this.posX, this.posY);
        for(let i = 0; i < this.lockers.length;i++){
            for(let j = 0; j<this.lockers.length;j++){
                this.lockers[i][j].draw();
            }
        }
    }

    setWidth(width){
        this.width=width;
    }
    setHeigth(height){
        this.heigth=height;
    }
    
}