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
    loadCircle();
});

typeGame5.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 10;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle();
});

typeGame6.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 11;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle();
});

typeGame7.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 12;
    let rows = 8;
    board.createLokers(columns,rows,widthBoard,heightBoard);
    clearCanvas();
    board.draw();
    loadCircle();
});

let board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,widthBoard,heightBoard);


canvas.addEventListener('mousedown', (e)=>{
                        let figura = isCircle(e);
                        if(figura != null){
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
                                console.log("tamoactivo");
                                let casilleroEmpty = board.getLokerEmptyInColumn(casilleroReceptor.getColumn(),board.getRows());
                                //si hay lugar
                                if(casilleroEmpty!=null){
                                    mousedown.setPosX(casilleroEmpty.getPosX()+32.5);
                                    mousedown.setPosY(casilleroEmpty.getPosY()+32.5);
                                    casilleroEmpty.setIsEmpty(false);
                                    drawAll();
                                }else{
                                    console.log("esta completo");
                                    mousedown.setPosX(500);
                                    mousedown.setPosY(500);
                                    drawAll();
                                }

                            }else{
                                console.log("notamoactivo");
                                mousedown.setPosX(500);
                                mousedown.setPosY(500);
                                drawAll();
                            }
                            mousedown = null;
                        }
                    });

canvas.addEventListener('mousemove', (e)=>{
                        if(mousedown != null){
                            mousedown.setPosX(getX(e));
                            mousedown.setPosY(getY(e));
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
function loadCircle(){

let heightPartial = 550;
for (let i = 0; i < 10; i++){
    let c = new Circle(marginBoard/2, heightPartial,randomRGB(), ctx, 25,imgRobocop);
    heightPartial = heightPartial - 20;
    figuras.push(c);
    c.draw();
}

heightPartial = 550;

for (let i = 0; i < 10; i++){
    let c = new Circle(marginBoard + 820 + marginBoard/2, heightPartial,randomRGB(), ctx, 25, imgIroman);
    heightPartial = heightPartial - 20;
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




