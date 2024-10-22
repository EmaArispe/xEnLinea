class Circle extends Figure{

    #radius
    #img

    constructor(posX,posY,fill,context,radius,img,player){
        super(posX,posY,fill,context);
        this.#radius = radius; 
        this.#img = img;
        this.clickable=true;
        this.player=player;
    }
 
    get img(){return this.#img;}
    set img(img){this.#img = img;}
    
    get radius(){return this.#radius;}
    
    draw(){
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
        this.context.save();
        this.context.clip();
        this.context.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        this.context.restore();
    }

    //detecta si el puntero esta dentro de la superficie del circulo
    isPointInsided(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

    
    setClickable(e){
        this.clickable=e;
    }

    //devuelve si la ficha se puede clickear.
    isClickable(){
        return this.clickable;
    }

    //devuelve el nombre del jugador
    getPlayer(){
        return this.player;
    }

    
}