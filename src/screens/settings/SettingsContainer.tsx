import { useEffect, useState } from 'react';
import '@/screens/login/style.css';
import AddPBContestantDialog from './performance-battle-onboard/AddPBContestantDialog';
import AddMDressContestantDialog from './mr-and-ms-dress-onboard/AddMDressContestantDialog';
import Swal from 'sweetalert2';
import axios from "@/components/plugin/axios";

const SettingsContainer = () => {
    const [isPBDialogOpen, setIsPBDialogOpen] = useState(false);
    const [isMDressDialogOpen, setIsMDressDialogOpen] = useState(false);
    const [contestantsPB, setContestantsPB] = useState<any>([]);
    const [contestantsMrDress, setContestantsMrDress] = useState<any>([]);
    const [contestantsMsDress, setContestantsMsDress] = useState<any>([]);

    const openPBDialog = () => {
        setIsPBDialogOpen(true);
    };

    const closePBDialog = () => {
        setIsPBDialogOpen(false);
    };

    const openMDressDialog = () => {
        setIsMDressDialogOpen(true);
    };

    const closeMDressDialog = () => {
        setIsMDressDialogOpen(false);
    };

    const deleteContestant = async (id: any) => {
        try {
             await axios.delete(`/contestant/${id}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem("accessToken")}`,
                }
            }).then(()=>{
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully...",
                    showConfirmButton: false,
                    timer: 2000
                });
            })



            

            // Refresh the list of contestants after deletion
            fetchContestants();

        } catch (error: any) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.non_field_errors?.[0] || error.message,
                showConfirmButton: false,
            });
        }
    };

    const fetchContestants = async () => {
        try {
            const responsePB = await axios.get('/contestant/all/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("accessToken")}`,
                }
            });
            setContestantsPB(responsePB?.data?.event_type_2);

            const responseMDress = await axios.get('/contestant/all/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("accessToken")}`,
                }
            });
            setContestantsMrDress(responseMDress?.data?.event_type_0);
            setContestantsMsDress(responseMDress?.data?.event_type_1);
        } catch (error: any) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchContestants();
    }, []);
    console.log(contestantsPB === undefined ? 'Wala' : '');
    // Combine contestantsMrDress and contestantsMsDress into a single array
    const combinedContestants = contestantsMrDress.map((mrContestant: any, index: any) => ({
        mrName: mrContestant.name,
        msName: contestantsMsDress[index]?.name || '',
        mrUid: mrContestant.uid,
        msUid: contestantsMsDress[index]?.uid || ''
    }));

    return (
        <div className='w-screen h-screen flex items-start justify-center'>
            <div className='w-full max-w-6xl grid grid-cols-2 slg:grid-cols-1 slg:px-12 gap-4'>
                <div className='flex flex-col items-center'>
                    <button className='w-full mb-4' onClick={openPBDialog}>
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front font-harlow"> Add Participant </span>
                    </button>
                    <table className='w-full border-collapse border border-[#ff6347] text-[#333]'>
                        <thead>
                            <tr>
                                <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Name</th>
                                <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {contestantsPB !== undefined ? contestantsPB?.map((contestant: any, index: any) => (
                                <tr key={index}>
                                    <td className='border border-[#ff6347] p-2'>{contestant?.name}</td>
                                    <td className='border border-[#ff6347] p-2'>
                                        <button className='bg-red-500 text-white px-2 py-1 rounded ml-2' onClick={() => deleteContestant(contestant.uid)}>Delete</button>
                                    </td>
                                </tr>
                            )) : ''}
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col items-center'>
                    <button className='w-full mb-4' onClick={openMDressDialog}>
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front font-harlow"> Add Mr and Ms Dress Contestant </span>
                    </button>
                    <table className='w-full border-collapse border border-[#ff6347] text-[#333]'>
                        <thead>
                            <tr>
                                <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Mr</th>
                                <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Action</th>
                                <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Ms</th>
                                <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contestantsMrDress && contestantsMsDress !== undefined ?
                                combinedContestants?.map((contestant: any, index: any) => (
                                    <tr key={index}>
                                        <td className='border border-[#ff6347] p-2'>{contestant.mrName}</td>
                                        <td className='border border-[#ff6347] p-2'>
                                            <button className='bg-red-500 text-white px-2 py-1 rounded ml-2' onClick={() => deleteContestant(contestant.mrUid)}>Delete</button>
                                        </td>
                                        <td className='border border-[#ff6347] p-2'>{contestant.msName}</td>
                                        <td className='border border-[#ff6347] p-2'>
                                            <button className='bg-red-500 text-white px-2 py-1 rounded ml-2' onClick={() => deleteContestant(contestant.msUid)}>Delete</button>
                                        </td>
                                    </tr>
                                )) : ''}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddPBContestantDialog open={isPBDialogOpen} onClose={closePBDialog} />
            <AddMDressContestantDialog open={isMDressDialogOpen} onClose={closeMDressDialog} />
        </div>
    );
};

export default SettingsContainer;