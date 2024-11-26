
import { LucideIcon } from 'lucide-react';

interface Contestant {
  contestant: number;
  name: string;
  total_votes: number;
  photos: string;
  total_score: number;
}

interface RankingCardProps {
  title: string;
  data: Contestant[];
  icon: LucideIcon;
}

export const RankingCard = ({ title, data, icon: Icon }: RankingCardProps) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Icon className="w-6 h-6" />
        {title}
      </h2>
    </div>
    <div className="p-4">
      {data.map((item, index) => (
        <div
          key={item.contestant}
          className="flex items-center gap-4 mb-4 last:mb-0 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="relative">
            <img
              src={import.meta.env.VITE_URL+item.photos}
              alt={item.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
            />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                {item.total_score} points
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);