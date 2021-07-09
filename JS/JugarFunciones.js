//traemos los datos desde el LocalStorage de google Chrome
import Podio from "../JS/Podio.js";
const data = JSON.parse(localStorage.getItem("Data"));
const { ArrayJugadores, Pista } = data;
const ArrayJuego = [];
var contador = 0; //variable globar
var contador2 = 0; //variable global
var KmPista = 0; //variable global
var bandera = false; //variable global

class Aux {
  constructor(nombre, carril, km, nombreCarro, ifConductor, pos) {
    this.nombre = nombre;
    this.carril = carril;
    this.km = km;
    this.nombreCarro = nombreCarro;
    this.ifConductor = ifConductor;
    this.pos = pos;
  }
  getPos() {
    return this.pos;
  }
  getifConductor() {
    return this.ifConductor;
  }
  getNombre() {
    return this.nombre;
  }
  getCarril() {
    return this.carril;
  }
  getKm() {
    return this.km;
  }
  getNombreCarro() {
    return this.nombreCarro;
  }
  setKm(km) {
    this.km = km;
  }
  setifConductor(ifConductor) {
    this.ifConductor = ifConductor;
  }
  setPos(pos) {
    this.pos = pos;
  }
}

window.onload = function () {
  if (ArrayJuego[contador2].getifConductor() === false) {
    //swal("Maquina Jugando \n Turno de " + ArrayJuego[contador2].getNombre(),"");
    document.getElementById("Tirar_Dado").disabled = true;
    LanzarDado();
  } else {
    //swal("Turno de " + ArrayJuego[contador2].getNombre() + "\n ¡Tira del Dado! :D","");
  }
};

document.getElementById("Volver_Jugar").addEventListener("click", ()=>{
  window.location.reload(); 
});


document.getElementById("Tirar_Dado").addEventListener("click", LanzarDado);

function LanzarDado() {
  if (bandera === false) {
    //console.log(dataFromlocalStorage);
    let NumeroAleatorio = Math.floor(Math.random() * (1 - 7)) + 7;
    dado(NumeroAleatorio); //funcion que tira el dado

    let auxPos = BuscarOrden(contador2);
    ArrayJuego[auxPos].setKm(
    ArrayJuego[auxPos].getKm() + NumeroAleatorio * 100
    ); //guarda el kilometraje del dado

    //document.getElementById("Turno_de").innerHTML = `Turno de: ${ArrayJuego[auxPos].getNombre()}`;
    OrdenarArrayJuego();
    //ArrayJuego[contador2].getKm =
    if (contador2 === contador - 1) {
      contador2 = -1;
    }
    //console.log(contador2,KmPista);
    contador2++;
    if(bandera === false){
      setTimeout(function () {
      let aux1 = BuscarOrden(contador2);
      document.getElementById("Turno_de").innerHTML = ` ${ArrayJuego[aux1].getNombre()}`;
      if (ArrayJuego[aux1].getifConductor() === false) {
        //swal("Maquina Jugando \nTurno de " + ArrayJuego[aux1].getNombre(), "");
        document.getElementById("Tirar_Dado").disabled = true;
        LanzarDado();
      } else {
        //swal("Turno de " + ArrayJuego[aux1].getNombre() + "\n ¡Tira del Dado! :D","");
        dado(0);
        document.getElementById("Tirar_Dado").disabled = false;
      }
    }, 1500);
    document.getElementById("Tirar_Dado").disabled = true;
    }
  } else if (bandera === true) {
    document.getElementById("Turno_de").innerHTML = `GANADOR: ${ArrayJuego[0].getNombre()}`;
    document.getElementById("Tirar_Dado").disabled = false;
    MostrarPodio();
    
  }
}

function MostrarPodio()
{
  let podio = new Podio('11','22','33');
  if(ArrayJuego.length == 1){
      podio = new Podio(ArrayJuego[0].getNombre(),'-----','-----');
      podio.GenerarArchivoDeTexto();
    swal("El ganador es: " + ArrayJuego[0].getNombre(), "");
  }
  else if(ArrayJuego.length == 2){
      podio = new Podio(ArrayJuego[0].getNombre(),ArrayJuego[1].getNombre(),'-----');
      podio.GenerarArchivoDeTexto();
    swal("¡Podio!", "Primero: " + ArrayJuego[0].getNombre() + "\nSegundo: " + ArrayJuego[1].getNombre() );
  }
  if(ArrayJuego.length >= 3){
      podio = new Podio(ArrayJuego[0].getNombre(),ArrayJuego[1].getNombre(),ArrayJuego[2].getNombre());
      podio.GenerarArchivoDeTexto();
    swal("¡Podio!", "Primero: " + ArrayJuego[0].getNombre() + "\nSegundo: " + ArrayJuego[1].getNombre() + "\nTercero: " + ArrayJuego[2].getNombre());
  }
  let link = document.getElementById('downloadlink');
  link.href = podio.GenerarArchivoDeTexto();
  document.getElementById('ContenedorDescargarPodio').style.display = 'block';
  link.style.display = 'block';
}

function BuscarOrden(number) {
  let salida = true;
  let i = 0;
  let auxPos;
  do {
    if (ArrayJuego[i].getPos() === number) {
      auxPos = i;
      salida = false;
    }
    i++;
  } while (salida != false);
  return auxPos;
}

//ordena de mayor a menor
function OrdenarArrayJuego() {
  for (let k = 0; k < ArrayJuego.length; k++) {
    for (let f = 0; f < ArrayJuego.length - k - 1; f++) {
      if (ArrayJuego[f].getKm() < ArrayJuego[f + 1].getKm()) {
        let aux;
        aux = ArrayJuego[f];
        ArrayJuego[f] = ArrayJuego[f + 1];
        ArrayJuego[f + 1] = aux;
      }
    }
  }

  ImprimirTabla();
}
function ImprimirTabla() {
  let tabla = document.getElementById("TablaPosiciones");
  tabla.innerHTML = "";
  tabla.innerHTML = `
  <div class="row">
    <div class="col-3" style="color:red; font-size:16px;"><strong>Puesto</strong></div>
    <div class="col-3" style="color:red; font-size:16px;"><strong>Nombre</strong></div>
    <div class="col-3" style="color:red; font-size:16px;"><strong>Carril</strong></div>
    <div class="col-3" style="color:red; font-size:16px;"><strong>Metros</strong></div>
  </div>
  `;
  ArrayJuego.forEach((data, i = 0) => {
    tabla.innerHTML += `
      <div class="row">
      <div class="col-3 text-center"><strong>${i++ + 1}</strong></div>
      <div class="col-3"><strong>${data.getNombre()}</strong></div>
      <div class="col-3 text-center"><strong>${data.getCarril()}</strong></div>
      <div class="col-3"><strong>${data.getKm()}</strong></div>
      </div>
      `;
    PinatarCarros(data, i);
  });
}

function PinatarCarros(data, i) {
  let numero = KmPista;
  let x = (( 450 * data.getKm())/numero);
  if(x >= 460){
    x = 460;
  }
  if (i === 1) {
    document.getElementById("Pista_1").innerHTML = `
    <div style="position:absolute; z-index:1; margin: 30px 0 0 ${x}px;">
      <div style="background: aliceblue; width: 150px; height: 25px; text-align: center;margin: 0 0 0 50px;">
        <h5><strong>Pos ${i} - ${data.getNombre()}</strong></h5>
      </div>
      <img src="./IMG/${data.getNombreCarro()}.png">
    </div>`;
  } else if (i === 2) {
    document.getElementById("Pista_2").innerHTML = `
    <div style="position:absolute; z-index:1; margin: 30px 0 0 ${x}px;">
      <div style="background: aliceblue; width: 150px; height: 25px; text-align: center;margin: 0 0 0 50px;">
        <h5><strong>Pos ${i} - ${data.getNombre()}</strong></h5>
      </div>
      <img src="./IMG/${data.getNombreCarro()}.png">
    </div>`;
  } else if (i === 3) {
    document.getElementById("Pista_3").innerHTML = `
    <div style="position:absolute; z-index:1; margin: 30px 0 0 ${x}px;">
      <div style="background: aliceblue; width: 150px; height: 25px; text-align: center;margin: 0 0 0 50px;">
        <h5><strong>Pos ${i} - ${data.getNombre()}</strong></h5>
      </div>
      <img src="./IMG/${data.getNombreCarro()}.png"  >
    </div>`;
  }

  if (ArrayJuego[0].getKm() >= KmPista) {
    MostrarPodio();
    bandera = true;
  }
}

(() => {
  //funcion autoEjecutable
  let tabla = document.getElementById("TablaPosiciones");
  tabla.innerHTML = `
    <div class="row">
      <div class="col-3" style="color:red; font-size:16px;"><strong>Puesto</strong></div>
      <div class="col-3" style="color:red; font-size:16px;"><strong>Nombre</strong></div>
      <div class="col-3" style="color:red; font-size:16px;"><strong>Carril</strong></div>
      <div class="col-3" style="color:red; font-size:16px;"><strong>Metros</strong></div>
    </div>
    `;
  //console.log(data);

  ArrayJugadores.forEach((data, i = 0) => {
    let {
      nombre,
      Conductor: {
        Carril: { NumeroCarril },
        Carro,
      },
      ifconductor,
    } = data;
    let aux = new Aux(nombre, NumeroCarril, 0, Carro.nombre, ifconductor, i);
    //console.log(aux);
    ArrayJuego.push(aux);
    tabla.innerHTML += `
      <div class="row">
      <div class="col-3 text-center"><strong>${i++ + 1}</strong></div>
      <div class="col-3"><strong>${nombre}</strong></div>
      <div class="col-3 text-center"><strong>${NumeroCarril}</strong></div>
      <div class="col-3"><strong>0</strong></div>
      </div>
      `;
    if (i === 1) {
      document.getElementById("Turno_de").innerHTML = ` ${nombre}`;
      document.getElementById("Pista_1").innerHTML = `
        <div style="position:absolute; z-index:1; margin: 30px 0 0 0px;">
          <div style="background: aliceblue; width: 150px; height: 25px; text-align: center;margin: 0 0 0 50px;">
            <h5><strong>Pos ${i} - ${nombre}</strong></h5>
          </div>
          <img src="./IMG/${Carro.nombre}.png">
        </div>`;
    } else if (i === 2) {
      document.getElementById("Pista_2").innerHTML = `
        <div style="position:absolute; z-index:1; margin: 30px 0 0 0px;">
          <div style="background: aliceblue; width: 150px; height: 25px; text-align: center;margin: 0 0 0 50px;">
          <h5><strong>Pos ${i} - ${nombre}</strong></h5>
          </div>
          <img src="./IMG/${Carro.nombre}.png"  >
        </div>`;
    } else if (i === 3) {
      document.getElementById("Pista_3").innerHTML = `
        <div style="position:absolute; z-index:1; margin: 30px 0 0 0px;">
          <div style="background: aliceblue; width: 150px; height: 25px; text-align: center;margin: 0 0 0 50px;">
          <h5><strong>Pos ${i} - ${nombre}</strong></h5>
          </div>
          <img src="./IMG/${Carro.nombre}.png"  >
        </div>`;
    }
    //console.log(nombre);
    //console.log(NumeroCarril);
  });
  Pista.forEach((Pista) => {
    let { Distancia, CantidadCarriles, CantidadCarros } = Pista;
    document.getElementById(
      "InfoCarrera"
    ).innerHTML = ` Carrera - Distancia: ${Distancia}Km - Carriles: ${CantidadCarriles} - Autos: ${CantidadCarros}`;
    KmPista = Distancia * 1000;
  });
  //console.log(ArrayJuego);
  contador = ArrayJuego.length;
})();

function dado(numero) {
  let dado = document.getElementById("Dado");
  dado.innerHTML = "";
  switch (numero) {
    case 0: {
      dado.innerHTML = ``;
      break;
    }
    case 1: {
      dado.innerHTML = `<div class="cinco"></div>`;

      break;
    }
    case 2: {
      dado.innerHTML = `<div class="primero"></div>
                        <div class="cuarto"></div>`;
      break;
    }
    case 3: {
      dado.innerHTML = `<div class="primero"></div>
                          <div class="cinco"></div>
                          <div class="cuarto"></div>`;
      break;
    }
    case 4: {
      dado.innerHTML = `<div class="primero"></div>
                          <div class="segundo"></div>
                          <div class="tercero"></div>
                          <div class="cuarto"></div>`;
      break;
    }
    case 5: {
      dado.innerHTML = `<div class="primero"></div>
                          <div class="segundo"></div>
                          <div class="cinco"></div>
                          <div class="tercero"></div>
                          <div class="cuarto"></div>`;
      break;
    }
    case 6: {
      dado.innerHTML = `<div class="primero"></div>
                          <div class="segundo"></div>
                          <div class="seis"></div>
                          <div class="siete"></div>
                          <div class="tercero"></div>
                          <div class="cuarto"></div>`;
      break;
    }
  }
}
