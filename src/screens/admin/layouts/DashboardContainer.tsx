import PBCard from './PBCard'

function DashboardContainer() {
  return (
    <div className='mains w-screen h-screen flex items-start justify-center overflow-y-auto'>
       <div className='sunburst-bg mt-40 grid grid-cols-4 xs:grid-cols-2 gap-4 sm:flex-wrap z-0'>
        <PBCard/>
    </div>
    </div>
   
  )
}

export default DashboardContainer