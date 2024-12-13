// types.js
export const typeColors = {
    Normal: { bg: 'bg-gray-200', text: 'text-gray-800' },
    Feu: { bg: 'bg-red-200', text: 'text-red-800' },
    Eau: { bg: 'bg-blue-200', text: 'text-blue-800' },
    Plante: { bg: 'bg-green-200', text: 'text-green-800' },
    Électrik: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
    Glace: { bg: 'bg-cyan-200', text: 'text-cyan-800' },
    Combat: { bg: 'bg-orange-200', text: 'text-orange-800' },
    Poison: { bg: 'bg-purple-200', text: 'text-purple-800' },
    Sol: { bg: 'bg-amber-200', text: 'text-amber-800' },
    Vol: { bg: 'bg-indigo-200', text: 'text-indigo-800' },
    Psy: { bg: 'bg-pink-200', text: 'text-pink-800' },
    Insecte: { bg: 'bg-lime-200', text: 'text-lime-800' },
    Roche: { bg: 'bg-stone-200', text: 'text-stone-800' },
    Spectre: { bg: 'bg-violet-200', text: 'text-violet-800' },
    Dragon: { bg: 'bg-red-300', text: 'text-red-900' },
    Ténèbres: { bg: 'bg-gray-300', text: 'text-gray-900' },
    Acier: { bg: 'bg-slate-200', text: 'text-slate-800' },
    Fée: { bg: 'bg-pink-100', text: 'text-pink-900' }
};
  
export const TypeBadge = ({ type }) => (
    <span
      className={`px-2 py-1 rounded ${typeColors[type].bg} ${typeColors[type].text}`}
    >
      {type}
    </span>
);
