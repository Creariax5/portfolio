import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TypeBadge } from './types';
import { StatBar } from './stats';

export const PokemonDetail = ({ pokemon, onPrevious, onNext, hasPrevious, hasNext }) => (
  <Card className="h-fit sticky top-4">
    <CardHeader>
      <div className="flex justify-between items-center">
        <ChevronLeft 
          className={`w-6 h-6 cursor-pointer hover:bg-gray-100 rounded-full p-1 ${!hasPrevious && 'opacity-50'}`}
          onClick={hasPrevious ? onPrevious : undefined}
        />
        <CardTitle className="text-xl">
          {pokemon.name} #{pokemon.id.toString().padStart(3, '0')}
        </CardTitle>
        <ChevronRight 
          className={`w-6 h-6 cursor-pointer hover:bg-gray-100 rounded-full p-1 ${!hasNext && 'opacity-50'}`}
          onClick={hasNext ? onNext : undefined}
        />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-48 h-48 mb-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 192px, 192px"
            priority
            className="object-contain"
          />
        </div>
        <div className="flex gap-2 mb-4">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
        <p className="text-center text-gray-600 mb-4">
          {pokemon.description}
        </p>
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <div className="text-center">
            <div className="text-gray-600">Taille</div>
            <div className="font-bold">{pokemon.height}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600">Poids</div>
            <div className="font-bold">{pokemon.weight}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold mb-2">Statistiques</h3>
        <StatBar label="PV" value={pokemon.stats.hp} />
        <StatBar label="Attaque" value={pokemon.stats.attack} />
        <StatBar label="Défense" value={pokemon.stats.defense} />
        <StatBar label="Attaque Spé." value={pokemon.stats.spAtk} />
        <StatBar label="Défense Spé." value={pokemon.stats.spDef} />
        <StatBar label="Vitesse" value={pokemon.stats.speed} />
      </div>
    </CardContent>
  </Card>
);
