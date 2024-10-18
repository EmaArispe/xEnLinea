class Circle extends Figure{
    constructor(posX,posY,fill,context,radius){
        super(posX,posY,fill,context);
        this.radius = radius; 
    }
    

    
    getRadius(){return this.radius;}
    
    draw(){
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
    }

    isPointInsided(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    
}