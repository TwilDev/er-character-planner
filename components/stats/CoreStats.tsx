import Defences from "./Defences"
import VitalStats from "./VitalStats"

interface ICoreStatsProps {
  stats: IStats,
  total: number,
}

export default function CoreStats({ stats, total }: ICoreStatsProps) {
  return (
    <div>
      <div className='flex flex-col items-center justify-between w-full mb-2'>
        <VitalStats />
        <Defences />
      </div>
    </div>
  )
}