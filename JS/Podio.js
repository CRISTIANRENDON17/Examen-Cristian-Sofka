class Podio {
  constructor(PosUno, PosDos, PosTres) {
    this.PosUno = PosUno;
    this.PosDos = PosDos;
    this.PosTres = PosTres;
  }

  text(){
      return( `
      ----------¡PODIO!----------- 
      Primer puesto:${this.PosUno}  
      Segundo puesto:${this.PosDos} 
      Tercer puesto:${this.PosTres}`);
  }

  GenerarArchivoDeTexto() {
    var textFile = null;
    var data = new Blob([this.text()], {type: 'text/plain'});
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  }
}

export default Podio;
