import './loader.css'
const Loader = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-white z-[9999] '>
<div className="container">
    <div className="plate">
        <div className="black">
            <div className="border">
                <div className="white">
                    <div className="center"></div>
                </div>
            </div>
        </div>
    </div>

    <div className="player">
        <div className="rect"></div>
        <div className="circ"></div>
    </div>
</div>
    </div>
    
  )
}

export default Loader