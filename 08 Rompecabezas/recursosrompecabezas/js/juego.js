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
    //Correcion QA - CP-003 - Mover piezas
    var pos1 = rompe[filaPos1][columnaPos1]; 
    var pos2 = rompe[filaPos2][columnaPos2];

    //Correcion QA - CP-003 - Mover piezas
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

//Funcion que se encargue de saber donde esta la pieza vacia
function actualizarPosicionPiezaVacia(nuevaFila,nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//Necesitamos limitar las posiciones del rompecabezas
function posicionValida(fila, columna){
    return(fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//Debemos de crear una funcion que se encargue del movimiento detectando el evento de las flechas de navegacion.
//Debemos crear una matriz de identificacionde mov,
//arriba es 38, abajo es 40, izquierda es 37, derecha es 39

var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
}; //Es formato JSON

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    //si se mueve
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    } else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    //mando a llamar a que la posicion sea valida
    if(posicionValida(nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia)){

        //tengo que hacer una funcion que se encargue de intercambiar las posiciones
        intercambiarPosiciones(filaVacia,columnaVacia,nuevaFilaPiezaVacia,nuevaColumnaPiezaVacia);
        
        actualizarPosicionPiezaVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

        //Correcion QA CP-003 - Mover piezas
        actualizarUltimoMovimiento(direccion);

    }

}


function intercambiarPosiciones(fila1, columna1, fila2, columna2){

    //CORRECCION QA CP-003 Mover piezas
    var pieza1 = rompe[fila1][columna1]; 
    var pieza2 = rompe[fila2][columna2];

    //Intercambio ya debe de ser parte de los frames y el html
    intercambiarPosicionesRompe(fila1,columna1,fila2,columna2);

    intercambiarPosicionesDOM('pieza'+pieza1, 'pieza'+pieza2);
}

function intercambiarPosicionesDOM(idPieza1,idPieza2){

    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    //vamos a clonarla
    var padre = pieza1.parentNode;

    //lo clono
    var cloneElemento1 = pieza1.cloneNode(true);
    var cloneElemento2 = pieza2.cloneNode(true);

    //Reemplazar a los padres con sus clones
    padre.replaceChild(cloneElemento1,pieza2);
    padre.replaceChild(cloneElemento2,pieza1);

}

//debo de actualizar los movimientos en el DOM
function actualizarUltimoMovimiento(direccion){
    var ultimoMovimiento = document.getElementById("flecha");

    //CORRECCION QA -  CP-004 - No se habian colocado las flechas de derecha e izquierda
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent ="↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent ="↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent ="→"; //QA
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent ="←"; //QA
            break;

    }
}

//Necesitamos poder mezclar todas las piezas
function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Asi no se puede");
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];

    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function(){
        mezclarPiezas(veces-1);
    }, 100);

}

//Necesitamos saber que teclas estan oprimiendo
function capturarTeclas(){
    document.body.onkeydown = (function(evento){
        if(evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.DERECHA || evento.which === codigosDireccion.IZQUIERDA){
            moverEnDireccion(evento.which);

            //saber si gano
            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                },500);
            }
            evento.preventDefault();

        }
    });
}

function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();

}

//Mandamos traer a la funcion
//CORRECCION MUESTRA LAS INSTRUCCIONES
mostrarInstrucciones(instrucciones);

iniciar();

