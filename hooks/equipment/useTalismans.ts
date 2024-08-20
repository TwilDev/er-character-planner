import { CharacterContext } from "@/context/characterContext"
import { talismans as talismansData } from '@/data/talismans/talismanData.json'
import { useMemo, useContext } from "react"

export default function useTalismans() {
  const { talismans, setTalismans } = useContext(CharacterContext)

  // Values for each dropdown - all talismans in the game
  const talismanOptions = useMemo(() => generateTalismanOptions(talismansData), [])

  function generateTalismanOptions(talismansData: any[]): ITalisman[] {
    return talismansData
      .filter(talisman => talisman && talisman.Talisman)
      .map(talisman => ({ value: talisman, label: talisman.Talisman }))
  }

  const selectTalisman = (talisman: ITalisman, slot: keyof ITalismanSlots) => {
    const newTalismanSlots: ITalismanSlots = {
      ...talismans,
      [slot]: talisman
    }
    setTalismans(newTalismanSlots)
  }

  return {
    talismanOptions,
    selectTalisman
  }
}