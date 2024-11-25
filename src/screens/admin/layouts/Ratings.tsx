import { CardFooter } from "@/components/ui/card"
import axios from '../../../plugin/axios';
import '@/screens/login/style.css'
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import '@/screens/admin/style.css'

function Ratings() {
 
    const [ratings, setRatings] = useState<any>([]);
    const navigate = useNavigate()

    const backToDashboard = () => {
        navigate('/yepa2024/admin/dashboard');
    }; 

    function getEvent() {
        const userName = localStorage.getItem('name');
        
        if (userName !== 'Ryan') {
            navigate("/yepa2024/login")
            return;
        }
        
        axios.get('vote/all', {
        }).then((response:any) => {
            
            setRatings(response.data);
            console.log(ratings)
        });
    }
    
    useEffect(() => {
        getEvent()
    }, []);
  return (
    <>
     <div className='w-screen flex items-start justify-center overflow-y-auto'>
                <div className="flex-1 flex flex-col items-center z-0">
                    <Tabs defaultValue="pb" className="w-full p-10 z-40">
                        <TabsList className="flex justify-center w-full sticky top-0 ">
                            <TabsTrigger value="pb" className="flex-1 text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Performance Ranking</TabsTrigger>
                            <TabsTrigger value="mr." className="flex-1 text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Male Ranking</TabsTrigger>
                            <TabsTrigger value="ms." className="flex-1 text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Female Ranking</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pb" className="w-full h-[calc(100vh-4rem)] ">
                            <button className='mt-10 mb-10 w-[20%] xs:w-[100%] justify-start' onClick={backToDashboard}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front  font-harlow "> Back to dashboard
                                </span>
                            </button>
                            <div className="justify-center flex-row flex-wrap flex space-x-4 xs:flex xs:flex-col xs:justify-center">
                                {ratings?.performance_ranking?.map((rating:any, index:any) => (
                                    <div key={index} className="rounded-lg w-[280px] mb-12 border-4 border-[#ff6347] p-2 overflow-auto bg-[#f5f5dc] shadow-lg">
                                        <div className='w-full h-[150px] flex justify-center items-center overflow-hidden zoom-container'>
                                            <img src={rating.photos ? `${import.meta.env.VITE_URL}${rating.photos}` : 'https://github.com/shadcn.png'} alt="@shadcn" className='object-cover h-full' />
                                        </div>
                                        <hr />
                                        <CardFooter>
                                            <div className="flex flex-col">
                                                <p className="text-lg text-start font-harlow mt-3">Contestant No. <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.contestant}</Badge></p>
                                                <p className="text-lg text-start font-harlow">Team Name: <span className="text-2xl ">{rating.name}</span></p>
                                                <p className="text-lg text-start font-harlow mt-3">Total votes: <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.total_votes}</Badge></p>
                                                <p className="text-lg text-start font-harlow">Total Score: <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.total_score}</Badge></p>
                                            </div>
                                        
                                        </CardFooter>
                                    </div>
                                ))}

                            </div>
                        </TabsContent>
                        <TabsContent value="mr." className="w-full h-[calc(100vh-4rem)] ">
                            <button className='mt-10 mb-10 w-[20%] xs:w-[100%] justify-start' onClick={backToDashboard}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front  font-harlow "> Back to dashboard
                                </span>
                            </button>
                            <div className="justify-center flex-row flex-wrap flex space-x-4 xs:flex xs:flex-col xs:justify-center">
                                {ratings?.male_ranking?.map((rating:any, index:any) => (
                                    <div key={index} className="rounded-lg w-[280px] mb-12 border-4 border-[#ff6347] p-2 overflow-auto bg-[#f5f5dc] shadow-lg">
                                        <div className='w-full h-[150px] flex justify-center items-center overflow-hidden zoom-container'>
                                            <img src={rating.photos ? `${import.meta.env.VITE_URL}${rating.photos}` : 'https://github.com/shadcn.png'} alt="@shadcn" className='object-cover h-full' />
                                        </div>
                                        <hr />
                                        <CardFooter>
                                            <div className="flex flex-col">
                                                <p className="text-lg text-start font-harlow mt-3">Contestant No. <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.contestant}</Badge></p>
                                                <p className="text-lg text-start font-harlow">Team Name: <span className="text-2xl ">{rating.name}</span></p>
                                                <p className="text-lg text-start font-harlow mt-3">Total votes: <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.total_votes}</Badge></p>
                                                <p className="text-lg text-start font-harlow">Total Score: <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.total_score}</Badge></p>
                                            </div>
                                        
                                        </CardFooter>
                                    </div>
                                ))}

                            </div>
                        </TabsContent>
                        <TabsContent value="ms." className="w-full h-[calc(100vh-4rem)] ">
                            <button className='mt-10 mb-10 w-[20%] xs:w-[100%] justify-start' onClick={backToDashboard}>
                                <span className="shadow"></span>
                                <span className="edge"></span>
                                <span className="front  font-harlow "> Back to dashboard
                                </span>
                            </button>
                            <div className="justify-center flex-row flex-wrap flex space-x-4 xs:flex xs:flex-col xs:justify-center">
                                {ratings?.female_ranking?.map((rating:any, index:any) => (
                                    <div key={index} className="rounded-lg w-[280px] mb-12 border-4 border-[#ff6347] p-2 overflow-auto bg-[#f5f5dc] shadow-lg">
                                        <div className='w-full h-[150px] flex justify-center items-center overflow-hidden zoom-container'>
                                            <img src={rating.photos ? `${import.meta.env.VITE_URL}${rating.photos}` : 'https://github.com/shadcn.png'} alt="@shadcn" className='object-cover h-full' />
                                        </div>
                                        <hr />
                                        <CardFooter>
                                            <div className="flex flex-col">
                                                <p className="text-lg text-start font-harlow mt-3">Contestant No. <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.contestant}</Badge></p>
                                                <p className="text-lg text-start font-harlow">Team Name: <span className="text-2xl ">{rating.name}</span></p>
                                                <p className="text-lg text-start font-harlow mt-3">Total votes: <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.total_votes}</Badge></p>
                                                <p className="text-lg text-start font-harlow">Total Score: <Badge className="bg-[#ffc764] text-black text-xl font-bold me-3 animate-bounce">{rating.total_score}</Badge></p>
                                            </div>
                                        
                                        </CardFooter>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div></>
   

  )
}

export default Ratings