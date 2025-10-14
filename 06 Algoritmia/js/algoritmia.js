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

    var x1 = document.querySelector("#p2-x1").value;
    var x2 = document.querySelector("#p2-x2").value;
    var x3 = document.querySelector("#p2-x3").value;
    var x4 = document.querySelector("#p2-x4").value;
    var x5 = document.querySelector("#p2-x5").value;

    var y1 = document.querySelector("#p2-y1").value;
    var y2 = document.querySelector("#p2-y2").value;
    var y3 = document.querySelector("#p2-y3").value;
    var y4 = document.querySelector("#p2-y4").value;
    var y5 = document.querySelector("#p2-y5").value;

    var v1 = [x1,x2,x3,x4,x5];
    var v2 = [y1,y2,y3,y4,y5];

    v1 = v1.sort(function(a,b){return a-b});
    v2 = v2.sort(function(a,b){return b-a});

    v2 = v2.reverse();

    var producto = 0;

    for(var i=0;i<v1.length;i++){
        producto = v1[i]*v2[i];
    }

    document.querySelector("#p2-output").textContent = "El producto escalar minimo es: " + producto;
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

    var output = "Resultados:\n\n";
    output += resultadoTexto;
    output += `\nPalabra Ganadora: ${palabraGanadora} con ${maxCaracteres} caracteres únicos`;

    document.getElementById("p3-output").textContent = output;

}