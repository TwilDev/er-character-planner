import ClassPicker from "./ClassPicker"
import RuneCount from "./RuneCount"
import FinalStats from "@/components/stats/FinalStats"
import { useContext } from "react"
import { ClassContext } from "@/context/classContext"
import { useState, useEffect } from "react"

export default function CoreStats() {
  const { 
    baseStats,
    stats,
    setStats,
    total,
    setTotalStats,
    setTotal,
    level,
    setLevel,
    changeStats,
    setChangeStats,
    setStatChange,
    statChange,
  } = useContext(ClassContext)

  // Ensures stats are within the range of the base stats for their starter class and 99 and ensures to avoid NaN values
  const validateStat = (label: keyof IStats, stat: any) => {
    if (stat < baseStats[label] || isNaN(stat)) {
      return baseStats[label]
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  }
  
  //Handle individual stat changes and update holding state to be used for final stats
  const updateStats = (stat: keyof IStats, value: string) => {
    const newValue = value === '' ? '' : parseInt(value, 10)
    const newStats: IStats = { ...stats, [stat]: newValue }
    setChangeStats(newStats)
  }
  
  /* Handles updating stats across the board & calculating values associated with stats */
  const handleStatChange = (stat: keyof IStats, value: string) => {
    // add stat key to statChange array if it doesn't exist
    if (!statChange.includes(stat)) {
      setStatChange([...statChange, stat])
    }
    
    const validatedStat = validateStat(stat, parseInt(value))
    // console.log(validatedStat)
    const newStats: IStats = { ...changeStats, [stat]: validatedStat }
    setChangeStats(newStats)
    setStats(newStats)
    setTotalStats(newStats)
    setTotal(Object.values(newStats).reduce((acc, val) => acc + val, 0))
    setLevel(Object.values(newStats).reduce((acc, val) => acc + val, 0) - 79)
  }

  return (
    <div>
      <ClassPicker />
      <div className='flex items-center justify-between w-full mb-2'>
        <label htmlFor='level'>Level</label>
        <label
          className="text-semibold mr-4"
          htmlFor='level'
        >
          {level}
        </label>
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
            )
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
                  onBlur={(e) => handleStatChange(stat as keyof IStats, e.target.value)}
                />
                <button
                  className='border-2 border-blue-400 rounded-md w-10 text-sm'
                  onClick={() => handleStatChange(stat as keyof IStats, (currentStat + 1).toString())}
                >
                  +
                </button>
                <button
                  className='border-2 border-blue-400 rounded-md w-10 text-sm'
                  onClick={() => handleStatChange(stat as keyof IStats, (currentStat - 1).toString())}
                >
                  -
                </button>
              </div>

            );
          })}
          <FinalStats />
          <RuneCount />
        </div>
      </div>
    </div>
  )
}
