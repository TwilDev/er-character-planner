// import { HP, FP, END } from '../../data/lookup'
const coreStatsTable = require('@/data/lookup.json')
const { HP, FP, END } = coreStatsTable
import Defences from './Defences'

interface ICoreStatsProps {
  baseStats: IStats,
  stats: IStats,
  setStats: React.Dispatch<React.SetStateAction<IStats>>,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  level: number,
  setLevel: React.Dispatch<React.SetStateAction<number>>
  changeStats: IStats,
  setChangeStats: React.Dispatch<React.SetStateAction<IStats>>
}

export default function CoreStats({ baseStats, stats, setStats, total, setTotal, level, setLevel, changeStats, setChangeStats }: ICoreStatsProps) {
  
  const validateStat = (stat: any) => {
    if (stat < 1 || isNaN(stat)) {
      return 1;
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  }
  
  //Update stats to be changed
  const updateStats = (stat: keyof IStats, value: string) => {
    // Prevent non-numeric values
    const newValue = value === '' ? '' : parseInt(value, 10)
    const newStats: IStats = { ...stats, [stat]: newValue }
    setChangeStats(newStats)
  }
  
  const statChange = (stat: keyof IStats, value: string) => {
    // Validate and update stats on input blur
    console.log('statChange')
    console.log(changeStats)
    console.log(stats)
    const validatedStat = validateStat(parseInt(value))
    console.log(validatedStat)
    const newStats: IStats = { ...changeStats, [stat]: validatedStat }
    setChangeStats(newStats)
    setStats(newStats)
    setTotal(Object.values(newStats).reduce((acc, val) => acc + val, 0))
    setLevel(Object.values(newStats).reduce((acc, val) => acc + val, 0) - 79)
  }
  
  return (
    <div>
      <div className='flex items-center w-full'>
        <label htmlFor='level'>Level</label>
        <input
          type='text'
          className='border-black border-2 ml-2'
          defaultValue={level}
        />
      </div>
      <div className="flex justify-center items-top gap-4">
        <div className="flex flex-col gap-2">
          {Object.keys(baseStats).map((stat, i) => {
            const statValue: number = baseStats[stat as keyof IStats]
            return (
              <div key={i} className='flex justify-between w-full'>
                <label htmlFor={stat} className='capitalize mr-4'>
                  {stat}
                </label>
                <p>{statValue}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-[7px]">
          {Object.keys(changeStats).map((stat, i) => {
            const currentStat: number = changeStats[stat as keyof IStats]
            return (
              <div key={i}>
                <input
                  type='text'
                  maxLength={2}
                  className='border-2 border-blue-400 rounded-md w-10 text-sm'
                  value={currentStat}
                  onChange={(e) => updateStats(stat as keyof IStats, e.target.value)}
                  onBlur={(e) => statChange(stat as keyof IStats, e.target.value)}
                />
                <button
                  className='border-2 border-blue-400 rounded-md w-10 text-sm'
                  onClick={() => statChange(stat as keyof IStats, (currentStat + 1).toString())}
                >
                  +
                </button>
                <button
                  className='border-2 border-blue-400 rounded-md w-10 text-sm'
                  onClick={() => statChange(stat as keyof IStats, (currentStat - 1).toString())}
                >
                  -
                </button>
              </div>

            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <div>
          <label htmlFor='hp'>HP</label>
          <label className='ml-2'>{Math.floor(HP[stats.vigor - 1]) ?? '??'}</label>
        </div>
        <div>
          <label htmlFor="fp">FP</label>
          <label className='ml-2'>{Math.floor(FP[stats.mind - 1])}</label>
        </div>
        <div>
          <label htmlFor="end">Stamina</label>
          <label className='ml-2'>{Math.floor(END[stats.endurance - 1])}</label>
        </div>
      </div>
      <Defences stats={stats} total={total} />
    </div>
  )
}
