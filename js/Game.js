
class Game {

    constructor(playerA, playerB,combinations){
        this.playerA=playerA;
        this.playerB=playerB;
        this.combinations=combinations;
        this.turn = null;
    }


    

    //setea aleatoriamente el turno de quien juega.
    setFirstTurn(){
        let i = Math.round(Math.random());
        if(i > 0){
            this.turn=this.playerA;
            return this.playerA;
        }else{
            this.turn=this.playerB;
            return this.playerB
        }
    }

    
    //cambio de turno
    changeTurn(){
        if(this.turn===this.playerA){
            this.turn=this.playerB;
        }else{
            this.turn =this.playerA;
        }
    }

    //devuelve si es el turno de quien intenta jugar
    isTurn(player){
        return(this.turn===player)
    }


}