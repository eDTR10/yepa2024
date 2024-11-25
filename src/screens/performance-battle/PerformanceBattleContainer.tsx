import { useEffect, useState } from 'react';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import VotingCard from './voting-cards/VotingCard';
import '@/screens/login/style.css'
import axios from "@/components/plugin/axios";
// import { useNavigate } from 'react-router-dom';

const PerformanceBattleContainer = () => {
    const [contestants, setContestants] = useState<any>([]);
    const [_mainDataContestants, setMainDataContestants] = useState<any>([]);
    const [_firstName, setFirstName] = useState('');
    const [activeTab, setActiveTab] = useState('');
    // const navigate = useNavigate();

    // const handleVote = (index: any) => {
    //     const newContestants = [...contestants];
    //     newContestants[index].votes += 1;
    //     setContestants(newContestants);
    // };

    // const goToChooseCategory = () => {
    //     console.log('Go to performance battle');
    //     navigate("/yepa2024/chosen-category");
    // };

    const fetchData = async () => {
        try {
            const response = await axios.get('contestant/all/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem("accessToken")}`,
                },
            });
            setContestants(response.data.event_type_2);
            setMainDataContestants(response.data);
            if (response.data.event_type_2.length > 0) {
                const firstNonDisabledContestant = response.data.event_type_2.find((contestant: any) => !localStorage.getItem(`voted_${contestant.uid}`));
                if (firstNonDisabledContestant) {
                    setFirstName(firstNonDisabledContestant.name);
                    setActiveTab(firstNonDisabledContestant.name);
                } else {
                    setFirstName(response.data.event_type_2[0].name);
                    setActiveTab(response.data.event_type_2[0].name);
                }
            }
            console.log('Fetched data:', response.data);
        } catch (error: any) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const moveToNextTab = () => {
        const currentIndex = contestants.findIndex((contestant: any) => contestant.name === activeTab);
        const nextIndex = (currentIndex + 1) % contestants.length;
        setActiveTab(contestants[nextIndex].name);
    };

    return (
        <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto'>
            <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0' />

            <div className='w-[90%] z-30 flex items-center justify-center mt-[200px] mx-4 sm:mx-12 '>

                {contestants.length > 0 && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-auto text-ellipsis z-26'>
                        <p className='text-[#ff6347] font-harlow text-3xl mb-4 text-center'>Performance Battle </p>
                        <TabsList className='z-26 w-screenont-harlow grid grid-cols-10 xslg:grid-cols-5 xs:grid-cols-2 xs:mx-44 gap-2'>
                            {contestants.map((contestant: any, index: any) => {
                                const hasVoted = localStorage.getItem(`voted_${contestant.uid}`) === 'true';
                                return (
                                    <TabsTrigger
                                        key={index}
                                        value={contestant.name}
                                        disabled={hasVoted}
                                        className={`z-28 font-harlow data-[state=active]:text-[#ca5a4c] data-[state=active]:text-md data-[state=active]:bg-[#ffdc73] ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {'Contestant ' + (index + 1)}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                        {contestants.map((contestant: any, index: any) => (
                            <TabsContent key={index} value={contestant.name} className='xs:mx-44 mt-20'>
                                <VotingCard index={index} data={contestant} fetchData={fetchData} moveToNextTab={moveToNextTab} />

                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    );
};

export default PerformanceBattleContainer;