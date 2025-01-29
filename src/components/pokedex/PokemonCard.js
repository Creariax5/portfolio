import Image from 'next/image';
import { Card, CardContent } from '../ui/Card.jsx';
import { TypeBadge } from './types';

export const PokemonCard = ({ pokemon, isSelected, onClick }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="relative w-full aspect-square mb-2">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={pokemon.id <= 12}
          className="object-contain"
        />
      </div>
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
