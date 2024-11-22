import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "./layouts/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import '@/screens/login/style.css'

function Dashboard() {

    return (
        <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto'>
            <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0' />

            </div>
            
    );
}

export default Dashboard