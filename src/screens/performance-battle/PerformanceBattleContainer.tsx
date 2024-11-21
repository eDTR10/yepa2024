import React, { useState } from 'react';
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
const initialContestants = [
    {
        name: "Contestant 1",
        team_name: "eGov Boys",
        votes: 0,
    },
    {
        name: "Contestant 2",
        team_name: "Three Musketeers",
        votes: 0,
    },
    {
        name: "Contestant 3",
        team_name: "Team Bangan",
        votes: 0,
    },
    {
        name: "Contestant 4",
        team_name: "Team Building",
        votes: 0,
    },
    {
        name: "Contestant 5",
        team_name: "TeamShessh",
        votes: 0,
    },

];

const PerformanceBattleContainer = () => {
    const [contestants, setContestants] = useState(initialContestants);

    const handleVote = (index: any) => {
        const newContestants = [...contestants];
        newContestants[index].votes += 1;
        setContestants(newContestants);
    };

    return (
        <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto'>
            <div className='sunburst-bg w-screen h-screen flex items-center  absolute z-0' />

            <div className='w-[90%] z-30 flex items-center justify-center mt-[200px] mx-4 sm:mx-12 '>

                <Tabs defaultValue={contestants[0].name} className='w-auto text-ellipsis z-26'>
                    <p className='text-[#ff6347] font-harlow text-3xl mb-4 text-center'>Performance Battle </p>
                    <TabsList className='z-26 w-screenont-harlow grid grid-cols-10 xslg:grid-cols-5 xs:grid-cols-2 xs:mx-44 gap-2
                    '>
                        {contestants.map((contestant, index) => (
                            <TabsTrigger key={index} value={contestant.name} className='z-28 font-harlow data-[state=active]:text-[#ca5a4c] data-[state=active]:text-md data-[state=active]:bg-[#ffdc73]' >
                                {contestant.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {contestants.map((contestant, index) => (
                        <TabsContent key={index} value={contestant.name} className='xs:mx-44 mt-20'>
                            <VotingCard data={contestant} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};

export default PerformanceBattleContainer;