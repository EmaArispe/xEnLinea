"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
//inicio de canvas
let canvas = document.querySelector('#canvas'); 
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let figuras = [];

const rect = canvas.getBoundingClientRect()//constante para tomar distancia y calcular x/y
const backgroudCanvas = '#9B9B9B'

//dimensiones board
const widthBoard=820;
const heightBoard=600;
const marginBoard = (width-widthBoard)/2;
const marginSupBoard = height-heightBoard;

let file = null;//ficha
let board = null;//tablero
let game = null;//juego
let firstTurn = null;//primer turno
//lectura de pantalla informativa del transcurso del juego
let log = document.querySelector('.log');
//ganador
let ganador = false;


//INICIALIZACION DE TABLERO (setea dimensiones y combinaciones segun parametro 4,5,6,7 en linea)

let selectGame = document.querySelector('.configuration-game');
selectGame.querySelectorAll('button').forEach(button=>{
    button.addEventListener('click',()=>{
        setupGame(parseInt(button.id));
        selectGame.classList.add('hidden');
    });
});

//setea parametros juego segun eleccion
function setupGame(gameSize){
    let columns, rows , files, combinations;
    switch(gameSize){
        case 4:
            columns=8;
            rows = 7; 
            files = 21;
            combinations=4;
            break;
        case 5:
            columns=9;
            rows = 7; 
            files = 24;
            combinations=5
            break;
        case 6:
            columns=9;
            rows = 8; 
            files = 32;
            combinations=6;
            break;
        case 7:
            columns=10;
            rows = 8; 
            files = 32;
            combinations=7;
            break;
        default:
            console.log("error, seleccion invalida");
            return;
    }
    //creacion de tablero, juego y eleccion aleatoria del primer turno
    board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,widthBoard,heightBoard,columns,rows,combinations);
    game = new Game("robocop","ironman");
    firstTurn=game.setFirstTurn();
    stateLog("Comienza jugando: "+firstTurn,log);
    board.createLokers();
    //clearCanvas();
    board.draw();
    //cargar las fichas despues de un tiempo, para que se creen encima del board (tarda en cargar la imagen)
    console.log("antes de cargar fichas");
    setTimeout(loadFiles(files), 1000); //no esta dando bola al tiempo
    console.log("despues de cargar fichas");
    //loadFiles(files);//carga de fichas
};

//EVENTOS DE MOUSE   
//controla que se seleccione una ficha al turno correspondiente
canvas.addEventListener('mousedown', (e)=>{
                        let figura = isFile(e);
                        if(figura != null && figura.isClickable() && !ganador){
                            //verifica si clickea ficha al turno correspondiente
                            if(game.isTurn(figura.getPlayer())){
                            file = figura;  
                            }else{
                                stateLog(figura.getPlayer()+" no es tu turno",log);
                            }
                        }
                        drawAll();
                    });
//soltar seleccion de ficha
canvas.addEventListener('mouseup', (e)=>{
                        if(file != null){
                            //buscar casillero receptor
                            let lockerReceptor = board.isAnyLockerPointInsided(getX(e),getY(e));
                            //si encontro casillero receptor busca la columna
                            if(lockerReceptor!=null){                    
                                let emptyLocker = board.getLokerEmptyInColumn(lockerReceptor.getColumn(),board.getRows());
                                //si hay lugar
                                if(emptyLocker!=null){
                                    traslateFile(file,emptyLocker);
                                    emptyLocker.setIsEmpty(false);
                                    emptyLocker.setFicha(file);
                                    file.setClickable(false);//se inabilita la ficha para que se mueva.
                                    drawAll();
                                    let player = file.getPlayer();
                                    setTimeout(()=>{     
                                        ganador = board.winner(player,emptyLocker);                                   
                                        if(ganador){
                                            stateLog("GANADOR!!: "+player,log);
                                        }else{
                                            stateLog("es el turno de : "+ game.changeTurn(),log);//se cambia el turno y se informa
                                        }
                                    },700);
                                    lockerReceptor.setFill("rgba(0,0,0,0)");
                                }else{
                                    //volver a posicion inicial
                                    stateLog("Columna llena, intenta nuevamente",log);
                                    file.setPosX(file.startPosX);
                                    file.setPosY(file.startPosY);
                                    drawAll();
                                }

                            }else{
                                //volver a posicion inicial
                                stateLog("Posicion incorrecta, intenta nuevamente",log);
                                file.setPosX(file.startPosX);
                                file.setPosY(file.startPosY);
                                drawAll();
                            }
                            file = null;
                        }
                    });

//drop de la ficha
canvas.addEventListener('mousemove', (e)=>{
                        if(file != null){
                            file.setPosX(getX(e));
                            file.setPosY(getY(e));
                            //pintar o despintar si se pasa por los casilleros receptores
                            for(let i=0; i<board.lockers[0].length;i++){
                                if(board.lockers[0][i].isPointInsided(getX(e),getY(e))){
                                    //controla si esta lleno o tiene lugar para informar si se puede ingresar o no ficha
                                    if(board.getLokerEmptyInColumn(board.lockers[0][i].getColumn(),board.getRows())){
                                        board.lockers[0][i].setFill("rgba(0,255,0,0.4)");
                                    }else{
                                        board.lockers[0][i].setFill("rgba(255,0,0,0.4)");
                                    }
                                }else{
                                    board.lockers[0][i].setFill("rgba(0,0,0,0)");
                                }
                            }
                            drawAll();                           
                            
                        }
                    });

//efecto gravedad (movimiento de la ficha)
function traslateFile(ficha,casillero){
    let posXficha=ficha.getPosX();
    let posYficha=ficha.getPosY();
    let posXcasillero=casillero.getPosX()+32.5;
    let posYcasillero=casillero.getPosY()+29;
    let velocidad = 1; // velocidad de movimiento (en milisegundos)

    if(posXficha<posXcasillero){
        //desciende mientras no llegue al casillero destino en intervalos
        let intervaloX = setInterval(() => {
            if (posXficha < posXcasillero) {
                posXficha++; // incrementar la posición de la ficha
                ficha.setPosX(posXficha); // actualizar la posición de la ficha
                drawAll(); // redibujar todo
            } else {
                clearInterval(intervaloX); // detener el intervalo cuando la ficha llega al casillero
            }
        }, velocidad);

    }else if(posXficha>posXcasillero){
        let intervaloXiz = setInterval(() => {
            if (posXficha > posXcasillero) {
                posXficha--; // incrementar la posición de la ficha
                ficha.setPosX(posXficha); // actualizar la posición de la ficha
                drawAll(); // redibujar todo
            } else {
                clearInterval(intervaloXiz); // detener el intervalo cuando la ficha llega al casillero
            }
        }, velocidad);
    }
    
    let intervaloY = setInterval(() => {
        
        if (posYficha < posYcasillero) {
            if(posYficha<120){
                posYficha+=5;
            }else if(posYficha<150){
                posYficha+=15; // incrementar la posición de la ficha
            }else{
                posYficha+=40
            }
            if(posYficha > posYcasillero){
                posYficha-=20;
            }
            ficha.setPosY(posYficha); // actualizar la posición de la ficha
            drawAll(); // redibujar todo
        } else {
            rebote(ficha,posYficha,posYcasillero,posYcasillero-100);
            clearInterval(intervaloY); // detener el intervalo cuando la ficha llega al casillero
        }
    }, velocidad);
                  
}

//crea efecto rebote
function rebote(ficha,pos,buttom,top){
    let sentido = true;
    let position = buttom ;
    let contador = 0;
    let intervalorebote= setInterval(()=>{
            if(pos>=top&& sentido){
                pos-=25;
                ficha.setPosY(pos);
                drawAll();
                            
            }else if(pos<buttom){
                sentido=false;
                pos+=10;
                ficha.setPosY(pos);
                drawAll();
            }

            if(pos == buttom){
                sentido=true;
                contador++;
                top=top+40;
                console.log(contador);
            }
            
            if(contador >= 2){
                clearInterval(intervalorebote);
            }
            
        },10);
        pos = position;
        sentido=true;

}


//dibujar todo
function drawAll(){
    clearCanvas();
    board.draw();
    figuras.forEach(element => { 
        element.draw();
    });
}

//obtener pos x e y 
function getX(event){
    return event.clientX - rect.left;
}
function getY(event){
    return event.clientY - rect.top;
}

//borrar canvas
function clearCanvas(){
    ctx.fillStyle = backgroudCanvas;
    ctx.fillRect(0,0,width,height);
}

//colores aleatorios
function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//carga de imagenes
let imgRobocop = new Image();
    imgRobocop.src = '/robocop.jpg';

let imgIroman = new Image();
imgIroman.src = '/iroman.jpg';

//carga de fichas en tablero
function loadFiles(cantFichas){
    console.log("cargando fichas");
//las posiciones 95 y 1105 estan "harcodeadas" para que la imagen de fondo sea entera, dejaria de existir marginBoard
let heightPartial = 550;
for (let i = 0; i < cantFichas; i++){
    let c = new File(95, heightPartial,randomRGB(), ctx, 25,imgRobocop,"robocop");
    
    if(i==(cantFichas-2)){
        heightPartial -= 55;    
    }else{

        heightPartial = heightPartial -2;
    }
    figuras.push(c);
    c.draw();
}

heightPartial = 550;
for (let i = 0; i < cantFichas; i++){
    let c = new File(1105, heightPartial,randomRGB(), ctx, 25, imgIroman,"ironman");
    
    if(i==(cantFichas-2)){
        heightPartial -= 55;    
    }else{

        heightPartial = heightPartial -2;
    }
    figuras.push(c);
    c.draw();
}

}


function isFile(e){
    for(let i = 0; i < figuras.length; i++){
        if(figuras[i].isPointInsided(getX(e),getY(e))){
            return figuras[i];
        }
    }
}

//imprime en el juego
function stateLog(message,log){
    let parrafo = document.createElement("p");
    parrafo.textContent=message;
    
    if (log.lastElementChild) {
        log.lastElementChild.classList.remove('logStyle');
    }
    
    parrafo.classList.add('logStyle');

    //log.removeChild(log.firstChild);
    log.appendChild(parrafo);   
    parrafo.scrollIntoView();
}
    
}
