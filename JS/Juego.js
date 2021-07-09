class Juego{
    constructor(ArrayJugadores, ArrayPista) {
        this.ArrayJugadores = ArrayJugadores;
        this.Pista = ArrayPista;
    }
    setArrayJugadores(ArrayJugadores){
        this.ArrayJugadores = ArrayJugadores;
    }
    setArrayPista(ArrayPista){
        this.ArrayPista = ArrayPista;
    }
    getArrayJugadores(){
        return this.ArrayJugadores;
    }
    getDArrayPista(){
        return this.ArrayPista;
    }
}
export default Juego;