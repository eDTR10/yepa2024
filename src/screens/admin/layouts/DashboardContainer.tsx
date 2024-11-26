import PBCard from './PBCard'

function DashboardContainer() {
  return (

    <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto '>
      <div className='sunburst-bg w-screen h-screen flex items-center absolute z-0'/>
        <PBCard/>
      </div>
   
  
   
  )
}

export default DashboardContainer