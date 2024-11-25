import React, { useEffect, useState } from 'react';
import axios from "@/components/plugin/axios";
import Swal from 'sweetalert2';

const AddPBContestantDialog = ({ open, onClose }: any) => {
    const [teamName, setTeamName] = useState('');
    const [picture, setPicture] = useState<File | null>(null);
    const [picturePreview, setPicturePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setShowSuccess(false);
            setTeamName('');
            setPicture(null);
            setPicturePreview(null);
            setError(null);
            setIsLoading(false);
        }
    }, [open]);

    const handleTeamNameChange = (event: any) => {
        setTeamName(event.target.value);
    };

    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File size should be less than 5MB');
                return;
            }
            setPicture(file);
            setPicturePreview(URL.createObjectURL(file));
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!teamName || !picture) {
            setError('Please provide both name and picture');
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', teamName);
        formData.append('photos', picture);
        formData.append('event_type', '2');

        try {
            const response = await axios.post('/contestant/all/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${localStorage.getItem("accessToken")}`,
                }
            });

            Swal.fire({
                icon: "success",
                title: "Updated Successfully...",
                showConfirmButton: false,
                timer: 2000
            });

            localStorage.setItem("user", JSON.stringify(response.data));

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 3000); // Show success dialog for 3 seconds
        } catch (error: any) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.non_field_errors?.[0] || error.message,
                showConfirmButton: false,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="mb-12 border-4 border-[#ff6347] rounded-lg p-4 overflow-auto bg-[#f5f5dc] shadow-lg w-96 relative animate-pop-down">
                <button onClick={onClose} className="absolute top-2 right-2 text-lg cursor-pointer">X</button>
                <h2 className="text-[#ff6347] text-2xl text-center mb-5 font-harlow">Add PB Contestant</h2>
                <div className="mb-5">
                    <input
                        placeholder="Team Name"
                        type="text"
                        value={teamName}
                        onChange={handleTeamNameChange}
                        className="w-full p-2 border-2 border-[#ff6347] rounded mb-3"
                    />
                    <input
                        accept="image/*"
                        id="upload-picture"
                        type="file"
                        onChange={handlePictureChange}
                    />
                    {picturePreview && (
                        <div className="mt-3">
                            <img src={picturePreview} alt="Preview" className="w-full h-[250px] rounded" />
                        </div>
                    )}
                    {error && (
                        <div className="mt-3 text-red-500">
                            {error}
                        </div>
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-[#ff6347] text-white rounded cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="text-center">
                        <div className="animate-spin-fade">
                            <img src={picturePreview!} alt="Success" className="w-32 h-32 rounded-full mx-auto" />
                        </div>
                        <p className="text-white mt-4 text-green-400 font-harlow">Submission Successful!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPBContestantDialog;