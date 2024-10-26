class Board extends Figure{
    
    constructor(posX,posY,fill,context,width,height,columns,rows,combinations){
        super(posX,posY,fill,context);
        this.width = width;
        this.height = height;
        this.lockers = [];
        this.columns = columns;
        this.rows = rows;
        this.combinations=combinations;
    }
    
    //creacion dinamica de lokers segun tamanioo juego
    createLokers(){
        this.lockers=[];
        let marginX = 3;//margenes de separacion
        let marginY =3;
        let widthLoker = 65;//tamaño lokers segun cantidad fichas
        let heightLocker = 65;
        let widthTablero= ((this.columns*(marginX+widthLoker)));
        let heightTablero=((this.rows*(marginY+heightLocker)));
        let x = this.posX-widthLoker+(this.width/2)-(widthTablero/2);//pos coordenadas segun tamanio fichas
        let y = this.posY-heightLocker+(this.height/2)-(heightTablero/2);
        //llenado de matriz con los casilleros
        for (let i = 0; i < this.rows; i++) {
            this.lockers[i] = []; // Inicializamos cada fila como un arreglo
            for (let j = 0; j < this.columns; j++) {
              // Instanciamos un nuevo objeto para cada posición
                if(i===0){//linea de lockers receptores, solo la primera
                    this.lockers[i][j] = new LokerReceptor(x+widthLoker, y+heightLocker,"rgba(0,0,0,0)",this.context, false, widthLoker, heightLocker,j);  
                    x+=widthLoker+marginX;
                }else{
                    this.lockers[i][j] = new Locker(x+widthLoker, y+heightLocker,"rgba(255,0,0,0.5)",this.context, true, widthLoker, heightLocker);
                    x+=widthLoker+marginX;
                    this.lockers[i][j].setMatrizPosition(i,j);//le asigno posicion de donde se ubica en matriz para calcular logica
                }
            }
            x = this.posX-widthLoker+(this.width/2)-(widthTablero/2);
            y+=heightLocker+marginY;
          }
    }
    
    //dibuja la matriz de lockers
    draw(){
        super.draw();
        this.context.fillRect(this.posX,this.posY,this.width,this.height);
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

    //devuelve casillero vacio segun columna a la que se quiere ubicar una ficha.
    getLokerEmptyInColumn(column,rows){

        for(let i = rows-1 ; i > 0; i--){
            if(this.lockers[i][column].getIsEmpty()){
                return this.lockers[i][column];
            }
        }
        return null;
    }

    getRows(){
        return this.rows;
    }

    getColumns(){
        return this.columns;
    }

    //metodo que averigue si alguien cumplio la combinacion (recibe parametro del tipo de juego/viene del index.    )
    winner(player,casillero){
        let positionMatriz = casillero.getMatrizPosition();
        let contador = 0;
            
        //secuencia horizontal
        for(let i =0; i<this.columns;i++){
            //que el casillero no este vacio
            if(this.lockers[positionMatriz.row][i].getFicha()!=null){
                //verificar que sea el player
                if(this.lockers[positionMatriz.row][i].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{//si no es se corta la secuencia
                    contador=0;
                }

            }
        }
        contador = 0;
        //secuencia vertical
        for(let i =1; i<this.rows;i++){
            //que el casillero no este vacio
            if(this.lockers[i][positionMatriz.column].getFicha()!=null){
                if(this.lockers[i][positionMatriz.column].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{
                    contador=0;
                }

            }
        }
        
        contador=0;
        //secuencia diagonal derecha
        //buscar cero
        let posRowTope = positionMatriz.row;
        let posColumnTope = positionMatriz.column;
        while(posRowTope<this.rows-1&&posColumnTope>0){
            posRowTope+=1;
            posColumnTope-=1;            
        }
        
        while (posRowTope>0 && posColumnTope<this.columns){
            if(this.lockers[posRowTope][posColumnTope].getFicha()!=null){
                if(this.lockers[posRowTope][posColumnTope].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{
                    contador=0;
                }
            }
            posRowTope-=1;
            posColumnTope+=1;
        }
        
        contador=0;
        posRowTope = positionMatriz.row;
        posColumnTope = positionMatriz.column
        console.log(posRowTope +"pos top" + posColumnTope + "pos colum");
        while(posRowTope<this.rows-1&&posColumnTope<this.columns-1){
            posRowTope+=1;
            posColumnTope+=1;            
        }
        console.log(posRowTope +"pos top" + posColumnTope + "pos colum   despues del while");
        
        while(posRowTope>0&&posColumnTope>=0){
            console.log("adentro del while:"+ posRowTope +"row " + posColumnTope +" column");
            if(this.lockers[posRowTope][posColumnTope].getFicha()!=null){
                if(this.lockers[posRowTope][posColumnTope].getFicha().getPlayer()===player){
                    contador++;
                    if(contador==this.combinations){
                        return true;
                    }
                }else{
                    contador=0;
                }
                
            }
            posRowTope-=1;
            posColumnTope-=1;
        }
        return false;
    }

    
    
}