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

    if(!primerParcial || isNaN(primerParcial || primerParcial < 0 || primerParcial > 10)){
        alert("Ingrese una calificacion valida en el primer parcial");
        return;
    }

    if(!segundoParcial || isNaN(segundoParcial || segundoParcial < 0 || segundoParcial > 10)){
        alert("Ingrese una calificacion valida en el segundo parcial");
        return;
    }

    if(!tercerParcial || isNaN(tercerParcial || tercerParcial < 0 || tercerParcial > 10)){
        alert("Ingrese una calificacion valida en el tercer parcial");
        return;
    }

    if(!calificacionExamen || isNaN(calificacionExamen || calificacionExamen < 0 || calificacionExamen > 10)){
        alert("Ingrese una calificacion valida en el examen");
        return;
    }

    if(!trabajoFinal || isNaN(trabajoFinal || trabajoFinal < 0 || trabajoFinal > 10)){
        alert("Ingrese una calificacion valida en el trabajo final");
        return;
    }


}