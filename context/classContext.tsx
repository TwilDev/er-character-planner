import React, { createContext, useState, useContext, useEffect } from "react"

// Define the type for your context
interface IClassContext {
  baseStats: IStats
  setBaseStats: React.Dispatch<React.SetStateAction<IStats>>
  stats: IStats
  setStats: React.Dispatch<React.SetStateAction<IStats>>
  changeStats: IStats
  setChangeStats: React.Dispatch<React.SetStateAction<IStats>>
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>
  level: number
  setLevel: React.Dispatch<React.SetStateAction<number>>
  updateClassOnChange: (newClass: any) => void
  statChange: string[]
  setStatChange: React.Dispatch<React.SetStateAction<string[]>>
}

const ClassContext = createContext({} as IClassContext)

const ClassContextProvider = ({ children }: any) => {

  //Base stats currently hardcoded for Vagabond
  const [baseStats, setBaseStats] = useState<IStats>({
    vigor: 15,
    mind: 10,
    endurance: 11,
    strength: 14,
    dexterity: 13,
    intelligence: 9,
    faith: 9,
    arcane: 7,
  })
  // Current User Build
  const [stats, setStats] = useState<IStats>(baseStats)

  //placeholder for stats that are changed
  const [changeStats, setChangeStats] = useState<IStats>(stats)

   //Tracks stats that have been edited by the user
  const [statChange, setStatChange] = useState<string[]>([])

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  //Update stats when a new class is selected
  const updateClassOnChange = (newClass: IStats) => {

    const newClassStats: IStats = {...newClass}

    /* If user has alterred any stats loop through new classes stats and set any stats higher 
    than the base stats to current user stats to maintain their build */
    if (statChange.length > 0) {
      for (const stat in newClassStats) {
        if (Object.hasOwnProperty.call(newClassStats, stat)) {
          if (statChange.includes(stat) && newClassStats[stat as keyof IStats] <= changeStats[stat as keyof IStats]) {
            newClassStats[stat as keyof IStats] = stats[stat as keyof IStats]
          }
        }
      }
    }

    //Set new stats
    setChangeStats(newClassStats)
    setStats(newClassStats)
    setBaseStats(newClass)
    const statSum = Object.values(newClassStats).reduce((acc, val) => acc + val, 0)
    setTotal(statSum)
    setLevel((statSum - 79))
  }

  return (
    <ClassContext.Provider value={{
      baseStats,
      setBaseStats,
      stats,
      setStats,
      changeStats,
      setChangeStats,
      total,
      setTotal,
      level,
      setLevel,
      updateClassOnChange,
      statChange,
      setStatChange
    }}>
      {children}
    </ClassContext.Provider>
  )
}

export { ClassContext, ClassContextProvider  }