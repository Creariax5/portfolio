// stats.js
export const getStatWidth = (value) => `${(value / 255) * 100}%`;

export const getStatColor = (value) => {
  if (value >= 150) return 'bg-green-500';
  if (value >= 90) return 'bg-lime-500';
  if (value >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const StatBar = ({ label, value }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${getStatColor(value)} rounded-full h-2 transition-all duration-300`}
        style={{ width: getStatWidth(value) }}
      />
    </div>
  </div>
);
