// ------------------------------------------------------------------------------------
/* const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});


function fetchPokemonCards(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((info) => {
            console.log(info)
            createPokemon(info);
        });
}

function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemons(i);
    }
}

function createPokemon(pokemon) {    
    // const card_id = document.getElementById("m_id");
    // card_id.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const small_name = document.getElementById("m_name");
    small_name.textContent = pokemon.name;

    console.log(small_name);
    
}

fetchPokemons(offset, limit);
 */

// ------------------------------------------------------------------------------------

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./images/pokeball.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            // console.log(data);

            let nombre = data.species.name;
            poke_nombre(nombre);

            let pokeImg = data.sprites.other.dream_world.front_default;
            pokeImage(pokeImg);

            let p_id = data.id;
            poke_id(p_id);

            let p_type = data.types.map(t => t.type.name);
            poke_type(p_type);

            let p_stats = data.stats;
            poke_stats(p_stats);

            let p_ability = data.abilities;
            poke_ability(p_ability);
            // console.log(p_ability);
        }
    });
}

const poke_nombre = (nombre) => {
    const select_name = document.getElementById("p_name");
    select_name.textContent = nombre;
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const poke_id = (p_id) => {
    const select_id = document.getElementById("p_id");
    select_id.textContent = p_id <= 9 ? "#00" + p_id : p_id <= 99 ? "#0" + p_id : "#" + p_id;
}

let poke_type = (p_type) => {
    const select_type = document.getElementById("p_type");
    select_type.innerHTML = `
    ${p_type.join(0).split(0).map(i =>
        `<li>${i}</li>`
    ).join('')}
    `;
}

let poke_stats = (p_stats) => {
    const select_stats = document.getElementById('p_stats');

    const stat = p_stats.map(item => {
        return `<div class="item">
        <div class="name">${item.stat.name == 'hp' ? 'HP' : item.stat.name == 'attack' ? 'ATK' : item.stat.name == 'defense' ? 'DEF' : item.stat.name == 'special-attack' ? 'SpA' : item.stat.name == 'special-defense' ? 'SpD' : item.stat.name == 'speed' ? 'SPD' : item.stat.name}</div>
        <div class="stat">${item.base_stat}</div>
        </div>`
    })
    select_stats.innerHTML = stat.join('');
}

let poke_ability = (p_ability) => {
    const select_ability = document.getElementById('ability');
    const ability = p_ability.map(item => {
        return ` <li>${item.ability.name}</li>`;
    })
    select_ability.innerHTML = ability.join('');
}
