function validarn(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d .]/; //Falta validar que no pueda poner mas de un punto
    var codigo = String.fromCharCode(teclado);

    if(codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; //Ya no puede poner mas de un punto
    }

    return patron.test(codigo);
}

function interes(){
    var valor = document.getElementById("cantidadi").value;
    alert(valor);
    var parseo = parseFloat(valor);
    alert(parseo);
    var interes = parseo * 0.085;
    alert(interes);
    var total = interes + parseo; 

    // Limitar el total a dos decimales
    total = total.toFixed(2);
    alert(total);

    document.getElementById("saldoi").value = "$ " + total;
}

function borrari(){
    document.getElementById("saldoi").value = "";
    document.getElementById("cantidadi").value = "";
}
