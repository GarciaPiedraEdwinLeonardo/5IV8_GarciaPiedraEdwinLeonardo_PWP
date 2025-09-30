/*
Javascript es un lenguaje multiparadigma
Acepta la programacion funcional, estructurada, orientada a objetos y orientada a eventos"
Dentro de JS, no existe el tipado de variables

Solo existen 3 tipos de variables de acuerdo al estandar ES6
VAR, LET, CONST
*/

function validar(formulario){
    //Quiero validar que el campo nombre acepte mas de 3 caracteres
    if(formulario.nombre.value.length < 4){
        alert("Por favor escribe mas de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    //Validacion para unicamente letras
    var checkStr = formulario.nombre.value;

    
    var abcOk= "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";
    var allValido = true;
    
    //Tenemos que compara la cadena de nombre vs abc
    for(var i=0;i<checkStr.length;i++){
        var caracteres = checkStr.charAt(i);
        for(j=0;j<abcOk.length;j++){
            if(caracteres==abcOk.charAt(j)){
                break;
            }
        }
        if(j == abcOk.length){
            allValido =false;
            break;
        }
    }

    if(!allValido){
        alert("Escriba unicamente letras en el campo nombre")
        formulario.name.focus();
        return false;
    }

    var checkStr = formulario.edad.value;

    
    var abcOk= "1234567890";
    var allValido = true;
    
    //Tenemos que compara la cadena de nombre vs abc
    for(var i=0;i<checkStr.length;i++){
        var caracteres = checkStr.charAt(i);
        for(j=0;j<abcOk.length;j++){
            if(caracteres==abcOk.charAt(j)){
                break;
            }
        }
        if(j == abcOk.length){
            allValido =false;
            break;
        }
    }

    if(!allValido){
        alert("Escriba unicamente digitos en el campo nombre")
        formulario.edad.focus();
        return false;
    }

    //Vamos a crear una funcion de una expresion regular para validar el correo electronico que acepte texo.texto@texto.texto

    var b = /^[^@\s]+[^@\.\s]+(\.[^@\.\s]+)+$/;

    var txt = formulario.correo.value;

    alert("Email" + (b.test(txt)?" ":"no")+"valido");

    return b.test;
}