import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import axios from '../../../plugin/axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate()
    const [events, eventType] = useState<any>([]);

    function getEvent() {
        const userName = localStorage.getItem('name');
        
        if (userName !== 'ryanss') {
            navigate("/yepa2024/login")
            return;
        }
        
        axios.get('contestant/all', {
        }).then((response:any) => {
            
            eventType(response.data);
            console.log(events)
        });
    }
    
    useEffect(() => {
        getEvent()
    }, []);

    const getEventType = (uid:any) => {
        switch (uid) {
        case 0:
            return 'Mr.';
        case 1:
            return 'Ms.';
        case 2:
            return 'Perfomance Battle';
        default:
            return 'Unknown Event';
        }
    };

  return (
    <>
        <div className="flex-grow ml-3 md:ml-60 transition-all duration-300 ease-in-out flex items-center justify-between">
            <div className="absolute inset-x-0 top-0 left-60 h-16 flex items-center p-4 mt-10 font-sans">
                <p className="font-harlow text-[#ca5a4c] text-6xl mt-10">
                    Welcome to
                    <br />
                    <span className="text-2xl ml-3">2024 Year-End Performance Assessment and Recognition</span>
                </p>
            </div>
        </div>


        <div className="phone:flex transition-all duration-300 ease-in-out mt-48 overflow-y-auto w-[7000%]">
            <div className="font-sans">
                <div className="">
                    <Card className="p-5 border-[8px] border-[#ca5a4c] bg-[#ffc764] w-[100%]">
                        <div className="flex flex-row mb-5 ">
                            <CardHeader>
                                <CardTitle className="text-start font-harlow ">
                                    Performance Battle
                                </CardTitle>
                            </CardHeader>
                            <div className="flex-wrap grid grid-cols-5">
                                {events?.event_type_2?.map((event:any, index:any) => (
                                    <div key={index} className="phone:p-3">
                                        <Card className="w-32 h-32 border-[5px] border-[#ca5a4c]">
                                            <img src={event.photos ? `http://${import.meta.env.VITE_URL}${event.photos}` : 'https://github.com/shadcn.png'} alt={event.name} className='rounded-full h-28 w-28 object-cover' />
                                        </Card>
                                        <CardDescription className="ml-4 font-bold pt-3 text-center">
                                            <span className="italic">{getEventType(event.event_type)} </span>
                                            {event.name}</CardDescription>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2 mb-5 ">
                            <CardHeader>
                                <CardTitle className="text-start font-harlow ">
                                    Mr.
                                </CardTitle>
                            </CardHeader>
                            <div className="flex flex-row space-x-4">
                                {events?.event_type_0?.map((event:any, index:any) => (
                                    <div key={index} className="phone:p-3">
                                        <Card className="w-32 h-32 border-[5px] border-[#ca5a4c]">
                                            <img src={event.photos ? `http://${import.meta.env.VITE_URL}${event.photos}` : 'https://github.com/shadcn.png'} alt={event.name} className='rounded-full h-28 w-28 object-cover' />
                                        </Card>
                                        <CardDescription className="ml-4 font-bold pt-3 text-center">
                                            <span className="italic">{getEventType(event.event_type)}</span>
                                            {event.name}</CardDescription>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className=" gap-2 mb-5 flex flex-wrap">
                            <CardHeader>
                                <CardTitle className="text-start font-harlow">
                                    Ms.
                                </CardTitle>
                            </CardHeader>
                            <div className="flex flex-wrap space-x-4 ">
                                {events?.event_type_1?.map((event:any, index:any) => (
                                    <div key={index} className="phone:p-3">
                                        <Card className="w-32 h-32 border-[5px] border-[#ca5a4c]">
                                            <img src={event.photos ? `http://${import.meta.env.VITE_URL}${event.photos}` : 'https://github.com/shadcn.png'} alt={event.name} className='rounded-full h-28 w-28 object-cover' />
                                        </Card>
                                        <CardDescription className="ml-4 font-bold pt-3 text-center">{getEventType(event.event_type)} {event.name}</CardDescription>
                                        <p className="text-sm italic"></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                       
                    </Card>

                   
                    
                </div>
            </div>
        </div>

       
    </>
    
  );
}

export default Welcome