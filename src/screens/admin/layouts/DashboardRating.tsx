import Ratings from "./Ratings"

function DashboardRating() {
  return (
    <div className='sunburst-bg mt-40 grid grid-cols-4 xs:grid-cols-2 gap-4 sm:flex-wrap'>
        <Ratings />
    </div>
  )
}

export default DashboardRating