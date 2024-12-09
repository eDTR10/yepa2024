import { ThemeProvider } from "@/components/theme-provider"

import viteLogo from "/yepa2.webp";

import { Link, Outlet, useNavigate } from "react-router-dom";


// import Reveal from "./components/animation/reveal";
// import { SearchIcon } from "lucide-react";
// import NavLink from "./components/link/link";
import './../login/style.css'
import { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function MainDress() {
  const validNames = ["sittie", "eugene", "lourdes", "alawi", "raposala", "batoon"];
  const [show, setshow] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const data = localStorage.getItem("name");



    if (data) {


      if (validNames.some((name) => data.toLowerCase().includes(name))) {
        setshow(true)
      } else {
        setshow(false)
      }

    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" bg-background min-h-screen w-full overflow-hidden flex flex-col  items-center">
        <Button onClick={() => {
          navigate("/yepa2024/vote/performance-battle")
        }} className=" absolute z-[999] right-0 top-0 mr-5 mt-10 text-[#ca5a4c] bg-[#ffdc73] font-harlow hover:bg-[#ca5a4c]/50"><MoveRight /> Switch to Performance Battle</Button>
        <div className=' sunburst-bg w-screen h-screen flex items-center  absolute z-[1]'>

        </div>

        <nav className=" animate__animated animate__slideInDown   z-[60]  fixed flex justify-between w-full max-w-[1468px]  border-b-[0px] border-accent  ">
          <Link className="" to="/yepa2024" >
            <img src={viteLogo} className="logo w-44 sm:w-32 object-contain " alt="Vite logo" />
          </Link>
          {/* <nav className=" text-accent-foreground flex gap-10 uppercase items-center">
        <NavLink
        to="/yepa2024/page1"
        text="HOME"
        />

        <NavLink
        to="/yepa2024/page2"
        text="ABOUT US"
        />

        <NavLink
        to="/yepa2024/page4"
        text="Codlit"
        />

        <NavLink
        to="/yepa2024/contact"
        text="Contact Us"
        />


        <div className=" bg-primary p-3 rounded-full hover:cursor-pointer">
          <SearchIcon className=" text-accent w-5 h-5 "/>
        </div>
        
        </nav> */}
          <div className=" mr-5 top-0 mt-10">

            {/* <ModeToggle /> */}

          </div>


        </nav>




        <Outlet />

      </div>
    </ThemeProvider>
  )
}



export default MainDress
