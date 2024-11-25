import '@/screens/login/style.css';
import { useNavigate } from 'react-router-dom';

const ChooseCategory = () => {
    const navigate = useNavigate()
    const goToPerformanceBattle = () => {
        console.log('Go to performance battle');
        navigate("/yepa2024/vote/performance-battle")
    };

    const goToMrAndMsDress = () => {
        console.log('Go to mr and ms dress');
        navigate("/yepa2024/vote/mrqen")
    }
    return (
        <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto'>
            <div className='sunburst-bg w-screen h-screen items-center absolute z-0 grid grid-cols-2' />


            <button className=' w-full grid-cols-1 self-center ml-5' onClick={goToPerformanceBattle}>
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front font-harlow"> Performance Battle</span>
            </button>
            <div className='mx-4' />
            <button className=' w-full grid-cols-1  self-center mr-5' onClick={goToMrAndMsDress}>
                <span className="shadow"></span>
                <span className="edge"></span>
                <span className="front font-harlow"> Mr and Ms Dress</span>
            </button>


        </div>
    )
}

export default ChooseCategory
