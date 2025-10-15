function validarTeclado(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d ]/; 
    var codigo = String.fromCharCode(teclado);

    return patron.test(codigo);
}

function validarTecladoPago(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d .]/; //Falta validar que no pueda poner mas de un punto
    var codigo = String.fromCharCode(teclado);

    if(codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; //Ya no puede poner mas de un punto
    }

    return patron.test(codigo);
}

function calcularSueldo(){

    //Obtener campos
    var horasTrabajadasInput = document.getElementById("horas").value;
    var pagoHoraInput = document.getElementById("pagoPorHora").value;

    var horasTrabajadas = parseInt(horasTrabajadasInput);
    var pagoHora = parseFloat(pagoHoraInput);

    if (isNaN(horasTrabajadas) || isNaN(pagoHora)) {
        alert("Por favor, ingrese valores válidos en ambos campos");
        return;
    }

    if (horasTrabajadas < 0 || pagoHora < 0) {
        alert("Los valores deben ser números positivos");
        return;
    }

    var sueldo = 0;

    if(horasTrabajadas <= 40){
        sueldo = horasTrabajadas*pagoHora;
    } else{

        sueldo = 40*pagoHora;

        var horasExtra = horasTrabajadas - 40;

        if (horasExtra <= 8) {
            sueldo += horasExtra * (pagoHora * 2);
        } else {
            sueldo += 8 * (pagoHora * 2);
            
            var horasTriple = horasExtra - 8;
            sueldo += horasTriple * (pagoHora * 3);
        }

    }

    document.getElementById("sueldo").value = "$ " + sueldo;

}

function clean(){
    document.getElementById("horas").value="";
    document.getElementById("pagoPorHora").value="";
    document.getElementById("sueldo").value="";
}