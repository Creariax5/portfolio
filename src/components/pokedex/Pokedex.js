"use client"

import React, { useState, useEffect } from 'react';
import { fetchPokemonPage } from './pokemon-api';
import { PokemonCard } from './PokemonCard';
import { PokemonDetail } from './PokemonDetail';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const Pokedex = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      const { pokemons: newPokemons, totalCount } = await fetchPokemonPage(currentPage, pageSize);
      setPokemons(newPokemons);
      setTotalPages(Math.ceil(totalCount / pageSize));
      setIsLoading(false);
    };
    
    loadPokemons();
  }, [currentPage, pageSize]);

  const filteredPokemon = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousPokemon = () => {
    const currentIndex = pokemons.findIndex(p => p.id === selectedPokemon.id);
    if (currentIndex > 0) {
      setSelectedPokemon(pokemons[currentIndex - 1]);
    }
  };

  const handleNextPokemon = () => {
    const currentIndex = pokemons.findIndex(p => p.id === selectedPokemon.id);
    if (currentIndex < pokemons.length - 1) {
      setSelectedPokemon(pokemons[currentIndex + 1]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-fit">
          {isLoading ? (
            <div className="col-span-full text-center py-4">Chargement...</div>
          ) : filteredPokemon.length === 0 ? (
            <div className="col-span-full text-center py-4">Aucun Pokémon trouvé</div>
          ) : (
            filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isSelected={selectedPokemon?.id === pokemon.id}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))
          )}
        </div>

        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onPrevious={handlePreviousPokemon}
            onNext={handleNextPokemon}
            hasPrevious={pokemons.findIndex(p => p.id === selectedPokemon.id) > 0}
            hasNext={pokemons.findIndex(p => p.id === selectedPokemon.id) < pokemons.length - 1}
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
        onPrevious={() => setCurrentPage(prev => prev - 1)}
        onNext={() => setCurrentPage(prev => prev + 1)}
        position="bottom-0"
        className="max-w-6xl mx-auto"
      />
    </div>
  );
};

export default Pokedex;
