import React, { useState } from 'react';
import '@/screens/login/style.css';
import AddPBContestantDialog from './performance-battle-onboard/AddPBContestantDialog';
import AddMDressContestantDialog from './mr-and-ms-dress-onboard/AddMDressContestantDialog';

const SettingsContainer = () => {
    const [isPBDialogOpen, setIsPBDialogOpen] = useState(false);
    const [isMDressDialogOpen, setIsMDressDialogOpen] = useState(false);

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

    return (
        <div className='w-screen h-screen flex items-start justify-center'>
            {/* <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0' /> */}

            <button className='w-[10%] self-center' onClick={openPBDialog}>
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front font-harlow"> Add Contestant </span>
            </button>
            <div className='mx-4' />
            <button className='w-[10%] self-center' onClick={openMDressDialog}>
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front font-harlow"> Add Mr and Ms Dress Contestant </span>
            </button>

            <AddPBContestantDialog open={isPBDialogOpen} onClose={closePBDialog} />
            <AddMDressContestantDialog open={isMDressDialogOpen} onClose={closeMDressDialog} />
        </div>
    );
};

export default SettingsContainer;