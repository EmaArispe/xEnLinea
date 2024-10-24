"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
//inicio de canvas
let canvas = document.querySelector('#canvas'); 
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let figuras = [];

const marginx = 50;
const rect = canvas.getBoundingClientRect()//constante para tomar distancia y calcular x/y
const backgroudCanvas = '#9B9B9B'

//dimensiones board
const widthBoard=820;
const heightBoard=600;
const marginBoard = (width-widthBoard)/2;
const marginSupBoard = height-heightBoard;

let mousedown = null;

//INICIALIZACION DE JUEGO //recibe que tipo de juego (y setea tamanios)
let selectGame = document.querySelector('.select-game');
let typeGame4 = document.querySelector('#four');//toma la seleccion del tamanio de juego
let typeGame5 = document.querySelector('#five');
let typeGame6 = document.querySelector('#six');
let typeGame7 = document.querySelector('#seven');


//ganador
let ganador = false;
//eventos de creacion de juegos segun clickeo
typeGame4.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 8;
    let rows = 7;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(24);
    //let game = new Game("robocop","ironman",4);
});

typeGame5.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 10;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(35);
    //let game = new Game("robocop","ironman",5);
});

typeGame6.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 11;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(38);
    //let game = new Game("robocop","ironman",6);
});

typeGame7.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 12;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(42);
    //let game = new Game("robocop","ironman",7);
});

let board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,widthBoard,heightBoard);
let game = new Game("robocop","ironman",7);
let firstTurn=game.setFirstTurn()
alert("el primero en jugar es :"+firstTurn);



canvas.addEventListener('mousedown', (e)=>{
                        let figura = isCircle(e);
                        if(figura != null&&figura.isClickable()&&game.isTurn(figura.getPlayer())){
                            console.log("clickeada")
                            mousedown = figura;  
                        }
                        drawAll();
                    });



canvas.addEventListener('mouseup', (e)=>{

                        if(mousedown != null){
                            console.log("figura soltada en x:"+ mousedown.getPosX());
                            console.log("figura soltada en y:"+ mousedown.getPosY());
                            //buscar el casillero receptor
                            let casilleroReceptor = board.isAnyLockerPointInsided(getX(e),getY(e));
                            //si encontro casillero receptor busca la columna
                            if(casilleroReceptor!=null){                    
                                let casilleroEmpty = board.getLokerEmptyInColumn(casilleroReceptor.getColumn(),board.getRows());
                                //si hay lugar
                                if(casilleroEmpty!=null){
                                    trasladarFicha(mousedown,casilleroEmpty);
                                    console.log("1 linea despues de trasladarFicha");
                                    casilleroEmpty.setIsEmpty(false);
                                    casilleroEmpty.setFicha(mousedown);
                                    mousedown.setClickable(false);//se inabilita la ficha para que se mueva.
                                    game.changeTurn();//se cambia el turno
                                    drawAll();
                                    let jugadorA = mousedown.getPlayer();
                                    setTimeout(()=>{     
                                        ganador = board.winner(jugadorA,casilleroEmpty);                                   
                                        console.log(ganador);
                                        if(ganador){
                                            console.log("4 en linea");
                                            //alert("4 en linea");
                                        }
                                    },2000);
                                }else{
                                    //volver a posicion inicial
                                    mousedown.setPosX(mousedown.startPosX);
                                    mousedown.setPosY(mousedown.startPosY);
                                    drawAll();
                                }

                            }else{
                                //volver a posicion inicial
                                mousedown.setPosX(mousedown.startPosX);
                                mousedown.setPosY(mousedown.startPosY);
                                console.log(mousedown.startPosX + "  " + mousedown.startPosY);
                                drawAll();
                            }
                            mousedown = null;
                        }
                    });

canvas.addEventListener('mousemove', (e)=>{
                        if(mousedown != null){
                            mousedown.setPosX(getX(e));
                            mousedown.setPosY(getY(e));
                            //pintar o despintar si se pasa por los casilleros receptores
                            for(let i=0; i<board.lockers[0].length;i++){
                                if(board.lockers[0][i].isPointInsided(getX(e),getY(e))){
                                    //console.log("estoy adentro del casillero ");
                                    board.lockers[0][i].setFill("#000000");
                                }else{
                                    board.lockers[0][i].setFill("#FFFF00");
                                }
                            }
                            drawAll();                           
                        }
                    });

function trasladarFicha(ficha,casillero){
    let posXficha=ficha.getPosX();
    let posYficha=ficha.getPosY();
    let posXcasillero=casillero.getPosX()+32.5;
    let posYcasillero=casillero.getPosY()+32.5;
    let velocidad = 1; // velocidad de movimiento (en milisegundos)
    

    if(posXficha<posXcasillero){

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


function rebote(ficha,pos,buttom,top){
    let sentido = true;
    let position = buttom ;
    let contador = 0;
    let i = 0;
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



function drawAll(){
    clearCanvas();
    board.draw();
    figuras.forEach(element => { 
        element.draw();
    });
}



//pos x - y
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

//carga de circulos en tablero
function loadCircle(cantFichas){

let heightPartial = 550;
for (let i = 0; i < cantFichas; i++){
    let c = new Circle(marginBoard/2, heightPartial,randomRGB(), ctx, 25,imgRobocop,"robocop");
    heightPartial = heightPartial - 7;
    figuras.push(c);
    c.draw();
}

heightPartial = 550;
for (let i = 0; i < cantFichas; i++){
    let c = new Circle(marginBoard + 820 + marginBoard/2, heightPartial,randomRGB(), ctx, 25, imgIroman,"ironman");
    heightPartial = heightPartial - 7;
    figuras.push(c);
    c.draw();
}

}


function isCircle(e){
    for(let i = 0; i < figuras.length; i++){
        if(figuras[i].isPointInsided(getX(e),getY(e))){
            return figuras[i];
        }
    }
}

}
