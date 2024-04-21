const allPokemon = document.getElementById('all-pokemon')
const btnHeader = document.querySelectorAll('.btn-header')
const API = 'https://pokeapi.co/api/v2/pokemon/'

// fetch(`${API}/${id}`)
// .then(response => response.json())
// .then(data => console.log(data.id, data.name, data.height, data.weight, data.sprites.other.dream_world.front_default, data.types[0].type.name))
// .catch(error => console.error(error))

for (let i = 1; i < 161; i++) {
    fetch(API + i)
    .then(response => response.json())
    .then(data => showPokemon(data))
    .catch(error => console.log(error))   
    }

function showPokemon(pokemon){
    let id = pokemon.id.toString()
    let pokemonId = id.length < 3 ?  '0'.repeat(3 - id.length) + id : id
    //console.log(pokemonId);

    let mainType = pokemon.types[0].type.name
    //console.log(mainType);

    let typePokemon = pokemon.types.map(name => `
    <p class="type ${name.type.name}">${name.type.name}</p>
    `)
    typePokemon = typePokemon.join('')
    // console.log(typePokemon);

    let divCardPokemon = document.createElement('div')
    divCardPokemon.innerHTML = `<div class="pokemon card-${mainType}">
                                <h2 class="id">${pokemonId}</h2>
                                <div class="pokemon-image">
                                    <img
                                        src=${pokemon.sprites.other.dream_world.front_default}
                                        alt="${pokemon.name}"
                                    />
                                </div>
                                <div class="information-personal">
                                    <h1 class="name">${pokemon.name}</h1>
                                </div>
                                <div class="information-type">
                                    ${typePokemon}
                                </div>
                                <div class="information-shape">
                                    <p class="shape">${pokemon.height} m</p>
                                    <p class="shape">${pokemon.weight} kg</p>
                                </div>
                            </div>`
     
    allPokemon.append(divCardPokemon)
}

btnHeader.forEach(button => button.addEventListener('click', function(event) {
    allPokemon.innerHTML = ''
    const buttonId = event.currentTarget.id;

    for (let i = 1; i < 161; i++) {
        fetch(API + i)
        .then(response => response.json())
        .then(data => {

            if (buttonId == 'view-all') {
                showPokemon(data)
            } else {
                const types = data.types.map(type => type.type.name);
                if(types.some(type => type.includes(buttonId))){
                    showPokemon(data);
                }
            }
        })
        .catch(error => console.log(error))   
        }
}
))
