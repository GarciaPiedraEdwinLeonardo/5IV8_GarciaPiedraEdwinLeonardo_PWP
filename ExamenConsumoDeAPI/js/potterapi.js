const harryPotterApi = () => {
    const apiUrl = "https://potterapi-fedeperin.vercel.app/es/characters";
    
    const elements = {
        characterDisplay: document.getElementById("characterDisplay"),
        characterNameResult: document.getElementById("characterNameResult"),
        characterHouse: document.getElementById("characterHouse"),
        characterActor: document.getElementById("characterActor"),
        characterNickname: document.getElementById("characterNickname"),
        characterBirthdate: document.getElementById("characterBirthdate"),
        characterChildren: document.getElementById("characterChildren"),
        characterId: document.getElementById("characterId")
    };

    const images = {
        loading: "./img/loading.svg",
        notFound: "./img/404.svg", 
        default: "./img/varita.svg"
    };

    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnNext"),
        prev: document.getElementById("btnPrev")
    };

    const characterInput = document.getElementById("characterName");
    let allCharacters = [];
    let currentIndex = 0;

    const houseColors = {
        Gryffindor: "gryffindor",
        Slytherin: "slytherin", 
        Hufflepuff: "hufflepuff",
        Ravenclaw: "ravenclaw",
        "": "no-house"
    };

    const setLoading = () => {
        elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.loading}" alt="Buscando...">`;
        buttons.all.forEach(button => button.disabled = true);
    };

    const setLoadingComplete = () => {
        buttons.all.forEach(button => button.disabled = false);
    };

    const getAllCharacters = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            allCharacters = data;
            return data;
        } catch (error) {
            elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.notFound}" alt="No encontrado">`;
            return [];
        }
    };

    const findCharacterByName = (name) => {
        return allCharacters.find(character => 
            character.fullName.toLowerCase().includes(name.toLowerCase()) ||
            character.nickname.toLowerCase().includes(name.toLowerCase())
        );
    };

    const getCharacterByIndex = (index) => {
        return allCharacters[index];
    };

    const formatChildren = (children) => {
        if (!children || children.length === 0) return "No registrados";
        return children.map(child => child).join(", ");
    };

    const clearCharacterData = () => {
        elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.default}" alt="Escudo de Hogwarts">`;
        elements.characterNameResult.textContent = "";
        elements.characterHouse.innerHTML = "";
        elements.characterActor.textContent = "";
        elements.characterNickname.textContent = "-";
        elements.characterBirthdate.textContent = "-";
        elements.characterChildren.textContent = "-";
        elements.characterId.value = "0";
    };

    const displayCharacter = (character) => {
        if (!character) {
            elements.characterDisplay.innerHTML = `<img class="character-img" src="${images.notFound}" alt="No encontrado">`;
            elements.characterNameResult.textContent = "¡Mago no encontrado!";
            elements.characterHouse.innerHTML = "";
            elements.characterActor.textContent = "";
            elements.characterNickname.textContent = "-";
            elements.characterBirthdate.textContent = "-";
            elements.characterChildren.textContent = "-";
            return;
        }

        // Mostrar imagen y nombre
        elements.characterDisplay.innerHTML = character.image 
            ? `<img class="character-img" src="${character.image}" alt="${character.fullName}">`
            : `<img class="character-img" src="${images.default}" alt="Imagen no disponible">`;
        
        elements.characterNameResult.textContent = character.fullName;
        elements.characterId.value = currentIndex;

        // Casa de Hogwarts
        const houseClass = houseColors[character.hogwartsHouse] || "no-house";
        elements.characterHouse.innerHTML = character.hogwartsHouse ? `<span class="house-badge ${houseClass}">${character.hogwartsHouse}</span>`: "<span class='house-badge no-house'>Sin casa asignada</span>";

        // Información 
        elements.characterActor.textContent = character.interpretedBy || "No especificado";
        elements.characterNickname.textContent = character.nickname || "-";
        elements.characterBirthdate.textContent = character.birthdate || "Desconocida";
        elements.characterChildren.textContent = formatChildren(character.children);
    };

    const searchCharacter = async (searchTerm) => {

    if (!searchTerm || searchTerm.trim().length === 0) {
        Swal.fire({
            title: "Error",
            text: "Ingresa el nombre de un mago o bruja",
            icon: "warning",
            confirmButtonText: "Continuar"
        });
        return;
    }
    
    setLoading();
    
    if (allCharacters.length === 0) {
        await getAllCharacters();
    }

    const character = findCharacterByName(searchTerm);
    
    if (character) {
        currentIndex = allCharacters.indexOf(character);
        displayCharacter(character);
    } else {
        displayCharacter(null);
    }
    
    setLoadingComplete();
    };

    const navigateCharacter = (direction) => {
        if (allCharacters.length === 0) return;
        
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % allCharacters.length;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : allCharacters.length - 1;
        }
        
        const character = getCharacterByIndex(currentIndex);
        displayCharacter(character);
        characterInput.value = "";
    };

    const initializeApp = async () => {
        setLoading();
        await getAllCharacters();
        
        clearCharacterData();
        
        setLoadingComplete();

        // Eventos
        buttons.search.onclick = () => searchCharacter(characterInput.value);
        
        characterInput.onkeyup = (event) => {
            if (event.key === "Enter") {
                searchCharacter(characterInput.value);
            }
        };

        buttons.next.onclick = () => navigateCharacter('next');
        buttons.prev.onclick = () => navigateCharacter('prev');
    };

    initializeApp();
};

window.onload = harryPotterApi;