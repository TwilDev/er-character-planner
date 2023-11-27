import { useContext } from "react"
import { ClassContext } from "@/context/classContext"
import { EffectContext } from "@/context/effectContext"
import { useState, useEffect } from 'react'

export default function FinalStats() {

  const { totalStats } = useContext(ClassContext)
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
  useEffect(() => {
   console.log(effects)
    // extract all stat modifiers from each effect
    let newStatModifiers: any = {}
    effects.forEach(effect => {
      // Check if effect has any key matching a stat in Itats vigor, mind, etc.
      Object.keys(effect).forEach(key => {
        let index = 0
        console.log(key, "index", index)
        if (Object.keys(statModifiers).includes(key)) {
          // if key exists, add it to newStatModifiers
          
          newStatModifiers = {
            ...newStatModifiers,
            [key]: effects[key as any]
          
          }
        }
        index += 1
      })
    })
    console.log(newStatModifiers)
  }, [totalStats, effects])

  return (
    <div className="flex justify-center items-top gap-4">
      <div className="flex flex-col gap-2">
        {Object.keys(totalStats).map((stat, i) => {
          const statValue: number = totalStats[stat as keyof IStats]
          return (
            <div key={i} className='flex justify-between w-full'>
              <p>{statValue}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}