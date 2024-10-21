class Board extends Figure{
    

    constructor(posX,posY,fill,context,width,height){
        console.log(posX,posY);
        super(posX,posY,fill,context);
        this.width = width;
        this.height = height;
        this.lockers = []; 
    }
    
    //creacion dinamica de lokers segun tamanioo juego
    createLokers(columns,rows,widthBoard,heightBoard){
        console.log(columns, rows)
        let marginX = 3;
        let marginY =3;
        this.lockers=[];
        let widthLoker = 65;//tamaño lokers segun cantidad fichas
        let heightLocker = 65;
        let widthTablero= ((columns*(marginX+widthLoker)));
        let heightTablero=((rows*(marginY+heightLocker)));
        let x = this.posX-widthLoker+(widthBoard/2)-(widthTablero/2);//pos coordenadas segun tamanio fichas
        let y = this.posY-heightLocker+(heightBoard/2)-(heightTablero/2);
        

        for (let i = 0; i < rows; i++) {
            this.lockers[i] = []; // Inicializamos cada fila como un arreglo
            for (let j = 0; j < columns; j++) {
              // Instanciamos un nuevo objeto para cada posición
              this.lockers[i][j] = new Locker(x+widthLoker, y+heightLocker,"#ff0000",this.context, true, widthLoker, heightLocker);
              x+=widthLoker+marginX;
            }
            x = this.posX-widthLoker+(widthBoard/2)-(widthTablero/2);
            y+=heightLocker+marginY;
          }
          console.log(this.lockers)
    }
    
    draw(){//va a recibir parametro tamanio de juego
        super.draw();
        this.context.fillRect(this.posX,this.posY,this.width,this.height);
        console.log(this.posX, this.posY);
        for(let i = 0; i < this.lockers.length;i++){
            for(let j = 0; j<this.lockers[i].length;j++){
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