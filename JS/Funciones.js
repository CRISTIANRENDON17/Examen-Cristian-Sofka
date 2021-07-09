import Jugador from '../JS/Jugador.js';
import Pista from '../JS/Pista.js';
import Carro from '../JS/Carro.js';
import Carril from '../JS/Carril.js';
import Conductor from '../JS/Conductor.js';
import Juego from '../JS/Juego.js';

const ArrayJugadores = [];
const ArrayPista = [];

(()=>{
    swal("¡Bienvenido! \n Empezaras llenando un formulario \n el cual se va a ir habilitando y deshabilitando \n segun vayas avanzando \n ¡sigue las indicaciones y buena suerte!",""); 
})();


document.getElementById('IngresarJugadores').addEventListener('click', () => {
    let CJugadores = document.getElementById("CantidadJugadores").value;
    if (CJugadores === '') {
        swal("Hay cero Jugadores, por favor ingresa Jugadores","");
    } else {
        let Datos = document.getElementById("datos");
        Datos.innerHTML = "<div>";
        for (let i = 0; i < CJugadores; i++) {
            Datos.innerHTML += `
            <div class ="row">
                <div class="col-2">
                    <label><strong>Jugador ${i + 1}:</strong></label>
                </div>
                <div class="col-10">
                    <input type="text" class="form-control" id="Jugador${i + 1}" placeholder="Nombre">
                </div>
            </div>
            <br>
            `;
        }
        Datos.innerHTML += '</div>';
        let button = document.getElementById('IngresarJ');
        button.disabled = false;
        let button2 = document.getElementById('IngresarJugadores');
        button2.disabled = true;
        swal("¡Hola! Aqui podras colocar el nombre \n de tu personaje, pero si no quieres \n colocarlo, deja el campo vacio y la maquina \n te dara un nombre por defecto  \n ¡Buena suerte!","");
        
    }
    
    return null;
});

var cont = 0;//variable global
document.getElementById('IngresarJ').addEventListener('click', () => {
    let CJugadores = document.getElementById("CantidadJugadores").value;
    cont++;
    for(let i = 0; i < CJugadores ; i++)
    {
        let NombreJugador = document.getElementById(`Jugador${i + 1}`).value;
        if(NombreJugador === '')
        {
            NombreJugador = `Jugador${i + 1}`;
        }
        
        let jugador = new Jugador(NombreJugador,true);
        ArrayJugadores.push(jugador);
       
    }
        let button = document.getElementById('IngresarJ');
        button.disabled = true;
        let Datos = document.getElementById("datos");
        Datos.innerHTML = `<div><h4><strong>Lista de Jugadores</strong></h4><ul>`;
        ArrayJugadores.forEach(data => (data.getifConductor() === true)? Datos.innerHTML +=`<li><strong>${data.getNombre()}</strong></li>`:null);//recorre todo el Array
        Datos.innerHTML +=`</ul></div>`;
        //console.log(ArrayJugadores);
});

document.getElementById('IngresarCpu').addEventListener('click', () => {
    let CCpu = document.getElementById("CantidadCpu").value;
    if(CCpu != '')
    {
         for(let i = 0; i < CCpu ; i++)
        {
            let  NombreCpu = `CPU${i + 1}`;   
            let jugador = new Jugador(NombreCpu,false);
            ArrayJugadores.push(jugador);
        }
            let Datos = document.getElementById("datos2");
            Datos.innerHTML = `<div><h4><strong>Lista de CPU</strong></h4><ul>`;
            ArrayJugadores.forEach(data => (data.getifConductor() === false)? Datos.innerHTML +=`<li><strong>${data.getNombre()}</strong></li>`:null);//recorre todo el Array
            Datos.innerHTML +=`</ul></div>`;
            //console.log(ArrayJugadores);
            let button = document.getElementById('IngresarCpu');
            button.disabled = true;
    }else{
        swal("Ingrese minimo un Jugador CPU",""); 
    }
});

document.getElementById('Continuar').addEventListener('click', () => {

    if(ArrayJugadores.length === 0){
        swal("Ingresar Jugadores",""); 
    }
    else if(document.getElementById("CantidadJugadores").value != '' && cont === 0)
    {
        swal("Termina primero de \n ¡Ingresar Jugadores!",""); 
    }
    else{
        let data = document.getElementById('Parte1');
        data.innerHTML = '';
        let button = document.getElementById('parte1_1');
        button.innerHTML = '';
        let inputKilometros = document.getElementById('inputKilometros');
        inputKilometros.disabled = false;
        let cantidad = ArrayJugadores.length;
        document.getElementById("inputCCarriles").value = cantidad;
        document.getElementById("inputCCarros").value = cantidad;
        let botonparte2 = document.getElementById('botonparte2');
        botonparte2.disabled = false;   
        swal("Hola al llenar el campo de kilometros de la pista, ten en cuenta colocar pocos tipo maximo 6, para que el juego no se te haga muy largo, pero si no quieres, puedes colocar todos los que quieras","");     
    }
});

document.getElementById('botonparte2').addEventListener('click', () => {
    let inputKilometros = document.getElementById('inputKilometros').value;
    if(inputKilometros === '')
    {
        swal("Ingrese Kilometros",""); 
    }
    else{
        document.getElementById('BotonGuardarCarro').disabled = false;
        document.getElementById('inputKilometros').disabled = true;
        document.getElementById('parte2').innerHTML = '';
        let pista = new Pista(inputKilometros,ArrayJugadores.length,ArrayJugadores.length);
        ArrayPista.push(pista); 
        //------------------------------------------------
        let Datos = document.getElementById('ListaCarros');
        
        ArrayJugadores.forEach((data,i) => Datos.innerHTML += `
            <div class="col-4">
                <input class="form-control" type="text" value="Carril: ${i++ +1}" disabled>
            </div>    
            <div class="col-4">
                <input class="form-control" type="text" value="${data.getNombre()}" disabled>
            </div>
            <div class="col-4">
             <select class="form-control form-select-lg" id="Select${i++}">
                 <option value="">Seleccione un Carro</option>
                 <option value="McLaren 720S">McLaren 720S</option>
                 <option value="Porsche 911 GT2 RS">Porsche 911 GT2 RS</option>
                 <option value="Dodge Challenger RT">Dodge Challenger RT</option>
                 <option value="Lamborghini Huracan">Lamborghini Huracán</option>
               </select>
            </div>
            <div class='col-12'>
            <br>
            </div>
            `);
            swal("Hola!!!.... ahora ingresaras el carro, pero si te da pereza, no tienes que seleccionar nesesariamente uno, la maquina te dara uno por defecto si no colocas nada...",""); 
    }
    
});

document.getElementById('BotonGuardarCarro').addEventListener('click', () => {
    ArrayJugadores.forEach((data,i=0) => {

        let carril = new Carril(i++ +1);
        let carro;
        if(document.getElementById(`Select${i}`).value === '')
        {
            carro = new Carro('McLaren 720S');
        }
        else{
            carro = new Carro(document.getElementById(`Select${i}`).value);
        }
        let conductor = new Conductor(carril,carro);
        data.setConductorObjeto(conductor);
        document.getElementById(`Select${i}`).disabled = true;
        /*
        console.log(data.getNombre());//nombre
        console.log(data.getifConductor());//si es o no conductor o es la cpu
        console.log(data.getConductorObjeto().getCarril());//por que carril va
        console.log(data.getConductorObjeto().getCarro());//nombre del auto que maneja
        */
       
    });
    swal("Datos Guardado con exito","");
    document.getElementById('BotonGuardarCarro').disabled = true;
    document.getElementById('Jugar').disabled = false;
   
    let Data = new Juego(ArrayJugadores,ArrayPista); 
    //(probar(Data);
    // Lo parseamos a texto para guardarlo en el localStorage
    //lo maximo que guarda el localStorge es 10MB en google Chrome
    localStorage.setItem("Data", JSON.stringify(Data));

});

