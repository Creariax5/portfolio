"use client"

const BASE_URL = 'https://pokeapi.co/api/v2';

const typeTranslations = {
  normal: 'Normal',
  fire: 'Feu',
  water: 'Eau',
  grass: 'Plante',
  electric: 'Électrik',
  ice: 'Glace',
  fighting: 'Combat',
  poison: 'Poison',
  ground: 'Sol',
  flying: 'Vol',
  psychic: 'Psy',
  bug: 'Insecte',
  rock: 'Roche',
  ghost: 'Spectre',
  dragon: 'Dragon',
  dark: 'Ténèbres',
  steel: 'Acier',
  fairy: 'Fée'
};

const formatPokemonData = (pokemonData, speciesData) => {
  const frenchDescription = speciesData.flavor_text_entries.find(
    entry => entry.language.name === 'fr'
  )?.flavor_text || '';

  return {
    id: pokemonData.id,
    name: speciesData.names.find(name => name.language.name === 'fr')?.name || pokemonData.name,
    types: pokemonData.types.map(type => typeTranslations[type.type.name] || type.type.name),
    height: `${pokemonData.height / 10} m`,
    weight: `${pokemonData.weight / 10} kg`,
    image: pokemonData.sprites.other['official-artwork'].front_default,
    stats: {
      hp: pokemonData.stats[0].base_stat,
      attack: pokemonData.stats[1].base_stat,
      defense: pokemonData.stats[2].base_stat,
      spAtk: pokemonData.stats[3].base_stat,
      spDef: pokemonData.stats[4].base_stat,
      speed: pokemonData.stats[5].base_stat
    },
    description: frenchDescription.replace(/\f|\n|\r/g, ' ')
  };
};

export const fetchPokemonPage = async (page = 1, pageSize = 20) => {
  try {
    const offset = (page - 1) * pageSize;
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${pageSize}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon list');
    }

    const data = await response.json();
    
    // Fetch detailed data for each Pokemon in parallel
    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(pokemon.url),
          fetch(`${BASE_URL}/pokemon-species/${pokemon.url.split('/').slice(-2, -1)}`)
        ]);

        if (!pokemonResponse.ok || !speciesResponse.ok) {
          return null;
        }

        const [pokemonData, speciesData] = await Promise.all([
          pokemonResponse.json(),
          speciesResponse.json()
        ]);

        return formatPokemonData(pokemonData, speciesData);
      })
    );

    // Filter out any failed requests
    const validPokemons = detailedPokemons.filter(pokemon => pokemon !== null);

    return {
      pokemons: validPokemons,
      totalCount: data.count,
      hasNextPage: offset + pageSize < data.count,
      hasPreviousPage: page > 1
    };
  } catch (error) {
    console.error('Error fetching pokemon data:', error);
    return {
      pokemons: [],
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }
};

export const fetchSinglePokemon = async (idOrName) => {
  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      fetch(`${BASE_URL}/pokemon/${idOrName}`),
      fetch(`${BASE_URL}/pokemon-species/${idOrName}`)
    ]);

    if (!pokemonResponse.ok || !speciesResponse.ok) {
      return null; // Return null instead of throwing error
    }

    const [pokemonData, speciesData] = await Promise.all([
      pokemonResponse.json(),
      speciesResponse.json()
    ]);

    return formatPokemonData(pokemonData, speciesData);
  } catch (error) {
    console.error(`Error fetching pokemon ${idOrName}:`, error);
    return null;
  }
};
