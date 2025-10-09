function validarTeclado(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9.]/;
    var codigo = String.fromCharCode(teclado);

    if(codigo === "." && e.target.value.indexOf(".") !==-1){
        return false;
    }

    return patron.test(codigo);
}

function calcularComisiones(){

    sueldoBase = document.getElementById("sueldo").value;
    ventaone = document.getElementById("venta1").value;
    ventatwo = document.getElementById("venta2").value;
    ventathree = document.getElementById("venta3").value;

    if(sueldoBase < 0 || sueldoBase > 99999999 || isNaN(sueldoBase) || !sueldoBase){
        alert("Ingrese un sueldo valido");
        return;
    }

    if(ventaone < 0 || ventaone > 99999999 || isNaN(sueldoBase) || !ventaone){
        alert("Ingrese una venta 1 valida");
        return;
    }
    
    if(ventatwo < 0 || ventatwo > 99999999 || isNaN(sueldoBase) || !ventatwo){
        alert("Ingrese una venta 2 valida");
        return;
    }

    if(ventathree < 0 || ventathree > 99999999 || isNaN(sueldoBase) || !ventathree){
        alert("Ingrese una venta 3 valida");
        return;
    }

    var parseoSueldo = parseFloat(sueldoBase);
    var parseoVentaUno = parseFloat(ventaone);
    var parseoVentaDos =parseFloat(ventatwo);
    var parseoVentaTres = parseFloat(ventathree);

    var comisionesVentaUno = parseoVentaUno*0.10;
    var comisionesVentaDos = parseoVentaDos*0.10;
    var comisionesVentaTres = parseoVentaTres*0.10;

    var comisionesTotal = comisionesVentaUno + comisionesVentaDos + comisionesVentaTres; 
    var totalSueldo = parseoSueldo + comisionesTotal;

    comisionesTotal = comisionesTotal.toFixed(2);
    totalSueldo = totalSueldo.toFixed(2);


    document.getElementById("comisiones").value = "$ " + comisionesTotal;
    document.getElementById("total").value = "$ " + totalSueldo;

}