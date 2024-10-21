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
    const marginBoard = (width - 770) /2;//seteos de tamanio de tablero
    const marginSupBoard = (height - 600);
    board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,800,600);
    let columns = 7;
    let rows = 7;
    board.createLokers(columns,rows);
    clearCanvas();
    board.draw();
    loadCircle();
});

typeGame5.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    const marginBoard = (width - 800) /2;//seteos de tamanio de tablero
    const marginSupBoard = (height - 600);
    board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,800,600);
    let columns = 16;
    let rows = 12;
    board.createLokers(columns,rows);
    clearCanvas();
    board.draw();
    loadCircle();
});

typeGame6.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 20;
    let rows = 15;
    board.createLokers(columns,rows);
    clearCanvas();
    board.draw();
    loadCircle();
});

typeGame7.addEventListener('click',()=>{
    //selectGame.classList.add("hidden");
    let columns = 32;
    let rows = 24;
    board.createLokers(columns,rows);
    clearCanvas();
    board.draw();
    loadCircle();
});


const marginBoard = (width - 800) /2;//seteos de tamanio de tablero
const marginSupBoard = (height - 600);

let board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,800,600);

/*
canvas.addEventListener('mousedown', (e)=>{
                        let figura = isCircle(e);
                        if(figura != null){
                            mousedown = figura;
                        }
                        drawAll();
                    });



canvas.addEventListener('mouseup', (e)=>{
                        if(mousedown != null){
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
*/
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

function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


let imgRobocop = new Image();
    imgRobocop.src = '/robocop.jpg';


    let imgIroman = new Image();
    imgIroman.src = '/iroman.jpg';



function loadCircle(){

let heightPartial = 550;
for (let i = 0; i < 10; i++){
    let c = new Circle(marginBoard/2, heightPartial,randomRGB(), ctx, 30,imgRobocop);
    heightPartial = heightPartial - 20;
    figuras.push(c);
    c.draw();
}

heightPartial = 550;

for (let i = 0; i < 10; i++){
    let c = new Circle(marginBoard + 630 + marginBoard/2, heightPartial,randomRGB(), ctx, 30, imgIroman);
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




