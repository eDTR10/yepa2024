import { useNavigate } from 'react-router-dom';
import axios from '../../../plugin/axios';
import '@/screens/login/style.css'
import { useEffect, useState } from 'react';
import { CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';



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



function PBCard() {

    const [events, eventType] = useState<any>([]);
    const navigate = useNavigate()

    const backtoNavigateToParticipants = () => {
        navigate('/yepa2024/admin/dashboard');
    }; 

    function getEvent() {
        // const userName = localStorage.getItem('name');
        
        // if (userName !== 'ryanss') {
        //     navigate("/yepa2024/login")
        //     return;
        // }
        
        axios.get('contestant/all', {
        }).then((response:any) => {
            
            eventType(response.data);
            console.log(events)
        });
    }
    
    useEffect(() => {
        getEvent()
    }, []);

  return (
    <>
    <div className='w-screen flex items-start justify-center overflow-y-auto'>
           {/* <button className='justify-start'>Back</button> */}
                <div className="flex-1 flex flex-col items-center z-0">
                    <Tabs defaultValue="pb" className="w-full p-10 z-40">
                        <TabsList className="flex justify-center w-full sticky top-0 ">
                            <TabsTrigger value="pb" className="flex-1 text-2xl  text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Performance Battle</TabsTrigger>
                            <TabsTrigger value="mr." className="flex-1 text-2xl text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Mr. Dress</TabsTrigger>
                            <TabsTrigger value="ms." className="flex-1 text-2xl text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Ms. Dress</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pb" className="w-full h-[calc(100vh-4rem)] ">
                            <button className='mt-10 mb-10 w-[20%] justify-start' onClick={backtoNavigateToParticipants}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front  font-harlow "> Back to dashboard
                                </span>
                            </button>
                            <div className="justify-center flex-row flex flex-wrap space-x-4 xs:flex xs:flex-col xs:justify-center">
                                {events?.event_type_2?.map((event:any, index:any) => (
                                    <div key={index} className="rounded-lg w-[280px] mb-12 border-4 border-[#ff6347] p-2 overflow-auto bg-[#f5f5dc] shadow-lg">
                                        <div className='w-full h-[150px] flex justify-center items-center overflow-hidden'>
                                            <img src={event.photos ? `${import.meta.env.VITE_URL}${event.photos}` : 'https://github.com/shadcn.png'} alt="@shadcn" className='object-cover h-full' />
                                        </div>
                                        <hr />
                                        <CardFooter>
                                            <p className="text-2xl text-center font-harlow">Team Name: 
                                                <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{event.name || "Unknown name"}</Badge></p>
                                        </CardFooter>
                                    </div>
                                ))} 

                            </div>
                        </TabsContent>
                        <TabsContent value="mr." className="w-full h-[calc(100vh-4rem)] ">
                            <button className='mt-10 mb-10 w-[20%] justify-start' onClick={backtoNavigateToParticipants}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front  font-harlow "> Back to dashboard
                                </span>
                            </button>
                            <div className="justify-center flex-row flex flex-wrap space-x-4 xs:flex xs:flex-col xs:justify-center">
                                {events?.event_type_0?.map((event:any, index:any) => (
                                    <div key={index} className="rounded-lg w-[280px] mb-12 border-4 border-[#ff6347] p-2 overflow-auto bg-[#f5f5dc] shadow-lg">
                                        <div className='w-full h-[150px] flex justify-center items-center overflow-hidden'>
                                            <img src={event.photos ? `${import.meta.env.VITE_URL}${event.photos}` : 'https://github.com/shadcn.png'} alt="@shadcn" className='object-cover h-full' />
                                        </div>
                                        <hr />
                                        <CardFooter className='justify-center'>
                                            <p className="text-2xl font-harlow">Name: 
                                            <br /> <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{event.name || "Unknown name"}</Badge></p>
                                        </CardFooter>
                                    </div>
                                )) }

                            </div>
                        </TabsContent>
                        <TabsContent value="ms." className="w-full h-[calc(100vh-4rem)] ">
                            <button className='mt-10 mb-10 w-[20%] justify-start' onClick={backtoNavigateToParticipants}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front  font-harlow "> Back to dashboard
                                </span>
                            </button>
                            <div className="justify-center flex-row flex-wrap flex space-x-4 xs:flex xs:flex-col xs:justify-center">
                                {events?.event_type_1?.map((event:any, index:any) => (
                                    <div key={index} className="rounded-lg w-[280px] mb-12 border-4 border-[#ff6347] p-2 overflow-auto bg-[#f5f5dc] shadow-lg">
                                        <div className='w-full h-[150px] flex justify-center items-center overflow-hidden'>
                                            <img src={event.photos ? `${import.meta.env.VITE_URL}${event.photos}` : 'https://github.com/shadcn.png'} alt="@shadcn" className='object-cover h-full' />
                                        </div>
                                        <hr />
                                        <CardFooter className='justify-center'>
                                            <p className="text-2xl text-center font-harlow">Name: 
                                                <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{event.name || "Unknown name"}</Badge></p>
                                        </CardFooter>
                                    </div>
                                ))} 

                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
   
</>

   




    
   
   
  )
}

export default PBCard