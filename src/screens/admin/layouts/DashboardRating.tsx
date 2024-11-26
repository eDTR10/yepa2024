import Ratings from "./Ratings"

function DashboardRating() {
  return (

    <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto sm:justify-center'>
      <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0'/>
        <Ratings />
      </div>
   
  )
}

export default DashboardRating