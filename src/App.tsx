import { ThemeProvider } from "@/components/theme-provider"

import viteLogo from "/yepa2.webp";

import { Link, Outlet } from "react-router-dom";

import { ModeToggle } from "./components/mode-toggle";
// import Reveal from "./components/animation/reveal";
// import { SearchIcon } from "lucide-react";
// import NavLink from "./components/link/link";

function App() {

  const name = localStorage.getItem("name")
  console.log(name)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" bg-background min-h-screen w-full overflow-hidden flex flex-col  items-center">

        <nav className=" animate__animated animate__slideInDown z-20 fixed flex justify-between w-full max-w-[1468px]  border-b-[0px] border-accent  ">
          <Link className="" to="/yepa2024" >
            <img src={viteLogo} className="logo w-44 object-contain " alt="Vite logo" />
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

            <ModeToggle />
          </div>


        </nav>




        <Outlet />

      </div>
    </ThemeProvider>
  )
}



export default App
