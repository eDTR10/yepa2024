import React, { useState, useEffect } from 'react';
import ConfirmationDialog from '../voting-dialog/ConfirmationDialog';
import Swal from 'sweetalert2';
import axios from "@/components/plugin/axios";

const VotingCard = ({  data, fetchData, moveToNextTab }: any) => {
    const [ip, _setIp] = useState<any>(localStorage.getItem("ip")?localStorage.getItem("ip"):"");
    const [_votes, setVotes] = useState<any>([]);
    const [scores, setScores] = useState({
        talent: '',
        creativity: '',
        stagePresence: '',
        relevanceToICT: '',
        timeAdherence: '',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility



    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let parsedValue = parseInt(value, 10);

        if (value === '') {
            setScores({
                ...scores,
                [name]: '',
            });
            return;
        } else if (isNaN(parsedValue)) {
            parsedValue = 0;
        }

        let maxValue = 0;
        if (name === 'talent') {
            maxValue = 30;
        } else if (name === 'creativity' || name === 'stagePresence') {
            maxValue = 20;
        } else if (name === 'relevanceToICT' || name === 'timeAdherence') {
            maxValue = 15;
        }

        if (parsedValue > maxValue) {
            parsedValue = maxValue;
        } else if (parsedValue < 0) {
            parsedValue = 0;
        }

        // Limit to 2 digits
        parsedValue = Math.min(parsedValue, 99);

        setScores({
            ...scores,
            [name]: parsedValue,
        });
    };

    const totalScore = Object.values(scores).reduce((acc, score) => acc + (parseInt(score as string, 10) || 0), 0);

    const handleConfirm = () => {
        setIsDialogOpen(false); // Hide the dialog
        localStorage.setItem(`scores_${data?.name}`, JSON.stringify(scores)); // Save scores to local storage
        localStorage.setItem(`voted_${data?.uid}`, 'true'); // Indicate that the judge has voted for this contestant
        console.log('Scores submitted:', scores); // Handle form submission logic here
        fetchData();
        moveToNextTab();
    };

    const handleCancel = () => {
        setIsDialogOpen(false); // Hide the dialog
    };


    // Call fetchIp on component mount

    const handleSubmit = async () => {
        setIsDialogOpen(true); // Show the dialog

        const scoresArray = [scores.talent, scores.creativity, scores.stagePresence, scores.relevanceToICT, scores.timeAdherence].map(Number);

        const formData = [{
            ip: ip|| '',
            voted_to: data?.uid,
            name: localStorage.getItem('name'),
            score: scoresArray,
            event_type: 2
        }];

        try {
            const response = await axios.post('/vote/all/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem("accessToken")}`,
                }
            });

            Swal.fire({
                icon: "success",
                title: "Updated Successfully...",
                showConfirmButton: false,
                timer: 2000
            });
            handleConfirm();
            localStorage.setItem("user", JSON.stringify(response.data));

        } catch (error: any) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.non_field_errors?.[0] || error.message,
                showConfirmButton: false,
            });
            handleConfirm();
        }

    };


    useEffect(() => {
        // Load scores from local storage if they exist
        const savedScores = localStorage.getItem(`scores_${data?.name}`);
        if (savedScores) {
            setScores(JSON.parse(savedScores));
        }

        const fetchData = async () => {
            try {
                const response = await axios.get('vote/all/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("accessToken")}`,
                    },
                });
                setVotes(response.data);
                console.log('Fetched data:', response.data);
            } catch (error: any) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();

    }, [data?.name]);
    return (
        <div className='mb-12 border-4 border-[#ff6347] rounded-lg p-4 overflow-auto bg-[#f5f5dc] shadow-lg'>
            <p className='text-[#ff6347] text-lg mb-2 animate-bounce font-harlow'>📼 Now Playing: <u className=' text-3xl '>{data?.name}</u></p>
            <p className='text-[#ff6347] font-harlow text-xl mb-2 text-center'>Scoring Matrix </p>

            <table className='w-full border-collapse border border-[#ff6347] text-[#333]'>
                <thead>
                    <tr>
                        <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Criteria</th>
                        <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Description</th>
                        <th className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Points</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='border border-[#ff6347] p-2 text-xs'>Talent</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>Skill level, technique, and overall performance quality</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>
                            <div className='flex items-center'>
                                <input type="number" className='w-10 p-1' max={30} name="talent" value={scores.talent} onInput={handleInput} />
                                <span className='ml-1'>/ 30</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-[#ff6347] p-2 text-xs'>Creativity</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>Originality of the act, unique ideas, and innovative approach</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>
                            <div className='flex items-center'>
                                <input type="number" className='w-10 p-1' max={20} name="creativity" value={scores.creativity} onInput={handleInput} />
                                <span className='ml-1'>/ 20</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-[#ff6347] p-2 text-xs'>Stage Presence</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>Confidence, charisma, and ability to engage the audience</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>
                            <div className='flex items-center'>
                                <input type="number" className='w-10 p-1' max={20} name="stagePresence" value={scores.stagePresence} onInput={handleInput} />
                                <span className='ml-1'>/ 20</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-[#ff6347] p-2 text-xs'>Relevance to ICT</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>Effective integration of ICT in the performance, enhancing the overall presentation</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>
                            <div className='flex items-center'>
                                <input type="number" className='w-10 p-1' max={15} name="relevanceToICT" value={scores.relevanceToICT} onInput={handleInput} />
                                <span className='ml-1'>/ 15</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-[#ff6347] p-2 text-xs'>Time Adherence</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>Staying within the 2-3 minutes time limit</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>
                            <div className='flex items-center'>
                                <input type="number" className='w-10 p-1' max={15} name="timeAdherence" value={scores.timeAdherence} onInput={handleInput} />
                                <span className='ml-1'>/ 15</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='border border-[#ff6347] p-2 text-xs'> </td>
                        <td className='border border-[#ff6347] p-2 bg-[#ffebcd] text-[#ff6347]'>Total</td>
                        <td className='border border-[#ff6347] p-2 text-xs'>
                            <div className=''>
                                <span className='ml-1'> {totalScore}/ 100</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='flex justify-end mt-4'>
                <button
                    className='bg-[#ff6347] text-white py-2 px-4 rounded-lg hover:bg-[#ff4500] transition-colors duration-300'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            {isDialogOpen && (
                <ConfirmationDialog
                    handleSubmit={handleSubmit}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default VotingCard;