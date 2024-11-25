
import { useEffect, useState } from 'react';
import './style.css'

import viteLogo from "/yepa.png";
import FireworksDisplay from './FireWorks';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
function Login() {
  const validNames = ["sittie", "eugene", "lourdes", "alawi", "raposala", "batoon"];
  useEffect(() => {
    const data = localStorage.getItem("name");

    if (data) {

      if (validNames.some((name) => data.toLowerCase().includes(name))) {

      } else {
        console.log("runn")
        navigate("/yepa2024/vote")
      }

    }
  }, []);

  const navigate = useNavigate()
  const [user, setuser] = useState("")
  return (

    <div className=' mains w-screen h-screen overflow-hidden relative  flex items-center justify-center'>
      <FireworksDisplay />
      <div className=' sunburst-bg w-screen h-screen flex items-center  absolute z-[-1]'>

      </div>



      <form
        className="fire animate__animated animate__backInDown z-10 w-[95%] flex-col  pt-3 max-w-[500px] px-5 flex bg-[#ffc764] drop-shadow-md rounded-[70px] relative overflow-hidden pb-10"
        onSubmit={(e: any) => {
          e.preventDefault()

          if (validNames.some((name) => user.toLowerCase().includes(name))) {
            alert("Name is valid!");
            navigate("/yepa2024/chosen-category")
            localStorage.setItem("name", user)
            setuser("")
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome to YEPA 2k24 ${user.toUpperCase()}`,
              showConfirmButton: false,
              timer: 1500
            });
            localStorage.setItem("name", user)
            navigate("/yepa2024/vote")
            setuser("")
          }
        }}>

        <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-[#a80b39] to-[#ff6347]  "></div>
        {/* Inner Content */}
        <div className="relative w-full h-full bg-[#ffc764]  rounded-[70px] pb-10">
          <img src={viteLogo} className='w-full h-40 object-contain' alt="" />
          <div className=' flex gap-10 flex-col'>


            <div className=' flex flex-col gap-0  items-center'>
              <h1 className=' translate-y-3 drop-shadow-md font-harlow text-[#ca5a4c] text-6xl mr-2 tracking-tighter'>Welcome to</h1>
              <p className=' text-sm text-center font-lovelo-black text-white tracking-tighter'>2024 Year-End Performance <br /> Assessment and Recognition</p>
            </div>
            <input
              type="text"
              name="username"
              required
              value={user}
              onChange={(e) => {
                setuser(e.target.value)
              }}
              className="input w-[70%] self-center font-lovelo-black"
              placeholder="Enter Name"
            />
            <button className=' w-[40%] self-center'>
                        <span className="shadow"></span>
                        <span className="edge"></span>
                        <span className="front  font-harlow "> Submit
                        </span>
                      </button>




          </div>
        </div>





      </form>

    </div>


  )
}

export default Login