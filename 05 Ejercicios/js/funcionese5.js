function validarEntrada(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d]/; 
    var codigo = String.fromCharCode(teclado);

    return patron.test(codigo);
}

function calcularPorcentaje(){

    var cantidadHombres = document.getElementById("hombres").value;
    var cantidadMujeres = document.getElementById("mujeres").value;

    if(!cantidadHombres||isNaN(cantidadHombres)||cantidadHombres<0||cantidadHombres>100){
        alert("Ingrese una cantidad valida en el campo de Hombres");
        return;
    }

    if(!cantidadMujeres||isNaN(cantidadMujeres)||cantidadMujeres<0||cantidadMujeres>100){
        alert("Ingrese una cantidad valida en el campo de Mujeres");
        return;
    }

    var parseoCantidadH = parseInt(cantidadHombres);
    var parseoCantidadM = parseInt(cantidadMujeres);

    var totalAlumnos = parseoCantidadH + parseoCantidadM;

    var porcentajeHombres = (parseoCantidadH*100)/totalAlumnos;
    porcentajeHombres = porcentajeHombres.toFixed(2);
    var porcentajeMujeres = 100 - porcentajeHombres;
    porcentajeMujeres = porcentajeMujeres.toFixed(2);

    document.getElementById("p-hombre").value = porcentajeHombres + " %"
    document.getElementById("p-mujer").value = porcentajeMujeres + " %"
}

function clean(){
    document.getElementById("hombres").value="";
    document.getElementById("mujeres").value="";
    document.getElementById("p-hombre").value="";
    document.getElementById("p-mujer").value="";
}