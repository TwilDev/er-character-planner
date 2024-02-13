import Defences from "./Defences"
import VitalStats from "./VitalStats"

export default function CoreStats() {
  return (
    <div>
      <div className='flex flex-col items-center justify-between w-full mb-2'>
        <VitalStats />
        <Defences />
      </div>
    </div>
  )
}