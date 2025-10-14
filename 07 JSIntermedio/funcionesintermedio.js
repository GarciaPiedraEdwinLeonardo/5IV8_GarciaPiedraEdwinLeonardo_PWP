/*
    JS maneja variables del siguiente modo

    var => Una variable de acceso local dependiendo de donde se declare
    let => es una variable "protegida", solo se puede hacer uso dentro de la funcion donde se declara 
    const => es una variable que no puede cambiar su valor, es una constante



var x = "hola";

if(true){
    let x = "habia una vez"
    console.log(x);
}

console.log(x);



//Como usamos las funciones

function suma(n1,n2){
    return n1+n2;
}
console.log(`Esta suma es de: ${suma(5,10)}`);



//Las funciones flecha nos permite realizar operaciones de forma mucho mas sencilla de forma a la siguiente estructura
//"cadena" => id,clase,metodo,nombre,atributo

const suma = (n1,n2) => n1+n2;
console.log(`Esta suma es de: ${suma(5,3)}`);

*/

const razasDePerros = [
    "Pastor aleman",
    "Labrador Retriever",
    "Bulldog Frances",
    "Beagle",
    "Chihuahua",
    "Dalmata",
    "Salchicha",
    "Pug",
];

//Formas de recorrer e imprimir un arreglo
//for 
for(let i=0;razasDePerros.length;i++){
    console.log(razasDePerros[i]);
}


//for of

for(const raza of razasDePerros){
    console.log(raza);
}

//for in

for(const indice of razasDePerros){
    console.log(razasDePerros[indice]);
}

//for each itera sobre los elementos del arreglo y no te devuelve nada
//Por lo tanto todos los for each son funciones flecha por defecto

razasDePerros.forEach(raza => console.log(raza));
//La estructura general del for each es la siguiente 
// argumento.foreach((raza, indice, arreglo) => codigo a ejecutar)

//MAP => Itera sobre los elementos del arreglo y devuelve un arreglo diferente con el cual podemos jugar
const razasDePerrosMayuscula = razasDePerros.map(perros => perros.toUpperCase());
console.log(razasDePerrosMayuscula);

//FIND => Nos permite realizar una busqueda de un elemento dentro del arreglo, si lo enceuntra lo retorna, si no un "undefined"
if(razasDePerros.find(raza => raza === "Chihuahua")){
    console.log(razasDePerros);
}{
    razasDePerros.push("Chihuahua");
    console.log(razasDePerros);
}

//FINDINDEX => Nos permite realizar una busqueda de un elemento del arreglo, si lo encuentra regresa el indice, si no un -1, esta funcion es particularmente
//util cuando necesitamos modificar o eliminar de un arreglo original, dentro de una copia del mismo

const indiceChihuahua = razasDePerros.findIndex(raza => raza === "Chihuahua");
if(indiceChihuahua > -1){
    console.log("Si se encontro y esta adentro del arreglo");
    console.log(razasDePerros[indiceChihuahua]);
    razasDePerros[indiceChihuahua] += " (Es una raza de perros chiquita y chillona)";
    console.log(razasDePerros);
}