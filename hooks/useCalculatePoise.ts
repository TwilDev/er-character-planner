import { useState, useEffect, useContext } from 'react'
import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { ArmourContext } from '@/context/armourContext'

export default function useCalculatePoise() {
  const [poise, setPoise] = useState<number>(0)
  
  const { armour } = useContext(ArmourContext)

  useEffect(() => {
    let toughnessValues: number[] = []

    // iterate through armour pieces and fetch neutralDamageCutRate 
    for (const [key, value] of Object.entries(armour)) {
      if (value) {
        const armourPiece = armourProtectorParams.find((armourPiece) => armourPiece.ID === value.value.id)
        let toughness = armourPiece ? armourPiece?.toughnessCorrectRate : 0
        toughnessValues.push(toughness)
      } else {
      }
    }

    if (!toughnessValues.length) {
      setPoise(0)
    } else {
      let toughnessRates = []
      
      for (const [key, value] of Object.entries(armour)) {
        if (value) {
          const armourPiece = armourProtectorParams.find((armourPiece) => armourPiece.ID === value.value.id) as any // Use type assertion
          toughnessRates.push(armourPiece.toughnessCorrectRate ?? 0)      
        }
      }

      // Get sum of all toughnessCorrectRates
      let total = toughnessRates.reduce((a, b) => a + b)
      
      // Calculate Poise
      /* TODO */
      // 1 Needs to be updated if the user has BullGoats Talisman to calculate the additional poise added, left at 1 for now
      let poise = total / 1

      // Final calculation before poise number is shown to user - based on original toughness value
      let formattedPoise = (poise * 1000).toFixed(2)
      setPoise(+formattedPoise)
    }
  }, [armour])

  return { poise }
}
