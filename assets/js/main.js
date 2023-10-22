const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            console.log(pokemons)
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
        })
        .then(
            window.onload = function() { 
                const itemsOfList = document.querySelectorAll("li.pokemon")
                addEventOnCards(itemsOfList)
            }
        )
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function addEventOnCards(cards) {
    cards.forEach(item => {
        item.addEventListener("click", (card) => {
            const idOnElement = card.target.querySelector(".number");
            const idOnSubElement = card.target.parentElement.querySelector(".number");
            const idOnTwoSubElement = card.target.parentElement.parentElement.querySelector(".number");
            const idOnThreeSubElement = card.target.parentElement.parentElement.parentElement.querySelector(".number");
            if (idOnElement) {
                window.location.href = `/details?id=${idOnElement.innerText.slice(1)}`;
            } else if (idOnSubElement) {
                window.location.href = `/details?id=${idOnSubElement.innerText.slice(1)}`
            } else if (idOnTwoSubElement) {
                window.location.href = `/details?id=${idOnTwoSubElement.innerText.slice(1)}`
            } else {
                window.location.href = `/details?id=${idOnThreeSubElement.innerText.slice(1)}`
            }
        })
    });
}
