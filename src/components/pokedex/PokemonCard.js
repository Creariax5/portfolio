// PokemonCard.js
import { Card, CardContent } from '@/components/ui/card';
import { TypeBadge } from './types';

export const PokemonCard = ({ pokemon, isSelected, onClick }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-full h-auto mb-2"
      />
      <div className="text-center">
        <div className="font-bold">#{pokemon.id.toString().padStart(3, '0')}</div>
        <div className="text-lg">{pokemon.name}</div>
        <div className="flex gap-1 justify-center mt-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);
