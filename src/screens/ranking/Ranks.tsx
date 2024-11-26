import { useEffect, useState } from 'react';
import { Crown, Award, CrownIcon } from 'lucide-react';
import { RankingCard } from './Performance';
import { CombinedRankingCard } from './MrMs';
import axios from './../../plugin/axios';


function capitalizeFirst(text:any) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
function Rankings() {
  const [rankingData,setrankingData] = useState<any> ({
    "male_ranking": [
        {
            "contestant": 7,
            "name": "Null",
            "total_votes": 999,
            "photos": "/media/photos/DICT-Logo-icon_only.png",
            "total_score": 0
        },
        {
            "contestant": 6,
            "name": "Null",
            "total_votes": 99,
            "photos": "/media/photos/DICT-Logo-icon_only.png",
            "total_score": 0
        }
    ],
    "female_ranking": [
        {
            "contestant": 9,
            "name": "Null",
            "total_votes": 9999,
            "photos": "/media/photos/DICT-Logo-icon_only.png",
            "total_score": 0
        },
        {
            "contestant": 19,
            "name": "Null",
            "total_votes": 1,
            "photos": "/media/photos/DICT-Logo-icon_only.png",
            "total_score": 0
        }
    ],
    "performance_ranking": [
        {
            "contestant": 11,
            "name": "Null",
            "total_votes": 99,
            "photos": "/media/photos/DICT-Logo-icon_only.png",
            "total_score": 0
        }
    ]
})


const fetchVotes = async () => {
  try {
    const response = await axios.get("vote/all");
    setrankingData(response.data);
  } catch (error) {
    console.error("Error fetching votes:", error);
  }
};
useEffect(() => {
  // Initial fetch
  fetchVotes();

  // Set up periodic updates
  const intervalId = setInterval(() => {
    fetchVotes();
  }, 5000);

  // Cleanup on component unmount
  return () => clearInterval(intervalId);
}, []); // Empty dependency array ensures this runs once
  return (
    <div className="min-h-screen bg-gradient-to-b 
    from-[#dff5f6] to-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="text-5xl  tracking-tighter mb-5 text-center z-[1000] font-semibold 
          bg-gradient-to-r bg-clip-text font-harlow text-transparent 
          from-[#fd427a] via-purple-500 to-[#3730ff] animate-text">Contest Rankings</div>
          
        
        <div className="flex flex-col gap-8">
          <div className=' flex gap-3 justify-center mt-10'>

            <div className=' animate__animated  animate__wobble animate__repeat-3 w-[200px] h-[300px] sm:w-[150px] sm:h-[200px]    cursor-grab active:cursor-grabbing shadow-lg transition-shadow p-2  flex justify-center relative rounded-md bg-gradient-to-t  
       from-[#a4c5fb] to-[#3b82f6]'>
          <Crown className=' w-8 h-8 text-[#3b82f6] absolute translate-y-[-38px]'/>

              <img className='object-cover  rounded-sm w-full h-full' src={rankingData?import.meta.env.VITE_URL + rankingData.male_ranking[0].photos:""} alt="" />
              <h3 className=" bg-white px-1 py-2 sm:py-1 sm:pb-0 rounded-sm  shadow-sm absolute self-center bottom-0 text-md font-harlow text-[#ca5a4c] mb-4 capitalize z-50 "> {  rankingData?capitalizeFirst(rankingData.male_ranking[0].name ):""}</h3>


            </div>
            <div className='animate__animated  animate__wobble animate__repeat-3 w-[200px] h-[300px] sm:w-[150px] sm:h-[200px]    cursor-grab active:cursor-grabbing shadow-lg transition-shadow p-2  flex justify-center relative  rounded-md bg-gradient-to-t  
       from-[#feafc7] to-[#fd427a]'>
        <CrownIcon className=' w-8 h-8 text-[#fd427a] absolute translate-y-[-38px]'/>

              <img className=' object-cover rounded-sm w-full h-full' src={rankingData?import.meta.env.VITE_URL + rankingData.female_ranking[0].photos:""} alt="" />
              <h3 className=" bg-white px-1 py-2 sm:py-1 sm:pb-0 rounded-sm  shadow-sm absolute self-center bottom-0 text-md font-harlow text-[#ca5a4c] mb-4 capitalize z-50 "> {  rankingData?capitalizeFirst(rankingData.female_ranking[0].name ):""}</h3>


            </div>
          </div>
          <CombinedRankingCard
            title="Mr. & Ms. Best Dressed"
            maleData={rankingData?rankingData.male_ranking:""}
            femaleData={rankingData.female_ranking}
            icon={Crown}
          />
          <RankingCard
            title="Performance Rankings"
            data={rankingData.performance_ranking}
            icon={Award}
          />
        </div>
      </div>
    </div>
  );
}

export default Rankings;