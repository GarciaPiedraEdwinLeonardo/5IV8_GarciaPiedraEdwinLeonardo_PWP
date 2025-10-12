function problema1(){
    var input = document.getElementById("p1-input").value;
    var output = document.getElementById("p1-output");
    
    if(!input){
        alert("Campo vacio, ingrese sus palabras");
        return;
    }

    var palabras = input.split(" ");
    var palabrasFiltar = palabras.filter(palabra => palabra !="");

    if(palabrasFiltar.length === 0){
        alert("Palbara invalida");
        document.getElementById("p1-input").value="";
        return;
    }

    var palabrasInvertidas = palabrasFiltar.reverse();

    var resultado = palabrasInvertidas.join(" ");
    
    output.textContent = resultado;

}
function problema2(){

}
function problema3(){
    
    var input = document.getElementById("p3-input").value.toUpperCase();

    if(!input){
        alert("Ingrese algo");
        return;
    }

    var palabras = input.split(",");
    
    var palabraGanadora ="";
    var maxCaracteres = 0;
    var resultadoTexto = "";

    for(var i = 0; i < palabras.length; i++){
        var palabra = palabras[i];

        if(palabra !== ""){
            var carcateresUnicos = [];

            for(var j = 0; j < palabra.length; j++){
                var letra = palabra[j];

                if(!carcateresUnicos.includes(letra)){
                    carcateresUnicos.push(letra);
                }

            }

            var cantidadUnicos = carcateresUnicos.length;
            resultadoTexto += `${palabra} = ${cantidadUnicos}\n`;

            if (cantidadUnicos > maxCaracteres) {
                maxCaracteres = cantidadUnicos;
                palabraGanadora = palabra;
            }
        }
    }

    var output = "RESULTADOS:\n\n";
    output += resultadoTexto;
    output += `\nPALABRA GANADORA: ${palabraGanadora} con ${maxCaracteres} caracteres únicos`;

    document.getElementById("p3-output").textContent = output;

}