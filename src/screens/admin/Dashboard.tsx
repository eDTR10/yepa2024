
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import '@/screens/login/style.css'
import { useNavigate } from "react-router-dom";
import SettingsContainer from "../settings/SettingsContainer";

function Dashboard() {

    const navigate = useNavigate()
    const navigateToParticipants = () => {
        navigate('/yepa2024/admin/participants');
    }; 

    const navigateToRatings = () => {
        navigate('/yepa2024/admin/ratings');
    }; 

    return (
        <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto '>
            <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0'/>
                <div className="flex-1 flex flex-col items-center mt-36">
                    <Tabs defaultValue="dashboard" className="w-full p-10 z-30">
                        <TabsList className="flex justify-center w-full sticky top-0 ">
                            <TabsTrigger value="dashboard" className="flex-1 text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Dashboard</TabsTrigger>
                            <TabsTrigger value="settings" className="flex-1 text-center font-harlow border-[8px] border-[#ca5a4c] data-[state=active]:bg-[#ffc764]">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dashboard" className="w-full h-[calc(100vh-4rem)] xs:justify-center">
                            <div className="mt-48 justify-center flex-row flex space-x-4 xs:flex xs:flex-row ">
                                <button className='w-[20%] xs:w-[50%]' onClick={navigateToParticipants}>
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front font-harlow">View Participants</span>
                                </button>

                                <button className=' w-[20%] xs:w-[50%] ' onClick={navigateToRatings}>
                                    <span className="shadow"></span>
                                    <span className="edge"></span>
                                    <span className="front  font-harlow ">View Ratings
                                    </span>
                                </button>
                            </div>
                        
                            {/* <div className="w-full p-4">
                                <DashboardContainer />
                            </div> */}
                        </TabsContent>
                        <TabsContent value="settings" className="overflow-scroll pb-12 w-full h-[calc(100vh-4rem)] ">
                            <div className="w-full p-4">
                               <SettingsContainer />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            
    );
}

export default Dashboard