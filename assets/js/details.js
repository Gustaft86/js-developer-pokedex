const homeButton = document.getElementById('homeButton')
const containerDetails = document.getElementById('containerDetails')


homeButton.addEventListener('click', () => {
    window.location.href = "/index";
})

function convertPokemonToHtmlHead(pokemon) {
    return `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
        </div>
    `
}

function convertPokemonToHtmlAbout(pokemon) {
    return `
        <div id="infos" class="infos">
            <div class="menu-info">
                <button id="aboutButton" type="button" disabled>
                    About
                </button>
                <button id="powerButton" type="button">
                    Power
                </button>
            </div>
            <div class="about">
                <ul class="infos-about">
                    <li class="height">Height: ${pokemon.height}</li>
                    <li class="weight">Weight: ${pokemon.weight}</li>
                    <li class="abilities}">
                        Abilities: ${pokemon.abilities.join(', ')}
                    </li>
                    <li class="moves">
                        Moves: ${pokemon.moves.join(', ')}
                    </li>
                </ul>
            </div>
        </div>
    `
}

function convertPokemonToHtmlPower(pokemon) {
    return `
        <div id="infos" class="infos">
            <div class="menu-info">
                <button id="aboutButton" type="button">
                    About
                </button>
                <button id="powerButton" type="button" disabled>
                    Power
                </button>
            </div>
            <div class="power">
                <ul class="infos-power">
                    ${Object.entries(pokemon.infoFigth)
                        .map(info => `<li class="${info[0]}"> ${info[0].charAt(0).toUpperCase() + info[0].slice(1)}: ${info[1]}</li>`)
                        .join('')}
                </ul>
            </div>
        </div>
    `
}

const queryParameter = window.location.search;
const id = queryParameter.slice(queryParameter.indexOf("id=")+3);
const details = {}
details['url'] = `https://pokeapi.co/api/v2/pokemon/${id}`
let pokemonDetails = []

function loadPokemon() {
    pokeApi.getPokemonDetail(details)
        .then((pokeDetails = []) => {
            pokemonDetails = pokeDetails
            containerDetails.innerHTML += convertPokemonToHtmlHead(pokemonDetails)
            containerDetails.innerHTML += convertPokemonToHtmlAbout(pokemonDetails)
        })
}

loadPokemon();

function loadInfoMenu() {
    setTimeout(function(){
        const infosContainer = document.getElementById("infos")
        const aboutButton = document.getElementById("aboutButton")
        const powerButton = document.getElementById("powerButton")
        
        aboutButton.addEventListener('click', () => {
            console.log(infosContainer)
            infosContainer.innerHTML = convertPokemonToHtmlAbout(pokemonDetails)
            loadInfoMenu()
        })
        
        powerButton.addEventListener('click', () => {
            console.log(infosContainer)
            infosContainer.innerHTML = convertPokemonToHtmlPower(pokemonDetails)
            loadInfoMenu()
        })
    }, 500);
}

loadInfoMenu()
