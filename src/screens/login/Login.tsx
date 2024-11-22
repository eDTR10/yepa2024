
import './style.css'
import viteLogo from "/yepa.png";
function Login() {
  return (
    <div className=' mains w-screen h-screen  flex items-center justify-center'>
        <div className=' sunburst-bg w-screen h-screen flex items-center  absolute z-[-1]'>

        </div>

        <form
        className='animate__animated animate__backInDown z-10 w-[95%] rounded-md flex-col pb-10 pt-3  max-w-[500px] px-5 flex bg-[#ffc764]  drop-shadow-md border-[8px] border-[#ca5a4c] '
        onSubmit={(e:any)=>{
            e.preventDefault()
        }}>

            <img src={viteLogo} className='w-full h-40 object-contain' alt="" />
            <div className=' flex gap-10 flex-col'>


            <div className=' flex flex-col gap-0  items-center'>
                <h1 className=' translate-y-3 drop-shadow-md font-harlow text-[#ca5a4c] text-6xl'>Welcome to</h1>
            <p className=' text-xs font-lovelo-black text-white'>2024 Year-End Performance <br /> Assessment and Recognition</p>
            </div>
            <input
                type="text"
                name="username"
                className="input w-[70%] self-center font-lovelo-black"
                placeholder="Enter Name"
            />
          <button className=' w-[40%] self-center'>
            <span className="shadow"></span>
            <span className="edge"></span>
            <span className="front  font-harlow"> Submit
            </span>
          </button>
 
  


            </div>
        </form>
       
    </div>
   

  )
}

export default Login