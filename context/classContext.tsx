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

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  const updateClassOnChange = (newClass: IStats) => {
    console.log(newClass)
    console.log(hasChangedStats)

    
    /*** - TODO: - ***/
    //NEED TO CHANGE SO THAT THE STATS THAT HAVE BEEN ALTERRED ARE STORED AND CHECKED AGAINST HERE
    // Example hasChangedStats change to an array of keys that have been changed
    // changedStats = ["vigor", "mind", "endurance"] etc..
    // Then can check if this array has some length if not then just set all stats and totals to new base stats
    // IF it contains keys go down to loop


    //Check if the stats have been changed, if not then set the current stats to the base stats
    if (!hasChangedStats) {
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
    


    const currentStats: IStats = stats
    console.log("got here")
    console.log("New Class Stats")
    console.log(newClass)
    //Go through each current stat and if the value is less than the base value, set it to the base value
    for (const stat in currentStats) {
      if (Object.hasOwnProperty.call(currentStats, stat)) {
        const element = currentStats[stat as keyof IStats];
        if (element < newClass[stat as keyof IStats]) {
          console.log(stat)
          currentStats[stat as keyof IStats] = newClass[stat as keyof IStats]
        }
      }
    }

    console.log(currentStats)
    setBaseStats(newClass)
    setChangeStats(currentStats)
    setStats(currentStats)
    // setStats(currentStats)
    // setTotal(Object.values(currentStats).reduce((acc, val) => acc + val, 0))
    // setLevel(total - 79)
    // console.log(currentStats)
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
      updateClassOnChange
    }}>
      {children}
    </ClassContext.Provider>
  )
}

export { ClassContext, ClassContextProvider  }