import { CharacterContext } from '@/context/characterContext'
import { useContext, useEffect, useState, useCallback, use } from 'react'

export default function useStats() {
  const { stats, setStats, baseStats, setBaseStats } =
    useContext(CharacterContext)

  // Total stats including modiefiers from Equipment, Great Runes, etc.
  const [totalStats, setTotalStats] = useState<IStats>(stats)

  //placeholder for stats that are changed
  const [changeStats, setChangeStats] = useState<IStats>(stats)

  //Tracks stats that have been edited by the user
  const [statChange, setStatChange] = useState<string[]>([])

  //Stat Total for calculating specific defences and resistances
  const [total, setTotal] = useState<number>(
    Object.values(baseStats).reduce((acc, val) => acc + val, 0)
  )

  //Current User Level
  const [level, setLevel] = useState(total - 79)

  // Next Level & total Runes required.
  const [nextLevelRunes, setNextLevelRunes] = useState(0);
  const [totalRunesRequired, setTotalRunesRequired] = useState(0);

  //Update stats when a new class is selected
  const updateClassOnChange = useCallback(
    (newClass: IStats) => {
      const newClassStats: IStats = { ...newClass }

      /* If user has alterred any stats loop through new classes stats and set any stats higher 
    than the base stats to current user stats to maintain their build */
      if (statChange.length > 0) {
        for (const stat in newClassStats) {
          if (Object.hasOwnProperty.call(newClassStats, stat)) {
            if (
              statChange.includes(stat) &&
              newClassStats[stat as keyof IStats] <=
                changeStats[stat as keyof IStats]
            ) {
              newClassStats[stat as keyof IStats] = stats[stat as keyof IStats]
            }
          }
        }
      }

      //Set new stats
      setChangeStats(newClassStats)
      setStats(newClassStats)
      setBaseStats(newClass)
      const statSum = Object.values(newClassStats).reduce(
        (acc, val) => acc + val,
        0
      )
      setTotal(statSum)
      setLevel(statSum - 79)
    },
    [changeStats, setBaseStats, setStats, statChange, stats]
  )



  // calculate rune costs for current level
  useEffect(() => {
    // Obtains the base level for the characters class
    const getBaselevel = () => {
      return Object.values(baseStats).reduce((acc, val) => acc + val, 0) - 79
    }
    const baseLevel = getBaselevel()
    
    // Calculate the cost of runes for the next level and the total cost of runes required to reach the next level
    function calculateCosts(level: number) {
      if (level >= 12) return Math.floor(0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895)
      else return Math.floor(0.0068 * Math.pow(level, 3) - 0.06 * Math.pow(level, 2) + 17.1 * level + 639)
    }

    if (level >= baseLevel) {
      const nextLevelCost = calculateCosts(level + 1);
      setNextLevelRunes(nextLevelCost)
      let totalCost = [...Array(level - baseLevel + 1)].reduce((acc, val, i) => {
        return acc + calculateCosts(baseLevel + i)
      }, 0)

      setTotalRunesRequired(totalCost);
    }
  }, [level, baseStats])

  return {
    totalStats,
    setTotalStats,
    updateClassOnChange,
    nextLevelRunes,
    totalRunesRequired,
  }
}
