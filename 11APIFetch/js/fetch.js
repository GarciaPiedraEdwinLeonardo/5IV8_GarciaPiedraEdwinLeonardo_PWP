/*  Esta es un ejemplo de una API REST utilizando una llamanda con fetch el cual sirve
    para obtener informacion sobre el tipo de API, (pokemon)
    y obtener su estructura a partir de crear una funcion call back con una promesa
*/

const pokeApiURL = "https://pokeapi.co/api/v2/";

//Vamos a crear una funcion para obtener todos los datos de la pokedex, para esto tenemos que imaginar el orden y la obtencion de los datos

const pokedex = () => {

    //Primero necesitamos obtener todas las estadisticas del pokemon, asi que necesitamos crear un diccionario para obtner cada uno de los elementos del front para despues vaciar los datos

    const pokemonStatsElements = {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed")
    };

    //Necesitamos un auxiliar que nos permita saber la clase del Pokemon para cambiar la CSS dependiendo del tipo
    let currentClassType = null;

    //Tiene que cambiar los elementos de la imagen, para ello tenemos que crear un template que se encargue de encadenar los datos
    const imageTemplate = "<img class = 'pokedisplay' src='{imgSrc}' alt='pokedisplay' />";

    //Necesitamos un objeto que se encargue de guardar las rutas de las imagenes que vamos a cambiar dependiendo de si es una busqueda, si lo encontro o no al pokemon
    const images = {
        imgPokemonNotFound: "../img/404.png",
        imgLoading : "../img/loading.gif"
    }; 

    //Necesitamos una variable que guarde todos los contenedores de la pokedex
    const containers = {
        imagenContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElement: document.getElementById("pokemonId")
    };

    //Necesitamos un objeto de tipo array que guarde los botones con su tipo de referencia
    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search : document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    };

    //Para buscar un pokemon necesitamos una variable que guarde el nombre del pokemon
    const pokemonInput = document.getElementById("pokemonName");

    //La agrupacion de los elementos en este objeto debe ser una estrcutura que nos permita crear funciones mas pequeñas que sin importar el orden pueda obtener cada uno de los datos solicitados
    const processPokemonType = (pokemonData) => {

        //Primero necesitamos obtener el tipo de pokemon, el nombre y la clase para que se modifique en el html. ya que tenemos eso tenemos que obtener los stats. moves, abilites
        let pokemonType = "";

        //Utilizo una busqueda de la clase de pokemon, eso se refiere al tipo de pokemon
        const firstClass = pokemonData.types[0].type.name;

        pokemonData.types.forEach((pokemonTypeData) => {
            //Necesito obtener la etiqueta 
            pokemonType += `<span class="pokemon-type ${pokemonData.type.name}"> ${pokemonTypeData.type.name} </span>`
        });

        //Para poder quitar y cambiar el conetenedor dependiendo del tipo tengo que saber a cual perteneces

        if(currentClassType){
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType);
        }

        containers.pokemonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);

        containers.pokemonTypesContainer.innerHTML = pokemonType;
            
    };

    //Necesitamos obtener las estadisticas del pokemon
    const processPokemonStats = (pokemonData) =>{
        pokemonData.stats?.forEach((pokemonStatData)=> {

            //Vamos a evaluar si encuentra el nombre de la estadistica para colocarlo en su contenedor correspondiente
            switch(pokemonStatData.stat.name){
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%,rgba(0,0,0,1) ${pokemonStatData.base_stat}%;`;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%,rgba(0,0,0,1) ${pokemonStatData.base_stat}%;`;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%,rgba(0,0,0,1) ${pokemonStatData.base_stat}%;`;
                    break;
                case "specialAttack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%,rgba(0,0,0,1) ${pokemonStatData.base_stat}%;`;
                    break;
                case "specialDefense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%,rgba(0,0,0,1) ${pokemonStatData.base_stat}%;`;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%,rgba(0,0,0,1) ${pokemonStatData.base_stat}%;`;
                    break;

            }
        })
    };


};