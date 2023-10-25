import { useState, useEffect, useContext } from 'react'
import { armourProtectorParams } from '@/data/armour/armourParamProtector.json'
import { ArmourContext } from '@/context/armourContext'


export default function useCalculatePoise() {
  const [poise, setPoise] = useState<number>(0)
  
  const { headArmour, bodyArmour, handsArmour, legsArmour } = useContext(ArmourContext)
  const [armour, setArmour] = useState<IArmour>(
    {
      head: headArmour, 
      body: bodyArmour, 
      hands: handsArmour, 
      legs: legsArmour
    }
  )

  useEffect(() => {
    let toughnessValues: number[] = []

    // iterate through armour pieces and fetch neutralDamageCutRate 
    for (const [key, value] of Object.entries(armour)) {
      if (value) {
        const armourPiece = armourProtectorParams.find((armourPiece) => armourPiece.ID === value.value.id)
        let toughness = armourPiece ? armourPiece?.toughnessCorrectRate : 0
        toughnessValues.push(toughness)
      } else {
        console.log('no armour piece')
      }
    }

    
    if (!toughnessValues.length) {
      setPoise(0)
    } else {
      // If length is 1 return the first element
      if (toughnessValues.length === 1) {
        let total = toughnessValues[0]
        total = 100 * (1 - total)
        
        /* TODO */
        // CURRENTLY SET TO 1 NEEDS TO BE A SPECIFIC VALUE FOR BULL GOATS TALSIMAN
        setPoise(total / 1)
      }

      // If more than 1 value multiple each element in array and return the sum
      if (toughnessValues.length > 1) {
        let total = toughnessValues.reduce((a, b) => a + b)
        total = 100 * (1 - total)
        
        /* TODO */
        // CURRENTLY SET TO 1 NEEDS TO BE A SPECIFIC VALUE FOR BULL GOATS TALSIMAN
        setPoise(total / 1)
      }
    }


  }, [armour])

  return { poise }
}
