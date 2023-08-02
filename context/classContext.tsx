import React, { createContext, useState, useContext, useEffect } from "react"

// Define the type for your context
interface IClassContext {
  baseStats: IStats;
  setBaseStats: React.Dispatch<React.SetStateAction<IStats>>;
  stats: IStats;
  setStats: React.Dispatch<React.SetStateAction<IStats>>;
  changeStats: IStats;
  setChangeStats: React.Dispatch<React.SetStateAction<IStats>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  updateClassOnChange: (newClass: IStats) => void;
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

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(Object.values(baseStats).reduce((acc, val) => acc + val, 0))

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  const updateClassOnChange = (newClass: IStats) => {
    setBaseStats(newClass)
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
      updateClassOnChange
    }}>
      {children}
    </ClassContext.Provider>
  )
}

export { ClassContext, ClassContextProvider  }