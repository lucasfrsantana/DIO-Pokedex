const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemons) {
  console.log(pokemons);
  const pokemonStats = [
    {
      id: 1,
      label: "About",
    },
    {
      id: 2,
      label: "Base Stats",
    },
    {
      id: 3,
      label: "Evolution",
    },
    {
      id: 4,
      label: "Moves",
    },
  ];

  return `
        <div class="container">
        
        <div class="pokemon ${pokemons.type}">
        
        <div class="details">
          <p class="abc"> &#129044 <p2> &#9825 </p2></p>
          <span class="name">${pokemons.name}</span>
          <span class="number">#${pokemons.number}</span>
          <div class="types-container">
          ${pokemons.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join(" ")}
            </div>  
            </div>
            <img src="${pokemons.photo}" alt="${pokemons.name}"/>
            
                <div class="stats-container">

                        <ol class="options">
                            ${pokemonStats
                              .map(
                                (item) =>
                                  `<li key=${item.id}>${item.label}</li>`
                              )
                              .join("")}    
                        </ol>

                  <div class="row pokemon-stat" >
                    <div class="column">
                      ${pokemons.stats
                        .map((stat) => `<li class="stat ${stat}">${stat}</li>`)
                        .join(" ")}
                    </div>

                    <div class="column2">
                      ${pokemons.base_stats
                        .map(
                          (base_stat) =>
                            `<li class="stat ${base_stat}">${base_stat}</li>`
                        )
                        .join(" ")}
                    </div>
                  
                      <div class="cont">
                        <div class="skills">
                          <div class="a">45</div>
                        </div>
                        <div class="skills">
                          <div class="skills b">49</div>
                        </div>
                        <div class="skills">  
                          <div class="skills c">49</div>
                        </div>
                        <div class="skills">
                          <div class="skills d">65</div>
                        </div>
                        <div class="skills">
                          <div class="skills e">65</div>
                        </div>
                        <div class="skills">
                          <div class="skills f">45</div>
                        </div>
                      </div>
                  </div> 
                </div>
            </div>
        </div>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((e) => convertPokemonToLi(e)).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
