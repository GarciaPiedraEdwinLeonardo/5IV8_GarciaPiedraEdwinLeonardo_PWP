function validarTeclado(e){
    var teclado = document.all ? e.keyCode : e.which;
    if(teclado == 8) return true;

    var patron = /[0-9\d . -]/; //Falta validar que no pueda poner mas de un punto
    var codigo = String.fromCharCode(teclado);

    if(codigo === '.' && e.target.value.indexOf('.') !== -1) {
        return false; //Ya no puede poner mas de un punto
    }

    if(codigo === '-' && e.target.value.indexOf('-') !== -1) {
        return false; //Ya no puede poner mas de un guion
    }

    return patron.test(codigo);
}

function calcularMayor(){
    
    //Obtener datos
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var num3 = document.getElementById("num3").value;

    //Validar
    if(!num1||isNaN(num1)||num1>9999999999||num1<-9999999999){
        alert("Ingrese un numero 1 permitido");
        return;
    }

    if(!num2||isNaN(num2)||num2>9999999999||num2<-9999999999){
        alert("Ingrese un numero 2 permitido");
        return;
    }

    if(!num3||isNaN(num3)||num3>9999999999||num3<-9999999999){
        alert("Ingrese un numero 3 permitido");
        return;
    }

    //Parseo    
    num1Parseo = parseFloat(num1);
    num2Parseo = parseFloat(num2);
    num3Parseo = parseFloat(num3);

    //Calculo
    var mayor = Math.max(num1Parseo,num2Parseo,num3Parseo);

    //Reducir a 2 decimales
    mayor = mayor.toFixed(2);

    //Mostrar resultado
    document.getElementById("resultado").value = mayor;

}

function clean(){

    //Limpiar campos
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("num3").value = "";
    document.getElementById("resultado").value = "";
}