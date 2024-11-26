import Ratings from "./Ratings"

function DashboardRating() {
  return (

    <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto  sm:justify-center'>
    <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0'/>
      <Ratings />
    </div>
    // <div className='sunburst-bg mt-40 grid grid-cols-4 xs:grid-cols-2 gap-4 sm:flex-wrap z-0'>
    //     <Ratings />
    // </div>
  )
}

export default DashboardRating