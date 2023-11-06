import React, { createContext, useState, useContext, useEffect } from "react"
import getNextLevelRunes from "@/helpers/getNextLevelRunes"

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
  useRuneCosts: (currentLevel: number, baseLevel: number) => { nextLevelRunes: number; totalRunesRequired: number }
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

  // calculate rune costs for current level 
  function useRuneCosts(currentLevel: number, baseLevel: number) {
    const [nextLevelRunes, setNextLevelRunes] = useState(0);
    const [totalRunesRequired, setTotalRunesRequired] = useState(0);
  
    useEffect(() => {
      function calculateCosts(level: number) {
        if (level >= 12) return Math.floor(0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895)
        else return Math.floor(0.0068 * Math.pow(level, 3) - 0.06 * Math.pow(level, 2) + 17.1 * level + 639)
      }
  
      if (currentLevel >= baseLevel) {
        const nextLevelCost = calculateCosts(currentLevel + 1);
        setNextLevelRunes(nextLevelCost)
        let totalCost = [...Array(currentLevel - baseLevel + 1)].reduce((acc, val, i) => {
          return acc + calculateCosts(baseLevel + i)
        }, 0)

        setTotalRunesRequired(totalCost);
      }
    }, [currentLevel]);
  
    return { nextLevelRunes, totalRunesRequired };
  }

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
      setStatChange,
      useRuneCosts
    }}>
      {children}
    </ClassContext.Provider>
  )
}

export { ClassContext, ClassContextProvider  }