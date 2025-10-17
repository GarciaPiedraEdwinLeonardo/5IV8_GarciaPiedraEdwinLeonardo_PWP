var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas, ",
    "Para ordenar las piezas guiate por la imagen Objetivo",
];  


//Vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimiento = [];

//Vamos a crear una matriz para saber las posiciones del rompecabezas

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

//Vamos a tener que crear una matriz donde tengamos las posiciones correctas

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];

//Necesito saber la coordenada de la pieza vacia (la que se va mover)
var filaVacia = 2;
var columnaVacia = 2;

//Necesito ahora si una funcion que se encargue de mostrar las instrucciones

function mostrarInstrucciones(instrucciones){

    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesDeLista(instrucciones[i], "lista-instrucciones");
    }

}

//Esta funcion se encarga de crear el componente <li> agregar la lista de dichas instrucciones

function mostrarInstruccionesDeLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}


//Crear una funcion para checar si gano

function checarSiGano(){
    for(var i=0;i<rompe.length;i++){
        for(var j=0;j<rompe.length;j++){
            var rompeActual = rompe[i][j];

            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }

    return true;
}

//Mostrar en HTML si se gano

function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Ganaste");
    }
    return false;
}

/*
    Necesitamos una funcion que se encargue de poder intercambiar las posiciones
    de la pieza vacia vs cualquiera, para esto, tenemos que hacer el uso de:
    arreglo[][] = posicion[][];
    //Intercambiar
    posicion[][] = arreglo[][]
*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var pos1 = rompe[filaPos1, columnaPos1];
    var pos2 = rompe[filaPos2, columnaPos2];

    //Intercamnbio
    rompe[filaPos1, columnaPos1] = pos2;
    rompe[filaPos2, columnaPos2] = pos1
}


function iniciar(){
    //Mezclar las piezas
    //Capturar el ultimo movimiento
}

//Mandamos traer a la funcion

mostrarInstrucciones(instrucciones);