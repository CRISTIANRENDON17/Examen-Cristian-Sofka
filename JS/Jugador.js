//import Conductor from "./Conductor.js";

class Jugador{
     constructor(nombre,ifconductor) {
         this.nombre = nombre;
         this.ifconductor = ifconductor;
     }
     getNombre(){
         return this.nombre;
     }
     getifConductor(){
         return this.ifconductor;
     }
     setConductorObjeto(Conductor){
         this.Conductor = Conductor;
     }
     getConductorObjeto()
     {
         return this.Conductor;
     }
   /*  setConductorData(ConductorData)
     {
        Conductor.ConductorData = ConductorData;
     }*/
 }

export default Jugador;