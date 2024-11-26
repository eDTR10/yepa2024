
import { LucideIcon } from 'lucide-react';

interface Contestant {
  contestant: number;
  name: string;
  total_votes: number;
  photos: string;
  total_score: number;
}

interface CombinedRankingCardProps {
  title: string;
  maleData: Contestant[];
  femaleData: Contestant[];
  icon: LucideIcon;
}

export const CombinedRankingCard = ({ title, maleData, femaleData, icon: Icon }: CombinedRankingCardProps) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden col-span-2">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Icon className="w-6 h-6" />
        {title}
      </h2>
    </div>
    <div className="flex md:flex-col  justify-center divide-gray-200">
      <div className="p-4 flex flex-col items-end md:items-start">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ms. Best Dressed</h3>
        {femaleData.map((item, index) => (
          <div
            key={item.contestant}
            className="flex items-center md:flex-row-reverse gap-4 mb-4 last:mb-0 p-3 rounded-lg hover:bg-gray-50 justify-end transition-colors"
          >
            <div className="flex flex-col items-end md:items-start ">
              <h3 className="font-semibold text-gray-800 capitalize">{item.name}</h3>
              <div className="flex  gap-2 text-sm text-gray-600 items-end ">
                <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                  {item.total_votes} votes
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src={import.meta.env.VITE_URL+item.photos}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </span>
            </div>
            
          </div>
        ))}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mr. Best Dressed</h3>
        {maleData.map((item, index) => (
          <div
            key={item.contestant}
            className="flex items-center gap-4 mb-4 last:mb-0 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <img
                src={import.meta.env.VITE_URL+item.photos}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 capitalize">{item.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {item.total_votes} votes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);