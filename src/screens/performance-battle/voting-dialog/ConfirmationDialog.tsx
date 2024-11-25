import { Button } from '@/components/ui/button';


const ConfirmationDialog = ({ handleSubmit, onCancel }: { handleSubmit: () => void, onConfirm: () => void, onCancel: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#f5f5dc] p-6 rounded-lg shadow-lg">
                <p className="text-lg mb-4 font-harlow text-[#ff6347]">Are you sure you want to submit your score?</p>
                <div className="flex justify-end space-x-4">
                    <Button
                        variant={"outline"}
                        className="text-[#ff6347] bg-transparent py-2 px-4 rounded-lg transition-colors duration-300"
                        onClick={onCancel}
                    >
                        No
                    </Button>
                    <Button
                        className="bg-[#ff6347] text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300"
                        onClick={handleSubmit}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;