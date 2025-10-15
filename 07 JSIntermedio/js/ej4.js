function validarTeclado(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d .]/; //Falta validar que no pueda poner mas de un punto
    var codigo = String.fromCharCode(teclado);

    if(codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; //Ya no puede poner mas de un punto
    }

    return patron.test(codigo);
}

function validarTecladoA(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d ]/; 
    var codigo = String.fromCharCode(teclado);

    return patron.test(codigo);
}

function calcularUtilidad(){
    var sueldo = parseFloat(document.getElementById('sueldo').value);
    var antiguedad = parseFloat(document.getElementById('antiguedad').value);

    if (isNaN(sueldo) || isNaN(antiguedad) || !sueldo || !antiguedad) {
        alert('Por favor, ingrese valores válidos');
        return;
    }

    var porcentaje;
    if (antiguedad < 1) {
        porcentaje = 5;
    } else if (antiguedad >= 1 && antiguedad < 2) {
        porcentaje = 7;
    } else if (antiguedad >= 2 && antiguedad < 5) {
        porcentaje = 10;
    } else if (antiguedad >= 5 && antiguedad < 10) {
        porcentaje = 15;
    } else {
        porcentaje = 20;
    }

    var utilidad = (sueldo * 12) * (porcentaje / 100);
    utilidad = utilidad.toFixed(2);

    document.getElementById("utilidad").value = "$ " + utilidad;

}

function clean() {
    document.getElementById('sueldo').value = '';
    document.getElementById('antiguedad').value = '';
    document.getElementById('utilidad').value = '';
}
