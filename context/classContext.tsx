import React, { createContext, useState, useContext, useEffect } from "react"

// Define the type for your context
interface IClassContext {
  baseStats: IStats
  setBaseStats: React.Dispatch<React.SetStateAction<IStats>>
  stats: IStats
  setStats: React.Dispatch<React.SetStateAction<IStats>>
  hasChangedStats : boolean
  setHasChangedStats : React.Dispatch<React.SetStateAction<boolean>>
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

  //Track for if the stats have been changed at all, if no then the current stats will be the base stats if yes then the current stats will be the changed stats
  const [hasChangedStats, setHasChangedStats] = useState<boolean>(false)

  //placeholder for stats that are changed
  const [changeStats, setChangeStats] = useState<IStats>(stats)

  const [statChange, setStatChange] = useState<string[]>([])

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  const updateClassOnChange = (newClass: IStats) => {
    
    /*** - TODO: - ***/
    //NEED TO CHANGE SO THAT THE STATS THAT HAVE BEEN ALTERRED ARE STORED AND CHECKED AGAINST HERE
    // Example hasChangedStats change to an array of keys that have been changed
    // changedStats = ["vigor", "mind", "endurance"] etc..
    // Then can check if this array has some length if not then just set all stats and totals to new base stats
    // IF it contains keys go down to loop


    //Check if the stats have been changed, if not then set the current stats to the base stats
    if (statChange.length === 0) {
      // console.log("stats have not been changed")
      setChangeStats(newClass)
      // console.log("New Stats: " + newClass)
      setStats(newClass)
      setBaseStats(newClass)
      const statSum = Object.values(newClass).reduce((acc, val) => acc + val, 0)
      // console.log(statSum)
      setTotal(statSum)
      // console.log(total)
      setLevel((statSum - 79))
      return
    }

    // TODO CONTINUED
    // If some stats have been we loop through the new stats and set any stats that have not been changed to the base stats
    // Then combine these values to new current stats that will be set to ChangeStats & Stats
    // Base stats will be set to the new class
    // Calculate new total and new leve from currentStats
    
    else {
      const newClassStats: IStats = {...newClass}

      //If user has alterred any stats loop through new classes stats and set any stats higher than the base stats to current user stats to maintain their build
      for (const stat in newClassStats) {
        if (Object.hasOwnProperty.call(newClassStats, stat)) {
          if (statChange.includes(stat) && newClassStats[stat as keyof IStats] <= changeStats[stat as keyof IStats]) {
            newClassStats[stat as keyof IStats] = stats[stat as keyof IStats]
          }
        }
      }
      
      console.log(newClass)

      //Set new stats
      setChangeStats(newClassStats)
      setStats(newClassStats)
      setBaseStats(newClass)
      const statSum = Object.values(newClassStats).reduce((acc, val) => acc + val, 0)
      setTotal(statSum)
      setLevel((statSum - 79))
    }
  }

  return (
    <ClassContext.Provider value={{
      baseStats,
      setBaseStats,
      stats,
      setStats,
      hasChangedStats, 
      setHasChangedStats,
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