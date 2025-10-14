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


function calcularResultado(){

    //Obtener los valores
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;

    //validar
    if(!num1||isNaN(num1)||num1>9999999999||num1<-9999999999){
        alert("Ingrese un numero 1 permitido");
        return;
    }
    
    if(!num2||isNaN(num2)||num2>9999999999||num2<-9999999999){
        alert("Ingrese un numero 2 permitido");
        return;
    }

    //Parseo
    num1Parseo = parseFloat(num1);
    num2Parseo = parseFloat(num2);

    //Declarar resultado
    var resultado = 0;

    if(num1Parseo === num2Parseo){
        resultado = num1Parseo*num2Parseo;
    }
    if(num1Parseo > num2Parseo){
        resultado = num1Parseo - num2Parseo;
    }
    if(num1Parseo < num2Parseo){
        resultado = num2Parseo - num1Parseo;
    }

    //Dejar en dos decimales
    resultado = resultado.toFixed(2);

    //Mostrar resultado
    document.getElementById("resultado").value = resultado;

}

function clean(){
    
    //Limpiar los campos
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("resultado").value = "";

}



