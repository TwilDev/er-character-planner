import Defences from "./Defences"
import VitalStats from "./VitalStats"

export default function CoreStats() {
  return (
    <div className="w-[300px]">
      <div className='flex flex-col items-center mb-2'>
        <VitalStats />
        <hr className="py-2"/>
        <Defences />
      </div>
    </div>
  )
}