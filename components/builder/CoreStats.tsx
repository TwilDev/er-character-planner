import { HP, FP, END } from '../../data/lookup'
interface ICoreStatsProps {
  baseStats: IStats,
  stats: IStats,
  setStats: React.Dispatch<React.SetStateAction<IStats>>,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  level: number,
  setLevel: React.Dispatch<React.SetStateAction<number>>
}

export default function CoreStats({ baseStats, stats, setStats, total, setTotal, level, setLevel }: ICoreStatsProps) {
  
  const validateStat = (stat: number) => {
    if (stat < 1 || isNaN(stat)) {
      return 1;
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  }
  
  const updateStats = (stat: keyof IStats, value: string) => {
    // Update stats on input change but don't validate yet
    const newValue = value === '' ? '' : parseInt(value, 10); // Parse the string to an integer
    const newStats: IStats = { ...stats, [stat]: newValue };
    setStats(newStats);
  }
  
  const statChange = (stat: keyof IStats, value: string) => {
    // Validate and update stats on input blur
    const validatedStat = validateStat(parseInt(value))
    const newStats: IStats = { ...stats }
    newStats[stat] = isNaN(validatedStat) ? '' : validatedStat
    setStats(newStats)
    setTotal(Object.values(stats).reduce((acc, val) => acc + val, 0))
    setLevel(Math.floor(total - 79))
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
        {Object.keys(baseStats).map((stat, i) => {
          const statValue = baseStats[stat];
          return (
            <div key={i} className='flex items-center w-full'>
              <label htmlFor={stat} className='capitalize mr-4'>
                {stat}
              </label>
              <small>{statValue}</small>
            </div>
          );
        })}
        {Object.keys(stats).map((stat, i) => {
          return (
            <input
              key={i}
              type='text'
              className='border-black border-2 ml-2'
              value={stats[stat]}
              onChange={(e) => updateStats(stat, e.target.value)}
              onBlur={(e) => statChange(stat, e.target.value)}
            />
          );
        })}
        <div>
          <label htmlFor='hp'>HP</label>
          <label className='ml-2'>{Math.floor(HP[stats.vigor - 1])}</label>
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
  )
}
