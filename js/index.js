"use strict";

//inicio de canvas
let canvas = document.querySelector('#canvas'); 
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const marginBoard = (width - (7*90)) /2;
const marginSupBoard = (height - 6*90);

let figuras = [];

const marginx = 50;
const rect = canvas.getBoundingClientRect()//constante para tomar distancia y calcular x/y
const backgroudCanvas = '#9B9B9B'


let mousedown = null;

let board = new Board(marginBoard,marginSupBoard,randomRGB(),ctx,630,550);

board.draw();


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


function loadCircle(){

let heightPartial = 550;
for (let i = 0; i < 10; i++){
    let c = new Circle(marginBoard/2, heightPartial,randomRGB(), ctx, 20);
    heightPartial = heightPartial - 10;
    figuras.push(c);
    c.draw();
}

heightPartial = 550;

for (let i = 0; i < 10; i++){
    let c = new Circle(marginBoard + 630 + marginBoard/2, heightPartial,randomRGB(), ctx, 20);
    heightPartial = heightPartial - 10;
    figuras.push(c);
    c.draw();
}

}


loadCircle();

function isCircle(e){
    for(let i = 0; i < figuras.length; i++){
        if(figuras[i].isPointInsided(getX(e),getY(e))){
            return figuras[i];
        }
    }
}




