
import { PartyPopper, Stars } from 'lucide-react';

export default function YEPALoader() {
  return (
    <div className="  mains w-screen h-screen overflow-hidden relative  flex items-center justify-center">
      <div className=' sunburst-bg w-screen h-screen flex items-center  absolute z-[-1]'>
   
   </div>
      <div className="max-w-lg w-[95%] bg-[#fffff800] backdrop-blur-sm rounded-xl shadow-2xl p-8 space-y-6">
        {/* YEPA Logo/Icon */}
        <div className="flex justify-center ">
          <div className="relative">
            
            <Stars className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        
        {/* Event Title */}
        <div className="text-center space-y-3">
        
          <div className="flex items-center justify-center gap-2">
            <PartyPopper className="w-5 h-5 text-[#ff6347] animate-bounce" />
            <div className=" p-4 rounded-full">
              <img src="/yepa2.png" className=' w-full  object-contain' alt="" />
            </div>
            <PartyPopper className="w-5 h-5 text-[#ff6347] animate-bounce" />
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Welcome to DICT's annual celebration of excellence and growth! Join us as we reflect on our achievements together.
          </p>
        </div>
        
        {/* Theme Badge */}
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-blue-50 rounded-full text-sm text-[#ff6347] font-semibold animate-pulse">
            Tayo ang Tanglaw sa Bayang Digital
          </span>
        </div>
        
        {/* Enter Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => window.location.reload()}
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#ff6347] hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#ab402d] group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#ff6347] group-hover:-skew-x-12"></span>
            <span className="relative flex items-center gap-2">
              Enter YEPA 2024
              <Stars className="w-5 h-5 animate-spin-slow animate-pulse" />
            </span>
          </button>
        </div>

        {/* Footer Text */}
        <div className="text-center text-sm text-[#ff6347] font-medium">
          Department of Information and Communications Technology
        </div>
      </div>
    </div>
  );
}