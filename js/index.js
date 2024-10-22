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

//eventos de creacion de juegos segun clickeo
typeGame4.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 8;
    let rows = 7;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(21);
});

typeGame5.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 10;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(36);
});

typeGame6.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 11;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(40);
});

typeGame7.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 12;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle(44);
});

let board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,widthBoard,heightBoard);


canvas.addEventListener('mousedown', (e)=>{
                        let figura = isCircle(e);
                        if(figura != null&&figura.isClickable()){
                            console.log("clickeada")
                            mousedown = figura;
                            
                        }
                        drawAll();
                    });



canvas.addEventListener('mouseup', (e)=>{

                        if(mousedown != null){
                            //buscar el casillero receptor
                            let casilleroReceptor = board.isAnyLockerPointInsided(getX(e),getY(e));
                            //si encontro casillero receptor busca la columna
                            if(casilleroReceptor!=null){                    
                                let casilleroEmpty = board.getLokerEmptyInColumn(casilleroReceptor.getColumn(),board.getRows());
                                //si hay lugar
                                if(casilleroEmpty!=null){
                                    mousedown.setPosX(casilleroEmpty.getPosX()+32.5);
                                    mousedown.setPosY(casilleroEmpty.getPosY()+32.5);
                                    casilleroEmpty.setIsEmpty(false);
                                    mousedown.setClickable(false);//se inabilita la ficha para que se mueva.
                                    drawAll();
                                }else{
                                    //volver a posicion inicial
                                    alert("esta lleno volver a intentar");
                                    mousedown.setPosX(mousedown.startPosX);
                                    mousedown.setPosY(mousedown.startPosY);
                                    drawAll();
                                }

                            }else{
                                alert("no la posicion es incorrecta, volver a intentar");
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
    let c = new Circle(marginBoard/2, heightPartial,randomRGB(), ctx, 25,imgRobocop);
    heightPartial = heightPartial - 7;
    figuras.push(c);
    c.draw();
}

heightPartial = 550;
for (let i = 0; i < cantFichas; i++){
    let c = new Circle(marginBoard + 820 + marginBoard/2, heightPartial,randomRGB(), ctx, 25, imgIroman);
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




