import ClassPicker from "./ClassPicker"
import { useContext } from "react"
import { ClassContext } from "@/context/classContext"
import { useState, useEffect } from "react"

export default function CoreStats() {
  const { 
    baseStats,
    setBaseStats,
    stats,
    setStats,
    hasChangedStats,
    setHasChangedStats,
    total,
    setTotal,
    level,
    setLevel,
    changeStats,
    setChangeStats 
  } = useContext(ClassContext)


  const validateStat = (label: keyof IStats, stat: any) => {
    if (stat < baseStats[label] || isNaN(stat)) {
      return baseStats[label]
    }
    if (stat > 99) {
      return 99;
    }
    return stat;
  }
  
  //Update stats to be changed
  const updateStats = (stat: keyof IStats, value: string) => {
    // Prevent non-numeric values

    // Set hasChangedStats on first change
    if (!hasChangedStats) {
      setHasChangedStats(true)
    }

    const newValue = value === '' ? '' : parseInt(value, 10)
    const newStats: IStats = { ...stats, [stat]: newValue }
    setChangeStats(newStats)
  }
  
  const statChange = (stat: keyof IStats, value: string) => {
    // Validate and update stats on input blur
    if (!hasChangedStats) {
      setHasChangedStats(true)
    }

    const validatedStat = validateStat(stat, parseInt(value))
    // console.log(validatedStat)
    const newStats: IStats = { ...changeStats, [stat]: validatedStat }
    setChangeStats(newStats)
    setStats(newStats)
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
    </div>
  )
}
