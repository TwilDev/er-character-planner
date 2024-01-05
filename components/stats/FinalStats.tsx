import { useContext } from "react"
import { ClassContext } from "@/context/classContext"
import { EffectContext } from "@/context/effectContext"
import { useState, useEffect } from 'react'

export default function FinalStats() {

  const { stats, totalStats, setTotalStats, setTotal, total } = useContext(ClassContext)
  const { effects } = useContext(EffectContext)

  // state that holds all stat modifiers from effects, is an object wth key of stat and value of modifier
  const [statModifiers, setStatModifiers] = useState<IStats>(
    {
      vigor: 0,
      mind: 0,
      endurance: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
      arcane: 0
    }
  )

  // Check for changes in effects mutations effect and track stat modifiers
  useEffect(() => {
    // extract all stat modifiers from each effect
    let newStatModifiers: any = {}
    effects.forEach(effect => {
      // Check if effect has any key matching a stat in IStats vigor, mind, etc.
      Object.keys(effect).forEach(key => {
        if (Object.keys(statModifiers).includes(key)) {
          // if key exists, add value to exisiting value in statModifiers
            newStatModifiers[key as keyof IStats] = effect[key as keyof IStats]
        }
      })
    })

    // Update statModifiers state with new mutations
    setStatModifiers(prevState => {
      return {
        ...prevState,
        ...newStatModifiers
      }
    })
  }, [stats, effects])


  // Update finalStats with statModifiers
  useEffect(() => {
    // add stat modifiers to total stats
    let newFinalStats: any = {}
    Object.keys(stats).forEach(stat => {
      newFinalStats = {
        ...newFinalStats,
        [stat]: stats[stat as keyof IStats] + statModifiers[stat as keyof IStats]
      }
    })
    setTotalStats(newFinalStats)
    setTotal(Object.values(totalStats).reduce((acc, val) => acc + val, 0))
    console.log("Total", total)
  }, [statModifiers])

  return (
    <div className="flex justify-center items-top gap-4">
      <div className="flex flex-col gap-2">
        {Object.keys(totalStats).map((stat, i) => {
          const statValue: number = totalStats[stat as keyof IStats]
          return (
            <div key={i} className='flex justify-between w-full'>
              <p className="font-semibold">{statValue}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}