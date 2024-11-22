import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from '@radix-ui/react-dropdown-menu';
import VotingCard from './voting-cards/VotingCard';
import '@/screens/login/style.css'
import axios from "@/components/plugin/axios";

const PerformanceBattleContainer = () => {
    const [contestants, setContestants] = useState<any>([]);
    const [mainDataContestants, setMainDataContestants] = useState<any>([]);
    const [firstName, setFirstName] = useState('');

    const handleVote = (index: any) => {
        const newContestants = [...contestants];
        newContestants[index].votes += 1;
        setContestants(newContestants);
    };

    useEffect(() => {
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
                    setFirstName(response.data.event_type_2[0].name);
                }
                console.log('Fetched data:', response.data);
            } catch (error: any) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto'>
            <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0' />

            <div className='w-[90%] z-30 flex items-center justify-center mt-[200px] mx-4 sm:mx-12 '>
                {contestants.length > 0 && (
                    <Tabs defaultValue={firstName} className='w-auto text-ellipsis z-26'>
                        <p className='text-[#ff6347] font-harlow text-3xl mb-4 text-center'>Performance Battle </p>
                        <TabsList className='z-26 w-screenont-harlow grid grid-cols-10 xslg:grid-cols-5 xs:grid-cols-2 xs:mx-44 gap-2'>
                            {contestants.map((contestant: any, index: any) => (
                                <TabsTrigger key={index} value={contestant.name} className='z-28 font-harlow data-[state=active]:text-[#ca5a4c] data-[state=active]:text-md data-[state=active]:bg-[#ffdc73]'>
                                    {/* {contestant.name} */}
                                    {'Contestant ' + (index + 1)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {contestants.map((contestant: any, index: any) => (
                            <TabsContent key={index} value={contestant.name} className='xs:mx-44 mt-20'>
                                <VotingCard index={index} data={contestant} />
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    );
};

export default PerformanceBattleContainer;