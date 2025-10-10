function validarEntrada(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d .]/; 
    var codigo = String.fromCharCode(teclado);

    if(codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; 
    }

    return patron.test(codigo);
}

function calcularCalificacion(){

    var primerParcial = document.getElementById("cal1").value;
    var segundoParcial = document.getElementById("cal2").value;
    var tercerParcial = document.getElementById("cal3").value;
    var calificacionExamen = document.getElementById("examen").value;
    var trabajoFinal = document.getElementById("trabajo").value;

    if(!primerParcial || isNaN(primerParcial) || primerParcial < 0 || primerParcial > 10){
        alert("Ingrese una calificacion valida en el primer parcial");
        return;
    }

    if(!segundoParcial || isNaN(segundoParcial) || segundoParcial < 0 || segundoParcial > 10){
        alert("Ingrese una calificacion valida en el segundo parcial");
        return;
    }

    if(!tercerParcial || isNaN(tercerParcial) || tercerParcial < 0 || tercerParcial > 10){
        alert("Ingrese una calificacion valida en el tercer parcial");
        return;
    }

    if(!calificacionExamen || isNaN(calificacionExamen) || calificacionExamen < 0 || calificacionExamen > 10){
        alert("Ingrese una calificacion valida en el examen");
        return;
    }

    if(!trabajoFinal || isNaN(trabajoFinal) || trabajoFinal < 0 || trabajoFinal > 10){
        alert("Ingrese una calificacion valida en el trabajo final");
        return;
    }

    parseoPrimerParcial = parseFloat(primerParcial);
    parseoSegundoParcial = parseFloat(segundoParcial);
    parseoTercerParcial = parseFloat(tercerParcial);
    parseoExamen = parseFloat(calificacionExamen);
    parseoTrabajoFinal = parseFloat(trabajoFinal);

    promedioParcial = (parseoPrimerParcial + parseoSegundoParcial + parseoTercerParcial)/3;
    porcentajeParcial = (promedioParcial*55)/10;
    porcentajeExamen = (parseoExamen*30)/10;
    porcentajeTrabajo = (parseoTrabajoFinal*15)/10;
    porcentajeTotal = porcentajeParcial + porcentajeExamen + porcentajeTrabajo;
    calFinal = porcentajeTotal/10;
    calFinal = calFinal.toFixed(2);

    document.getElementById("calfinal").value = calFinal;
}

function clean(){
    document.getElementById("calfinal").value = "";
    document.getElementById("cal1").value = "";
    document.getElementById("cal2").value = "";
    document.getElementById("cal3").value = "";
    document.getElementById("examen").value = "";
    document.getElementById("trabajo").value = "";
}