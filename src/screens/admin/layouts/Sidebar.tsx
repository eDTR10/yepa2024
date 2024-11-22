import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle";
import viteLogo from "/yepa2.png";
import { useState } from "react";

 import "../../admin/style.css"
import { ArrowLeftIcon, Building2Icon, CakeIcon, ClipboardListIcon, Gauge, GaugeIcon, ListChecksIcon, LogOutIcon, MenuIcon, UsersIcon } from "lucide-react";
import NavLink from "@/components/link/link";
import Welcome from "./Welcome";

export function Sidebar() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    return (
      <div className="sunburst-bg  h-screen w-screen flex">
        <div className=" flex left-0 p-7 fixed z-40  ">
          <MenuIcon className=" text-black hidden lg:hidden md:flex cursor-pointer " onClick={() => setShow(true)} />
        </div>
        <nav className={show ? " border-[8px] border-[#ca5a4c] bg-[#ffc764]  md:fixed duration-400 flex lg:flex animate__animated animate__slideInLeft   md:flex flex-col   min-w-[250px] border-b-[0px] backdrop-blur-md h-full justify-between py-10 text-accent rounded-e-[20px] z-50 " : " translate-x-96 duration-450 z-50 relative md:hidden animate__animated animate__slideInLeft  border-[8px] border-[#ca5a4c] bg-[#ffc764]  flex flex-col   min-w-[250px] h-full justify-between py-10 text-accent rounded-e-[20px] "}>

          <div className={show ? " absolute animate-slide-left z-20 right-0 cursor-pointer rounded-full bg-[#ca5a4c]   h-12 w-12  items-center justify-center mt-11 md:flex hidden" : "hidden"} onClick={() => setShow(false)}>
            <ArrowLeftIcon className=" text-white " />
          </div>
          <div className=" flex h-full flex-col gap-10">
            <Link className=" rounded-md flex  justify-center w-full " to="/admin " >
              <div className=" flex mr-4 flex-col gap-7 justify-center">
              <Link to="/yepa2024">
             <img src={viteLogo} className="logo w-32 object-contain ml-6" alt="Vite logo" />
            </Link>

               
              </div>

            </Link>
            <nav className=" flex flex-col  pl-10 h-[40%] justify-between mt-10  ">
              <div className=" text-accent-foreground flex flex-col gap-5 font-bold font-harlow text-xl ml-6">
                <NavLink
                  to="/yepa2024/admin/dashboard"
                  text="Home"
                  icon={<ListChecksIcon className="w-5 h-5 " />}
                />
                <NavLink
                  to=""
                  text="Settings"
                  icon={<Building2Icon className=" w-5 h-5 " />}
                />
              </div>

            </nav>
          </div>

          <div className="w-[80%] ml-6 front  font-harlow">
            <div onClick={() => {

              localStorage.clear()
              navigate('/')
            }} className=" cursor-pointer flex gap-3 items-center justify-center  w-[150px] h-5 rounded-sm">
              <p >Log Out</p>
              <LogOutIcon className=" w-5 h-5 " />
            </div>
          </div>
        </nav>
        <Welcome />


        <div className=" w-full flex" onClick={() => setShow(false)}>
          <Outlet />
        </div>
        <div className="relative mr-5 top-0 mt-10">
            <div>
                <ModeToggle />
            </div>
          </div>
      </div>
      );
      
}

export default Sidebar


 