class Board extends Figure{
    

    constructor(posX,posY,fill,context,width,height){
        console.log(posX,posY);
        super(posX,posY,fill,context);
        this.width = width;
        this.height = height;
        this.lockers = [];
        this.columns = null;
        this.rows = null;
    }
    
    //creacion dinamica de lokers segun tamanioo juego
    createLokers(columns,rows,widthBoard,heightBoard){
        this.columns=columns;
        this.rows=rows;
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
                if(i===0){
                    this.lockers[i][j] = new LokerReceptor(x+widthLoker, y+heightLocker,"#FFFF00",this.context, false, widthLoker, heightLocker,j);  
                    x+=widthLoker+marginX;
                }else{
                    this.lockers[i][j] = new Locker(x+widthLoker, y+heightLocker,"#ff0000",this.context, true, widthLoker, heightLocker);
                    x+=widthLoker+marginX;
                }
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


    //devuelve un casillero si una ficha se para sobre alguno de los receptores, sino null.
    isAnyLockerPointInsided(x,y){
        for(let i=0; i<this.lockers[0].length;i++){
            if(this.lockers[0][i].isPointInsided(x,y)){
                return this.lockers[0][i];
            }
        }
        return null;
    }

    


    //metodo que devuelva casillero segun columna a la que se quiere ubicar una ficha.
    getLokerEmptyInColumn(column,rows){

        for(let i = rows-1 ; i > 0; i--){

            if(this.lockers[i][column].getIsEmpty()){
                return this.lockers[i][column];
            }
        
        }
        return null;
    }

    getRows(){//harcodeado OJOTA
        return this.rows;
    }

    getColumns(){
        return this.columns;
    }


    //metodo que averigue si alguien cumplio la combinacion (recibe parametro del tipo de juego/viene del index.    )
    winner(){
        let contador = 0;
        let linea = 4;
        for(let i =0; i< this.columns-1;i++){
            console.log("entre al for");
            if(this.lockers[6][i].getFicha()!=null){
                contador++;
                if(contador==linea){
                    alert("4 EN LINEA!!");
                }
            }
        }
        //let combinacion
        //dfs
        //buscar en la matriz si hay alguna combinacion 
        
        
    }
    
}