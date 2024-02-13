import CoreBuilder from '@/components/builder/CoreBuilder'
import CoreStats from '@/components/stats/CoreStats'
import ArmourSelection from '@/components/builder/ArmourSelection'
import TalismanSelection from '@/components/builder/TalismanSelection'

export default function CharacterBuilder() {
  return (
    <div className="p-4">
      <h1>Elden Ring Character Builder</h1>
        <div className="flex">
          <div className='flex w-[350px] flex-col items-center gap-4'>
            <CoreBuilder />
          </div>
          <div className="flex w-[350px] flex-col items-center">
            <ArmourSelection />
            <TalismanSelection />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <CoreStats />
          </div>
        </div>
    </div>
  )
}