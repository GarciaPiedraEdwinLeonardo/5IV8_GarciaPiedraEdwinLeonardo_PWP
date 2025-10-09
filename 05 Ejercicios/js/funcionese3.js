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

function calcularDescuento(){
    var totalCompra = document.getElementById("compra").value;

    if(!totalCompra || isNaN(totalCompra) || totalCompra <= 0 || totalCompra > 999999999){
        alert("Ingrese un total de compra valido");
        return;
    }

    parseoTotal = parseFloat(totalCompra);
    descuento = parseoTotal*0.15;
    totalDescuento = parseoTotal - descuento;

    totalDescuento = totalDescuento.toFixed(2);

    document.getElementById("total").value = "$ " + totalDescuento;
}

function limpiarCampos(){
    document.getElementById("total").value = "";
    document.getElementById("compra").value = "";
}